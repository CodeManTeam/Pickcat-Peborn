/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
  name: "舞台iframe",
  version: "0.1.0",
  description: "在舞台内管理多个 iframe，支持添加、移除、隐藏/显示、获取信息",
  author: "皌 & Deepseek",
  docs: ""
};

(async () => {
  const BN = Extension.API;
  const Toolbox = BN.Toolbox;

  await BN.waitBlocklyLoaded();

  BN.regColor("IFRAME_MGR_HUE", "#2196F3", "#0D47A1");

  // 存储所有 iframe 实例
  const iframeInstances = new Map();
  let nextIframeId = 1;

  const iframeManagerBlocks = [{
    type: "iframe_add",
    message0: "添加 iframe ID %1 网址 %2 X %3 Y %4 宽度 %5 高度 %6",
    args0: [{
      type: "input_value",
      name: "ID",
      check: "String",
      value: "iframe1"
    },
      {
        type: "input_value",
        name: "URL",
        check: "String",
        value: "https://www.bing.com"
      },
      {
        type: "input_value",
        name: "X",
        check: "Number",
        value: 100
      },
      {
        type: "input_value",
        name: "Y",
        check: "Number",
        value: 100
      },
      {
        type: "input_value",
        name: "WIDTH",
        check: "Number",
        value: 400
      },
      {
        type: "input_value",
        name: "HEIGHT",
        check: "Number",
        value: 300
      }],
    previousStatement: null,
    nextStatement: null,
    colour: "%{BKY_IFRAME_MGR_HUE}"
  },
    {
      type: "iframe_remove",
      message0: "移除 iframe ID %1",
      args0: [{
        type: "input_value",
        name: "ID",
        check: "String",
        value: "iframe1"
      }],
      previousStatement: null,
      nextStatement: null,
      colour: "%{BKY_IFRAME_MGR_HUE}"
    },
    {
      type: "iframe_remove_all",
      message0: "移除所有 iframe",
      args0: [],
      previousStatement: null,
      nextStatement: null,
      colour: "%{BKY_IFRAME_MGR_HUE}"
    },
    {
      type: "iframe_show",
      message0: "显示 iframe ID %1",
      args0: [{
        type: "input_value",
        name: "ID",
        check: "String",
        value: "iframe1"
      }],
      previousStatement: null,
      nextStatement: null,
      colour: "%{BKY_IFRAME_MGR_HUE}"
    },
    {
      type: "iframe_hide",
      message0: "隐藏 iframe ID %1",
      args0: [{
        type: "input_value",
        name: "ID",
        check: "String",
        value: "iframe1"
      }],
      previousStatement: null,
      nextStatement: null,
      colour: "%{BKY_IFRAME_MGR_HUE}"
    },
    {
      type: "iframe_set_url",
      message0: "设置 iframe 网址 ID %1 网址 %2",
      args0: [{
        type: "input_value",
        name: "ID",
        check: "String",
        value: "iframe1"
      },
        {
          type: "input_value",
          name: "URL",
          check: "String",
          value: "https://www.bing.com"
        }],
      previousStatement: null,
      nextStatement: null,
      colour: "%{BKY_IFRAME_MGR_HUE}"
    },
    {
      type: "iframe_set_position",
      message0: "设置 iframe 位置 ID %1 X %2 Y %3",
      args0: [{
        type: "input_value",
        name: "ID",
        check: "String",
        value: "iframe1"
      },
        {
          type: "input_value",
          name: "X",
          check: "Number",
          value: 100
        },
        {
          type: "input_value",
          name: "Y",
          check: "Number",
          value: 100
        }],
      previousStatement: null,
      nextStatement: null,
      colour: "%{BKY_IFRAME_MGR_HUE}"
    },
    {
      type: "iframe_set_size",
      message0: "设置 iframe 尺寸 ID %1 宽度 %2 高度 %3",
      args0: [{
        type: "input_value",
        name: "ID",
        check: "String",
        value: "iframe1"
      },
        {
          type: "input_value",
          name: "WIDTH",
          check: "Number",
          value: 400
        },
        {
          type: "input_value",
          name: "HEIGHT",
          check: "Number",
          value: 300
        }],
      previousStatement: null,
      nextStatement: null,
      colour: "%{BKY_IFRAME_MGR_HUE}"
    },
    {
      type: "iframe_set_style",
      message0: "设置 iframe 样式 ID %1 样式 %2 值 %3",
      args0: [{
        type: "input_value",
        name: "ID",
        check: "String",
        value: "iframe1"
      },
        {
          type: "field_dropdown",
          name: "STYLE",
          options: [
            ["边框颜色", "borderColor"],
            ["边框宽度", "borderWidth"],
            ["边框样式", "borderStyle"],
            ["圆角", "borderRadius"],
            ["透明度", "opacity"],
            ["背景色", "backgroundColor"],
            ["阴影", "boxShadow"],
            ["z-index", "zIndex"]
          ],
          value: "borderColor"
        },
        {
          type: "input_value",
          name: "VALUE",
          check: "String",
          value: "#FF5722"
        }],
      previousStatement: null,
      nextStatement: null,
      colour: "%{BKY_IFRAME_MGR_HUE}"
    },
    {
      type: "iframe_get_info",
      message0: "获取 iframe 信息 ID %1 信息类型 %2",
      args0: [{
        type: "input_value",
        name: "ID",
        check: "String",
        value: "iframe1"
      },
        {
          type: "field_dropdown",
          name: "INFO",
          options: [
            ["网址", "url"],
            ["X坐标", "x"],
            ["Y坐标", "y"],
            ["宽度", "width"],
            ["高度", "height"],
            ["是否可见", "visible"],
            ["标题", "title"],
            ["所有信息(JSON)", "all"]
          ],
          value: "url"
        }],
      output: "String",
      colour: "%{BKY_IFRAME_MGR_HUE}"
    },
    {
      type: "iframe_count",
      message0: "获取 iframe 数量",
      args0: [],
      output: "Number",
      colour: "%{BKY_IFRAME_MGR_HUE}"
    },
    {
      type: "iframe_reload",
      message0: "重新加载 iframe ID %1",
      args0: [{
        type: "input_value",
        name: "ID",
        check: "String",
        value: "iframe1"
      }],
      previousStatement: null,
      nextStatement: null,
      colour: "%{BKY_IFRAME_MGR_HUE}"
    }];

  await BN.waitBlockLoaded();
  BN.regBlocks(iframeManagerBlocks);

  const iframeManagerXML = [
    Toolbox.title("舞台网页控件 · iframe"),
    Toolbox.line("基础操作"),
    Toolbox.block("iframe_add"),
    Toolbox.block("iframe_remove"),
    Toolbox.block("iframe_remove_all"),
    Toolbox.line("显示控制"),
    Toolbox.block("iframe_show"),
    Toolbox.block("iframe_hide"),
    Toolbox.block("iframe_reload"),
    Toolbox.line("属性设置"),
    Toolbox.block("iframe_set_url"),
    Toolbox.block("iframe_set_position"),
    Toolbox.block("iframe_set_size"),
    Toolbox.block("iframe_set_style"),
    Toolbox.line("信息获取"),
    Toolbox.block("iframe_get_info"),
    Toolbox.block("iframe_count"),
    Toolbox.flyout_bottom(),
  ];

  BN.regIcon(`<symbol id="icon-iframe-mgr" viewBox="-24 -24 72 72">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM8 8h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
    </symbol>`);

  BN.addToolbox("iframeManager", "icon-iframe-mgr", "#2196F3", iframeManagerXML);

  await BN.waitRunmgrLoaded();

  // 关键：找到 transformer 容器（这个有 scale 变换的容器）
  function getTransformer() {
    return document.querySelector('#transformer');
  }

  // 获取当前缩放值
  function getCurrentScale() {
    const transformer = getTransformer();
    if (!transformer) return 1;

    const transform = transformer.style.transform;
    const match = transform.match(/scale\(([^)]+)\)/);
    return match ? parseFloat(match[1]): 1;
  }

  // 清理所有 iframe 元素
  function clearAllIframes() {
    try {
      const elements = document.querySelectorAll('[data-iframe-mgr="true"]');
      elements.forEach(el => el.remove());
      iframeInstances.clear();
      // BN.log('iframe', `已自动清理所有 iframe`);
    } catch (error) {
      BN.error('iframe', '自动清理失败:', error.message);
    }
  }

  // 获取 iframe 容器元素
  function getIframeElement(id) {
    return document.querySelector(`[data-iframe-id="${id}"]`);
  }

  // 创建 iframe 容器
  function createIframeContainer(id, url, x, y, width, height) {
    const transformer = getTransformer();
    if (!transformer) return null;

    // 检查 ID 是否已存在
    if (iframeInstances.has(id)) {
      BN.error('iframe', `ID "${id}" 已存在`);
      return null;
    }

    const container = document.createElement('div');
    container.setAttribute('data-iframe-mgr', 'true');
    container.setAttribute('data-iframe-id', id);
    container.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    width: ${width}px;
    height: ${height}px;
    background: white;
    border: 2px solid #2196F3;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    z-index: 10000;
    transform-origin: 0 0;
    transition: all 0.3s ease;
    `;

    // 标题栏
    const header = document.createElement('div');
    header.style.cssText = `
    padding: 6px 12px;
    background: #2196F3;
    color: white;
    font-size: 13px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: move;
    user-select: none;
    `;

    let hostname = '未知';
    try {
      hostname = new URL(url).hostname;
    } catch (e) {}

    header.innerHTML = `
    <span>📺 ${id} | ${hostname}</span>
    <div style="display:flex; gap:8px;">
    <span style="cursor:pointer; font-size:16px;" class="iframe-minimize">↑</span>
    <span style="cursor:pointer; font-size:16px;" class="iframe-close">✕</span>
    </div>
    `;

    // iframe
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.cssText = `
    width: 100%;
    height: calc(100% - 35px);
    border: none;
    background: white;
    `;

    // 添加拖拽功能
    let isDragging = false;
    let startX,
    startY,
    startLeft,
    startTop;

    header.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('iframe-close') ||
        e.target.classList.contains('iframe-minimize')) return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseInt(container.style.left);
      startTop = parseInt(container.style.top);

      container.style.cursor = 'grabbing';
      e.preventDefault();
    });

    document.addEventListener('mousemove',
      (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        container.style.left = (startLeft + dx) + 'px';
        container.style.top = (startTop + dy) + 'px';

        // 更新存储的位置
        const instance = iframeInstances.get(id);
        if (instance) {
          instance.x = startLeft + dx;
          instance.y = startTop + dy;
        }
      });

    document.addEventListener('mouseup',
      () => {
        if (isDragging) {
          isDragging = false;
          container.style.cursor = '';
        }
      });

    // 关闭按钮
    header.querySelector('.iframe-close').addEventListener('click',
      () => {
        container.remove();
        iframeInstances.delete(id);
        BN.log('iframe', `已移除 iframe: ${id}`);
      });

    // 最小化按钮
    let minimized = false;
    header.querySelector('.iframe-minimize').addEventListener('click',
      () => {
        if (minimized) {
          iframe.style.display = 'block';
          container.style.height = iframeInstances.get(id).height + 'px';
          header.querySelector('.iframe-minimize').textContent = '↑';
        } else {
          iframe.style.display = 'none';
          container.style.height = '35px';
          header.querySelector('.iframe-minimize').textContent = '↓';
        }
        minimized = !minimized;
      });

    container.appendChild(header);
    container.appendChild(iframe);
    transformer.appendChild(container);

    // 存储实例信息
    iframeInstances.set(id,
      {
        id,
        url,
        x,
        y,
        width,
        height,
        visible: true,
        container,
        iframe,
        header
      });

    return container;
  }

  // 获取 Runtime 对象用于监听程序状态
  // 获取 Runtime 对象用于监听程序状态
  let Runtime = null;
  try {
    Runtime = (await BN.waitHook('Runtime')).get_webview_runtime();
  } catch (error) {
    BN.error('iframe',
      '获取Runtime失败:',
      error.message);
  }

  // 记录上一次的运行状态
  let lastRunningState = false;

  // 监听程序运行状态变化
  if (Runtime) {
    setInterval(() => {
      try {
        const currentRunningState = Runtime.heart.heart.get_runtime_data().is_running();

        // 检查状态是否从 true 变为 false
        if (lastRunningState === true && currentRunningState === false) {
          clearAllIframes();
          BN.log('iframe', '程序停止运行，自动清理所有 iframe');
        }

        // 更新上一次的状态
        lastRunningState = currentRunningState;

      } catch (error) {
        // 忽略错误
      }
    },
      100);
  }

  // 添加 iframe
  BN.regMethod('iframe_add',
    (params) => {
      try {
        const id = String(params.ID || 'iframe' + nextIframeId++);
        const url = params.URL || 'https://www.bing.com';
        const x = parseInt(params.X) || 100;
        const y = parseInt(params.Y) || 100;
        const width = parseInt(params.WIDTH) || 400;
        const height = parseInt(params.HEIGHT) || 300;

        const container = createIframeContainer(id, url, x, y, width, height);
        if (container) {
          BN.log('iframe', `已添加 iframe: ${id}, 位置(${x},${y}), 尺寸(${width}x${height})`);
        }
      } catch (error) {
        BN.error('iframe', '添加失败:', error.message);
      }
    });

  // 移除 iframe
  BN.regMethod('iframe_remove',
    (params) => {
      try {
        const id = String(params.ID);
        const element = getIframeElement(id);
        if (element) {
          element.remove();
          iframeInstances.delete(id);
          BN.log('iframe', `已移除 iframe: ${id}`);
        } else {
          BN.error('iframe', `未找到 ID 为 ${id} 的 iframe`);
        }
      } catch (error) {
        BN.error('iframe', '移除失败:', error.message);
      }
    });

  // 移除所有 iframe
  BN.regMethod('iframe_remove_all',
    () => {
      clearAllIframes();
      BN.log('iframe', '已移除所有 iframe');
    });

  // 显示 iframe
  BN.regMethod('iframe_show',
    (params) => {
      try {
        const id = String(params.ID);
        const element = getIframeElement(id);
        if (element) {
          element.style.display = 'block';
          const instance = iframeInstances.get(id);
          if (instance) instance.visible = true;
          BN.log('iframe', `已显示 iframe: ${id}`);
        }
      } catch (error) {
        BN.error('iframe', '显示失败:', error.message);
      }
    });

  // 隐藏 iframe
  BN.regMethod('iframe_hide',
    (params) => {
      try {
        const id = String(params.ID);
        const element = getIframeElement(id);
        if (element) {
          element.style.display = 'none';
          const instance = iframeInstances.get(id);
          if (instance) instance.visible = false;
          BN.log('iframe', `已隐藏 iframe: ${id}`);
        }
      } catch (error) {
        BN.error('iframe', '隐藏失败:', error.message);
      }
    });

  // 设置 iframe 网址
  BN.regMethod('iframe_set_url',
    (params) => {
      try {
        const id = String(params.ID);
        const url = params.URL;
        const instance = iframeInstances.get(id);
        if (instance) {
          instance.iframe.src = url;
          instance.url = url;

          // 更新标题中的主机名
          let hostname = '未知';
          try {
            hostname = new URL(url).hostname;
          } catch (e) {}
          const headerSpan = instance.header.querySelector('span');
          if (headerSpan) {
            headerSpan.innerHTML = `📺 ${id} | ${hostname}`;
          }

          BN.log('iframe', `已设置 iframe ${id} 网址: ${url}`);
        }
      } catch (error) {
        BN.error('iframe', '设置网址失败:', error.message);
      }
    });

  // 设置 iframe 位置
  BN.regMethod('iframe_set_position',
    (params) => {
      try {
        const id = String(params.ID);
        const x = parseInt(params.X);
        const y = parseInt(params.Y);
        const element = getIframeElement(id);
        if (element) {
          element.style.left = x + 'px';
          element.style.top = y + 'px';

          const instance = iframeInstances.get(id);
          if (instance) {
            instance.x = x;
            instance.y = y;
          }

          BN.log('iframe', `已设置 iframe ${id} 位置: (${x},${y})`);
        }
      } catch (error) {
        BN.error('iframe', '设置位置失败:', error.message);
      }
    });

  // 设置 iframe 尺寸
  BN.regMethod('iframe_set_size',
    (params) => {
      try {
        const id = String(params.ID);
        const width = parseInt(params.WIDTH);
        const height = parseInt(params.HEIGHT);
        const element = getIframeElement(id);
        if (element) {
          element.style.width = width + 'px';
          element.style.height = height + 'px';

          const instance = iframeInstances.get(id);
          if (instance) {
            instance.width = width;
            instance.height = height;
          }

          BN.log('iframe', `已设置 iframe ${id} 尺寸: ${width}x${height}`);
        }
      } catch (error) {
        BN.error('iframe', '设置尺寸失败:', error.message);
      }
    });

  // 设置 iframe 样式
  BN.regMethod('iframe_set_style',
    (params) => {
      try {
        const id = String(params.ID);
        const style = params.STYLE;
        const value = params.VALUE;
        const element = getIframeElement(id);

        if (element) {
          // 样式值映射
          const styleMap = {
            'borderColor': (el, val) => {
              el.style.borderColor = val;
            },
            'borderWidth': (el, val) => {
              el.style.borderWidth = val + 'px';
            },
            'borderStyle': (el, val) => {
              el.style.borderStyle = val;
            },
            'borderRadius': (el, val) => {
              el.style.borderRadius = val + 'px';
            },
            'opacity': (el, val) => {
              el.style.opacity = val;
            },
            'backgroundColor': (el, val) => {
              el.style.backgroundColor = val;
            },
            'boxShadow': (el, val) => {
              el.style.boxShadow = val;
            },
            'zIndex': (el, val) => {
              el.style.zIndex = val;
            }
          };

          if (styleMap[style]) {
            styleMap[style](element, value);
            BN.log('iframe', `已设置 iframe ${id} 样式 ${style} = ${value}`);
          }
        }
      } catch (error) {
        BN.error('iframe', '设置样式失败:', error.message);
      }
    });

  // 获取 iframe 信息
  BN.regMethod('iframe_get_info',
    (params) => {
      try {
        const id = String(params.ID);
        const infoType = params.INFO;
        const instance = iframeInstances.get(id);

        if (!instance) return '未找到';

        switch (infoType) {
          case 'url': return instance.url;
          case 'x': return String(instance.x);
          case 'y': return String(instance.y);
          case 'width': return String(instance.width);
          case 'height': return String(instance.height);
          case 'visible': return instance.visible ? '是': '否';
          case 'title': return id;
          case 'all':
            return JSON.stringify({
              id: instance.id,
              url: instance.url,
              x: instance.x,
              y: instance.y,
              width: instance.width,
              height: instance.height,
              visible: instance.visible
            });
          default: return '';
        }
      } catch (error) {
        BN.error('iframe', '获取信息失败:', error.message);
        return '错误';
      }
    });

  // 获取 iframe 数量
  BN.regMethod('iframe_count',
    () => {
      return iframeInstances.size;
    });

  // 重新加载 iframe
  BN.regMethod('iframe_reload',
    (params) => {
      try {
        const id = String(params.ID);
        const instance = iframeInstances.get(id);
        if (instance) {
          instance.iframe.src = instance.iframe.src; // 重新加载
          BN.log('iframe', `已重新加载 iframe: ${id}`);
        }
      } catch (error) {
        BN.error('iframe', '重新加载失败:', error.message);
      }
    });

})();