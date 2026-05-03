package cn.pickcat.reborn;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.os.Build;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import android.view.View;
import android.view.ViewGroup;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class MainActivity extends Activity {
    private static final String WINDOWS_DESKTOP_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
    private LocalServer server;
    private WebView webView;
    private View customView;
    private WebChromeClient.CustomViewCallback customViewCallback;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        server = new LocalServer(this);
        server.start();

        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setUserAgentString(WINDOWS_DESKTOP_UA);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);
            CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);
        }
        CookieManager.getInstance().setAcceptCookie(true);
        webView.addJavascriptInterface(new NativeBridge(), "PickcatAndroid");
        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onShowCustomView(View view, CustomViewCallback callback) {
                if (customView != null) {
                    callback.onCustomViewHidden();
                    return;
                }
                customView = view;
                customViewCallback = callback;
                addContentView(view, new ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                ));
                webView.setVisibility(View.GONE);
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
            }

            @Override
            public void onHideCustomView() {
                hideCustomView();
            }
        });
        setContentView(webView);
        webView.loadUrl("http://127.0.0.1:" + server.port() + "/");
    }

    @Override
    public void onBackPressed() {
        if (webView == null) {
            super.onBackPressed();
            return;
        }
        if (customView != null) {
            hideCustomView();
            return;
        }
        webView.evaluateJavascript(
            "(window.PickcatNative&&window.PickcatNative.back&&window.PickcatNative.back())?'handled':'fallback'",
            (result) -> {
                if (result != null && result.contains("handled")) {
                    return;
                }
                if (webView.canGoBack()) {
                    webView.goBack();
                } else {
                    MainActivity.super.onBackPressed();
                }
            }
        );
    }

    @Override
    protected void onDestroy() {
        hideCustomView();
        if (webView != null) {
            webView.destroy();
        }
        if (server != null) {
            server.stop();
        }
        super.onDestroy();
    }

    private void hideCustomView() {
        if (customView == null) {
            return;
        }
        ViewGroup parent = (ViewGroup) customView.getParent();
        if (parent != null) {
            parent.removeView(customView);
        }
        customView = null;
        if (webView != null) {
            webView.setVisibility(View.VISIBLE);
        }
        if (customViewCallback != null) {
            customViewCallback.onCustomViewHidden();
            customViewCallback = null;
        }
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
    }

    private final class NativeBridge {
        @JavascriptInterface
        public void setPlayerLandscape(boolean landscape) {
            runOnUiThread(() -> setRequestedOrientation(
                landscape ? ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE : ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED
            ));
        }

        @JavascriptInterface
        public String userAgent() {
            return WINDOWS_DESKTOP_UA;
        }

        @JavascriptInterface
        public void toast(String text) {
            runOnUiThread(() -> Toast.makeText(MainActivity.this, text, Toast.LENGTH_SHORT).show());
        }
    }

    private static final class LocalServer implements Runnable {
        private final Activity activity;
        private final ServerSocket serverSocket;
        private volatile boolean running = true;

        LocalServer(Activity activity) {
            this.activity = activity;
            try {
                serverSocket = new ServerSocket(0, 50, InetAddress.getByName("127.0.0.1"));
            } catch (IOException error) {
                throw new IllegalStateException(error);
            }
        }

        int port() {
            return serverSocket.getLocalPort();
        }

        void start() {
            Thread thread = new Thread(this, "PickcatLocalServer");
            thread.setDaemon(true);
            thread.start();
        }

        void stop() {
            running = false;
            try {
                serverSocket.close();
            } catch (IOException ignored) {
            }
        }

        @Override
        public void run() {
            while (running) {
                try {
                    Socket socket = serverSocket.accept();
                    Thread worker = new Thread(() -> handle(socket), "PickcatRequest");
                    worker.setDaemon(true);
                    worker.start();
                } catch (IOException ignored) {
                    if (running) {
                        // Ignore transient local socket errors.
                    }
                }
            }
        }

        private void handle(Socket socket) {
            try (Socket ignored = socket) {
                InputStream input = socket.getInputStream();
                OutputStream output = socket.getOutputStream();
                Request request = readRequest(input);
                if (request == null) {
                    return;
                }
                if (request.path.startsWith("/proxy/")) {
                    proxy(request, output);
                } else {
                    serveAsset(request.path, output);
                }
            } catch (IOException ignored) {
            }
        }

        private Request readRequest(InputStream input) throws IOException {
            ByteArrayOutputStream headerBytes = new ByteArrayOutputStream();
            int state = 0;
            while (state < 4) {
                int current = input.read();
                if (current < 0) {
                    return null;
                }
                headerBytes.write(current);
                state = (state == 0 && current == '\r') ? 1
                    : (state == 1 && current == '\n') ? 2
                    : (state == 2 && current == '\r') ? 3
                    : (state == 3 && current == '\n') ? 4
                    : 0;
            }

            String headerText = headerBytes.toString(StandardCharsets.ISO_8859_1.name());
            String[] lines = headerText.split("\r\n");
            if (lines.length == 0) {
                return null;
            }
            String[] requestLine = lines[0].split(" ", 3);
            if (requestLine.length < 2) {
                return null;
            }
            Map<String, String> headers = new HashMap<>();
            for (int i = 1; i < lines.length; i++) {
                int separator = lines[i].indexOf(':');
                if (separator > 0) {
                    headers.put(lines[i].substring(0, separator).toLowerCase(Locale.ROOT), lines[i].substring(separator + 1).trim());
                }
            }
            int contentLength = parseInt(headers.get("content-length"));
            byte[] body = new byte[contentLength];
            int read = 0;
            while (read < contentLength) {
                int count = input.read(body, read, contentLength - read);
                if (count < 0) break;
                read += count;
            }
            return new Request(requestLine[0], requestLine[1], headers, body);
        }

        private void serveAsset(String rawPath, OutputStream output) throws IOException {
            String path = rawPath.split("\\?", 2)[0];
            if (path.equals("/")) {
                path = "/index.html";
            }
            path = path.replace("..", "");
            String assetPath = "www" + path;
            try (InputStream asset = activity.getAssets().open(assetPath.startsWith("www/") ? assetPath : "www/index.html")) {
                byte[] body = readAll(asset);
                write(output, 200, mime(path), body, null);
            } catch (IOException error) {
                write(output, 404, "text/plain; charset=utf-8", "Not found".getBytes(StandardCharsets.UTF_8), null);
            }
        }

        private void proxy(Request request, OutputStream output) throws IOException {
            String upstreamBase;
            String path = request.path;
            if (path.startsWith("/proxy/codemao/")) {
                upstreamBase = "https://api.codemao.cn";
                path = path.replaceFirst("/proxy/codemao", "");
            } else if (path.startsWith("/proxy/creation/")) {
                upstreamBase = "https://api-creation.codemao.cn";
                path = path.replaceFirst("/proxy/creation", "");
            } else if (path.startsWith("/proxy/open-service/")) {
                upstreamBase = "https://open-service.codemao.cn";
                path = path.replaceFirst("/proxy/open-service", "");
            } else {
                write(output, 404, "application/json; charset=utf-8", "{\"error\":\"Unknown proxy\"}".getBytes(StandardCharsets.UTF_8), null);
                return;
            }

            HttpURLConnection connection = (HttpURLConnection) new URL(upstreamBase + path).openConnection();
            connection.setRequestMethod(request.method);
            connection.setConnectTimeout(15000);
            connection.setReadTimeout(25000);
            connection.setRequestProperty("user-agent", "Pickcat-Reborn/0.1 Android");
            connection.setRequestProperty("accept", request.headers.getOrDefault("accept", "application/json"));
            connection.setRequestProperty("content-type", request.headers.getOrDefault("content-type", "application/json"));
            String token = request.headers.get("x-codemao-token");
            String cookie = request.headers.get("x-codemao-cookie");
            String captchaTicket = request.headers.get("x-captcha-ticket");
            if (token != null && !token.isEmpty()) {
                connection.setRequestProperty("authorization", "Bearer " + token);
                connection.setRequestProperty("cookie", "authorization=" + token + "; auth=" + token + "; token=" + token);
            }
            if (cookie != null && !cookie.isEmpty()) {
                connection.setRequestProperty("cookie", cookie);
            }
            if (captchaTicket != null && !captchaTicket.isEmpty()) {
                connection.setRequestProperty("x-captcha-ticket", captchaTicket);
            }
            if (!request.method.equals("GET") && !request.method.equals("HEAD")) {
                connection.setDoOutput(true);
                try (OutputStream body = connection.getOutputStream()) {
                    body.write(request.body);
                }
            }

            int status = connection.getResponseCode();
            InputStream responseStream = status >= 400 ? connection.getErrorStream() : connection.getInputStream();
            byte[] body = responseStream == null ? new byte[0] : readAll(responseStream);
            Map<String, String> headers = new HashMap<>();
            String contentType = connection.getContentType();
            headers.put("access-control-allow-origin", "*");
            String setCookie = connection.getHeaderField("set-cookie");
            if (setCookie != null) {
                headers.put("x-codemao-cookie", flattenSetCookie(setCookie));
                headers.put("access-control-expose-headers", "x-codemao-cookie");
            }
            write(output, status, contentType == null ? "application/json; charset=utf-8" : contentType, body, headers);
            connection.disconnect();
        }

        private void write(OutputStream output, int status, String contentType, byte[] body, Map<String, String> extraHeaders) throws IOException {
            String reason = status == 200 ? "OK" : status == 404 ? "Not Found" : status == 502 ? "Bad Gateway" : "OK";
            StringBuilder headers = new StringBuilder();
            headers.append("HTTP/1.1 ").append(status).append(' ').append(reason).append("\r\n");
            headers.append("Content-Type: ").append(contentType).append("\r\n");
            headers.append("Content-Length: ").append(body.length).append("\r\n");
            headers.append("Cache-Control: no-store\r\n");
            headers.append("Connection: close\r\n");
            if (extraHeaders != null) {
                for (Map.Entry<String, String> header : extraHeaders.entrySet()) {
                    headers.append(header.getKey()).append(": ").append(header.getValue()).append("\r\n");
                }
            }
            headers.append("\r\n");
            output.write(headers.toString().getBytes(StandardCharsets.ISO_8859_1));
            output.write(body);
            output.flush();
        }

        private static byte[] readAll(InputStream input) throws IOException {
            ByteArrayOutputStream output = new ByteArrayOutputStream();
            byte[] buffer = new byte[8192];
            int read;
            while ((read = input.read(buffer)) >= 0) {
                output.write(buffer, 0, read);
            }
            return output.toByteArray();
        }

        private static int parseInt(String value) {
            try {
                return value == null ? 0 : Integer.parseInt(value);
            } catch (NumberFormatException error) {
                return 0;
            }
        }

        private static String mime(String path) {
            if (path.endsWith(".html")) return "text/html; charset=utf-8";
            if (path.endsWith(".css")) return "text/css; charset=utf-8";
            if (path.endsWith(".js")) return "text/javascript; charset=utf-8";
            if (path.endsWith(".json") || path.endsWith(".webmanifest")) return "application/json; charset=utf-8";
            if (path.endsWith(".png")) return "image/png";
            if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
            if (path.endsWith(".webp")) return "image/webp";
            return "application/octet-stream";
        }

        private static String flattenSetCookie(String value) {
            if (value == null || value.isEmpty()) return "";
            StringBuilder out = new StringBuilder();
            String[] parts = value.split(",(?=[^;,]+=)");
            for (String part : parts) {
                String cookie = part.split(";", 2)[0].trim();
                if (cookie.isEmpty()) continue;
                if (out.length() > 0) out.append("; ");
                out.append(cookie);
            }
            return out.toString();
        }
    }

    private static final class Request {
        final String method;
        final String path;
        final Map<String, String> headers;
        final byte[] body;

        Request(String method, String path, Map<String, String> headers, byte[] body) {
            this.method = method;
            this.path = path;
            this.headers = headers;
            this.body = body;
        }
    }
}
