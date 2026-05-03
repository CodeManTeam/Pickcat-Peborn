const ASSETS = {
  codeIsland: "public/assets/img_enter_code_island.png",
  elf: "public/assets/img_enter_elf.png",
  library: "public/assets/img_enter_library.png",
  logo: "public/assets/pickcat/ic_home_logo.png",
  appLogo: "public/assets/pickcat/icon_about_main_logo.png",
  view: "public/assets/pickcat/ic_view.png",
  comment: "public/assets/pickcat/ic_comment_normal.png",
  homeComment: "public/assets/pickcat/ic_home_comment.png",
  recreate: "public/assets/pickcat/ic_home_recreate.png",
  share: "public/assets/pickcat/ic_home_share.png",
  pick: "public/assets/pickcat/ic_collect.png",
  prefecture: "public/assets/pickcat/ic_item_join_prefecture_logo.png",
  search: "public/assets/pickcat/ic_search.png",
  searchEmpty: "public/assets/pickcat/ic_empty_search.png",
  photo: "public/assets/pickcat/ic_photo.png",
  video: "public/assets/pickcat/ic_video.png",
  moreMenu: "public/assets/pickcat/ic_more_mine_black.png",
  back: "public/assets/pickcat/imoji_back.png",
  settings: "public/assets/pickcat/imoji_menu_settings.png"
};

const apiConfig = {
  codemao: location.protocol === "file:" ? "https://api.codemao.cn" : "/proxy/codemao",
  creation: location.protocol === "file:" ? "https://api-creation.codemao.cn" : "/proxy/creation",
  pid: "65edCTyg"
};

const feedPageSize = 8;
const seedPostIds = [403032, 419825];

const referenceShots = [
  {
    title: "主页功能标注",
    source: "403032",
    src: "https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfMTQ1OTQ5MjZfMF8xNjMzMDU4OTA1MDEyXzY4OTZkNWVl.jpeg"
  },
  {
    title: "底部导航与发布入口",
    source: "403032",
    src: "https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfMTQ1OTQ5MjZfMF8xNjMzMDU4ODk0ODgyX2ZkZDJiNzQ2.jpeg"
  },
  {
    title: "作品发布表单",
    source: "403032",
    src: "https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfMTQ1OTQ5MjZfMF8xNjMzMDU5NjA5ODU2X2RiOTYzOGU5.png"
  },
  {
    title: "图文动态",
    source: "403032",
    src: "https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfMTQ1OTQ5MjZfMF8xNjMzMDYwMTIzMDY1Xzc3N2E3NDA3.png"
  },
  {
    title: "使用技巧 1",
    source: "419825",
    src: "https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfMTQ1OTQ5MjZfMF8xNjQxNzc3ODI2NDAzXzY5M2IyMDUx.png"
  },
  {
    title: "使用技巧 2",
    source: "419825",
    src: "https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfMTQ1OTQ5MjZfMF8xNjQxNzc3ODQxMzg4X2VhYzg4MDRm.png"
  },
  {
    title: "使用技巧 3",
    source: "419825",
    src: "https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfMTQ1OTQ5MjZfMF8xNjQxNzc3ODUyOTYzXzA1ZmVmNjIx.png"
  }
];

const circleIconMap = {
  "3": ASSETS.codeIsland,
  "26": ASSETS.elf,
  "6": ASSETS.library
};

const boardMeta = {
  "3": {
    name: "神奇代码岛",
    desc: "3D 可视化编程与代码岛作品交流",
    site: "https://dao3.fun/"
  },
  "26": {
    name: "源码精灵",
    desc: "源码、素材、工具和项目拆解讨论",
    site: "https://shequ.codemao.cn/community"
  },
  "6": {
    name: "图书馆",
    desc: "教程、资料和长期沉淀内容",
    site: "https://shequ.codemao.cn/community"
  }
};

const fallbackBoards = [
  { id: "3", name: "神奇代码岛", description: "3D 可视化编程与代码岛作品交流", icon_url: ASSETS.codeIsland, n_posts: 0 },
  { id: "26", name: "源码精灵", description: "源码、素材和工具讨论", icon_url: ASSETS.elf, n_posts: 0 },
  { id: "6", name: "图书馆", description: "教程与资料沉淀", icon_url: ASSETS.library, n_posts: 0 },
  { id: "17", name: "热门活动", description: "Pickcat 残留截图所在板块", icon_url: ASSETS.prefecture, n_posts: 0 }
];

const state = {
  currentView: "home",
  previousView: "home",
  feedTab: "recommend",
  posts: [],
  allBoards: [],
  boards: [],
  boardOffsets: {},
  boardExhausted: {},
  feedLoading: false,
  feedDone: false,
  discoverWorks: [],
  discoverLoaded: false,
  discoverLoading: false,
  discoverOffset: 0,
  discoverDone: false,
  recommendedUsers: [],
  mineTab: "activity",
  mineWorks: [],
  activeWorkId: "",
  activeUserId: "",
  activePostId: "",
  pendingPostReplyId: "",
  pendingWorkCommentId: "",
  activeCircleBoardId: "",
  circleBoardOffset: 0,
  circleBoardDone: false,
  circleBoardLoading: false,
  circleBoardPosts: [],
  followingUsers: [],
  followingPosts: [],
  followingLoaded: false,
  followingLoading: false,
  followingDynamicOffset: 0,
  followingDynamicDone: false,
  followingNames: [],
  followingNameOffset: 0,
  followingDone: false,
  mineFollowers: [],
  mineFollowingUsers: [],
  user: JSON.parse(localStorage.getItem("pickcat:user") || "null"),
  auth: JSON.parse(localStorage.getItem("pickcat:auth") || "null"),
  history: ["Pickcat", "新社区初代体验团", "源码精灵"]
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function runTransition(update) {
  if (typeof document.startViewTransition === "function") {
    document.startViewTransition(() => update());
    return;
  }
  update();
}

function authHeaders() {
  const headers = {};
  if (state.auth?.token) headers["x-codemao-token"] = state.auth.token;
  if (state.auth?.cookie) headers["x-codemao-cookie"] = state.auth.cookie;
  return headers;
}

async function request(base, path, { method = "GET", params, body, auth = false, headers = {}, raw = false } = {}) {
  const url = new URL(`${base}${path}`, location.origin);
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    method,
    headers: {
      "content-type": "application/json",
      ...(auth ? authHeaders() : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(data?.error_message || data?.msg || `${path} ${response.status}`);
  }
  return raw ? { data, response } : data;
}

const api = {
  loginV1: (identity, password) =>
    request(apiConfig.codemao, "/tiger/v3/web/accounts/login", {
      method: "POST",
      body: { pid: apiConfig.pid, identity, password },
      raw: true
    }),
  currentTime: () => request(apiConfig.codemao, "/coconut/clouddb/currentTime"),
  captchaRule: (identity, timestamp) =>
    request("/proxy/open-service", "/captcha/rule/v3", {
      method: "POST",
      body: { identity, pid: apiConfig.pid, timestamp }
    }),
  loginV2: (identity, password, ticket) =>
    request(apiConfig.codemao, "/tiger/v3/web/accounts/login/security", {
      method: "POST",
      headers: { "x-captcha-ticket": ticket },
      body: { pid: apiConfig.pid, identity, password, agreement_ids: [-1] },
      raw: true
    }),
  me: () => request(apiConfig.codemao, "/web/users/details", { auth: true }),
  messageCount: () => request(apiConfig.codemao, "/web/message-record/count", { auth: true }),
  messageRecord: (queryType) =>
    request(apiConfig.codemao, "/web/message-record", {
      auth: true,
      params: { query_type: queryType, offset: 0, limit: 10 }
    }),
  boards: () => request(apiConfig.codemao, "/web/forums/boards/simples/all"),
  boardPosts: (boardId, offset = 0, limit = 10) =>
    request(apiConfig.codemao, `/web/forums/boards/${boardId}/posts`, { params: { offset, limit } }),
  searchPosts: (title, limit = 20) =>
    request(apiConfig.codemao, "/web/forums/posts/search", { params: { title, page: 1, limit } }),
  postDetail: (id) => request(apiConfig.codemao, `/web/forums/posts/${id}/details`),
  postReplies: (postId, page = 1, limit = 10) =>
    request(apiConfig.codemao, `/web/forums/posts/${postId}/replies`, { params: { page, limit, sort: "-created_at" } }),
  replyComments: (replyId, page = 1, limit = 5) =>
    request(apiConfig.codemao, `/web/forums/replies/${replyId}/comments`, { params: { page, limit } }),
  createPostReply: (postId, content) =>
    request(apiConfig.codemao, `/web/forums/posts/${postId}/replies`, {
      method: "POST",
      auth: true,
      body: { content }
    }),
  createReplyComment: (replyId, content, parentId = 0) =>
    request(apiConfig.codemao, `/web/forums/replies/${replyId}/comments`, {
      method: "POST",
      auth: true,
      body: { content, parent_id: parentId }
    }),
  toggleReplyLike: (replyId, liked = true) =>
    request(apiConfig.codemao, `/web/forums/comments/${replyId}/liked`, {
      method: liked ? "POST" : "DELETE",
      auth: true,
      params: { item_type: "REPLY" }
    }),
  publishPost: (boardId, title, content) =>
    request(apiConfig.codemao, `/web/forums/boards/${boardId}/posts`, {
      method: "POST",
      auth: true,
      body: { title, content }
    }),
  workList: (userId) =>
    request(apiConfig.creation, "/creation-tools/v1/user/center/work-list", {
      params: { user_id: userId, offset: 0, limit: 10 }
    }),
  userCenterWorks: (userId, limit = 10) =>
    request(apiConfig.codemao, "/creation-tools/v2/user/center/work-list", {
      params: { type: "newest", user_id: userId, offset: 0, limit }
    }),
  publishedWorks: (userId, limit = 10) =>
    request(apiConfig.codemao, "/web/api/user/works/published", {
      params: { user_id: userId, types: "1,3,5", limit }
    }),
  userProfile: (userId) => request(apiConfig.codemao, `/web/api/user/info/detail/${userId}`),
  userProfileLegacy: (userId) => request(apiConfig.codemao, `/api/user/info/detail/${userId}`),
  userTiger: (userId) => request(apiConfig.codemao, `/tiger/user/${userId}`),
  userDynamicInfo: (userId) =>
    request(apiConfig.codemao, "/nemo/v2/user/dynamic/info", { params: { user_id: userId } }),
  userBusinessTotal: (userId) =>
    request(apiConfig.codemao, "/nemo/v2/works/business/total", { params: { user_id: userId } }),
  userFans: (userId, limit = 12) =>
    request(apiConfig.codemao, "/creation-tools/v1/user/fans", { params: { user_id: userId, offset: 0, limit } }),
  workDetail: (workId) => request(apiConfig.codemao, `/creation-tools/v1/works/${workId}`),
  nemoWorkDetail: (workId) => request(apiConfig.codemao, `/nemo/v2/works/${workId}`),
  workComments: (workId, offset = 0, limit = 10) =>
    request(apiConfig.codemao, `/web/works/${workId}/comments`, { params: { offset, limit } }),
  createWorkComment: (workId, content, emoji = "") =>
    request(apiConfig.codemao, `/creation-tools/v1/works/${workId}/comment`, {
      method: "POST",
      auth: true,
      body: { content, emoji_content: emoji }
    }),
  createWorkCommentReply: (workId, commentId, content, parentId = 0) =>
    request(apiConfig.codemao, `/creation-tools/v1/works/${workId}/comment/${commentId}/reply`, {
      method: "POST",
      auth: true,
      body: { content, parent_id: parentId }
    }),
  toggleWorkCommentLike: (workId, commentId, liked = true) =>
    request(apiConfig.codemao, `/creation-tools/v1/works/${workId}/comment/${commentId}/liked`, {
      method: liked ? "POST" : "DELETE",
      auth: true,
      body: {}
    }),
  toggleWorkLike: (workId, liked = true) =>
    request(apiConfig.codemao, `/nemo/v2/works/${workId}/like`, {
      method: liked ? "POST" : "DELETE",
      auth: true,
      body: {}
    }),
  toggleWorkCollection: (workId, collected = true) =>
    request(apiConfig.codemao, `/nemo/v2/works/${workId}/collection`, {
      method: collected ? "POST" : "DELETE",
      auth: true,
      body: {}
    }),
  toggleFollowUser: (userId, followed = true) =>
    request(apiConfig.codemao, `/nemo/v2/user/${userId}/follow`, {
      method: followed ? "POST" : "DELETE",
      auth: true,
      body: {}
    }),
  workLabels: (workId) => request(apiConfig.codemao, "/creation-tools/v1/work-details/work-labels", { params: { work_id: workId } }),
  workRecommended: (workId) => request(apiConfig.codemao, `/nemo/v2/works/web/${workId}/recommended`),
  homeWorks: () => request(apiConfig.codemao, "/creation-tools/v1/pc/home/recommend-work", { params: { type: 1 } }),
  discoverWorks: (offset = 0, limit = 12) =>
    request(apiConfig.codemao, "/creation-tools/v1/pc/discover/subject-work", { params: { offset, limit } }),
  activityWorks: (offset = 0, limit = 18) =>
    request(apiConfig.codemao, "/nemo/v3/work/dynamic", { auth: true, params: { offset, limit } }),
  recommendedUsers: () => request(apiConfig.codemao, "/web/users/recommended"),
  following: (userId, limit = 15) =>
    request(apiConfig.creation, "/creation-tools/v1/user/followers", {
      params: { user_id: userId, offset: 0, limit }
    }),
  followingLegacy: (userId, limit = 15) =>
    request(apiConfig.codemao, "/web/api/user/me/attention", {
      params: { user_id: userId, limit }
    })
};

function stripHtml(html = "") {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent.replace(/\s+/g, " ").trim();
}

function extractImages(html = "") {
  return [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((match) => match[1]);
}

function sanitizeHtml(html = "") {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("script, style, iframe").forEach((node) => node.remove());
  doc.body.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.toLowerCase();
      if (name.startsWith("on") || value.startsWith("javascript:")) node.removeAttribute(attribute.name);
    });
  });
  return doc.body.innerHTML;
}

function escapeHtml(text = "") {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function restoreMaskedWords(text = "") {
  const source = String(text);
  if (!source.includes("喵")) return source;
  return source
    .replace(/喵喵看/g, "喵喵看")
    .replace(/喵圈/g, "喵圈")
    .replace(/傻\s*喵/gi, "sb")
    .replace(/煞\s*喵/gi, "sb")
    .replace(/你\s*喵/gi, "nm")
    .replace(/尼\s*喵/gi, "nm")
    .replace(/草\s*喵/gi, "cs")
    .replace(/艹\s*喵/gi, "cs")
    .replace(/(?<!喵)喵(?!喵|看|圈|星|娘|咪|叫|窝|爪|粮)/g, "sb");
}

function apiText(text = "") {
  return restoreMaskedWords(stripHtml(text));
}

function cleanBoardText(text = "", fallback = "") {
  const value = apiText(text).replace(/[?？]{3,}/g, "").trim();
  return value || fallback;
}

function formatDate(seconds) {
  if (!seconds) return "未知";
  const date = new Date(seconds * 1000);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
}

function avatarText(name = "皮") {
  return [...name][0] || "皮";
}

function compactNumber(value = 0) {
  const number = Number(value) || 0;
  if (number >= 10000) return `${(number / 10000).toFixed(1)}万`;
  return String(number);
}

function normalizePost(item) {
  const text = apiText(item.content || "");
  const pickCount = item.n_likes || item.n_collects || item.n_picks || (item.is_featured ? 1 : 0);
  const work = extractWork(item);
  return {
    id: String(item.id),
    author: item.user?.nickname || "不存在的用户",
    authorId: item.user?.id || item.user_id || "",
    avatarText: avatarText(item.user?.nickname),
    avatarUrl: item.user?.avatar_url || "",
    time: formatDate(item.created_at),
    title: item.title || "无标题",
    body: text.slice(0, 150),
    circle: item.board_name || "编程猫社区",
    stats: [item.n_views || 0, item.n_replies || item.n_comments || 0, item.n_recreates || item.n_forks || 0, pickCount],
    createdAt: item.created_at || 0,
    isPinned: Boolean(item.is_pinned),
    isAuthorized: Boolean(item.is_authorized),
    images: extractImages(item.content || ""),
    work
  };
}

function extractWork(item) {
  const html = item.content || "";
  const text = stripHtml(html);
  const urlMatch = text.match(/work\/(\d+)/) || html.match(/work\/(\d+)/);
  const id = item.work_id || item.work?.id || urlMatch?.[1];
  if (!id) return null;
  return {
    id: String(id),
    name: item.work?.work_name || item.work_name || item.title || "作品预览",
    preview: item.work?.preview || item.preview || item.cover || item.cover_url || "",
    description: item.work?.description || ""
  };
}

function isKittenNWork(work = {}) {
  const type = String(work.type || work.ide_type || work.work_type || work.ideType || "").toUpperCase();
  return ["NEKO", "KITTENN", "KN"].includes(type) || Number(work.type) === 18;
}

function workEngine(work = {}) {
  const type = String(work.type || work.ide_type || work.work_type || work.ideType || "").toUpperCase();
  const player = String(work.player_url || work.playerUrl || work.player_url_v2 || work.playerUrlV2 || "");
  if (isKittenNWork(work)) return "kittenN";
  if (type.includes("NEMO") || Number(work.type) === 8 || player.includes("nemo.codemao.cn")) return "nemo";
  if (type.includes("TURTLE") || type.includes("PYTHON") || Number(work.type) === 3) return "turtle";
  if (type.includes("KITTEN3") || type.includes("KITTEN2")) return "kitten3";
  if (type.includes("KITTEN4") || type.includes("KITTEN")) return "kitten4";
  return "kitten4";
}

function uniqueUrls(urls = []) {
  const seen = new Set();
  return urls.filter((url) => {
    if (!url || seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}

function inferPlayerUrl(work = {}, id = "") {
  if (work.player_url || work.playerUrl) return work.player_url || work.playerUrl;
  if (work.player_url_v2 || work.playerUrlV2) return work.player_url_v2 || work.playerUrlV2;
  if (!id) return "";
  const engine = workEngine(work);
  if (engine === "kittenN") return `https://kn.codemao.cn/player?workId=${id}`;
  if (engine === "nemo") return `https://nemo.codemao.cn/w/${id}`;
  if (engine === "turtle") return `https://turtle.codemao.cn/?entry=sharing&channel_type=community&action=open_published_project&work_id=${id}`;
  if (engine === "kitten3") return `https://player.codemao.cn/old/${id}`;
  return `https://player.codemao.cn/new/${id}`;
}

function engineMeta(work = {}, id = "") {
  const engine = workEngine(work);
  const metas = {
    nemo: {
      code: "nemo",
      label: "Nemo",
      startLabel: "用 Nemo 播放",
      hint: "适合积木与社区移动作品",
      homeUrl: "https://nemo.codemao.cn/",
      workUrl: id ? `https://nemo.codemao.cn/w/${id}` : "https://nemo.codemao.cn/"
    },
    kittenN: {
      code: "kittenN",
      label: "KittenN",
      startLabel: "用 KittenN 播放",
      hint: "优先尝试 KittenN 专用播放器",
      homeUrl: "https://kn.codemao.cn/",
      workUrl: id ? `https://kn.codemao.cn/player?workId=${id}` : "https://kn.codemao.cn/"
    },
    kitten3: {
      code: "kitten3",
      label: "Kitten",
      startLabel: "用旧版播放器打开",
      hint: "旧版 Kitten 作品兼容性较弱",
      homeUrl: "https://kitten4.codemao.cn/",
      workUrl: id ? `https://player.codemao.cn/old/${id}` : "https://kitten4.codemao.cn/"
    },
    kitten4: {
      code: "kitten4",
      label: "Kitten",
      startLabel: "用 Kitten 播放",
      hint: "优先使用社区新播放器",
      homeUrl: "https://kitten4.codemao.cn/",
      workUrl: id ? `https://player.codemao.cn/new/${id}` : "https://kitten4.codemao.cn/"
    },
    turtle: {
      code: "turtle",
      label: "海龟",
      startLabel: "尝试海龟播放器",
      hint: "海龟作品在网页端兼容性有限",
      homeUrl: "",
      workUrl: id ? `https://turtle.codemao.cn/?entry=sharing&channel_type=community&action=open_published_project&work_id=${id}` : ""
    }
  };
  return metas[engine] || metas.kitten4;
}

function editorEntries(work = {}) {
  const meta = engineMeta(work, work.id);
  return [
    { label: `${meta.label} 播放器`, url: work.playerUrls?.[0] || meta.workUrl || "", disabled: !(work.playerUrls?.[0] || meta.workUrl) },
    { label: `${meta.label} 主页`, url: meta.homeUrl || "", disabled: !meta.homeUrl },
    { label: "社区原站", url: work.originalUrl || "", disabled: !work.originalUrl }
  ];
}

function setNativePlayerMode(active) {
  try {
    window.PickcatAndroid?.setPlayerLandscape?.(Boolean(active));
  } catch {
    // Native bridge is only available inside the Android wrapper.
  }
  document.body.classList.toggle("player-landscape", Boolean(active));
}

function nativeBack() {
  const activePlayer = $("[data-player-stage] iframe");
  if (activePlayer && state.currentView === "work") {
    setNativePlayerMode(false);
    renderWorkReader();
    return true;
  }
  if (["search", "publish", "detail", "work", "user", "login"].includes(state.currentView)) {
    if (location.search && history.length > 1) {
      history.back();
    } else {
      navigateLocal(state.previousView || "home");
    }
    return true;
  }
  if (state.currentView !== "home") {
    navigateLocal("home");
    return true;
  }
  return false;
}

window.PickcatNative = {
  back: nativeBack
};

function normalizeWork(work) {
  const id = work.id || work.work_id || work.workid;
  const author = work.user_info || work.user || work.author || {};
  const engine = workEngine(work);
  const meta = engineMeta(work, id);
  const playerUrls = uniqueUrls([
    work.player_url,
    work.playerUrl,
    work.player_url_v2,
    work.playerUrlV2,
    work.nemo_player_url,
    work.nemoPlayerUrl,
    inferPlayerUrl(work, id)
  ]);
  const rawPath = work.ideUrl || work.ide_url || work.url || "";
  const originalUrl = rawPath
    ? rawPath.startsWith("http")
      ? rawPath
      : `https://shequ.codemao.cn${rawPath.startsWith("/") ? rawPath : `/${rawPath}`}`
    : id
      ? `https://shequ.codemao.cn/work/${id}`
      : "";
  return {
    id: String(id || ""),
    type: work.type || work.work_type || "",
    ideType: work.ide_type || work.ideType || "",
    engine,
    engineLabel: meta.label,
    playerStartLabel: meta.startLabel,
    playerHint: meta.hint,
    name: work.work_name || work.name || work.title || "未命名作品",
    description: apiText(work.work_introduction || work.description || work.introduction || "暂无介绍"),
    operation: apiText(work.operation_description || ""),
    preview: work.preview || work.cover || work.cover_url || work.thumbnail || "",
    views: work.view_times || work.views || work.n_views || 0,
    likes: work.praise_times || work.liked_times || work.likes || work.n_likes || 0,
    collects: work.collect_times || work.collects || work.n_collects || 0,
    forks: work.fork_times || work.forks || work.n_forks || 0,
    comments: work.comment_times || work.comment_count || work.n_comments || 0,
    liked: Boolean(work.is_praised || work.is_liked || work.liked || work.abilities?.is_praised),
    collected: Boolean(work.is_collected || work.collected || work.abilities?.is_collected),
    playerUrl: playerUrls[0] || "",
    playerUrls,
    author: {
      id: author.id || work.user_id || "",
      nickname: author.nickname || work.nickname || "",
      avatar: author.avatar || author.avatar_url || work.avatar_url || work.avatar || "",
      signature: author.signature || author.description || "",
      followed: Boolean(author.is_followed || work.is_followed || work.followed)
    },
    labels: work.work_labels?.items || work.labels || work.work_label_list || [],
    createdAt: work.created_at || work.create_time || work.publish_time || 0,
    originalUrl,
    editorEntries: editorEntries({ id: String(id || ""), originalUrl, playerUrls, ...work })
  };
}

function normalizeFeedWork(item) {
  const base = item.work_base || item;
  const author = item.author_info || item.user || {};
  const mix = item.work_mix || item;
  return normalizeWork({
    id: base.id || item.work_id || item.id,
    work_name: base.name || item.work_name || item.name,
    work_introduction: apiText(item.description || base.description || ""),
    preview: base.preview_url || item.preview_url || item.preview,
    view_times: mix.view_times || item.views_count || item.view_times,
    praise_times: mix.like_times || item.likes_count || item.praise_times,
    collect_times: mix.collect_times || item.collect_times,
    publish_time: base.publish_time || item.publish_time,
    user_info: {
      id: author.user_id || item.user_id || author.id,
      nickname: author.nickname || item.nickname,
      avatar: author.avatar || item.avatar_url || author.avatar_url,
      signature: author.description || ""
    },
    work_labels: {
      items: [{ name: item.work_label?.label_name || item.work_recommend_info?.recommend_word || "发现" }]
    }
  });
}

function normalizeDynamicWork(item = {}) {
  if (item.work_base || item.work_mix || item.author_info || item.work_recommend_info) {
    return { ...normalizeFeedWork(item), feedType: "work", feedLabel: "关注动态" };
  }
  const work = item.work || item.work_info || item.data || item;
  const author = item.author_info || item.user_info || item.user || work.user_info || {};
  return {
    ...normalizeWork({
      ...work,
      user_info: {
        ...(work.user_info || {}),
        id: author.user_id || author.id || work.user_id || work.author_id,
        nickname: author.nickname || work.nickname || work.user_name,
        avatar: author.avatar || author.avatar_url || work.avatar || work.avatar_url
      }
    }),
    feedType: "work",
    feedLabel: "关注动态"
  };
}

function firstObject(...items) {
  return items.find((item) => item && typeof item === "object") || {};
}

function normalizeUserProfile(...sources) {
  const data = firstObject(...sources);
  const info = data.data?.userInfo?.user || data.userInfo?.user || data.user || data;
  const dynamic = sources.find((item) => item?.user_id || item?.user_cover || item?.user_description) || {};
  const tiger = sources.find((item) => item?.avatar_url && (item?.n_followers !== undefined || item?.n_works !== undefined)) || {};
  const metrics = sources.find((item) => item?.n_views !== undefined || item?.n_likes !== undefined || item?.n_re_create !== undefined) || {};
  const id = info.id || info.user_id || dynamic.user_id || tiger.id || metrics.user_id || "";
  const description = apiText(info.description || dynamic.user_description || tiger.description || "");
  const doing = apiText(info.doing || dynamic.doing || tiger.current_activity || "");
  return {
    id: String(id || ""),
    nickname: info.nickname || dynamic.nickname || tiger.nickname || metrics.nickname || "编程猫用户",
    avatar: info.avatar || info.avatar_url || dynamic.avatar_url || tiger.avatar_url || metrics.avatar_url || "",
    cover: dynamic.user_cover || info.cover || info.user_cover || "",
    description,
    doing,
    previewWorkId: info.preview_work_id || dynamic.preview_work_id || 0,
    level: info.level || dynamic.author_level || metrics.author_level || 0,
    followed: Boolean(dynamic.is_attention || tiger.is_following || info.is_following),
    stats: {
      works: tiger.n_works ?? dynamic.nworks ?? 0,
      followers: tiger.n_followers ?? dynamic.nfans ?? 0,
      following: tiger.n_following ?? dynamic.nattention ?? 0,
      views: metrics.n_views ?? dynamic.nblock ?? 0,
      likes: tiger.n_praises ?? metrics.n_likes ?? 0,
      recreates: metrics.n_re_create ?? dynamic.nfork ?? 0
    }
  };
}

function mergeUserProfile(base, ...sources) {
  const incoming = normalizeUserProfile(...sources);
  return cacheUser({
    ...base,
    ...incoming,
    id: incoming.id || base.id,
    nickname: incoming.nickname && incoming.nickname !== "编程猫用户" ? incoming.nickname : base.nickname,
    avatar: incoming.avatar || base.avatar,
    cover: incoming.cover || base.cover || "",
    description: incoming.description || base.description || "",
    doing: incoming.doing || base.doing || "",
    stats: { ...(base.stats || {}), ...(incoming.stats || {}) }
  });
}

function cacheUser(user) {
  if (!user?.id) return user;
  sessionStorage.setItem(`pickcat:user:${user.id}`, JSON.stringify(user));
  return user;
}

function normalizeUserListItem(item = {}) {
  const base = normalizeUserProfile(item.user || item.user_info || item.data || item);
  return cacheUser({
    ...base,
    id: String(base.id || item.id || item.user_id || ""),
    nickname: base.nickname || item.nickname || item.name || "编程猫用户",
    avatar: base.avatar || item.avatar || item.avatar_url || "",
    description: base.description || item.description || "",
    stats: {
      ...(base.stats || {}),
      works: base.stats?.works ?? item.n_works ?? 0,
      likes: base.stats?.likes ?? item.total_likes ?? 0
    }
  });
}

function responseItems(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.items)) return result.items;
  if (Array.isArray(result?.data?.items)) return result.data.items;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.data?.list)) return result.data.list;
  if (Array.isArray(result?.data?.dynamic)) return result.data.dynamic;
  if (Array.isArray(result?.list)) return result.list;
  if (Array.isArray(result?.work_list)) return result.work_list;
  return [];
}

function createUserMiniCard(user, extra = "") {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "fan-mini-card";
  card.innerHTML = `${user.avatar ? `<img src="${user.avatar}" alt="" />` : `<span>${avatarText(user.nickname)}</span>`}<strong>${escapeHtml(user.nickname)}</strong>${extra ? `<em>${escapeHtml(extra)}</em>` : ""}`;
  card.addEventListener("click", () => openUserReader(user));
  return card;
}

function createUserMiniSection(title, users = [], emptyText = "暂时没有读取到用户列表") {
  const section = document.createElement("section");
  section.className = "work-comments-section";
  section.innerHTML = `
    <div class="section-head flush"><h2>${title}</h2><button type="button" class="text-btn">${users.length}</button></div>
    <div class="user-fan-list" data-user-mini-list></div>
  `;
  const list = $("[data-user-mini-list]", section);
  list.replaceChildren(
    ...(users.length
      ? users.map((user) => createUserMiniCard(user, `${compactNumber(user.stats?.works || 0)} 作品 · ${compactNumber(user.stats?.likes || 0)} 赞`))
      : [statusCard(emptyText)])
  );
  return section;
}

function readCachedUser(id) {
  try {
    return JSON.parse(sessionStorage.getItem(`pickcat:user:${id}`) || "null");
  } catch {
    return null;
  }
}

function createUserReaderUrl(userId) {
  const url = new URL(location.pathname, location.origin);
  url.searchParams.set("view", "user");
  url.searchParams.set("id", userId);
  return url.toString();
}

function createWorkReaderUrl(work) {
  const detail = normalizeWork(work || {});
  const url = new URL(location.pathname, location.origin);
  url.searchParams.set("view", "work");
  if (detail.id) url.searchParams.set("id", detail.id);
  return url.toString();
}

function navigateLocal(view, params = {}) {
  const url = new URL(location.pathname, location.origin);
  ["id", "q"].forEach((key) => url.searchParams.delete(key));
  url.searchParams.set("view", view);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });
  history.pushState({ view, ...params }, "", url);
  if (view === "work") state.activeWorkId = String(params.id || "");
  if (view === "user") state.activeUserId = String(params.id || "");
  if (view === "detail") state.activePostId = String(params.id || "");
  if (view !== "work") state.activeWorkId = "";
  if (view !== "user") state.activeUserId = "";
  if (view !== "detail") state.activePostId = "";
  setView(view);
  window.scrollTo({ top: 0 });
}

function openWorkReader(work) {
  const detail = cacheWorkForReader(work);
  if (detail?.id) navigateLocal("work", { id: detail.id });
}

function openUserReader(user) {
  const detail = cacheUser(user);
  if (detail?.id) navigateLocal("user", { id: detail.id });
}

function cacheWorkForReader(work) {
  const detail = normalizeWork(work || {});
  if (!detail.id) return detail;
  sessionStorage.setItem(`pickcat:work:${detail.id}`, JSON.stringify(detail));
  return detail;
}

function readCachedWork(id) {
  try {
    return JSON.parse(sessionStorage.getItem(`pickcat:work:${id}`) || "null");
  } catch {
    return null;
  }
}

function normalizeWorkComment(item) {
  const user = item.user || item.reply_user || {};
  const replies = item.replies?.items || item.reply_items || item.replys || [];
  return {
    id: String(item.id || ""),
    user: {
      id: user.id || user.user_id || "",
      nickname: user.nickname || "编程猫用户",
      avatar: user.avatar_url || user.avatar || "",
      workshop: user.work_shop_name || ""
    },
    content: apiText(item.rich_content || item.content || ""),
    likes: item.n_likes || item.likes || item.liked_total || 0,
    liked: Boolean(item.is_liked || item.liked),
    top: Boolean(item.is_top),
    createdAt: item.created_at || item.create_time || 0,
    replies: replies.map(normalizeWorkComment),
    totalReplies: item.replies?.total || item.reply_total || replies.length
  };
}

function createWorkCommentCard(comment, nested = false) {
  const node = document.createElement("article");
  node.className = nested ? "work-comment-card nested" : "work-comment-card";
  node.dataset.commentId = comment.id;
  node.innerHTML = `
    ${comment.user.avatar ? `<img class="mini-avatar-img" src="${comment.user.avatar}" alt="" />` : `<div class="mini-avatar">${avatarText(comment.user.nickname)}</div>`}
    <div class="work-comment-main">
      <div class="work-comment-head">
        ${
          comment.user.id
            ? `<button type="button" class="user-inline-btn" data-open-user="${comment.user.id}"><strong>${escapeHtml(comment.user.nickname)}</strong></button>`
            : `<strong>${escapeHtml(comment.user.nickname)}</strong>`
        }
        ${comment.top ? `<span>置顶</span>` : ""}
      </div>
      ${comment.user.workshop ? `<em>${escapeHtml(comment.user.workshop)}</em>` : ""}
      <p>${escapeHtml(comment.content || " ")}</p>
      <div class="reply-meta">
        <button type="button" class="${comment.liked ? "liked" : ""} ${state.auth?.token ? "" : "disabled"}" data-like-work-comment="${comment.id}">${state.auth?.token ? (comment.liked ? "已赞" : "赞") : "登录后赞"} ${compactNumber(comment.likes)}</button>
        ${!nested ? `<button type="button" class="${state.auth?.token ? "" : "disabled"}" data-open-work-reply="${comment.id}">${state.auth?.token ? "回复" : "登录后回复"}</button>` : ""}
        <span>${formatDate(comment.createdAt)}${comment.totalReplies ? ` · ${compactNumber(comment.totalReplies)} 回复` : ""}</span>
      </div>
      ${
        !nested && comment.replies.length
          ? `<div class="work-comment-replies">${comment.replies
              .slice(0, 3)
              .map(
                (reply) => `
                  <div>
                    ${
                      reply.user.id
                        ? `<button type="button" class="comment-user-link" data-open-user="${reply.user.id}"><strong>${escapeHtml(reply.user.nickname)}</strong></button>`
                        : `<strong>${escapeHtml(reply.user.nickname)}</strong>`
                    }
                    <span>${escapeHtml(reply.content || " ")}</span>
                  </div>
                `
              )
              .join("")}</div>`
          : ""
      }
      ${!nested ? `<form class="nested-reply-form hidden" data-work-comment-reply-form="${comment.id}"><input data-work-comment-reply-input maxlength="300" placeholder="回复 ${escapeHtml(comment.user.nickname)}" /><button type="submit">发送</button></form>` : ""}
    </div>
  `;
  $$("[data-open-user]", node).forEach((button) =>
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openUserReader({
        id: button.dataset.openUser,
        nickname: button.textContent.trim(),
        avatar: comment.user.avatar
      });
    })
  );
  return node;
}

function normalizeBoard(board, index) {
  const meta = boardMeta[String(board.id)] || {};
  const fallbackDesc = board.has_selection ? "保留历史痕迹与精选内容的板块入口" : "把还能读取的社区内容重新组织成移动端入口";
  return {
    id: String(board.id),
    name: cleanBoardText(meta.name || board.name, `板块 ${board.id}`),
    desc: cleanBoardText(meta.desc || board.description, fallbackDesc),
    icon: circleIconMap[String(board.id)] || board.icon_url || ASSETS.prefecture,
    count: board.n_posts ? `${compactNumber(board.n_posts)} 帖` : board.is_hot ? "热门" : board.has_selection ? "精选" : "更新中",
    site: meta.site || `https://shequ.codemao.cn/community?board_id=${board.id}`,
    tone: index % 2 ? "alt" : "main"
  };
}

function isOfficialPinnedPost(item) {
  const title = item.title || "";
  const workshop = item.user?.work_shop_name || "";
  const author = item.user?.nickname || "";
  const officialAuthor = workshop.includes("编程猫官方") || author.includes("官方") || author.includes("活动喵");
  const officialTitle = /^(【?官方|公告|活动|通知)/.test(title);
  return Boolean(item.is_pinned || item.is_top || (officialAuthor && officialTitle));
}

function statusCard(text) {
  const node = document.createElement("div");
  node.className = "loading-card";
  node.textContent = text;
  return node;
}

function fallbackPost(id) {
  const detail = {
    "403032": {
      title: "入新社区初代体验团的所见所闻（十九）（pickcat使用教程）",
      board_name: "热门活动",
      created_at: 1633060417,
      n_views: 739,
      n_replies: 6,
      content: referenceShots
        .filter((shot) => shot.source === "403032")
        .map((shot) => `<p><img src="${shot.src}" alt="${shot.title}"></p>`)
        .join("")
    },
    "419825": {
      title: "入新社区初代体验团的所见所闻（二十）（pickcat使用小技巧）",
      board_name: "热门活动",
      created_at: 1641777928,
      n_views: 300,
      n_replies: 3,
      content: referenceShots
        .filter((shot) => shot.source === "419825")
        .map((shot) => `<p><img src="${shot.src}" alt="${shot.title}"></p>`)
        .join("")
    }
  }[String(id)];

  return normalizePost({
    id,
    ...detail,
    user: { nickname: "旁观者JErS", work_shop_name: "StarDreamNet团队" }
  });
}

function mergePosts(posts) {
  const map = new Map();
  [...state.posts, ...posts].forEach((post) => {
    if (!map.has(post.id)) map.set(post.id, post);
  });
  state.posts = [...map.values()].sort((a, b) => b.createdAt - a.createdAt);
}

function createPost(post) {
  const article = document.createElement("article");
  article.className = "post-card";
  const workPreview = post.work ? createWorkPreviewMarkup(post.work) : "";
  article.innerHTML = `
    <button class="post-hit" type="button" aria-label="打开帖子"></button>
    <div class="author-row">
      ${post.avatarUrl ? `<img class="avatar-img" src="${post.avatarUrl}" alt="" />` : `<div class="avatar">${post.avatarText}</div>`}
      <div><h3>${post.author}</h3><p>${post.time}</p></div>
      <div class="more">...</div>
    </div>
    <div class="post-title">${post.title}</div>
    ${post.body ? `<p class="post-body">${post.body}</p>` : ""}
    ${workPreview}
    ${post.images.length ? `<div class="image-strip">${post.images.slice(0, 3).map((src) => `<img src="${src}" alt="帖子图片" loading="lazy" />`).join("")}</div>` : ""}
    <div class="circle-chip">${post.circle}</div>
    <div class="actions-row">
      <span class="action" title="分享"><img class="action-img" src="${ASSETS.share}" alt="" />${compactNumber(post.stats[0])}</span>
      <span class="action" title="评论"><img class="action-img" src="${ASSETS.homeComment}" alt="" />${compactNumber(post.stats[1])}</span>
      <span class="action" title="再创作"><img class="action-img" src="${ASSETS.recreate}" alt="" />${compactNumber(post.stats[2])}</span>
      <span class="action" title="收藏"><img class="action-img" src="${ASSETS.pick}" alt="" />${compactNumber(post.stats[3])}</span>
    </div>
  `;
  $(".post-hit", article).addEventListener("click", () => openPost(post.id));
  $(".author-row", article).addEventListener("click", (event) => {
    event.stopPropagation();
    if (post.authorId) {
      openUserReader({ id: post.authorId, nickname: post.author, avatar: post.avatarUrl, description: post.circle });
    }
  });
  $(".inline-work-preview", article)?.addEventListener("click", (event) => {
    event.stopPropagation();
    openWorkPreview(post.work);
  });
  return article;
}

function createHomeWorkCard(work) {
  cacheWorkForReader(work);
  cacheUser(work.author);
  const node = document.createElement("article");
  node.className = "home-work-card";
  node.innerHTML = `
    <button class="home-work-hit" type="button" aria-label="打开作品"></button>
    <img class="home-work-cover" src="${work.preview}" alt="" loading="lazy" />
    <div class="home-work-content">
      <div class="home-work-kicker">${escapeHtml(work.feedLabel || "发现作品")}</div>
      <h3>${escapeHtml(work.name)}</h3>
      <p>${escapeHtml(work.description || " ")}</p>
      <button class="home-work-user" type="button">
        ${work.author.avatar ? `<img src="${work.author.avatar}" alt="" />` : `<span>${avatarText(work.author.nickname)}</span>`}
        <strong>${escapeHtml(work.author.nickname || "编程猫用户")}</strong>
      </button>
      <div class="actions-row compact-actions">
        <span>${compactNumber(work.views)} 浏览</span>
        <span>${compactNumber(work.likes)} 赞</span>
        <span>${compactNumber(work.collects)} 收藏</span>
      </div>
    </div>
  `;
  $(".home-work-hit", node).addEventListener("click", () => {
    openWorkReader(work);
  });
  $(".home-work-user", node).addEventListener("click", (event) => {
    event.stopPropagation();
    if (work.author.id) openUserReader(work.author);
  });
  return node;
}

function createUserRecommendCard(user) {
  cacheUser(user);
  const node = document.createElement("article");
  node.className = "user-recommend-card";
  node.innerHTML = `
    <button class="user-card-hit" type="button" aria-label="打开用户"></button>
    ${user.avatar ? `<img class="profile-avatar-img small" src="${user.avatar}" alt="" />` : `<div class="avatar">${avatarText(user.nickname)}</div>`}
    <div>
      <span>推荐创作者</span>
      <h3>${escapeHtml(user.nickname || "编程猫用户")}</h3>
      <p>${escapeHtml(user.description || "社区优秀创作者")}</p>
    </div>
  `;
  $(".user-card-hit", node).addEventListener("click", () => {
    if (user.id) openUserReader(user);
  });
  return node;
}

function createWorkPreviewMarkup(work) {
  const title = escapeHtml(work.name || "作品预览");
  const preview = work.preview ? `<img src="${work.preview}" alt="" loading="lazy" />` : `<div class="work-thumb-placeholder">▶</div>`;
  return `
    <button class="inline-work-preview" type="button" data-work-id="${work.id}" aria-label="打开作品预览">
      ${preview}
      <span>
        <strong>我发布了《${title}》作品</strong>
        <em>点击查看作品预览</em>
      </span>
    </button>
  `;
}

async function loadCircleData() {
  try {
    const boards = await api.boards();
    const preferred = ["3", "26", "6", "17", "2", "11", "10", "7", "30", "27"];
    state.allBoards = (boards.items || []).map(normalizeBoard);
    const preferredBoards = state.allBoards
      .filter((board) => preferred.includes(board.id))
      .sort((a, b) => preferred.indexOf(a.id) - preferred.indexOf(b.id));
    state.boards = [...preferredBoards, ...state.allBoards.filter((board) => !preferred.includes(board.id))];
  } catch {
    state.allBoards = fallbackBoards.map(normalizeBoard);
    state.boards = state.allBoards;
  }
  renderCircles();
  renderBoardSelect();
}

async function loadHomeData() {
  const feed = $("[data-feed]");
  state.posts = [];
  state.boardOffsets = {};
  state.boardExhausted = {};
  state.feedDone = false;
  feed.replaceChildren(statusCard("正在读取编程猫社区残留内容..."));

  try {
    const seedPosts = await Promise.all(
      seedPostIds.map((id) => api.postDetail(id).then(normalizePost).catch(() => fallbackPost(id)))
    );
    mergePosts(seedPosts);
  } catch {
    mergePosts(seedPostIds.map(fallbackPost));
  }
  await Promise.all([loadDiscoverWorks(), loadRecommendedUsers()]);
  await loadMoreFeed();
}

async function loadDiscoverWorks() {
  if (state.discoverLoading || state.discoverDone) return;
  state.discoverLoading = true;
  try {
    const offset = state.discoverOffset || 0;
    const [home, discover] = await Promise.all([
      offset === 0 ? api.homeWorks().catch(() => []) : Promise.resolve([]),
      api.discoverWorks(offset, 12).catch(() => ({ items: [] }))
    ]);
    const discoverItems = discover.items || discover.data?.items || discover.data || [];
    const items = [...(Array.isArray(home) ? home : home.recommend_work_list || []), ...discoverItems];
    const seen = new Set(state.discoverWorks.map((work) => work.id));
    const nextWorks = items
      .map(normalizeFeedWork)
      .filter((work) => {
        if (!work.id || seen.has(work.id)) return false;
        seen.add(work.id);
        return true;
      });
    state.discoverWorks.push(...nextWorks);
    state.discoverOffset = offset + 12;
    state.discoverDone = discoverItems.length < 12 || nextWorks.length === 0;
    state.discoverLoaded = true;
  } finally {
    state.discoverLoading = false;
    renderFeed();
  }
}

async function loadRecommendedUsers() {
  try {
    const data = await api.recommendedUsers();
    state.recommendedUsers = (data.items || []).map((user) => ({
      id: user.user_id || user.id,
      nickname: user.nickname,
      avatar: user.avatar_url,
      description: user.description,
      targetUrl: user.target_url
    }));
  } catch {
    state.recommendedUsers = [];
  }
}

async function loadMoreFeed() {
  if (state.feedLoading || state.feedDone) return;
  state.feedLoading = true;
  updateFeedSentinel();

  try {
    const sourceBoards = (state.allBoards.length ? state.allBoards : state.boards).filter((board) => !state.boardExhausted[board.id]);
    if (!sourceBoards.length) {
      state.feedDone = true;
      renderFeed();
      return;
    }

    const responses = await Promise.all(
      sourceBoards.map((board) =>
        api.boardPosts(board.id, state.boardOffsets[board.id] || 0, feedPageSize)
          .then((response) => ({ board, items: response.items || [] }))
          .catch(() => ({ board, items: null }))
      )
    );

    responses.forEach(({ board, items }) => {
      if (!items) return;
      const current = state.boardOffsets[board.id] || 0;
      state.boardOffsets[board.id] = current + feedPageSize;
      if (items.length < feedPageSize) state.boardExhausted[board.id] = true;
    });

    const nextPosts = responses
      .flatMap((response) => (response.items || []).map((item) => ({ ...item, board_name: item.board_name || response.board.name })))
      .filter((item) => !isOfficialPinnedPost(item))
      .map(normalizePost)
      .sort((a, b) => b.createdAt - a.createdAt);

    const before = state.posts.length;
    mergePosts(nextPosts);
    state.feedDone = state.posts.length === before && sourceBoards.every((board) => state.boardExhausted[board.id]);
    renderFeed();
  } catch (error) {
    if (!state.posts.length) $("[data-feed]").replaceChildren(statusCard(`社区流读取失败：${error.message}`));
    const sentinel = $("[data-feed-sentinel]");
    if (sentinel) sentinel.textContent = `加载失败：${error.message}`;
  } finally {
    state.feedLoading = false;
    updateFeedSentinel();
  }
}

function renderFeed() {
  if (state.feedTab === "discover") {
    if (!state.discoverLoaded && !state.discoverLoading) loadDiscoverWorks().then(renderFeed);
    const nodes = state.discoverWorks.length
      ? state.discoverWorks.map(createHomeWorkCard)
      : [statusCard(state.discoverLoading ? "正在读取发现作品..." : "暂时没有发现作品")];
    $("[data-feed]").replaceChildren(...nodes);
    updateFeedSentinel();
    renderMineFeed();
    return;
  }
  if (state.feedTab === "following") {
    if (!state.followingLoaded && !state.followingLoading) {
      loadFollowingFeed();
    }
    const data = state.followingPosts.length ? state.followingPosts : [];
    const nodes = [];
    if (state.followingUsers.length) {
      nodes.push(createUserMiniSection("我关注的人", state.followingUsers, "暂时没有读取到关注列表"));
    }
    if (state.followingLoading && !data.length) {
      nodes.push(statusCard("正在读取关注列表和动态作品..."));
    } else if (data.length) {
      nodes.push(...data.map((item) => (item.feedType === "work" ? createHomeWorkCard(item) : createPost(item))));
    } else {
      nodes.push(statusCard(state.auth?.token ? "暂时没有读取到关注动态；如果你还没有关注任何人，这里会保持为空。" : "登录后会读取关注列表，再读取关注动态。"));
    }
    $("[data-feed]").replaceChildren(...nodes);
    updateFeedSentinel();
    renderMineFeed();
    return;
  }
  const data = state.posts;
  const nodes = [];
  const requiredWorks = Math.ceil(data.length / 2);
  if (state.discoverWorks.length < requiredWorks && !state.discoverLoading && !state.discoverDone) {
    loadDiscoverWorks();
  }
  let workCursor = 0;
  data.forEach((post, index) => {
    nodes.push(createPost(post));
    const work = workCursor < state.discoverWorks.length ? state.discoverWorks[workCursor] : null;
    if (work && index % 2 === 0) nodes.push(createHomeWorkCard(work));
    if (work && index % 2 === 0) workCursor += 1;
    const user = state.recommendedUsers[index % Math.max(state.recommendedUsers.length, 1)];
    if (user && index === 1) nodes.push(createUserRecommendCard(user));
  });
  if (!nodes.length) nodes.push(statusCard("暂时没有返回动态"));
  $("[data-feed]").replaceChildren(...nodes);
  updateFeedSentinel();
  renderMineFeed();
}

function updateFeedSentinel() {
  const sentinel = $("[data-feed-sentinel]");
  if (!sentinel) return;
  sentinel.hidden = state.currentView !== "home";
  if (state.currentView !== "home") return;
  if (state.feedTab === "discover") {
    sentinel.textContent = state.discoverLoading
      ? "\u6b63\u5728\u6574\u7406\u53d1\u73b0\u4f5c\u54c1..."
      : state.discoverDone
        ? "\u53d1\u73b0\u9875\u6ca1\u6709\u66f4\u591a\u4f5c\u54c1\u4e86"
        : `\u7ee7\u7eed\u6ed1\u52a8\u52a0\u8f7d\u53d1\u73b0\u4f5c\u54c1\uff0c\u5df2\u52a0\u8f7d ${state.discoverWorks.length} \u4e2a`;
    return;
  }
  if (state.feedTab === "following") {
    sentinel.textContent = state.followingLoading
      ? "\u6b63\u5728\u52a0\u8f7d\u66f4\u591a\u5173\u6ce8\u52a8\u6001..."
      : state.followingDone
        ? "\u5173\u6ce8\u9875\u6ca1\u6709\u66f4\u591a\u5185\u5bb9\u4e86"
        : `\u7ee7\u7eed\u6ed1\u52a8\u52a0\u8f7d\u5173\u6ce8\u52a8\u6001\uff0c\u5df2\u52a0\u8f7d ${state.followingPosts.length} \u6761`;
    return;
  }
  sentinel.textContent = state.feedLoading ? "\u6b63\u5728\u52a0\u8f7d\u66f4\u591a\u793e\u533a\u5e16\u5b50..." : state.feedDone ? "\u6ca1\u6709\u66f4\u591a\u793e\u533a\u5e16\u5b50\u4e86" : "\u7ee7\u7eed\u6ed1\u52a8\u52a0\u8f7d\u793e\u533a\u5185\u5bb9";
}

async function loadFollowingFeed() {
  if (state.followingLoading || state.followingDone) return;
  state.followingLoading = true;
  renderFeed();
  try {
    if (!state.user?.id) throw new Error("\u672a\u767b\u5f55");
    if (!state.followingNames.length) {
      const [following, followingLegacy] = await Promise.all([
        api.following(state.user.id, 30).catch(() => ({ items: [] })),
        api.followingLegacy(state.user.id, 30).catch(() => ({ items: [] }))
      ]);
      const users = [...responseItems(following), ...responseItems(followingLegacy)];
      const seenUsers = new Set();
      state.followingUsers = users
        .map(normalizeUserListItem)
        .filter((user) => {
          if (!user.id || seenUsers.has(user.id)) return false;
          seenUsers.add(user.id);
          return true;
        });
      state.followingNames = state.followingUsers
        .map((item) => item.nickname || item.user?.nickname || item.user_info?.nickname || item.name)
        .filter(Boolean);
      state.followingDynamicOffset = 0;
      state.followingDynamicDone = !state.auth?.token;
      state.followingNameOffset = 0;
      if (!state.followingNames.length) state.followingDone = true;
    }
    let appended = 0;
    if (state.auth?.token && !state.followingDynamicDone) {
      let attempts = 0;
      while (!appended && !state.followingDynamicDone && attempts < 3) {
        const result = await api.activityWorks(state.followingDynamicOffset, 18).catch(() => null);
        if (!result) {
          state.followingDynamicDone = true;
          break;
        }
        const items = responseItems(result);
        if (!items.length) {
          state.followingDynamicDone = true;
          break;
        }
        state.followingDynamicOffset += items.length;
        if (items.length < 18) state.followingDynamicDone = true;
        const followIds = new Set(state.followingUsers.map((item) => String(item.id || "")).filter(Boolean));
        const followNames = new Set(state.followingNames.map((item) => String(item).trim()).filter(Boolean));
        const seen = new Set(state.followingPosts.map((item) => `${item.feedType || "post"}:${item.id}`));
        const works = items
          .map(normalizeDynamicWork)
          .filter((work) => {
            const authorId = String(work.author?.id || "");
            const authorName = String(work.author?.nickname || "").trim();
            const key = `work:${work.id}`;
            if (!work.id || seen.has(key)) return false;
            if ((authorId && followIds.has(authorId)) || (authorName && followNames.has(authorName))) {
              seen.add(key);
              return true;
            }
            return false;
          });
        if (works.length) {
          state.followingPosts.push(...works);
          appended += works.length;
        }
        attempts += 1;
      }
    }
    if (!appended && state.followingNameOffset < state.followingNames.length) {
      const names = state.followingNames.slice(state.followingNameOffset, state.followingNameOffset + 5);
      const results = await Promise.all(names.map((name) => api.searchPosts(name, 10).catch(() => ({ items: [] }))));
      const seen = new Set(state.followingPosts.map((item) => `${item.feedType || "post"}:${item.id}`));
      const nextPosts = results
        .flatMap((result) => (result.items || []).map(normalizePost))
        .filter((post) => {
          const key = `post:${post.id}`;
          if (!post.id || seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map((post) => ({ ...post, feedType: "post" }));
      state.followingPosts.push(...nextPosts);
      state.followingNameOffset += names.length;
    }
    state.followingDone = state.followingDynamicDone && state.followingNameOffset >= state.followingNames.length;
    state.followingLoaded = true;
  } catch {
    const seen = new Set(state.followingPosts.map((post) => post.id));
    const fallback = state.posts
      .filter((post) => post.author === state.user?.nickname && !seen.has(post.id))
      .slice(0, 8);
    state.followingPosts.push(...fallback);
    state.followingLoaded = true;
    state.followingDone = true;
  } finally {
    state.followingLoading = false;
    renderFeed();
  }
}

function renderMineFeed() {
  if (state.currentView !== "mine" || state.auth?.token) return;
  const root = $("[data-mine-feed]");
  if (root && state.posts.length) root.replaceChildren(...state.posts.slice(0, 4).map(createPost));
}

function boardById(id) {
  return state.boards.find((board) => board.id === String(id)) || state.allBoards.find((board) => board.id === String(id));
}

function renderCircleBoard(board) {
  const root = $("[data-circle-feed]");
  if (!root || !board) return;
  const nodes = [statusCard(`当前对应编程猫论坛板块：${board.name}（board ${board.id}）`)];
  if (state.circleBoardPosts.length) {
    nodes.push(...state.circleBoardPosts.map(createPost));
  } else if (state.circleBoardLoading) {
    nodes.push(statusCard(`正在读取${board.name}板块...`));
  } else {
    nodes.push(statusCard("这个板块暂时没有读取到帖子"));
  }
  if (!state.circleBoardDone) {
    const more = document.createElement("button");
    more.type = "button";
    more.className = "load-more-btn";
    more.textContent = state.circleBoardLoading ? "加载中..." : "加载更多帖子";
    more.disabled = state.circleBoardLoading;
    more.addEventListener("click", () => openCircleBoard(board, { append: true }));
    nodes.push(more);
  }
  root.replaceChildren(...nodes);
}

async function openCircleBoard(board, { append = false } = {}) {
  const root = $("[data-circle-feed]");
  if (!root || !board || state.circleBoardLoading) return;
  const boardChanged = String(state.activeCircleBoardId) !== String(board.id);
  if (!append || boardChanged) {
    state.activeCircleBoardId = String(board.id);
    state.circleBoardOffset = 0;
    state.circleBoardDone = false;
    state.circleBoardPosts = [];
  }
  state.circleBoardLoading = true;
  renderCircleBoard(board);
  try {
    const response = await api.boardPosts(board.id, state.circleBoardOffset, 10);
    const posts = (response.items || []).map((item) => normalizePost({ ...item, board_name: board.name, board_id: board.id }));
    const seen = new Set(state.circleBoardPosts.map((post) => post.id));
    state.circleBoardPosts.push(...posts.filter((post) => !seen.has(post.id)));
    state.circleBoardOffset += 10;
    state.circleBoardDone = posts.length < 10;
  } catch (error) {
    root.replaceChildren(statusCard(`读取${board.name}失败：${error.message}`));
    state.circleBoardDone = true;
  } finally {
    state.circleBoardLoading = false;
    renderCircleBoard(board);
  }
}

function renderCircles() {
  const shortcutIds = ["3", "26", "6"];
  const shortcuts = shortcutIds
    .map((id) => boardById(id) || normalizeBoard(fallbackBoards.find((board) => String(board.id) === id), shortcutIds.indexOf(id)))
    .filter(Boolean);

  $("[data-circle-shortcuts]").replaceChildren(
    ...shortcuts.map((circle) => {
      const item = document.createElement("button");
      item.className = "circle-entry";
      item.type = "button";
      item.innerHTML = `<img src="${circle.icon}" alt="" /><span>${circle.name}</span>`;
      item.addEventListener("click", () => openCircleBoard(circle));
      return item;
    })
  );

  $("[data-circles]").replaceChildren(
    ...state.boards.map((circle) => {
      const card = document.createElement("article");
      card.className = "circle-card";
      card.innerHTML = `
        <div class="circle-cover ${circle.tone === "alt" ? "alt" : ""}">
          <img src="${circle.icon}" alt="" />
          <span class="circle-count">${circle.count}</span>
        </div>
        <div class="circle-body">
          <h3>${circle.name}</h3>
          <p>${circle.desc}</p>
          <div class="circle-actions">
            <button class="join-btn" type="button" data-open-board>\u8fdb\u5165\u677f\u5757</button>
            <a class="circle-site" href="${circle.site}" target="_blank" rel="noreferrer">\u539f\u7ad9</a>
          </div>
        </div>
      `;
      $("[data-open-board]", card).addEventListener("click", () => openCircleBoard(circle));
      return card;
    })
  );

  const defaultBoard = boardById("3") || state.boards[0];
  if (defaultBoard) openCircleBoard(defaultBoard);
}

function renderBoardSelect() {
  const select = $("[data-compose-board]");
  select.replaceChildren(
    ...state.boards.map((board) => {
      const option = document.createElement("option");
      option.value = board.id;
      option.textContent = board.name;
      return option;
    })
  );
}

function updateTopbar(view) {
  const titles = { home: "PICKCAT", circle: "喵圈", publish: "发布", message: "消息", mine: "我的", search: "", detail: "帖子详情", work: "作品阅览", user: "用户预览", login: "登录" };
  const title = $("[data-title]");
  title.innerHTML = view === "home" ? `<img src="${ASSETS.logo}" alt="PICKCAT" />` : titles[view];
  $("[data-back]").classList.toggle("hidden", !["search", "publish", "detail", "work", "user", "login"].includes(view));
  renderTopActions(view);
}

function renderTopActions(view) {
  const actions = $(".top-actions");
  const hidden = ["search", "publish", "detail", "work", "user", "login"].includes(view);
  actions.classList.toggle("hidden", hidden);
  if (hidden) return;
  if (view === "mine") {
    actions.innerHTML = `<button class="icon-btn" type="button" data-top-menu aria-label="菜单"><img class="top-action-img menu-img" src="${ASSETS.moreMenu}" alt="" /></button>`;
    return;
  }
  actions.innerHTML = `
    <button class="icon-btn" type="button" data-search aria-label="搜索"><img class="top-action-img" src="${ASSETS.search}" alt="" /></button>
    <button class="icon-btn" type="button" data-top-menu aria-label="菜单"><img class="top-action-img menu-img" src="${ASSETS.moreMenu}" alt="" /></button>
  `;
  $("[data-search]", actions)?.addEventListener("click", () => navigateLocal("search"));
  return;
}

function setView(view) {
  runTransition(() => {
    closeCreateSheet();
    if (state.currentView !== view) state.previousView = state.currentView;
    state.currentView = view;
    $$(".view").forEach((section) => section.classList.toggle("active", section.dataset.view === view));
    $$(".nav-item").forEach((item) => {
      const active = item.dataset.nav === view;
      item.classList.toggle("active", active);
      const img = $("img", item);
      if (img) img.src = active ? img.dataset.iconActive : img.dataset.iconNormal;
    });
    updateTopbar(view);
    if (view !== "work") setNativePlayerMode(false);
    updateFeedSentinel();
    if (view === "mine") renderMinePage();
    if (view === "message") renderMessagesReadable();
    if (view === "work") renderWorkReader();
    if (view === "user") renderUserReader();
    if (view === "detail" && state.activePostId) renderPostDetail(state.activePostId);
  });
}

function routeFromLocation({ replace = false } = {}) {
  const params = new URLSearchParams(location.search);
  const view = params.get("view");
  const id = params.get("id") || "";
  if (view === "work" && id) {
    state.activeWorkId = id;
    if (replace) history.replaceState({ view, id }, "", location.href);
    setView("work");
    return true;
  }
  if (view === "user" && id) {
    state.activeUserId = id;
    if (replace) history.replaceState({ view, id }, "", location.href);
    setView("user");
    return true;
  }
  if (view === "detail" && id) {
    state.activePostId = id;
    if (replace) history.replaceState({ view, id }, "", location.href);
    setView("detail");
    return true;
  }
  if (["home", "circle", "publish", "message", "mine", "search", "login"].includes(view)) {
    if (replace) history.replaceState({ view }, "", location.href);
    setView(view);
    return true;
  }
  if (replace) history.replaceState({ view: state.currentView }, "", location.href);
  return false;
}

function openCreateSheet() {
  const sheet = $("[data-create-sheet]");
  sheet?.classList.remove("hidden");
  sheet?.setAttribute("aria-hidden", "false");
}

function closeCreateSheet() {
  const sheet = $("[data-create-sheet]");
  sheet?.classList.add("hidden");
  sheet?.setAttribute("aria-hidden", "true");
}

function choosePublishType(type) {
  navigateLocal("publish");
  const labels = type === "video" ? ["视频"] : ["动态", "图文"];
  $$(".compose-tools .chip").forEach((chip) => chip.classList.toggle("active", labels.includes(chip.textContent.trim())));
}

function renderHistory() {
  $("[data-history]").replaceChildren(
    ...state.history.map((word) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = word;
      chip.addEventListener("click", () => runSearch(word));
      return chip;
    })
  );
}

async function runSearch(keyword) {
  const value = keyword.trim();
  if (!value) return;
  state.history = [value, ...state.history.filter((item) => item !== value)].slice(0, 8);
  renderHistory();
  navigateLocal("search", { q: value });
  $("[data-search-input]").value = value;
  const root = $("[data-search-results]");
  root.replaceChildren(statusCard(`正在搜索：${value}`));
  try {
    const result = await api.searchPosts(value, 20);
    const posts = (result.items || []).map(normalizePost);
    root.replaceChildren(...(posts.length ? posts.map(createPost) : [statusCard("没有找到相关帖子")]));
  } catch (error) {
    root.replaceChildren(statusCard(`搜索失败：${error.message}`));
  }
}

function openPost(id) {
  state.activePostId = String(id);
  navigateLocal("detail", { id });
}

async function renderPostDetail(id) {
  const root = $("[data-detail]");
  root.replaceChildren(statusCard(`正在读取帖子 ${id}...`));
  try {
    const detail = await api.postDetail(id).catch(() => {
      const fallback = fallbackPost(id);
      return {
        id,
        title: fallback.title,
        content: fallback.images.map((src) => `<p><img src="${src}" alt=""></p>`).join(""),
        user: { nickname: fallback.author },
        board_name: fallback.circle,
        created_at: fallback.createdAt,
        n_views: fallback.stats[0],
        n_replies: fallback.stats[1],
        n_comments: 0
      };
    });
    const detailUser = {
      id: detail.user?.id || detail.user_id || "",
      nickname: detail.user?.nickname || "不存在的用户",
      avatar: detail.user?.avatar_url || ""
    };
    root.innerHTML = `
      <h2>${detail.title}</h2>
      <div class="detail-meta">
        ${
          detailUser.avatar
            ? `<img class="avatar-img clickable-avatar" data-detail-user="${detailUser.id}" src="${detailUser.avatar}" alt="" />`
            : `<button type="button" class="mini-avatar user-avatar-btn" data-detail-user="${detailUser.id}">${avatarText(detailUser.nickname)}</button>`
        }
        ${
          detailUser.id
            ? `<button type="button" class="user-inline-btn" data-detail-user="${detailUser.id}">${escapeHtml(detailUser.nickname)}</button>`
            : `<span>${escapeHtml(detailUser.nickname)}</span>`
        }
        <span>${detail.board_name || "社区"}</span>
        <span>${formatDate(detail.created_at)}</span>
      </div>
      <div class="detail-stats"><span>${compactNumber(detail.n_views)} 浏览</span><span>${compactNumber(detail.n_replies)} 回帖</span><span>${compactNumber(detail.n_comments)} 评论</span></div>
      <div class="detail-content">${sanitizeHtml(detail.content)}</div>
      <section class="detail-replies">
        <div class="section-head">
          <h2>评论与回帖</h2>
          <button class="text-btn" type="button" data-refresh-replies>刷新</button>
        </div>
        <form class="detail-reply-form" data-reply-form>
          <textarea data-reply-input maxlength="500" placeholder="写下你的评论"></textarea>
          <button class="primary-btn" type="submit">${state.auth?.token ? "发送评论" : "登录后评论"}</button>
        </form>
        <div class="reply-list" data-reply-list>
          <div class="loading-card">正在读取回帖...</div>
        </div>
      </section>
    `;
    $$("[data-detail-user]", root).forEach((button) =>
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        if (detailUser.id) openUserReader(detailUser);
      })
    );
    bindDetailReplyEvents(id);
    await loadPostReplies(id);
  } catch (error) {
    root.replaceChildren(statusCard(`帖子读取失败：${error.message}`));
  }
}

function normalizeReply(item) {
  const user = item.user || item.author || {};
  return {
    id: item.id,
    authorId: user.id || user.user_id || item.user_id || "",
    author: user.nickname || item.nickname || "社区用户",
    avatar: user.avatar_url || item.avatar_url || "",
    avatarText: avatarText(user.nickname || item.nickname),
    createdAt: item.created_at || item.create_time || 0,
    content: item.content || item.comment || item.reply || "",
    nLikes: item.n_likes || item.liked_total || item.like_count || 0,
    liked: Boolean(item.is_liked || item.liked),
    nComments: item.n_comments || item.comments_total || item.comment_count || 0,
    comments: item.comments || item.earliest_comments || []
  };
}

function createReplyCard(reply) {
  const node = document.createElement("article");
  node.className = "reply-card";
  node.dataset.replyId = reply.id;
  node.innerHTML = `
    ${reply.avatar ? `<img class="mini-avatar-img" src="${reply.avatar}" alt="" />` : `<div class="mini-avatar">${reply.avatarText}</div>`}
    <div class="reply-main">
      <div class="reply-head">
        ${
          reply.authorId
            ? `<button type="button" class="user-inline-btn" data-open-user="${reply.authorId}"><strong>${escapeHtml(reply.author)}</strong></button>`
            : `<strong>${escapeHtml(reply.author)}</strong>`
        }
        <span>${formatDate(reply.createdAt)}</span>
      </div>
      <div class="reply-content">${sanitizeHtml(reply.content)}</div>
      <div class="reply-meta">
        <button type="button" class="${reply.liked ? "liked" : ""}" data-like-reply>${reply.liked ? "已赞" : "赞"} ${compactNumber(reply.nLikes)}</button>
        <button type="button" data-open-reply>回复 ${compactNumber(reply.nComments)}</button>
      </div>
      ${
        reply.comments?.length
          ? `<div class="nested-comments">${reply.comments
              .slice(0, 3)
              .map((comment) => {
                const user = comment.user || {};
                const author = escapeHtml(user.nickname || "社区用户");
                const content = escapeHtml(apiText(comment.content || comment.comment || ""));
                return `<p>${user.id || user.user_id ? `<button type="button" class="comment-user-link" data-open-user="${user.id || user.user_id}"><strong>${author}</strong></button>` : `<strong>${author}</strong>`}：${content}</p>`;
              })
              .join("")}</div>`
          : ""
      }
      <form class="nested-reply-form hidden" data-nested-reply-form>
        <input data-nested-reply-input maxlength="300" placeholder="回复 ${escapeHtml(reply.author)}" />
        <button type="submit">发送</button>
      </form>
    </div>
  `;
  $$("[data-open-user]", node).forEach((button) =>
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openUserReader({ id: button.dataset.openUser, nickname: button.textContent.trim(), avatar: reply.avatar });
    })
  );
  $("[data-like-reply]", node)?.addEventListener("click", async (event) => {
    if (!state.auth?.token) {
      navigateLocal("login");
      return;
    }
    const button = event.currentTarget;
    const previousLiked = reply.liked;
    const previousLikes = reply.nLikes;
    const nextLiked = !reply.liked;
    reply.liked = nextLiked;
    reply.nLikes = Math.max(0, reply.nLikes + (nextLiked ? 1 : -1));
    button.classList.toggle("liked", nextLiked);
    button.textContent = `${nextLiked ? "已赞" : "赞"} ${compactNumber(reply.nLikes)}`;
    button.disabled = true;
    try {
      await api.toggleReplyLike(reply.id, nextLiked);
    } catch (error) {
      reply.liked = previousLiked;
      reply.nLikes = previousLikes;
      button.classList.toggle("liked", previousLiked);
      button.textContent = `${previousLiked ? "已赞" : "赞"} ${compactNumber(previousLikes)}`;
      button.title = error.message;
    } finally {
      button.disabled = false;
    }
  });
  $("[data-open-reply]", node)?.addEventListener("click", () => {
    $("[data-nested-reply-form]", node)?.classList.toggle("hidden");
  });
  $("[data-nested-reply-form]", node)?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.auth?.token) {
      navigateLocal("login");
      return;
    }
    const input = $("[data-nested-reply-input]", node);
    const content = input.value.trim();
    if (!content) return;
    const button = event.currentTarget.querySelector("button");
    button.disabled = true;
    button.textContent = "发送中";
    try {
      await api.createReplyComment(reply.id, `<p>${escapeHtml(content)}</p>`);
      input.value = "";
      event.currentTarget.classList.add("hidden");
    } catch (error) {
      button.title = error.message;
    } finally {
      button.disabled = false;
      button.textContent = "发送";
    }
  });
  return node;
}

async function loadPostReplies(postId) {
  const list = $("[data-reply-list]");
  if (!list) return;
  list.replaceChildren(statusCard("正在读取回帖..."));
  try {
    const result = await api.postReplies(postId, 1, 10);
    const replies = (result.items || []).map(normalizeReply);
    list.replaceChildren(...(replies.length ? replies.map(createReplyCard) : [statusCard("还没有评论，来坐第一排")]));
    if (state.pendingPostReplyId) {
      const card = list.querySelector(`.reply-card[data-reply-id="${state.pendingPostReplyId}"]`);
      card?.scrollIntoView({ block: "center", behavior: "smooth" });
      card?.classList.add("focus-flash");
      setTimeout(() => card?.classList.remove("focus-flash"), 1800);
      state.pendingPostReplyId = "";
    }
  } catch (error) {
    list.replaceChildren(statusCard(`回帖读取失败：${error.message}`));
  }
}

function bindDetailReplyEvents(postId) {
  $("[data-refresh-replies]")?.addEventListener("click", () => loadPostReplies(postId));
  $("[data-reply-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.auth?.token) {
      navigateLocal("login");
      return;
    }
    const input = $("[data-reply-input]");
    const content = input.value.trim();
    if (!content) return;
    const button = event.currentTarget.querySelector("button");
    button.disabled = true;
    button.textContent = "发送中...";
    try {
      await api.createPostReply(postId, `<p>${escapeHtml(content)}</p>`);
      input.value = "";
      await loadPostReplies(postId);
    } catch (error) {
      const list = $("[data-reply-list]");
      list?.prepend(statusCard(`评论发送失败：${error.message}`));
    } finally {
      button.disabled = false;
      button.textContent = "发送评论";
    }
  });
}

function renderMineShell(user) {
  const name = user?.nickname || "未登录";
  const desc = user?.description || "Pickcat 复刻计划 · 前端多端原型";
  const avatar = user?.avatar_url || user?.avatar;
  const stats = [
    { label: "ID", value: user?.id || "--" },
    { label: "金币", value: user?.gold ?? "--" },
    { label: "作品", value: user?.stats?.works ?? (state.mineWorks.length || 0) },
    { label: "粉丝", value: user?.stats?.followers ?? (state.mineFollowers.length || 0) },
    { label: "关注", value: user?.stats?.following ?? (state.mineFollowingUsers.length || 0) }
  ];
  $(".profile-card").innerHTML = `
    ${avatar ? `<img class="profile-avatar-img" src="${avatar}" alt="" />` : `<div class="avatar">皮</div>`}
    <div class="profile-main">
      <h2>${name}</h2>
      <p>${desc}</p>
      <div class="profile-meta">${stats.map((item) => `<span>${item.label} ${item.value}</span>`).join("")}</div>
      <div class="profile-actions">
        <a class="secondary-link" href="pickcat-story.html" target="_blank" rel="noreferrer">项目文章</a>
        <a class="secondary-link" href="pickcat-story.html#prototype-gallery" target="_blank" rel="noreferrer">宣传图集</a>
      </div>
    </div>
  `;
}

async function renderMinePage() {
  renderMineShell(state.user);
  updateProfileTabs();
  if (!state.auth?.token) {
    renderMineLoggedOut();
    return;
  }
  const root = $("[data-mine-feed]");
  root.replaceChildren(statusCard("正在读取个人信息和作品列表..."));
  try {
    const me = await api.me();
    const [profile, legacy, dynamic, metrics, tiger, centerWorks, published, fanData, following, followingLegacy] = await Promise.all([
      api.userProfile(me.id).catch(() => null),
      api.userProfileLegacy(me.id).catch(() => null),
      api.userDynamicInfo(me.id).catch(() => null),
      api.userBusinessTotal(me.id).catch(() => null),
      api.userTiger(me.id).catch(() => null),
      api.workList(me.id).catch(() => ({ items: [] })),
      api.publishedWorks(me.id).catch(() => ({ data: { works: [] } })),
      api.userFans(me.id, 12).catch(() => ({ items: [] })),
      api.following(me.id, 12).catch(() => ({ items: [] })),
      api.followingLegacy(me.id, 12).catch(() => ({ items: [] }))
    ]);
    const mergedUser = mergeUserProfile(me, profile, legacy, dynamic, metrics, tiger);
    state.user = mergedUser;
    localStorage.setItem("pickcat:user", JSON.stringify(mergedUser));
    const followingUsers = [...responseItems(following), ...responseItems(followingLegacy)];
    state.mineFollowers = responseItems(fanData).map(normalizeUserListItem).filter((item) => item.id);
    state.mineFollowingUsers = followingUsers
      .map(normalizeUserListItem)
      .filter((item, index, list) => item.id && list.findIndex((user) => user.id === item.id) === index);
    renderMineShell(mergedUser);
    const publishedItems = published.data?.works || published.works || published.items || [];
    const centerItems = centerWorks.items || centerWorks.data?.works || [];
    const merged = [...publishedItems, ...centerItems];
    const seen = new Set();
    state.mineWorks = merged
      .map(normalizeWork)
      .filter((work) => {
        const key = work.id || work.name;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    renderMineContent(mergedUser, { total: state.mineWorks.length, items: state.mineWorks });
  } catch (error) {
    root.replaceChildren(statusCard(`登录态不可用：${error.message}`), loginPrompt("重新登录"));
  }
}

function renderMineLoggedOut() {
  const root = $("[data-mine-feed]");
  if (state.mineTab === "activity") {
    root.replaceChildren(loginPrompt("登录后读取个人动态、作品列表和消息"));
  } else if (state.mineTab === "works") {
    root.replaceChildren(statusCard("作品预览需要登录后读取；帖子里识别到作品链接时也会显示预览卡。"));
  } else {
    root.replaceChildren(statusCard("喵圈信息需要登录后读取。"));
  }
}

function renderMineContent(user, worksRaw = { items: [] }) {
  const root = $("[data-mine-feed]");
  if (state.mineTab === "activity") {
    const activities = [profileStatCard(user, worksRaw)];
    if (state.mineFollowingUsers.length) activities.push(createUserMiniSection("我的关注", state.mineFollowingUsers.slice(0, 6), "还没有读取到关注"));
    if (state.mineFollowers.length) activities.push(createUserMiniSection("我的粉丝", state.mineFollowers.slice(0, 6), "还没有读取到粉丝"));
    if (state.mineWorks.length) activities.push(...state.mineWorks.map(createMineActivityCard));
    root.replaceChildren(...activities);
  } else if (state.mineTab === "works") {
    root.replaceChildren(...(state.mineWorks.length ? state.mineWorks.map(createWorkCard) : [statusCard("还没有读取到公开作品")]));
  } else {
    root.replaceChildren(
      createUserMiniSection("我的关注", state.mineFollowingUsers, "暂时没有读取到关注列表"),
      createUserMiniSection("我的粉丝", state.mineFollowers, "暂时没有读取到粉丝列表")
    );
  }
}

function updateProfileTabs() {
  const keys = ["activity", "works", "circles"];
  $$("#mine-view .profile-tabs .tab").forEach((tab, index) => {
    tab.classList.toggle("active", state.mineTab === keys[index]);
  });
}

function profileStatCard(user, works) {
  const node = document.createElement("article");
  node.className = "loading-card";
  node.innerHTML = `账号 ID：${user.id}<br />金币：${user.gold ?? "未知"}<br />作品数：${works.total ?? works.items?.length ?? 0}<br />简介：${escapeHtml(user.description || "这个账号还没有留下简介")}`;
  return node;
}

function createWorkCard(work) {
  const node = document.createElement("article");
  node.className = "work-list-card";
  node.innerHTML = `
    ${work.preview ? `<img src="${work.preview}" alt="" />` : ""}
    <div>
      <h3>${escapeHtml(work.name || "未命名作品")}</h3>
      <p>${escapeHtml(work.description || "暂无介绍")}</p>
      <span>${compactNumber(work.views)} 浏览 · ${compactNumber(work.likes)} 赞 · ${compactNumber(work.forks)} 再创作</span>
    </div>
  `;
  node.addEventListener("click", () => openWorkPreview(work));
  return node;
}

function createMineActivityCard(work) {
  const node = document.createElement("article");
  node.className = "mine-activity-card";
  const activityTime = work.createdAt ? formatDate(work.createdAt) : "已发布";
  node.innerHTML = `
    <div class="activity-dot"></div>
    <div>
      <p>我发布了《${escapeHtml(work.name)}》作品</p>
      <span>${activityTime}</span>
      ${createWorkPreviewMarkup(work)}
    </div>
  `;
  $(".inline-work-preview", node)?.addEventListener("click", () => openWorkPreview(work));
  return node;
}

async function openWorkPreview(work) {
  const base = normalizeWork(work || {});
  let detail = base;
  if (base.id) {
    try {
      detail = normalizeWork(await api.workDetail(base.id));
    } catch {
      detail = base;
    }
  }
  const overlay = document.createElement("div");
  overlay.className = "work-preview-modal";
  cacheWorkForReader(detail);
  overlay.innerHTML = `
    <button class="modal-backdrop" type="button" aria-label="关闭作品预览"></button>
    <article class="work-preview-panel">
      ${detail.preview ? `<img src="${detail.preview}" alt="" />` : `<div class="work-preview-empty">作品预览</div>`}
      <h2>${escapeHtml(detail.name)}</h2>
      <p>${escapeHtml(detail.description || "暂无介绍")}</p>
      <div class="work-preview-stats">
        <span>${compactNumber(detail.views)} 浏览</span>
        <span>${compactNumber(detail.likes)} 赞</span>
        <span>${compactNumber(detail.forks)} 再创作</span>
      </div>
      <div class="work-editor-links">
        ${detail.editorEntries
          .map((entry) =>
            entry.disabled ? `<span class="disabled">${entry.label}</span>` : `<a href="${entry.url}" target="_blank" rel="noreferrer">${entry.label}</a>`
          )
          .join("")}
      </div>
      ${detail.id ? `<a class="primary-link" href="${createWorkReaderUrl(detail)}">打开阅览页</a>` : ""}
    </article>
  `;
  $(".modal-backdrop", overlay).addEventListener("click", () => overlay.remove());
  $(".primary-link", overlay)?.addEventListener("click", (event) => {
    event.preventDefault();
    overlay.remove();
    openWorkReader(detail);
  });
  document.body.appendChild(overlay);
}

function uniqueWorks(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const work = normalizeWork(item);
    const key = work.id || work.name;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function createWorkSection(title, items = [], emptyText = "暂时没有内容") {
  const section = document.createElement("section");
  section.className = "work-comments-section";
  const list = items.length ? items.map((item) => createHomeWorkCard(normalizeWork(item))) : [statusCard(emptyText)];
  section.innerHTML = `
    <div class="section-head flush">
      <h2>${title}</h2>
      <button type="button" class="text-btn">${items.length}</button>
    </div>
    <div class="user-work-grid" data-work-section-list></div>
  `;
  $("[data-work-section-list]", section).replaceChildren(...list);
  return section;
}

async function renderWorkReader() {
  const root = $("[data-work-reader]");
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || state.activeWorkId || "";
  if (!id) {
    root.innerHTML = `<div class="work-reader-empty">没有找到作品 ID</div>`;
    return;
  }

  root.innerHTML = `<div class="work-reader-empty">正在读取作品...</div>`;
  let detail = readCachedWork(id) || normalizeWork({ id });
  let comments = [];
  let totalComments = 0;
  let labels = [];
  let relatedWorks = [];
  let authorWorks = [];
  try {
    const [creationDetail, nemoDetail] = await Promise.all([
      api.workDetail(id).catch(() => ({})),
      api.nemoWorkDetail(id).catch(() => ({}))
    ]);
    detail = cacheWorkForReader(
      normalizeWork({
        ...detail,
        ...nemoDetail,
        ...creationDetail,
        player_url_v2: creationDetail.player_url_v2 || nemoDetail.player_url_v2,
        nemo_player_url: nemoDetail.player_url
      })
    );
  } catch {
    detail = cacheWorkForReader(detail);
  }
  try {
    const [commentData, labelData, relatedData] = await Promise.all([
      api.workComments(id).catch(() => ({ items: [] })),
      api.workLabels(id).catch(() => ({ items: [] })),
      api.workRecommended(id).catch(() => ({ items: [] }))
    ]);
    comments = (commentData.items || commentData.data?.items || []).map(normalizeWorkComment);
    totalComments = commentData.total || commentData.data?.total || detail.comments || comments.length;
    labels = Array.isArray(labelData) ? labelData : labelData.items || labelData.data?.items || labelData.data || [];
    relatedWorks = uniqueWorks(Array.isArray(relatedData) ? relatedData : relatedData.items || relatedData.data?.items || relatedData.list || []);
  } catch {
    comments = [];
  }
  if (detail.author.id) {
    try {
      const [published, center] = await Promise.all([
        api.publishedWorks(detail.author.id, 6).catch(() => ({ data: { works: [] } })),
        api.workList(detail.author.id).catch(() => ({ items: [] }))
      ]);
      authorWorks = uniqueWorks([...(published.data?.works || published.works || []), ...(center.items || center.data?.works || [])]).filter(
        (item) => String(normalizeWork(item).id) !== String(id)
      );
    } catch {
      authorWorks = [];
    }
  }
  if (labels.length) {
    detail = cacheWorkForReader({
      ...detail,
      labels: labels.map((label) => ({ name: label.label_name || label.name || label }))
    });
  }

  root.innerHTML = `
    <section class="work-reader-hero">
      <div class="work-reader-stage" data-player-stage>
        ${detail.preview ? `<img class="work-reader-cover" src="${detail.preview}" alt="" />` : `<div class="work-reader-cover work-reader-empty">作品预览</div>`}
        ${
          detail.playerUrl
            ? `<div class="player-overlay">
                <button type="button" data-start-player>${escapeHtml(detail.playerStartLabel || "内嵌播放")}</button>
                <span>${escapeHtml(detail.playerHint || "若黑屏，请使用下方播放器入口")}</span>
              </div>`
            : ""
        }
      </div>
      <div class="work-reader-title">
        <h2>${escapeHtml(detail.name)}</h2>
        <span>${detail.labels.map((label) => escapeHtml(label.name || label)).join(" · ") || detail.engineLabel || "作品"}</span>
      </div>
    </section>

    <section class="work-author-card">
      ${detail.author.avatar ? `<img class="avatar-img" src="${detail.author.avatar}" alt="" />` : `<div class="avatar">${avatarText(detail.author.nickname)}</div>`}
      <div>
        ${
          detail.author.id
            ? `<button type="button" class="user-inline-btn" data-work-user="${detail.author.id}"><strong>${escapeHtml(detail.author.nickname || "编程猫用户")}</strong></button>`
            : `<strong>${escapeHtml(detail.author.nickname || "编程猫用户")}</strong>`
        }
        <p>${escapeHtml(detail.author.signature || " ")}</p>
      </div>
      ${
        detail.author.id
          ? `<button type="button" class="follow-chip ${detail.author.followed ? "active" : ""} ${state.auth?.token ? "" : "disabled"}" data-follow-author>${state.auth?.token ? (detail.author.followed ? "已关注" : "关注") : "登录后关注"}</button>`
          : ""
      }
    </section>

    <section class="work-reader-panel">
      <div class="work-action-row">
        <span class="action-pill readonly">${compactNumber(detail.views)} 浏览</span>
        <button type="button" class="action-pill ${detail.liked ? "active" : ""} ${state.auth?.token ? "" : "disabled"}" data-work-like>${state.auth?.token ? (detail.liked ? "已点赞" : "点赞") : "登录后点赞"} ${compactNumber(detail.likes)}</button>
        <button type="button" class="action-pill ${detail.collected ? "active" : ""} ${state.auth?.token ? "" : "disabled"}" data-work-collect>${state.auth?.token ? (detail.collected ? "已收藏" : "收藏") : "登录后收藏"} ${compactNumber(detail.collects)}</button>
        <button type="button" class="action-pill ${state.auth?.token ? "" : "disabled"}" data-focus-comment>${state.auth?.token ? "写评论" : "登录后评论"} ${compactNumber(detail.comments || totalComments)}</button>
      </div>
      <div class="work-editor-links">
        ${detail.editorEntries
          .map((entry) =>
            entry.disabled ? `<span class="disabled">${entry.label}</span>` : `<a href="${entry.url}" target="_blank" rel="noreferrer">${entry.label}</a>`
          )
          .join("")}
      </div>
      <h3>作品简介</h3>
      <p>${escapeHtml(detail.description || "暂无介绍")}</p>
      ${detail.operation?.trim() ? `<h3>操作说明</h3><p>${escapeHtml(detail.operation)}</p>` : ""}
    </section>

    <section class="work-comments-section">
      <div class="section-head flush">
        <h2>评论</h2>
        <button type="button" class="text-btn">${compactNumber(totalComments || detail.comments)} 条</button>
      </div>
      <form class="work-comment-composer" data-work-comment-form>
        <textarea name="content" placeholder="写下你的评论，和作者聊聊吧"></textarea>
        <div class="composer-actions">
          <span>${state.auth?.token ? "将以当前账号发表评论" : "登录后可发表评论"}</span>
          <button type="submit">${state.auth?.token ? "发送评论" : "去登录"}</button>
        </div>
      </form>
      <div class="work-comments-list" data-work-comments></div>
    </section>
  `;
  $("[data-work-user]", root)?.addEventListener("click", (event) => {
    event.stopPropagation();
    openUserReader(detail.author);
  });
  $("[data-start-player]", root)?.addEventListener("click", () => {
    const stage = $("[data-player-stage]", root);
    setNativePlayerMode(true);
    const src = detail.playerUrls?.[0] || detail.playerUrl;
    stage.innerHTML = `<iframe title="${escapeHtml(detail.name)}" src="${src}" loading="lazy" allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-downloads"></iframe>`;
  });
  $("[data-focus-comment]", root)?.addEventListener("click", () => {
    const textarea = $("textarea[name='content']", root);
    textarea?.focus();
  });
  $("[data-follow-author]", root)?.addEventListener("click", async (event) => {
    if (!state.auth?.token) {
      navigateLocal("login");
      return;
    }
    const button = event.currentTarget;
    const next = !detail.author.followed;
    button.disabled = true;
    button.classList.toggle("active", next);
      button.textContent = next ? "已关注" : "关注";
    detail.author.followed = next;
    try {
      await api.toggleFollowUser(detail.author.id, next);
    } catch (error) {
      detail.author.followed = !next;
      button.classList.toggle("active", !next);
      button.textContent = !next ? "已关注" : "关注";
      button.title = error.message;
    } finally {
      button.disabled = false;
    }
  });
  $("[data-work-like]", root)?.addEventListener("click", async (event) => {
    if (!state.auth?.token) {
      navigateLocal("login");
      return;
    }
    const button = event.currentTarget;
    const next = !detail.liked;
    const prevLikes = detail.likes;
    detail.liked = next;
    detail.likes = Math.max(0, detail.likes + (next ? 1 : -1));
    button.classList.toggle("active", next);
    button.textContent = `${next ? "已点赞" : "点赞"} ${compactNumber(detail.likes)}`;
    button.disabled = true;
    try {
      await api.toggleWorkLike(id, next);
    } catch (error) {
      detail.liked = !next;
      detail.likes = prevLikes;
      button.classList.toggle("active", !next);
      button.textContent = `${!next ? "已点赞" : "点赞"} ${compactNumber(prevLikes)}`;
      button.title = error.message;
    } finally {
      button.disabled = false;
    }
  });
  $("[data-work-collect]", root)?.addEventListener("click", async (event) => {
    if (!state.auth?.token) {
      navigateLocal("login");
      return;
    }
    const button = event.currentTarget;
    const next = !detail.collected;
    const prevCollects = detail.collects;
    detail.collected = next;
    detail.collects = Math.max(0, detail.collects + (next ? 1 : -1));
    button.classList.toggle("active", next);
    button.textContent = `${next ? "已收藏" : "收藏"} ${compactNumber(detail.collects)}`;
    button.disabled = true;
    try {
      await api.toggleWorkCollection(id, next);
    } catch (error) {
      detail.collected = !next;
      detail.collects = prevCollects;
      button.classList.toggle("active", !next);
      button.textContent = `${!next ? "已收藏" : "收藏"} ${compactNumber(prevCollects)}`;
      button.title = error.message;
    } finally {
      button.disabled = false;
    }
  });
  $("[data-work-comment-form]", root)?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.auth?.token) {
      navigateLocal("login");
      return;
    }
    const form = event.currentTarget;
    const textarea = $("textarea[name='content']", form);
    const button = $("button[type='submit']", form);
    const content = textarea?.value.trim();
    if (!content) return;
    button.disabled = true;
    button.textContent = "发送中...";
    try {
      await api.createWorkComment(id, content);
      textarea.value = "";
      await renderWorkReader();
    } catch (error) {
      button.title = error.message;
      button.textContent = "发送失败";
      setTimeout(() => {
        button.textContent = "发送评论";
      }, 1200);
    } finally {
      button.disabled = false;
      if (button.textContent !== "发送失败") button.textContent = "发送评论";
    }
  });
  const list = $("[data-work-comments]", root);
  const loadedComments = [...comments];
  const bindCommentLikes = () => {
    $$("[data-like-work-comment]", list).forEach((button) => {
      button.addEventListener("click", async (event) => {
        if (!state.auth?.token) {
          navigateLocal("login");
          return;
        }
        const current = loadedComments.find((comment) => String(comment.id) === String(button.dataset.likeWorkComment));
        if (!current) return;
        const target = event.currentTarget;
        const next = !current.liked;
        const prev = current.likes;
        current.liked = next;
        current.likes = Math.max(0, current.likes + (next ? 1 : -1));
        target.classList.toggle("liked", next);
        target.textContent = `${next ? "已赞" : "赞"} ${compactNumber(current.likes)}`;
        target.disabled = true;
        try {
          await api.toggleWorkCommentLike(id, current.id, next);
        } catch (error) {
          current.liked = !next;
          current.likes = prev;
          target.classList.toggle("liked", !next);
          target.textContent = `${!next ? "已赞" : "赞"} ${compactNumber(prev)}`;
          target.title = error.message;
        } finally {
          target.disabled = false;
        }
      });
    });
  };
  const bindCommentReplies = () => {
    $$("[data-open-work-reply]", list).forEach((button) => {
      button.addEventListener("click", () => {
        list.querySelector(`[data-work-comment-reply-form="${button.dataset.openWorkReply}"]`)?.classList.toggle("hidden");
      });
    });
    $$("[data-work-comment-reply-form]", list).forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!state.auth?.token) {
          navigateLocal("login");
          return;
        }
        const commentId = form.dataset.workCommentReplyForm;
        const input = $("[data-work-comment-reply-input]", form);
        const button = $("button", form);
        const content = input?.value.trim();
        if (!commentId || !content) return;
        button.disabled = true;
        button.textContent = "发送中";
        try {
          await api.createWorkCommentReply(id, commentId, content);
          state.pendingWorkCommentId = String(commentId);
          await renderWorkReader();
        } catch (error) {
          button.title = error.message;
        } finally {
          button.disabled = false;
          button.textContent = "发送";
        }
      });
    });
  };
  const renderLoadedComments = () => {
    const cards = loadedComments.length ? loadedComments.map((comment) => createWorkCommentCard(comment)) : [statusCard("暂时没有读取到评论")];
    list.replaceChildren(...cards);
    if (loadedComments.length && loadedComments.length < (totalComments || detail.comments || 0)) {
      const more = document.createElement("button");
      more.type = "button";
      more.className = "load-more-btn";
      more.textContent = "加载更多";
      more.addEventListener("click", async () => {
        more.disabled = true;
        more.textContent = "加载中...";
        try {
          const nextData = await api.workComments(id, loadedComments.length, 10);
          const nextComments = (nextData.items || nextData.data?.items || []).map(normalizeWorkComment);
          totalComments = nextData.total || nextData.data?.total || totalComments;
          loadedComments.push(...nextComments.filter((nextComment) => !loadedComments.some((item) => item.id === nextComment.id)));
          renderLoadedComments();
        } catch (error) {
          more.textContent = "加载失败";
          more.title = error.message;
          more.disabled = false;
        }
      });
      list.appendChild(more);
    }
    bindCommentLikes();
    bindCommentReplies();
    if (state.pendingWorkCommentId) {
      const card = list.querySelector(`.work-comment-card[data-comment-id="${state.pendingWorkCommentId}"]`);
      card?.scrollIntoView({ block: "center", behavior: "smooth" });
      card?.classList.add("focus-flash");
      setTimeout(() => card?.classList.remove("focus-flash"), 1800);
      state.pendingWorkCommentId = "";
    }
  };
  renderLoadedComments();
  root.append(createWorkSection("TA 的更多作品", authorWorks.slice(0, 4), "作者公开作品暂时没有读取到"));
  root.append(createWorkSection("推荐作品", relatedWorks.slice(0, 4), "暂时没有读取到推荐作品"));
}

async function renderUserReader() {
  const root = $("[data-user-reader]");
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || state.activeUserId || "";
  if (!id) {
    root.replaceChildren(statusCard("没有找到用户 ID"));
    return;
  }
  root.replaceChildren(statusCard("正在读取用户主页..."));
  let user = readCachedUser(id) || { id, nickname: "编程猫用户", avatar: "", description: "", stats: {} };
  let works = [];
  let fans = [];
  let followingUsers = [];
  try {
    const [profile, legacy, dynamic, metrics, tiger, centerWorks, oldCenterWorks, published, fanData, following, followingLegacy] = await Promise.all([
      api.userProfile(id).catch(() => null),
      api.userProfileLegacy(id).catch(() => null),
      api.userDynamicInfo(id).catch(() => null),
      api.userBusinessTotal(id).catch(() => null),
      api.userTiger(id).catch(() => null),
      api.userCenterWorks(id, 12).catch(() => ({ items: [] })),
      api.workList(id).catch(() => ({ items: [] })),
      api.publishedWorks(id, 12).catch(() => ({ data: { works: [] } })),
      api.userFans(id, 6).catch(() => ({ items: [] })),
      api.following(id, 6).catch(() => ({ items: [] })),
      api.followingLegacy(id, 6).catch(() => ({ items: [] }))
    ]);
    user = mergeUserProfile(user, profile, legacy, dynamic, metrics, tiger);
    const publishedItems = published.data?.works || published.works || [];
    const centerItems = centerWorks.items || centerWorks.data?.works || [];
    const oldCenterItems = oldCenterWorks.items || oldCenterWorks.data?.works || [];
    works = uniqueWorks([...centerItems, ...oldCenterItems, ...publishedItems]).map((item) => {
      const work = normalizeWork(item);
      work.author = {
        ...work.author,
        id: work.author.id || user.id,
        nickname: work.author.nickname || user.nickname,
        avatar: work.author.avatar || user.avatar
      };
      cacheWorkForReader(work);
      return work;
    });
    fans = responseItems(fanData).map(normalizeUserListItem).filter((item) => item.id).slice(0, 6);
    followingUsers = [...responseItems(following), ...responseItems(followingLegacy)]
      .map(normalizeUserListItem)
      .filter((item, index, list) => item.id && list.findIndex((userItem) => userItem.id === item.id) === index)
      .slice(0, 6);
    if (works[0]?.id) {
      const detail = normalizeWork(await api.workDetail(works[0].id));
      user = cacheUser({
        ...user,
        nickname: detail.author.nickname || works[0].author.nickname || user.nickname,
        avatar: detail.author.avatar || works[0].author.avatar || user.avatar,
        description: detail.author.signature || user.description || `${works.length} 个公开作品`
      });
    }
  } catch (error) {
    user = cacheUser(user);
    root.replaceChildren(statusCard(`用户资料读取不完整：${error.message}`));
  }
  root.innerHTML = `
    <section class="user-reader-hero ${user.cover ? "has-cover" : ""}">
      ${user.cover ? `<img class="user-reader-cover" src="${user.cover}" alt="" />` : ""}
      <div class="user-reader-profile">
        ${user.avatar ? `<img class="user-reader-avatar" src="${user.avatar}" alt="" />` : `<div class="avatar user-reader-avatar-fallback">${avatarText(user.nickname)}</div>`}
        <h2>${escapeHtml(user.nickname || "编程猫用户")}</h2>
        <p>${escapeHtml(user.description || "这个用户还没有留下签名")}</p>
        ${user.doing ? `<div class="user-doing">${escapeHtml(user.doing)}</div>` : ""}
        <div class="user-reader-links">
          <button type="button" class="follow-chip ${user.followed ? "active" : ""} ${state.auth?.token ? "" : "disabled"}" data-follow-reader>${state.auth?.token ? (user.followed ? "已关注" : "关注") : "登录后关注"}</button>
          <a class="secondary-link" href="https://shequ.codemao.cn/user/${id}" target="_blank" rel="noreferrer">打开原用户页</a>
        </div>
      </div>
    </section>
    <section class="user-stat-strip">
      <span><strong>${compactNumber(user.stats?.works || works.length)}</strong><em>作品</em></span>
      <span><strong>${compactNumber(user.stats?.followers)}</strong><em>粉丝</em></span>
      <span><strong>${compactNumber(user.stats?.following)}</strong><em>关注</em></span>
      <span><strong>${compactNumber(user.stats?.likes)}</strong><em>获赞</em></span>
    </section>
    <section class="work-comments-section">
      <div class="section-head flush"><h2>作品</h2><button type="button" class="text-btn">${works.length} 个</button></div>
      <div class="user-work-grid" data-user-works></div>
    </section>
    <section class="work-comments-section">
      <div class="section-head flush"><h2>粉丝</h2><button type="button" class="text-btn">${fans.length}</button></div>
      <div class="user-fan-list" data-user-fans></div>
    </section>
    <section class="work-comments-section">
      <div class="section-head flush"><h2>关注</h2><button type="button" class="text-btn">${followingUsers.length}</button></div>
      <div class="user-fan-list" data-user-following></div>
    </section>
  `;
  const list = $("[data-user-works]", root);
  list.replaceChildren(...(works.length ? works.map(createHomeWorkCard) : [statusCard("暂时没有读取到公开作品")]));
  const fanList = $("[data-user-fans]", root);
  fanList.replaceChildren(...(fans.length ? fans.map((fan) => createUserMiniCard(fan)) : [statusCard("暂时没有读取到粉丝列表")]));
  const followingList = $("[data-user-following]", root);
  followingList.replaceChildren(...(followingUsers.length ? followingUsers.map((item) => createUserMiniCard(item)) : [statusCard("暂时没有读取到关注列表")]));
  $("[data-follow-reader]", root)?.addEventListener("click", async (event) => {
    if (!state.auth?.token) {
      navigateLocal("login");
      return;
    }
    const button = event.currentTarget;
    const next = !user.followed;
    user.followed = next;
    button.classList.toggle("active", next);
    button.textContent = next ? "已关注" : "关注";
    button.disabled = true;
    try {
      await api.toggleFollowUser(id, next);
      cacheUser(user);
    } catch (error) {
      user.followed = !next;
      button.classList.toggle("active", !next);
      button.textContent = !next ? "已关注" : "关注";
      button.title = error.message;
    } finally {
      button.disabled = false;
    }
  });
}

function loginPrompt(text) {
  const node = document.createElement("button");
  node.type = "button";
  node.className = "loading-card login-prompt";
  node.textContent = text;
  node.addEventListener("click", () => navigateLocal("login"));
  return node;
}

function parseRecordContent(content) {
  if (!content) return {};
  if (typeof content === "object") {
    return content;
  }
  const text = String(content).trim();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { text };
  }
}

function parsePossibleJson(value) {
  let current = value;
  for (let i = 0; i < 3; i += 1) {
    if (typeof current !== "string") return current;
    const text = current.trim();
    if (!text) return "";
    if (!/^[{["]/.test(text)) return text;
    try {
      current = JSON.parse(text);
    } catch {
      return text;
    }
  }
  return current;
}

function messageTypeLabel(type = "") {
  const labels = {
    COMMENT_REPLY: "回复",
    POST_REPLY_AUTHOR: "帖子回复",
    POST_COMMENT: "评论",
    POST_REPLY: "回帖",
    WORK_COMMENT: "作品评论",
    WORK_REPLY: "作品回复",
    REPLY_COMMENT: "评论回复",
    LIKE_FORK: "点赞",
    SYSTEM: "系统",
    system: "系统",
    comment: "评论",
    reply: "回复"
  };
  return labels[type] || type.replaceAll("_", " ").toLowerCase();
}

function readableMessageText(value) {
  const data = parsePossibleJson(value);
  if (typeof data === "string") return apiText(data);
  if (!data || typeof data !== "object") return "";

  const message = parsePossibleJson(data.message);
  const candidates = [
    data.comment,
    data.reply,
    data.content,
    data.text,
    data.body,
    message && typeof message === "object" ? message.comment : "",
    message && typeof message === "object" ? message.reply : "",
    message && typeof message === "object" ? message.content : "",
    message && typeof message === "object" ? message.text : ""
  ];

  for (const candidate of candidates) {
    const parsed = parsePossibleJson(candidate);
    if (typeof parsed === "string" && parsed.trim()) return apiText(parsed);
    if (parsed && typeof parsed === "object") {
      const nested = readableMessageText(parsed);
      if (nested) return nested;
    }
  }

  if (message && typeof message === "object") return message.business_name || message.work_name || message.post_title || "";
  return data.business_name || data.work_name || data.post_title || data.title || "";
}

function messageSender(content, item) {
  const message = parsePossibleJson(content.message);
  return content.sender || (message && typeof message === "object" ? message.sender : null) || item.sender || {};
}

function messageTitle(content, item) {
  const message = parsePossibleJson(content.message);
  const nestedTitle =
    message && typeof message === "object"
      ? message.business_name || message.work_name || message.post_title || message.title
      : "";
  return content.business_name || content.work_name || content.post_title || content.title || nestedTitle || item.business_name || messageTypeLabel(item.type);
}

function readMessageId(candidates = []) {
  for (const candidate of candidates) {
    if (candidate === undefined || candidate === null || candidate === "") continue;
    const source = typeof candidate === "object" ? candidate.id || candidate.work_id || candidate.post_id : candidate;
    const match = String(source).match(/\d+/);
    if (match) return match[0];
  }
  return "";
}

function readMessageUrl(candidates = []) {
  for (const candidate of candidates) {
    if (!candidate) continue;
    if (typeof candidate === "string" && /^https?:\/\//.test(candidate)) return candidate;
  }
  return "";
}

function messageTarget(content, item) {
  const message = parsePossibleJson(content.message);
  const type = String(item.type || "");
  const url = readMessageUrl([item.target_url, item.source_url, content.target_url, content.source_url, message?.target_url, message?.source_url]);
  const postId =
    readMessageId([item.post_id, item.target_id, item.resource_id, content.post_id, content.target_id, content.business_id, content.resource_id, message?.post_id, message?.business_id, message?.target_id]) ||
    readMessageId([url.match(/post\/(\d+)/)?.[1], url.match(/community\/(\d+)/)?.[1]]);
  const workId =
    readMessageId([item.work_id, item.target_id, item.resource_id, content.work_id, content.business_id, content.source_id, content.resource_id, message?.work_id, message?.business_id, message?.source_id, message?.target_id]) ||
    readMessageId([url.match(/work\/(\d+)/)?.[1]]);
  const replyId = readMessageId([item.reply_id, item.comment_id, content.reply_id, content.comment_id, content.source_id, message?.reply_id, message?.comment_id, message?.source_id]);

  if (type.includes("WORK") && workId) return { view: "work", id: workId, anchorId: replyId };
  if ((type.includes("POST") || type.includes("REPLY") || type.includes("COMMENT")) && postId) return { view: "detail", id: postId, anchorId: replyId };
  if (workId) return { view: "work", id: workId, anchorId: replyId };
  if (postId) return { view: "detail", id: postId, anchorId: replyId };
  return null;
}

function createMessageCard(item) {
  let content = parseRecordContent(item.content);
  if (content.text) {
    const parsedText = parsePossibleJson(content.text);
    if (parsedText && typeof parsedText === "object") content = parsedText;
  }
  const sender = messageSender(content, item);
  const title = messageTitle(content, item);
  const body = readableMessageText(content) || apiText(item.summary || "");
  const avatar = sender.avatar_url || sender.avatar || "";
  const nickname = sender.nickname || sender.name || "社区消息";
  const senderId = sender.id || sender.user_id || item.user_id || "";
  const date = formatDate(item.created_at || item.create_time || content.created_at);
  const target = messageTarget(content, item);
  const card = document.createElement("article");
  card.className = "message-card";
  card.innerHTML = `
    ${avatar ? `<img class="mini-avatar-img" src="${avatar}" alt="" />` : `<div class="mini-avatar">${avatarText(nickname)}</div>`}
    <div class="message-main">
      <div class="message-head">${senderId ? `<button type="button" class="user-inline-btn" data-message-user="${senderId}"><strong>${nickname}</strong></button>` : `<strong>${nickname}</strong>`}<span>${messageTypeLabel(item.type)}</span></div>
      <p>${apiText(body || "暂无消息内容")}</p>
      <div class="message-meta">${title}${date ? ` · ${date}` : ""}${target ? " · 点击查看原文" : ""}</div>
    </div>
  `;
  $("[data-message-user]", card)?.addEventListener("click", (event) => {
    event.stopPropagation();
    openUserReader({ id: senderId, nickname, avatar });
  });
  if (target) {
    card.classList.add("clickable");
    card.addEventListener("click", () => {
      if (target.view === "detail") {
        state.pendingPostReplyId = target.anchorId || "";
        openPost(target.id);
        return;
      }
      if (target.view === "work") {
        state.pendingWorkCommentId = target.anchorId || "";
        openWorkReader({ id: target.id });
      }
    });
  }
  cleanRenderedMessageCard(card, item);
  return card;
}

function cleanRenderedMessageCard(card, item) {
  const paragraph = $("p", card);
  const raw = paragraph?.textContent?.trim() || "";
  if (!raw.includes("sender") || !raw.includes("message")) return;

  let parsed = parsePossibleJson(raw);
  if (typeof parsed === "string") parsed = parsePossibleJson(parsed);
  if (!parsed || typeof parsed !== "object") return;

  const message = parsePossibleJson(parsed.message);
  const sender = parsed.sender || {};
  const body =
    (message && typeof message === "object" && (message.comment || message.reply || message.content || message.text)) ||
    parsed.comment ||
    parsed.reply ||
    "";
  const title =
    (message && typeof message === "object" && (message.business_name || message.work_name || message.post_title || message.title)) ||
    parsed.business_name ||
    messageTypeLabel(item.type);

  const headName = $(".message-head strong", card);
  const meta = $(".message-meta", card);
  const avatar = card.firstElementChild;
  if (headName && sender.nickname) headName.textContent = sender.nickname;
  if (paragraph) paragraph.textContent = apiText(body || title || "暂无消息内容");
  if (meta) meta.textContent = `${title}${formatDate(item.created_at || item.create_time) ? ` · ${formatDate(item.created_at || item.create_time)}` : ""}`;
  if (sender.avatar_url && avatar?.tagName === "DIV") {
    const img = document.createElement("img");
    img.className = "mini-avatar-img";
    img.src = sender.avatar_url;
    img.alt = "";
    avatar.replaceWith(img);
  }
}

async function renderMessagesReadable() {
  const root = $("#message-view");
  if (!state.auth?.token) {
    root.innerHTML = `<div class="empty-state"><div class="bubble-mark">...</div><h2>消息</h2><p>登录后读取回复、点赞、收藏和系统通知。</p></div>`;
    root.appendChild(loginPrompt("去登录"));
    return;
  }
  root.innerHTML = `<div class="feed compact message-feed" data-message-feed><div class="loading-card">正在读取消息...</div></div>`;
  const feed = $("[data-message-feed]");
  try {
    const counts = await api.messageCount();
    const defaultTypes = ["COMMENT_REPLY", "POST_REPLY", "POST_COMMENT", "WORK_COMMENT", "WORK_REPLY", "REPLY_COMMENT", "LIKE_FORK", "SYSTEM"];
    const queryTypes = [
      ...new Set(
        [...(Array.isArray(counts) ? counts.map((item) => item.query_type).filter(Boolean) : []), ...defaultTypes].filter(Boolean)
      )
    ];
    const responses = await Promise.all(queryTypes.map((queryType) => api.messageRecord(queryType).catch(() => ({ items: [] }))));
    const seen = new Set();
    const records = responses
      .flatMap((response, index) => (response.items || []).map((item) => ({ ...item, type: item.type || queryTypes[index] })))
      .filter((item) => {
        const key = `${item.id || item.created_at || item.create_time}-${item.type}-${item.business_id || item.work_id || item.post_id || ""}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => Number(b.created_at || b.create_time || 0) - Number(a.created_at || a.create_time || 0));
    feed.replaceChildren(
      statusCard(counts.map((item) => `${messageTypeLabel(item.query_type)} ${item.count}`).join(" · ")),
      ...(records.length ? records.map(createMessageCard) : [statusCard("暂时没有新消息")])
    );
  } catch (error) {
    feed.replaceChildren(statusCard(`消息接口失败：${error.message}`));
  }
}

async function submitLogin(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const status = $("[data-login-status]");
  status.textContent = "正在登录...";
  try {
    const identity = String(form.get("identity") || "");
    const password = String(form.get("password") || "");
    let loginResult;
    let method = "password_v1";

    try {
      loginResult = await api.loginV1(identity, password);
    } catch {
      status.textContent = "v1 登录未通过，正在尝试安全登录...";
      const time = await api.currentTime();
      const ticketResult = await api.captchaRule(identity, time.data);
      loginResult = await api.loginV2(identity, password, ticketResult.ticket);
      method = "password_v2";
    }

    const result = loginResult.data;
    const cookie = loginResult.response.headers.get("x-codemao-cookie") || "";
    state.user = result.user_info;
    state.auth = { ...result.auth, cookie, method };
    localStorage.setItem("pickcat:user", JSON.stringify(state.user));
    localStorage.setItem("pickcat:auth", JSON.stringify(state.auth));
    status.textContent = `登录成功（${method}），正在进入我的页面。`;
    navigateLocal("mine");
  } catch (error) {
    status.textContent = `登录失败：${error.message}`;
  }
}

async function publishPost() {
  if (!state.auth?.token) {
    navigateLocal("login");
    return;
  }
  const boardId = $("[data-compose-board]").value || "17";
  const title = $("[data-compose-title]").value.trim();
  const body = $("[data-compose-body]").value.trim();
  if (!title || !body) return;
  try {
    const safeBody = body.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    const result = await api.publishPost(boardId, title, `<p>${safeBody}</p>`);
    await openPost(result.id);
  } catch (error) {
    alert(`发布失败：${error.message}`);
  }
}

function bindEvents() {
  $$("[data-nav]").forEach((button) => button.addEventListener("click", () => navigateLocal(button.dataset.nav)));
  $("[data-create-open]")?.addEventListener("click", openCreateSheet);
  $$("[data-create-close]").forEach((button) => button.addEventListener("click", closeCreateSheet));
  $$("[data-create-publish]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      choosePublishType(link.dataset.createPublish);
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCreateSheet();
  });
  $$("[data-feed-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.feedTab = tab.dataset.feedTab;
      $$("[data-feed-tab]").forEach((item) => item.classList.toggle("active", item === tab));
      renderFeed();
    });
  });
  const mineTabKeys = ["activity", "works", "circles"];
  $$("#mine-view .profile-tabs .tab").forEach((tab, index) => {
    tab.addEventListener("click", () => {
      state.mineTab = mineTabKeys[index];
      updateProfileTabs();
      if (state.auth?.token) {
        renderMineContent(state.user, { items: state.mineWorks });
      } else {
        renderMineLoggedOut();
      }
    });
  });
  $("[data-search]").addEventListener("click", () => navigateLocal("search"));
  $("[data-cancel-search]").addEventListener("click", () => navigateLocal("home"));
  $("[data-back]").addEventListener("click", () => {
    nativeBack();
  });
  $("[data-clear-search]").addEventListener("click", () => {
    state.history = [];
    renderHistory();
    $("[data-search-results]").replaceChildren();
  });
  $("[data-search-input]").addEventListener("keydown", (event) => {
    if (event.key === "Enter") runSearch(event.currentTarget.value);
  });
  $("[data-login-form]").addEventListener("submit", submitLogin);
  $("[data-post]").addEventListener("click", publishPost);
  window.addEventListener("popstate", () => {
    if (!routeFromLocation()) setView("home");
  });
  const sentinel = $("[data-feed-sentinel]");
  if (sentinel) {
    new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || state.currentView !== "home") return;
        if (state.feedTab === "recommend") loadMoreFeed();
        if (state.feedTab === "discover") loadDiscoverWorks();
        if (state.feedTab === "following") loadFollowingFeed();
      },
      { rootMargin: "300px" }
    ).observe(sentinel);
  }
}

async function init() {
  bindEvents();
  renderHistory();
  renderMineShell(state.user);
  const splash = $("[data-splash]");
  if (sessionStorage.getItem("pickcat:splash-seen")) {
    splash.classList.add("done");
  } else {
    sessionStorage.setItem("pickcat:splash-seen", "1");
    setTimeout(() => splash.classList.add("done"), 500);
  }
  await loadCircleData();
  await loadHomeData();
  routeFromLocation({ replace: true });
}

init();
