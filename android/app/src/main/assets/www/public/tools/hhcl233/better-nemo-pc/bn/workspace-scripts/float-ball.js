
// -----------------悬浮球-面板---------------
const presetBackgroundImage = 'http://youke.xn--y7xa690gmna.cn/s1/2026/01/25/697632d161f0a.webp';
const presetBackgroundColor = "#221D4E";
(function float_ball() {
    const floatBall = document.getElementById('floatBall');
    const floatWindow = document.getElementById('floatWindow');
    const closeBtn = document.getElementById('closeBtn');
    let windowContent = document.querySelector("#floatWindow > div.window-content");
    let backgroundImage = storage.get('backgroundImage') || presetBackgroundImage;
    let backgroundColor = storage.get('backgroundColor') || "#221D4E";
    setInterval(() => {
        backgroundImage = storage.get('backgroundImage') || presetBackgroundImage;
        backgroundColor = storage.get('backgroundColor') || "#221D4E";
        const treeNodeWithExtensions = Array.from(document.querySelectorAll("div.blocklyTreeNode")).find(node => node.querySelector('#extensions'));
        if (treeNodeWithExtensions) {
            document.querySelector("div.blocklyToolboxDiv").appendChild(treeNodeWithExtensions);
        }
        windowContent = document.querySelector("#floatWindow > div.window-content");
        const injectionDiv = document.querySelector('.injectionDiv');
        if (injectionDiv) {
            injectionDiv.style.backgroundImage = `url("${backgroundImage}")`;
            injectionDiv.style.backgroundSize = 'contain';
            injectionDiv.style.backgroundRepeat = 'no-repeat';
            injectionDiv.style.setProperty("background-color", backgroundColor, "important");
        }
        const flyout = document.querySelector("#workspace > div > svg.blocklyFlyout");
        if (flyout) {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            flyout.style.transform = `translate(${vw - Number(flyout.getAttribute('width')) - 70}px, 10px) scale(1)`;
            flyout.style.height = `${Number(flyout.getAttribute('height')) - 20}px`;
            if (flyout.classList.contains('blocklyFlyoutHidden')) {
                flyout.style.transform = `translate(${vw}px, 10px) scale(1)`;
            }
            const selected = document.querySelector("div.blocklyTreeRow.blocklyTreeSelected");
            if (selected) {
                if (selected.id == 'variables' || selected.id == 'lists' || selected.id == 'procedures' || selected.id == 'cloud_var') {
                    document.querySelectorAll("svg.blocklyFlyout.blocklyFlyoutVisible > foreignObject").forEach(foreignObject => {
                        const height = Number(foreignObject.getAttribute('height').split('px')[0]);
                        const transformX = foreignObject.getAttribute('transform').split('(')[1].split(',')[0];
                        if (height && transformX)
                            foreignObject.setAttribute('transform', `translate(${transformX}, ${vh - height - 20}), scale(1)`);
                    });
                }
            }
        }
        if (window['Blockly']) {
            const workspace = Blockly.mainWorkspace;
            if (workspace) {
                Blockly.mainWorkspace.options.flyout.max_width = storage.get('flyout_max_width') || 488;
                Blockly.mainWorkspace.options.notch = storage.get('notch') || false;
            }
        }
    }, 100);
    // 拖拽相关变量
    let isDragging = false;
    let dragStartX, dragStartY;
    let ballStartX, ballStartY;
    let touchStartTime = 0;
    let startX, startY;
    const CLICK_MAX_DURATION = 300; // 毫秒
    const CLICK_MAX_DISTANCE = 10; // 像素

    const UI = {
        home: () => { },
        pageHistory: [],
        clear: () => { windowContent.innerHTML = ''; },
        back: (page) => {
            let lastPage = UI.pageHistory.pop();
            if (lastPage == page) lastPage = UI.pageHistory.pop();
            UI.load(lastPage);
        },
        load: (page = UI.home, ...args) => {
            UI.clear();
            if (UI.pageHistory && page != UI.home) {
                windowContent.innerHTML = '<li class="bn-menu-item menu-title"><i class="fas fa-circle-chevron-left"></i><span></span></li>';
                setTimeout(() => {
                    const backButton = document.querySelector('#floatWindow > div.window-content > li.menu-title');
                    backButton.ontouchend = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        UI.back(page);
                    };
                }, 10);
            }
            windowContent.innerHTML += '<div class="status-info" style="display:none"><span></span></div>';
            UI.pageHistory.push(page);
            page(args);
        },
        setTitle: (text) => { windowContent.querySelector(".menu-title > span").innerHTML = text; },
        setStatus: (text) => {
            const status = windowContent.querySelector("div.status-info");
            if (!status) return;
            status.style.display = text ? 'block' : 'none';
            status.outerHTML = `<div class="status-info"><span>${text}</span></div>`;
        },
        button: (callback, name = '功能', icon = '') => {
            const menuItem = document.createElement('li');
            menuItem.innerHTML = `${icon ? `<i class="fas fa-${icon}"></i>` : ''}<span>${name}</span>`;
            menuItem.className = 'bn-menu-item';
            let touchStartTime = 0;
            let startX, startY;
            const MENU_CLICK_MAX_DISTANCE = 20; // 像素
            menuItem.ontouchstart = (e) => {
                const touch = e.touches[0];
                touchStartTime = Date.now();
                startX = touch.clientX;
                startY = touch.clientY;
            };
            menuItem.ontouchmove = (e) => {
                if (!touchStartTime) return;
                const touch = e.touches[0];
                const deltaX = Math.abs(touch.clientX - startX);
                const deltaY = Math.abs(touch.clientY - startY);
                if (deltaX > MENU_CLICK_MAX_DISTANCE || deltaY > MENU_CLICK_MAX_DISTANCE) {
                    touchStartTime = 0;
                }
            };
            menuItem.ontouchend = (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (touchStartTime > 0) {
                    callback();
                }
                touchStartTime = 0;
            };

            windowContent.appendChild(menuItem);
        },
        reset_icon: `<img src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgc3R5bGU9Ii1tcy10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIj48cGF0aCBkPSJNMyAxMWExIDEgMCAwIDEgMSAxIDguMDUgOC4wNSAwIDEgMCAyLjIyLTUuNWgyLjRhMSAxIDAgMCAxIDAgMkg0LjA5YTEgMSAwIDAgMS0xLTFWM2ExIDEgMCAwIDEgMiAwdjEuNzdBMTAgMTAgMCAxIDEgMiAxMmExIDEgMCAwIDEgMS0xeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGZpbGw9InJnYmEoMCwgMCwgMCwgMCkiIGQ9Ik0wIDBoMjR2MjRIMHoiLz48L3N2Zz4=" draggable="false" width="20" height="20">`,
        numberInput: (callback, name = '数字', value = 0, defaultValue = 0, width = '100px') => {
            const menuItem = document.createElement('li');
            menuItem.innerHTML = `<label style="margin-right: 10px">${name}</label><input style="width:${width}" type="number" value="${value}"><button>${UI.reset_icon}</button>`;
            menuItem.className = 'bn-menu-input';
            menuItem.querySelector('input').onchange = (e) => {
                callback(Number(e.target.value));
            };
            menuItem.querySelector('button').onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                menuItem.querySelector('input').value = defaultValue;
                callback(defaultValue);
            };
            windowContent.appendChild(menuItem);
        },
        textInput: (callback, name = '文本', value = '', defaultValue = [''], width = '100px') => {
            if (!Array.isArray(defaultValue)) defaultValue = [defaultValue];
            const menuItem = document.createElement('li');
            menuItem.innerHTML = `<label style="margin-right: 10px">${name}</label><input style="width:${width}" type="text" value="${value}""><button>${UI.reset_icon}</button>`;
            menuItem.className = 'bn-menu-input';
            menuItem.querySelector('input').onchange = (e) => {
                callback(e.target.value);
            };
            const resetButton = menuItem.querySelector('button');
            resetButton.onclick = (e) => {
                const reset_counter = Number(resetButton.getAttribute('reset_counter')) || 0;
                e.preventDefault();
                e.stopPropagation();
                const value = defaultValue[reset_counter % defaultValue.length];
                menuItem.querySelector('input').value = value;
                callback(value);
                resetButton.setAttribute('reset_counter', reset_counter + 1);
            };
            windowContent.appendChild(menuItem);
        },
        selectInput: (callback, name = '选择', options = [['选项1', '1'], ['选项2', '2']],
            value = '', defaultValue = '', width = '100px') => {
            const valueOption = options.find(option => option[1] == value);
            const menuItem = document.createElement('li');
            menuItem.innerHTML = `<label style="margin-right: 10px">${name}</label>
            <select value="${value}" style="width:${width}">${options.map(
                option => `<option value="${option[1]}"${option == valueOption ? ' selected' : ''}>${option[0]}</option>`
            ).join('')}
            </select><button>${UI.reset_icon}</button>`;
            menuItem.className = 'bn-menu-input';
            menuItem.querySelector('select').onchange = (e) => {
                callback(e.target.value);
            };
            menuItem.querySelector('button').onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                menuItem.querySelector('select').value = defaultValue;
                callback(defaultValue);
            };
            windowContent.appendChild(menuItem);
        },
    };
    let erudaEnabled = true;
    const Page = {
        home: () => {
            UI.setStatus('Version: ' + BetterNemoVersion);
            UI.button(() => { UI.load(Page.clipboard); }, '剪切板', 'clipboard');
            UI.button(() => { UI.load(Page.extensions); }, '内置扩展', 'puzzle-piece');
            UI.button(() => { UI.load(Page.theme); }, '主题', 'palette');
            UI.button(() => { UI.load(Page.editorConfig); }, '编辑器', 'laptop-code');
            UI.button(() => { UI.load(Page.runtimeConfig); }, '运行时', 'cog');
            UI.button(() => { UI.load(Page.more); }, '更多', 'ellipsis');
        },
        error: (error = "未知错误") => {
            UI.setTitle('错误');
            UI.setStatus(error);
        },
        editorConfig: () => {
            UI.setTitle('编辑器设置');
            UI.setStatus('此配置跟随Webview存储');
            UI.selectInput(
                (value) => {
                    storage.set('background', value);
                    switch (value) {
                        case 'preset1':
                            storage.set('backgroundImage', presetBackgroundImage);
                            storage.set('backgroundColor', presetBackgroundColor);
                            break;
                        default:
                            storage.set('backgroundImage', backgroundImage);
                            storage.set('backgroundColor', backgroundColor);
                            break;
                    }
                    UI.load(Page.editorConfig);
                },
                '背景', [['BetterNemo', 'preset1'], ['自定义', 'custom']],
                storage.get('background'), 'preset1', '80px'
            );
            if (storage.get('background') == 'custom') {
                UI.textInput((value) => {
                    storage.set('backgroundImage', value);
                }, '背景图片', backgroundImage, presetBackgroundImage, '100px');
                UI.textInput((value) => {
                    storage.set('backgroundColor', value);
                }, '背景颜色', backgroundColor, presetBackgroundColor, '100px');
            }
            UI.button(() => {
                storage.set('cat', !storage.get('cat'));
                if (storage.get('cat')) enableCatBlock();
                else disableCatBlock();
                UI.load(Page.editorConfig);
            }, (storage.get('cat') ? '关闭' : '打开') + '猫块', 'save');
            UI.button(() => {
                storage.set('notch', !storage.get('notch'));
                UI.load(Page.editorConfig);
            }, (storage.get('notch') ? '关闭' : '打开') + '积木缺口', 'save');
            UI.numberInput((value) => {
                storage.set('flyout_max_width', value);
                UI.load(Page.editorConfig);
            }, '积木盒最大宽度', storage.get('flyout_max_width'), 488, '50px');
        },
        runtimeConfig: () => {
            UI.setTitle('运行时设置');
            UI.setStatus('此配置跟随Webview存储');
            // 默认高级配置
            const defualtConfig = {
                "block_pool_preallocation_size": 50,
                "opti_frame_pool_preallocation_size": 10,
                "opti_frame_pool_size_limit": 600,
                "legacy": {
                    "lists_get_value_allow_return_undefined": false
                },
                "max_procedure_calls_per_interpreter_step": 50000,
                "max_warp_iterations_per_interpreter_step": 30000,
                "warp_interpreter_millisecond_time_limit": 4,
                "max_call_stack_size": 10000,
                "opti_compiler": {
                    "pretty_print": false
                },
                "per_entity_clone_limit": 300,
                "entity_max_clones_per_frame": 300,
                "reports_all_entities": true,
                "should_report_current_running_block": false,
                "user_debug_mode": false,
                "ignore_missing_domain_function": false
            };
            /*{     "块池预分配大小": 50,
                   "优化帧池预分配大小": 10,
                   "优化帧池大小限制": 600,
                   "遗留": {"列表获取值允许返回未定义": false},
                   "每个解释器步骤的最大过程调用次数": 50000,
                   "每个解释器步骤的最大“一步执行”迭代次数": 30000,
                   "“一步执行”毫秒时间限制": 4,
                   "最大调用堆栈大小": 10000,
                   "优化编译器": {         "pretty_print": false     },
                   "每个实体克隆限制": 300,
                   "每个帧的实体最大克隆数": 300,
                   "报告所有实体": true,
                   "应报告当前运行块": false,
                   "用户调试模式": false,
                   "忽略缺失的域函数": false 
              }*/
            let newConfig = get_run_mgr().config.get();
            function save() {
                get_run_mgr().config.set(newConfig);
                storage.set('runtimeConfig', newConfig);
            }
            function newNumConfig(name, id) {
                UI.numberInput((value) => {
                    newConfig[id] = value;
                    save();
                }, name, newConfig[id], defualtConfig[id], '50px');
            }
            newNumConfig('角色克隆限制', 'per_entity_clone_limit');
            newNumConfig('每帧克隆限制', 'entity_max_clones_per_frame');
            newNumConfig('一步执行超时(ms)', 'warp_interpreter_millisecond_time_limit');
            newNumConfig('函数调用堆栈限制', 'max_call_stack_size');
            UI.button(() => {
                newConfig = defualtConfig;
                save();
                UI.load(UI.projectConfig);
            }, '重置', 'sync-alt');
        },
        experimentalConfig: () => {
            UI.setTitle('实验性功能');
            UI.setStatus('这些功能<del>可能</del>会导致问题。');
            UI.selectInput(
                (value) => { experimentalConfig.disable_repeat_forever_in_warp = value; },
                '禁用一步执行中的死循环', [['开', true], ['关', false]],
                experimentalConfig.disable_repeat_forever_in_warp, false, '60px'
            );
            UI.selectInput(
                (value) => { experimentalConfig.webview_debug = value; },
                'webview调试', [['开', true], ['关', false]],
                experimentalConfig.webview_debug, false, '60px'
            );
        },
        clipboard: () => {
            UI.setTitle('剪切板');
            UI.button(async () => {
                try {
                    const text = Blockly.xml.dom_to_text(Blockly.xml.block_to_dom(Blockly.runtime_data.selected));
                    await navigator.clipboard.writeText(text);
                } catch (error) {
                    console.error(error.message);
                    UI.load(Page.error, error.message);
                }
            }, '复制选中积木', 'copy');
            UI.button(async () => {
                try {
                    const dom = Blockly.xml.text_to_dom(await navigator.clipboard.readText());
                    if (dom.querySelector('parsererror')) {
                        UI.load(Page.error, '解析失败<br>' + dom.innerText);
                        return;
                    }
                    Blockly.xml.dom_to_block(dom, Blockly.mainWorkspace);
                } catch (error) {
                    console.error(error.message);
                    UI.load(Page.error, error.message);
                }
            }, '粘贴积木', 'paste');
            UI.button(async () => {
                try {
                    const text = Blockly.xml.dom_to_text(Blockly.xml.workspace_to_dom(Blockly.mainWorkspace));
                    await navigator.clipboard.writeText(text);
                } catch (error) {
                    console.error(error.message);
                    UI.load(Page.error, error.message);
                }
            }, '复制工作区', 'copy');
            UI.button(async () => {
                try {
                    const dom = Blockly.xml.text_to_dom(await navigator.clipboard.readText());
                    if (dom.querySelector('parsererror')) {
                        UI.load(Page.error, '解析失败<br>' + dom.innerText);
                        return;
                    }
                    Blockly.xml.dom_to_workspace(dom, Blockly.mainWorkspace);
                    UI.load(Page.clipboard);
                } catch (error) {
                    console.error(error.message);
                    UI.load(Page.error, error.message);
                }
            }, '粘贴工作区', 'paste');
            UI.button(async () => {
                try {
                    const text = await svgAsPngUri(Blockly.runtime_data.selected.svg_group, {});
                    await navigator.clipboard.writeText(text);
                    UI.load(Page.clipboard);
                } catch (error) {
                    console.error(error.message);
                    UI.load(Page.error, error.message);
                }
            }, '导出积木PNG', 'image');
        },
        extensions: () => {
            UI.setTitle('内置扩展');
            UI.setStatus('仅用于兼容webview<86的用户，重进后生效');
            let config = storage.get('extension_config');
            function getName(filename) {
                const match = filename.match(/\[([^\]]+)\]/);
                return match ? match[1] : '';
            }
            EXTENSION_FILES.forEach(fileName => {
                let menuName = fileName;
                if (getName(fileName)) menuName = getName(fileName);
                if (fileName.includes(''))
                    if (extensionMetaData[fileName]) {
                        const metaData = extensionMetaData[fileName];
                        UI.button(() => {
                            UI.load(() => {
                                UI.setTitle(metaData.name + ' ' + metaData.version);
                                UI.setStatus(metaData.description + '<br>作者：' + metaData.author);
                                UI.selectInput(
                                    (value) => {
                                        config[fileName] = (value == 'true');
                                        storage.set('extension_config', config);
                                        UI.load(Page.home);
                                    },
                                    '状态', [['开', true], ['关', false]],
                                    config[fileName], true, '60px'
                                );
                                if (metaData.docs)
                                    UI.button(async () => {
                                        try {
                                            await navigator.clipboard.writeText(metaData.docs);
                                        } catch (error) {
                                            console.error(error.message);
                                            UI.load(Page.error, error.message);
                                        }
                                    }, '复制文档链接', 'copy');
                            });
                        }, menuName, 'toggle-on');
                    } else
                        UI.button(() => {
                            UI.load(() => {
                                UI.setTitle(fileName);
                                UI.setStatus('启用后可查看更多信息');
                                UI.selectInput(
                                    (value) => {
                                        config[fileName] = (value == 'true');
                                        storage.set('extension_config', config);
                                        UI.load(Page.home);
                                    },
                                    '状态', [['开', true], ['关', false]],
                                    config[fileName], true, '60px'
                                );
                            });
                        }, menuName, 'toggle-off');
            });
        },
        theme: () => {
            UI.setTitle('主题');
            UI.setStatus('重进后生效');
            let config = storage.get('theme_config');
            THEME_FILES.forEach(async name => {
                let menuName = name;
                const metaData = themeMetaData[name];
                if (metaData.name) menuName = metaData.name;
                if (name.includes(''))
                    if (config[name] == true) {
                        UI.button(() => {
                            UI.load(() => {
                                UI.setTitle(metaData.name + ' ' + metaData.version);
                                UI.setStatus(metaData.description + '<br>作者：' + metaData.author);
                            });
                        }, menuName, 'toggle-on');
                    } else
                        UI.button(() => {
                            UI.load(() => {
                                UI.setTitle(metaData.name + ' ' + metaData.version);
                                UI.setStatus(metaData.description + '<br>作者：' + metaData.author);
                                UI.button(async () => {
                                    Object.keys(config).forEach(key => {
                                        config[key] = key == name;
                                    });
                                    storage.set('theme_config', config);
                                    UI.load(Page.theme);
                                    reloadTheme();
                                }, '开启', 'circle-check');
                            });
                        }, menuName, 'toggle-off');
            });
        },
        more: () => {
            UI.setTitle('更多');
            UI.button(() => {
                if (erudaEnabled) eruda.destroy();
                else eruda.init();
                erudaEnabled = !erudaEnabled;
                UI.load();
            }, (erudaEnabled ? '关闭' : '开启') + 'Eruda', 'screwdriver-wrench');
            UI.button(() => {
                UI.load(() => {
                    UI.setStatus('请进行二次确认');
                    UI.button(() => {
                        location.reload();
                    }, '刷新Webview', 'sync-alt');
                });
            }, '刷新Webview', 'sync-alt');
            UI.button(() => { UI.load(Page.experimentalConfig); }, '实验性', 'flask');
            UI.button(() => { dsBridge.call('postMessageSyn', '{"type":"TOGGLE_BLUETOOTH_CONNECTION_PAGE","payload":{"visible":true}}'); }, '切换蓝牙页', 'flask');
            UI.button(() => { dsBridge.call('postMessageAsyn', '{"type":"GOTO_SYSTEM_SETTINGS","payload":{"path":"bluetooth"}}'); }, '跳转系统设置', 'flask');
        }
    };
    UI.home = Page.home;
    // 双击隐藏悬浮球
    let lastTouchEnd = 0;
    function handleTouchend(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 200) {
            event.preventDefault();
            // 查找被点击的元素是否包含在 #workspace 内
            let targetElement = event.target;
            const workspaceElement = document.querySelector("#workspace > div > svg.blocklySvg");
            if (workspaceElement && workspaceElement.contains(targetElement)) {
                if (floatBall.classList.contains('hide')) floatBall.classList.remove('hide');
                else floatBall.classList.add('hide');
            }
            lastTouchEnd = 0;
        } else {
            lastTouchEnd = now;
        }
    }
    document.addEventListener('touchend', handleTouchend, false);
    // 关闭悬浮窗口
    function closeFloatWindow() {
        floatWindow.classList.remove('active');
        floatBall.classList.remove('active');
    }
    // 切换悬浮窗口
    function toggleFloatWindow() {
        const isActive = floatWindow.classList.contains('active');

        if (!isActive) {
            UI.load();
            floatWindow.classList.add('active');
            floatBall.classList.add('active');
            // 确保窗口位置更新
            const ballRect = floatBall.getBoundingClientRect();
            const ballX = ballRect.left + ballRect.width / 2 - floatWindow.offsetWidth / 2;
            const ballY = ballRect.top;
            updateWindowPosition(ballX, ballY);
            // setTimeout(() => {
            //   floatBall.style.display = 'none';
            //   floatWindow.style.display = '';
            // }, 10);
        } else {
            closeFloatWindow();
        }
    }
    // 关闭按钮点击
    closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeFloatWindow();
    });
    // 点击窗口外部关闭
    document.addEventListener('click', function (e) {
        if (floatWindow.classList.contains('active') &&
            !floatWindow.contains(e.target) &&
            !floatBall.contains(e.target)) {
            closeFloatWindow();
        }
    });
    // ========== 拖拽功能 ==========
    // 开始拖拽
    function startDrag(clientX, clientY) {
        isDragging = true;

        // 记录开始位置
        const rect = floatBall.getBoundingClientRect();
        dragStartX = clientX;
        dragStartY = clientY;
        ballStartX = rect.left;
        ballStartY = rect.top;

        // 添加拖拽样式
        floatBall.style.transition = 'none';
        floatBall.style.cursor = 'grabbing';
        floatBall.style.opacity = '0.9';

        // 关闭窗口（如果打开）
        closeFloatWindow();
    }
    // 拖拽中
    function onDrag(clientX, clientY) {
        if (!isDragging) return;

        // 计算移动距离
        const deltaX = clientX - dragStartX;
        const deltaY = clientY - dragStartY;

        // 计算新位置
        let newX = ballStartX + deltaX;
        let newY = ballStartY + deltaY;

        // 边界检查
        newX = Math.max(0, Math.min(newX, window.innerWidth - floatBall.offsetWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - floatBall.offsetHeight));

        // 应用新位置
        floatBall.style.left = newX + 'px';
        floatBall.style.top = newY + 'px';
        floatBall.style.right = 'auto';
        floatBall.style.bottom = 'auto';

        // 更新窗口位置
        updateWindowPosition(newX, newY);
    }
    // 停止拖拽
    function stopDrag() {
        if (!isDragging) return;
        isDragging = false;

        // 恢复样式
        floatBall.style.transition = 'all 0.3s ease';
        floatBall.style.cursor = 'pointer';
        floatBall.style.opacity = '1';
    }
    // 更新悬浮窗口位置
    function updateWindowPosition(ballX, ballY) {
        const ballRect = floatBall.getBoundingClientRect();
        const windowRect = floatWindow.getBoundingClientRect();

        // 计算悬浮窗口位置
        let windowX, windowY;

        // 检查屏幕下方空间
        const spaceBelow = window.innerHeight - ballRect.bottom;
        const spaceAbove = ballRect.top;

        if (spaceBelow >= windowRect.height + 20) {
            // 显示在下方
            windowY = ballRect.bottom + 20;
        } else if (spaceAbove >= windowRect.height + 20) {
            // 显示在上方
            windowY = ballRect.top - windowRect.height - 20;
        } else {
            // 居中显示
            windowY = (window.innerHeight - windowRect.height) / 2;
        }

        // 水平方向尽量居中于悬浮球
        windowX = ballRect.left + ballRect.width / 2 - windowRect.width / 2;

        // 确保窗口不超出屏幕
        windowX = Math.max(20, Math.min(windowX, window.innerWidth - windowRect.width - 20));
        windowY = Math.max(20, Math.min(windowY, window.innerHeight - windowRect.height - 20));

        floatWindow.style.left = windowX + 'px';
        floatWindow.style.top = windowY + 'px';
        floatWindow.style.right = 'auto';
        floatWindow.style.bottom = 'auto';
    }
    // ========== 触屏事件处理 ==========
    // 触屏开始 - 轻量处理，不阻止默认行为
    floatBall.addEventListener('touchstart', function (e) {
        const touch = e.touches[0];
        touchStartTime = Date.now();

        // 记录起始坐标用于判断是否拖动
        startX = touch.clientX;
        startY = touch.clientY;
        isDragging = false;
    }, { passive: false });
    // 触屏移动 - 如果移动距离超过阈值，则视为拖拽
    floatBall.addEventListener('touchmove', function (e) {
        if (!touchStartTime) return;

        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - startX);
        const deltaY = Math.abs(touch.clientY - startY);

        // 如果移动距离超过阈值，则认为是拖拽
        if (deltaX > CLICK_MAX_DISTANCE || deltaY > CLICK_MAX_DISTANCE) {
            if (!isDragging) {
                isDragging = true;
                startDrag(touch.clientX, touch.clientY);
            }
        }

        if (isDragging) {
            e.preventDefault(); // 只有在拖拽时才阻止默认行为
            onDrag(touch.clientX, touch.clientY);
        }
    }, { passive: false });
    // 触屏结束
    floatBall.addEventListener('touchend', function (e) {
        const touchDuration = Date.now() - touchStartTime;

        // 如果不是拖拽且触摸时间不超过阈值，则视为点击
        if (!isDragging && touchDuration <= CLICK_MAX_DURATION) {
            e.preventDefault();
            e.stopPropagation();
            toggleFloatWindow();
        } else if (isDragging) {
            stopDrag();
        }

        // 重置状态
        touchStartTime = 0;
        isDragging = false;
    });
    // 窗口大小变化时调整位置
    window.addEventListener('resize', function () {
        const ballRect = floatBall.getBoundingClientRect();

        // 确保悬浮球在可视区域内
        if (ballRect.right > window.innerWidth) {
            floatBall.style.left = (window.innerWidth - floatBall.offsetWidth - 20) + 'px';
            floatBall.style.right = 'auto';
        }
        if (ballRect.bottom > window.innerHeight) {
            floatBall.style.top = (window.innerHeight - floatBall.offsetHeight - 20) + 'px';
            floatBall.style.bottom = 'auto';
        }

        // 更新窗口位置
        const currentLeft = parseFloat(floatBall.style.left) || 0;
        const currentTop = parseFloat(floatBall.style.top) || 0;
        updateWindowPosition(currentLeft, currentTop);
    });
})();