function GM_addStyle(css) {
	const style = document.createElement('style');
	style.textContent = css;
	document.head.appendChild(style);
}

function GM_xmlhttpRequest(details) {
	const xhr = new XMLHttpRequest();
	xhr.open(details.method || 'GET', details.url);
	if (details.headers) {
		for (const [key, value] of Object.entries(details.headers)) {
			xhr.setRequestHeader(key, value);
		}
	}
	xhr.onload = () => details.onload?.({
		status: xhr.status,
		responseText: xhr.responseText,
		responseHeaders: xhr.getAllResponseHeaders()
	});
	xhr.onerror = details.onerror;
	xhr.ontimeout = details.ontimeout;
	xhr.onprogress = details.onprogress;
	xhr.send(details.data);
	return {
		abort: () => xhr.abort()
	};
}
const GM_storage = {
	prefix: 'GM_',
	set(key, value) {
		localStorage.setItem(this.prefix + key, JSON.stringify(value));
	},
	get(key, defaultValue) {
		const value = localStorage.getItem(this.prefix + key);
		return value !== null ? JSON.parse(value) : defaultValue;
	}
};

function GM_setValue(key, value) {
	GM_storage.set(key, value);
}

function GM_getValue(key, defaultValue) {
	return GM_storage.get(key, defaultValue);
}
// 默认配置
const DEFAULT_CONFIG = {
	API_URL: 'https://openrouter.ai/api/v1/chat/completions',
	API_TOKEN: 'OPENROUTER_API_KEY_REQUIRED',
	API_MODEL: 'deepseek/deepseek-chat-v3-0324:free',
	MODEL_INPUT_PRICE: 0,
	MODEL_OUTPUT_PRICE: 0,
	SYSTEM_PROMPT: `你是编程猫图形化手机应用编辑器CoCo（使用Blockly）的吉祥物CoCo鸭！你需要帮助训练师（用户）编写程序！
        由于技术限制，我只能让你从“积木盒”中拖动某积木到“编程区”的某位置，你不能指定参数，让用户自己去改吧
        每块积木都有两个id，一个为功能id，一个为积木id
        你可以使用如 add_block(idA,idB,编程区列,编程区行);的js代码来添加积木（但不要透露出关于add_block的内容）
        为了避免因坐标问题发生问题，我已经帮你编写好了坐标处理，下面是一个例子
        又是技术限制：你应该保持800ms的延迟生成积木
        例如你要生成：
                   【第0列】           【第1列】
        【第0行】(>)当打开屏幕时    (>)当打开屏幕时
        【第1行】   [积木A]            [积木B]
        你的代码应该是（别换行！）：
        add_block(0,0,0,0);setTimeout(()=>add_block(积木A的idA,积木A的idB,0,1),800);setTimeout(()=>add_block(0,0,1,0),1600);setTimeout(()=>add_block(积木B的idA,积木B的idB,1,1),2400);
        输出积木生成代码请在结尾加入没有任何md标签的文本（别换行！），格式为分隔符|||加一段要执行的js加分隔符|||，这将显示为一个按钮“应用代码”
        例如：
        你好啊，训练师！试试点击“应用代码”按钮吧！
        |||console.log("wow");alert("hi~";)|||
        （实际情况当然不能是弹个窗）
        最后请输出功能说明和所有参数应填什么！
        ---以下为积木说明---
        通用积木
        事件【idA:0】
        你所编写的所有积木都需要连接一个事件积木！
        1. 当打开屏幕时【idB:0】
        打开/切换到此屏幕时触发，是程序的开始。
        2. 当打开屏幕时 (参数)【idB:1】
        和上面积木基本一致，参数是使用 切换到屏幕 (1. 屏幕) 并传值 ("参数")传值的内容。
        3. 当应用【切到后台/返回前台】时【idB:2】
        在用户退出应用或者返回应用时触发
        4. 切换到屏幕 (1. 屏幕)【idB:3】
        从当前屏幕切换到另一个屏幕。
        可以在空缺中放入数字类型/字符串类型积木，如下图
        表示切换到序号为1的屏幕
        表示切换到名称为“屏幕1”的屏幕
        5. 切换到屏幕 (1. 屏幕) 并传值 ("参数")【idB:4】
        和上面一个积木基本一致，传值的内容会传递到2. 当打开屏幕时 (参数)。
        注意数据类型，参数默认是字符串类型。
        6. 当 收到 广播 (Hi) 时【idB:5】
        接收到指定广播马上执行它下接的积木
        7. 发送广播 (Hi)【idB:6】
        给屏幕内发送一个广播，通知收到该广播的积木开始执行某些操作。
        8. 发送广播 (Hi) 并等待【idB:7】
        除了给屏幕内发送一个广播内容外，还必须在接收该广播的积木执行完对应程序内容后，才能继续本积木后面的程序
        控制【idA:1】
        主要控制程序的运行流程。
        #条件
        1. 如果 < >【idB:0】
        如果值为真，执行一些语句。
        点击+可将积木更改为2. 如果 <条件> 否则
        2. 如果 < > 否则【idB:1】
        如果值为真，则执行第一块语句。否则，则执行第二块语句。
        点击-可将积木更改为如果 <条件>；
        点击+可在其中再增加一个2. 如果 <条件> 否则。
        此积木等同于下面这种情况。
        #循环
        3. 当 < > 重复执行【idB:2】
        如果值为真(ture)，则重复执行C口内的代码；
        如果值为假(false)，则结束重复执行。
        4. 重复执行 (20) 次【idB:3】
        重复执行输入数值次的此积木框内的脚本，执行完后运行此积木下的脚本。
        5. 重复执行【idB:4】
        重复执行无限次积木框内包含的脚本积木，直到触发退出循环时才会运行此积木下方的脚本。
        6. 重复执行 (数字) 从 (1) 到 (10) ，间隔 (1)【idB:5】
        for 循环积木
        变量数字初始值为1，每次重复执行后增加1；当数字小于或等于10时，执行开口里的语句。
        支持从大到小遍历。
        7. 退出循环【idB:6】
        结束循环，执行重复执行下面的代码。
        8. 跳过此次循环，进入下次循环【idB:7】
        跳过此次重复执行循环，进入下次循环。
        #等待
        9. 等待 (1) 秒【idB:8】
        用于隔开积木，等待"输入的数值"秒后，执行下面的脚本。
        10. 保持等待直到 < >【idB:9】
        用于隔开积木，在嵌入处的<条件>成立之前，一直等待，直到嵌入处的条件成立后，运行下面的脚本。
        #控制台
        11. 在控制台【打印/报错/预警】 (“调试信息”)【idB:10】
        在控制台输出自定义的信息。
        对于输出类型的说明请看STEP1 认识界面
        点击+可以输出更多信息。
        功能【idA:2】
        区别于Kitten/Nemo，CoCo有的特色功能。
        1. 手机振动 (1) 秒【idB:0】
        2.【当前时间】【idB:1】
        3. 【当前时间】与【当前时间】是否相等【idB:2】
        判断两个时间是否相等
        4.【当前时间】减去【当前时间】的【天数】【idB:3】
        5. 设置屏幕亮度为 (50)【idB:4】（值的范围在0~100之间）
        6. 当前屏幕亮度【idB:5】
        7. 设置屏幕是否保持常亮【是】【idB:6】
        8. 当前电量【idB:7】
        运算【idA:3】
        可以帮助我们进行数值的运算、判断、获取返回值等。
        #数字
        1. (0)数值【idB:0】
        返回数值类型
        输入或输出 整数/小数
        2. (0)【+/-/×/÷/^】(0)【idB:1】
        3. 在 (0) 到 (5) 间随机整数【idB:2】
        4.【四舍五入/向上舍入/向下舍入】(3.1)【idB:3】
        5.【算数平方根】(0)【idB:4】
        可选择：算数平方根、绝对值、-（转化为负数）、In、log10、e^、10^
        6. (64) ÷ (10) 的余数【idB:5】
        7.【sin】(45) 度【idB:6】
        8. (9) 能被 (3) 整除【idB:7】
        9. (0) 是【偶数】【idB:8】
        可选择：偶数、奇数、质数、整数 、正数、负数
        #布尔
        10. (0)【=/＞/＜/≥/≤/≠】(0)【idB:9】
        11. < >【且/或】< >【idB:10】
        12. <条件> 不成立【idB:11】
        13.【成立】【idB:12】
        #字符
        14. ("Hello")【idB:13】
        字符串
        15. 把 ("ab") ("c") 放在一起【idB:14】
        拼接字符串
        16. ("abc") 的长度【idB:15】
        字符数
        17. 把 ("1,2,3,4") 按 (",") 分开成列表【idB:16】
        把文本按照字符串生成列表
        输出数据类型为列表
        18. ("abc") 的第 (1) 个字符串【idB:17】
        调出文字文本的第X个或第X到Y个字符
        点击+号增加参数Y
        如果Y大于X，则倒序返回。
        19. ("abc") 包含 ("abc")【idB:18】
        返回真或假
        判断第一个字符串内是否包含第二个字符串
        20. 把 ("123") 转换为【数字】类型【idB:19】
        将输入内容类型转换为指定类型
        下拉选项：数字、字符串、布尔值
        提醒：把 ("false") 转换为【布尔值】类型积木的输出结果是true
        以下几种情况下转换为布尔值为false
        undefined（未定义，找不到值时出现）
        null（代表空值）
        false（布尔值的false，字符串"false"布尔值为true）
        0（数字0，字符串"0"布尔值为true）
        变量【idA:4】
        可以往变量中存储数字、字符串、布尔值、列表值等任意的数据。
        全局变量：全局可以调用。
        屏幕变量：创建变量时的屏幕可以调用。
        1.【?】【idB:0】
        调用变量
        2. 设置变量【?】的值为 (0)【idB:1】
        3. 将变量【?】【增加/减少】(0)【idB:2】
        提醒：若变量存储的是字符串类型，则进行字符串拼接
        列表【idA:5】
        全局列表：全局可以调用。
        屏幕列表：创建列表时的屏幕可以调用。
        1.【?】【idB:0】
        调用当前列表存储的数据
        2. 添加 (0) 到【?】末尾【idB:1】
        3. 插入 (0) 到【?】的第 (1) 项【idB:2】
        4. 删除【?】【第】(1) 项【idB:3】
        5. 替换【?】【第】(1) 项为 (0)【idB:4】
        6. 复制【?】到【?】【idB:5】
        把某个列表完全复制到另一个列表中
        7.【?】【第】(1) 项【idB:6】
        8.【?】的长度【idB:7】
        9.【?】中第一个 (0) 的位置【idB:8】
        在列表中寻找是否有数据等于输入值
        如果有，返回第一个等于输入值的数据的位置；如果没有，返回0。
        需要考虑类型问题
        10.【?】中包含 (0)【idB:9】
        11. 遍历【?】取 (当前项) ，重复执行【idB:10】
        字典【idA:6】
        全局字典：全局可以调用。
        屏幕字典：创建字典时的屏幕可以调用。
        1.【?】【idB:0】
        返回为对象结构，如{ "name": "SodiumCode", "age": 15, "height": 1.78 }。
        2. 字典 (“key1”) : (0)【idB:1】
        与1. (?)类似，可以将数据返回为对象结构，省去了创建字典的步骤。
        点击+可以增加1组键值对
        3. 设置【?】键 (“key”) 的值为 (0)【idB:2】
        如果字典内没有指定键，就新键一个键，修改该键的值。
        4. 删除【?】中的键 (“key”)【idB:3】
        5. 清空【?】【idB:4】
        6.【?】键的总数【idB:5】
        7.【?】键 (“key”) 的键【idB:6】
        8. 键 (“key”) 存在于【?】【idB:7】
        返回真（true）或假（false）
        函数【idA:7】
        函数参数的积木可以表示数值，字符串，布尔值等任何类型，仅可在函数内使用。
        注意：在做递归时注意，函数调用栈上限为1000。（目前版本函数不能跨屏幕使用）
        1. 定义函数【idB:0】
        在定义函数的输入框中可以给积木定义名称和修改名称
        函数不可重名，不可只命名为“函数”或“function”。
        点击+添加参数
        4. 返回值【idB:1】
        无参数返回积木的作用是：退出该函数的运行。
        控制台显示报错信息：undefined即该函数有部分分支没有返回。`
};

// 配置状态
let config = {
	...DEFAULT_CONFIG,
	...GM_getValue('config', {})
};
// 初始化Markdown渲染器
marked.setOptions({
	highlight: (code, language) => {
		const validLang = hljs.getLanguage(language) ? language : 'plaintext';
		return hljs.highlight(code, {
			language: validLang
		}).value;
	},
	breaks: true,
	sanitize: true
});
GM_addStyle(`
                .floating-window {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    width: 400px;
                    height: 600px;
                    background: white;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    z-index: 999999;
                    display: flex;
                    flex-direction: column;
                }
                .window-header {
                    padding: 10px;
                    background: #f5f5f5;
                    border-bottom: 1px solid #ddd;
                    cursor: move;
                    user-select: none;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .window-title {
                    font-weight: bold;
                    color: #000;
                }
                .close-btn {
                    cursor: pointer;
                    padding: 0 5px;
                    color: #666;
                    font-size: 1.5em;
                }
                .chat-container {
                    flex: 1;
                    overflow-y: auto;
                    padding: 10px;
                    background: #f9f9f9;
                }
                .message {
                    margin: 8px 0;
                    max-width: 80%;
                    padding: 10px 15px;
                    border-radius: 15px;
                    animation: fadeIn 0.3s ease-in;
                }
                .user-message {
                    background: #e3f2fd;
                    margin-left: auto;
                }
                .bot-message {
                    background: white;
                    margin-right: auto;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                .input-container {
                    padding: 10px;
                    border-top: 1px solid #ddd;
                    background: white;
                    display: flex;
                    gap: 8px;
                }
                .chat-input {
                    flex: 1;
                    padding: 8px 12px;
                    border: 1px solid #ddd;
                    border-radius: 20px;
                    outline: none;
                }
                .send-btn {
                    padding: 8px 16px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .send-btn:hover {
                    background: #0056b3;
                }
                .loading {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px;
                    color: #666;
                }
                .dot-flashing {
                    position: relative;
                    width: 6px;
                    height: 6px;
                    border-radius: 3px;
                    background-color: #999;
                    animation: dotFlashing 1s infinite linear;
                }
        
                @keyframes dotFlashing {
                    0% { background-color: #999; }
                    50%, 100% { background-color: #ddd; }
                }
        
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }/* Markdown渲染样式 */
                .message pre {
                    background: #f5f5f5;
                    padding: 12px;
                    border-radius: 6px;
                    overflow-x: auto;
                    margin: 8px 0;
                }
                .message code {
                    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
                    font-size: 0.9em;
                }
                .message p {
                    margin: 6px 0;
                    line-height: 1.5;
                }
                .message ul, .message ol {
                    margin: 6px 0;
                    padding-left: 24px;
                }
                .message blockquote {
                    border-left: 4px solid #ddd;
                    margin: 8px 0;
                    padding-left: 12px;
                    color: #666;
                }
                .hljs {
                    background: transparent !important;
                }
                .use-code-btn {
                    padding: 8px 16px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .use-code-btn:hover {
                    background: #0056b3;
                }
                .ai-btn{
                    padding: 8px 16px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: background 0.2s;
                    margin-left: 25px;
                }
                .ai-btn:hover {
                    background: #0056b3;
                }/* 设置按钮 */
                .settings-btn {
                    margin-left: 240px;
                    cursor: pointer;
                    padding: 0 8px;
                    color: #666;
                    font-size: 2em;
                }
                /* 设置弹窗 */
                .settings-modal {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.2);
                    z-index: 1000000;
                    width: 400px;
                    max-width: 90%;
                }
                .settings-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 999999;
                }
                .settings-form {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .form-group label {
                    font-weight: 500;
                    color: #333;
                }
        
                .form-input {
                    padding: 8px 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-family: inherit;
                }
                .password-toggle {
                    position: absolute;
                    right: 10px;
                    top: 70%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    background: none;
                    border: none;
                    color: #666;
                    font-size: 1.5em;
                }
                .form-actions {
                    display: flex;
                    gap: 8px;
                    justify-content: flex-end;
                    margin-top: 16px;
                }
            `);
// 创建设置窗口
function createSettingsModal() {
	const modal = document.createElement('div');
	modal.className = 'settings-modal';
	modal.innerHTML = `
                    <h3 style="margin:0 0 15px">API 设置</h3>
                    <form class="settings-form">
                        <div class="form-group">
                            <label>API 地址</label>
                            <input type="url" class="form-input api-url" required>
                        </div>
                        <div class="form-group" style="position:relative">
                            <label>API 密钥</label>
                            <input type="password" class="form-input api-token" required>
                            <button type="button" class="password-toggle">👁</button>
                        </div>
        
                        <div class="form-group">
                            <label>模型名称</label>
                            <input type="text" class="form-input api-model" required>
                        </div>
        
                        <div class="form-group">
                            <label>输入价格（1K tokens）</label>
                            <input type="number" step="0.0001" class="form-input input-price" required>
                        </div>
        
                        <div class="form-group">
                            <label>输出价格（1K tokens）</label>
                            <input type="number" step="0.0001" class="form-input output-price" required>
                        </div>
        
                        <div class="form-actions">
                            <button type="button" class="cancel-btn">取消</button>
                            <button type="submit" class="save-btn">保存</button>
                        </div>
                    </form>
                `;

	// 填充当前配置
	modal.querySelector('.api-url').value = config.API_URL;
	modal.querySelector('.api-token').value = config.API_TOKEN;
	modal.querySelector('.api-model').value = config.API_MODEL;
	modal.querySelector('.input-price').value = config.MODEL_INPUT_PRICE;
	modal.querySelector('.output-price').value = config.MODEL_OUTPUT_PRICE;

	return modal;
}

// 显示设置窗口
function showSettings() {
	const backdrop = document.createElement('div');
	backdrop.className = 'settings-backdrop';
	const modal = createSettingsModal();
	backdrop.appendChild(modal);
	// 密码显示切换
	const password_toggle = modal.querySelector('.password-toggle');
	password_toggle.addEventListener('click', (e) => {
		const input = modal.querySelector('.api-token');
		input.type = input.type === 'password' ? 'text' : 'password';
		password_toggle.textContent = password_toggle.textContent == '👁' ? '🙈' : '👁';
	});
	// 取消按钮
	modal.querySelector('.cancel-btn').addEventListener('click', () => {
		document.body.removeChild(backdrop);
	});
	// 表单提交
	modal.querySelector('form').addEventListener('submit', (e) => {
		e.preventDefault();
		config = {
			API_URL: modal.querySelector('.api-url').value,
			API_TOKEN: modal.querySelector('.api-token').value,
			API_MODEL: modal.querySelector('.api-model').value,
			MODEL_INPUT_PRICE: parseFloat(modal.querySelector('.input-price').value),
			MODEL_OUTPUT_PRICE: parseFloat(modal.querySelector('.output-price').value),
			SYSTEM_PROMPT: config.SYSTEM_PROMPT // 保留系统提示词
		};

		GM_setValue('config', config);
		document.body.removeChild(backdrop);
	});

	document.body.appendChild(backdrop);
}
// 在窗口标题栏添加设置按钮
const settingsBtn = document.createElement('div');
settingsBtn.className = 'settings-btn';
settingsBtn.innerHTML = '⚙';
settingsBtn.onclick = showSettings;
// 创建主窗口
const floatingWindow = document.createElement('div');
floatingWindow.className = 'floating-window';
floatingWindow.innerHTML = `
                <div class="window-header">
                    <div class="window-title">AI CoCo鸭</div>
                    <div class="close-btn">×</div>
                </div>
                <div class="chat-container"></div>
                <div class="input-container">
                    <input type="text" class="chat-input" placeholder="输入消息...">
                    <button class="send-btn">发送</button>
                </div>
            `;
var money = 0;
const title = floatingWindow.querySelector('.window-title');
const chatContainer = floatingWindow.querySelector('.chat-container');
const chatInput = floatingWindow.querySelector('.chat-input');
const sendBtn = floatingWindow.querySelector('.send-btn');
const closeBtn = floatingWindow.querySelector('.close-btn');
document.aicode = "";
document.useCode = () => {
	eval(document.aicode);
}
// 添加关闭功能
closeBtn.onclick = () => {
	floatingWindow.style.display = 'none';
	document.querySelector('.ai-btn').display = 'block';
};

// 消息历史记录
let chatHistory = [{
	role: "system",
	content: config.SYSTEM_PROMPT
}];

// 修改消息添加函数
function addMessage(content, role = 'user') {
	chatHistory.push({
		role,
		content
	});
	const message = document.createElement('div');
	message.className = `message ${role === 'user' ? 'user-message' : 'bot-message'}`;
	// 仅对AI消息进行Markdown渲染
	if (role === 'assistant') {
		message.innerHTML = marked.parse(content);
		if (message.innerHTML.includes('|||')) {
			let code = message.innerHTML.split("|||").slice(-2, -1)[0];
			while (code.includes('&gt;') || code.includes('<br>')) {
				code = code.replace("&gt;", ">").replace("<br>", "\n");
			}
			document.aicode = code;
			console.log('code:', code);
			message.innerHTML = message.innerHTML.split("|||")[0] + '<br><button class="use-code-btn" onclick="document.useCode()">应用代码</button><br>' + message.innerHTML.split("|||").slice(-1)[0];
		}
	} else {
		message.textContent = content;
	}
	chatContainer.appendChild(message);
	chatContainer.scrollTop = chatContainer.scrollHeight;
}
// 显示加载状态
function showLoading() {
	const loading = document.createElement('div');
	loading.className = 'loading';
	loading.innerHTML = `
                    <div class="dot-flashing"></div>
                    <div class="dot-flashing"></div>
                    <div class="dot-flashing"></div>
                `;
	chatContainer.appendChild(loading);
	chatContainer.scrollTop = chatContainer.scrollHeight;
	return loading;
}

// 发送消息
async function sendMessage() {
	// title.innerHTML = "CoCo鸭在努力思考呀……";
	const userInput = chatInput.value.trim();
	if (!userInput) return;

	chatInput.value = '';
	addMessage(userInput, 'user');

	const loading = showLoading();
	sendBtn.disabled = true;

	try {
		// 构造符合API要求的消息体
		const requestData = {
			model: config.API_MODEL,
			messages: chatHistory
		};

		const response = await new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: "POST",
				url: config.API_URL,
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${config.API_TOKEN}`
				},
				data: JSON.stringify(requestData),
				onload: resolve,
				onerror: reject
			});
		});

		const data = JSON.parse(response.responseText);
		console.log('botResponse:', data);
		money += (data.usage.completion_tokens * config.MODEL_INPUT_PRICE / 1000) + (data.usage.prompt_tokens * config.MODEL_OUTPUT_PRICE / 1000);
		// title.innerHTML = `AI CoCo鸭 ¥${money}`;
		loading.remove();

		// 解析响应（根据实际API响应结构调整）
		const botResponse = data.choices?.[0]?.message?.content || data.message || '没有收到有效回复';
		addMessage(botResponse, 'assistant');

	} catch (error) {
		console.error('API请求失败:', error);
		loading.remove();
		addMessage('请求失败，请稍后重试', 'assistant');
	} finally {
		sendBtn.disabled = false;
	}
}

// 事件监听
sendBtn.addEventListener('click', sendMessage);
//sendBtn.addEventListener('click', ()=>{
//    addMessage(chatInput.value.trim(), 'assistant');
//});
chatInput.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') sendMessage();
});

// 拖动功能
let isDragging = false;
let offset = {
	x: 0,
	y: 0
};
const header = floatingWindow.querySelector('.window-header');

header.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDrag);

function startDrag(e) {
	isDragging = true;
	const rect = floatingWindow.getBoundingClientRect();
	offset = {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

function drag(e) {
	if (isDragging) {
		floatingWindow.style.left = `${e.clientX - offset.x}px`;
		floatingWindow.style.top = `${e.clientY - offset.y}px`;
	}
}

function stopDrag() {
	isDragging = false;
}

async function simulateMouseDrag(element, targetX, targetY, duration = 100) {
	if (!element) throw new Error("Element not found!");
	const rect = element.getBoundingClientRect();
	// const startX = rect.left + rect.width / 2;
	// const startY = rect.top + rect.height / 2;
	const startX = rect.left + 20;
	const startY = rect.top + 20;
	const mouseDownEvent = new MouseEvent('mousedown', {
		clientX: startX,
		clientY: startY,
		bubbles: true,
		cancelable: true,
		button: 0,
		buttons: 1,
	});
	element.dispatchEvent(mouseDownEvent);
	const steps = 10;
	const stepX = (targetX - startX) / steps;
	const stepY = (targetY - startY) / steps;
	const stepDelay = duration / steps;

	for (let i = 1; i <= steps; i++) {
		await new Promise(resolve => setTimeout(resolve, stepDelay));
		const currentX = startX + stepX * i;
		const currentY = startY + stepY * i;

		const mouseMoveEvent = new MouseEvent('mousemove', {
			clientX: currentX,
			clientY: currentY,
			bubbles: true,
			cancelable: true,
			buttons: 1,
		});
		document.dispatchEvent(mouseMoveEvent);
	}
	const mouseUpEvent = new MouseEvent('mouseup', {
		clientX: targetX,
		clientY: targetY,
		bubbles: true,
		cancelable: true,
		button: 0,
		buttons: 0,
	});
	const workspace = document.querySelector('#coco_workspace') || document;
	workspace.dispatchEvent(mouseUpEvent);
	const clickEvent = new MouseEvent('click', {
		clientX: targetX,
		clientY: targetY,
		bubbles: true,
	});
	element.dispatchEvent(clickEvent);
};
this.window.add_block = function(iid, bid, x, y) {
	console.log(x, y);
	document.querySelectorAll('.WidgetPanel_blockList__2PypQ>.WidgetPanel_itemBlock__TqL6b')[iid].click();
	setTimeout(() => {
		simulateMouseDrag(document.querySelectorAll('.blocklyFlyout>.blocklyWorkspace>.blocklyBlockCanvas>g')[bid], 720 + x * 150, y * 35 + 150);
	}, 200);
};
document.body.appendChild(floatingWindow);
// 将设置按钮插入到窗口标题栏
const windowHeader = document.querySelector('.floating-window .window-header');
windowHeader.insertBefore(settingsBtn, windowHeader.querySelector('.close-btn'));
floatingWindow.style.display = 'none';
const ai_btn = document.createElement('button');
ai_btn.className = 'ai-btn';
ai_btn.innerHTML = 'AI CoCo鸭';
document.querySelector('.style_users__1_LCz').appendChild(ai_btn);
document.querySelector('.ai-btn').onclick = () => {
	floatingWindow.style.display = 'flex';
	document.querySelector('.ai-btn').display = 'none';
}