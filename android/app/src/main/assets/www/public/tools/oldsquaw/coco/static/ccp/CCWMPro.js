// ==UserScript==
// @name         CoCo Widget Mall Pro
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  升级控件商城
// @author       Inventocode
// @match        https://coco.codemao.cn/*
// @icon         http://coco.codemao.cn/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var ccwmpro = {
        data: {
            "Qii 控件库 2.0": {
                "author": "琦琦",
                "icon": "https://static.bcmcdn.com/coco/player/unstable/H1l0pZLexl.image/svg+xml",
                "description": "一个 CoCo 原生「控件库」<br>Qii 控件库 2.0 全部使用 CoCoKit 进行开发。",
                "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                "categoys": {
                    "UI控件": {
                        "文本": {
                            "version": "2.0.0",
                            "description": "好看又好用的文本控件",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/dep0nwovkacmrttr",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/r1EZhl6egg.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/SyRPyZLWge.js"
                        },
                        "按钮": {
                            "version": "2.0.0",
                            "description": "宇宙无敌超级回旋炸裂的按钮",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/rsx9g58yg7v2hxgk",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/HyDgABNleg.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/HJAEogLWgg.js"
                        },
                        "输入框": {
                            "version": "2.0.0",
                            "description": "用来输入一些东西",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/lnoe764a3gaxcr9e",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/rk6YJwFUyl.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/SkA5YgIWge.js"
                        },
                        "图片框": {
                            "version": "2.0.0",
                            "description": "你可以用它显示任何东西",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/muukewgbwayx42i1",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/SJQ3xvF8Jl.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/rJ-95l8bll.js"
                        },
                        "标签栏": {
                            "version": "2.0.0",
                            "description": "一般存在于屏幕底部，不吃不喝就在那呆着，你还会经常戳它",
                            "docs": "一般存在于屏幕底部，不吃不喝就在那呆着，你还会经常戳它",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/HJwYTUFIJl.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/SkB09x8bel.js"
                        }
                    },
                    "功能控件": {
                        "动画库": {
                            "version": "2.0.0",
                            "description": "给你的控件添加狂拽酷炫的动画",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/glmnwvfs5frmva18",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/ryCx59SKyx.image/svg+xml",
                            "src": "https://static.codemao.cn/flowchunkflex/SynuClUZel.js"
                        },
                        "屏幕工具": {
                            "version": "2.0.0",
                            "description": "· 让控件自动适配不同的屏幕<br>· 在屏幕切换时添加动画",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/pqgfkf6p3nynie30",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/SktGTW8exe.image/svg+xml",
                            "src": "https://static.codemao.cn/flowchunkflex/SyEKRxU-xg.js"
                        },
                        "全局广播": {
                            "version": "2.0.0",
                            "description": "向所有屏幕发送消息和数据",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/ukqy7ctnffhaxohv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/ryfFtDEYyg.image/svg+xml",
                            "src": "https://static.codemao.cn/flowchunkflex/Hk19RgIZle.js"
                        },
                        "HTML框": {
                            "version": "2.0.0",
                            "description": "用模板字符串的方式解决了 HTML 控件更新数据很麻烦的问题",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/Bk6G9lRllx.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/BJmEOpRWle.js"
                        }
                    }
                }
            },
            "Qii 控件库 1.0": {
                "author": "琦琦",
                "icon": "https://static.bcmcdn.com/coco/player/unstable/H1l0pZLexl.image/svg+xml",
                "description": "因部分控件相同，故将控件库分开",
                "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                "categoys": {
                    "UI 控件": {
                        "按钮": {
                            "version": "1.3.0",
                            "description": "这是什么？按一下。这是什么？按一下...",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/rsx9g58yg7v2hxgk",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/BJQC406YJe.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/BJ4Bkg8Wgg.jsx"
                        },
                        "文本": {
                            "version": "1.3.0",
                            "description": "默认文本控件竟然连 加粗 都没有？（（（",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/dep0nwovkacmrttr",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/rJvgfDt81e.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/BJOm1xLbxe.jsx"
                        },
                        "输入框": {
                            "version": "1.2.0",
                            "description": "我不说你也知道他是干嘛的",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/lnoe764a3gaxcr9e",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/rk6YJwFUyl.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/rJr8UlLZle.jsx"
                        },
                        "滑动条": {
                            "version": "1.2.0",
                            "description": "基于原生 input 元素修改的滑动条",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/Hk-zWUEKJg.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/ryVGfX8Wll.jsx"
                        },
                        "图片框": {
                            "version": "1.5.0",
                            "description": "请不要用它显示奇怪的东西",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/SJQ3xvF8Jl.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/ByvXMXU-ee.jsx"
                        },
                        "聊天框": {
                            "version": "1.3.1",
                            "description": "一个超高自定义程度的聊天气泡控件<br>使用 React 节点渲染，内置支持多种类型的消息",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/Hyu5RLKI1e.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/B1CXzED-gx.jsx"
                        },
                        "导航栏": {
                            "version": "1.2.0",
                            "description": " 把一些常用的东西放在了一起，还支持毛玻璃背景<br>你可以自由搭配出适合你的样式",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/SJhCAIY8Jg.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/BJ5OzEwWge.jsx"
                        },
                        "标签栏": {
                            "version": "1.2.0",
                            "description": "一个 99% 的时间都在屏幕底部的东西<br>你可以单独控制显示图标或者文本，中心按钮也可以自定义",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/HJwYTUFIJl.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/rJi2fNP-ge.jsx"
                        },
                        "圆角卡片": {
                            "version": "1.4.0",
                            "description": "常用来当作背景",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/r1QUSPFI1g.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/H1PN7EPWxe.jsx"
                        },
                        "列表框美化": {
                            "version": "1.0.0",
                            "description": "自定义官方的列表框样式",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/HJlB7E32kg.image/svg+xml",
                            "src": "https://static.codemao.cn/flowchunkflex/rJCYQEwZxe.jsx"
                        },
                        "歌词展示": {
                            "version": "测试版",
                            "description": "一个非常棒的歌词展示控件",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/BkvQnTHKkx.image/png",
                            "src": "https://static.codemao.cn/flowchunkflex/B1t7rEP-el.jsx"
                        }
                    },
                    "特效控件": {
                        "五彩纸屑": {
                            "version": "1.1.0",
                            "description": "  bong ~，放礼花啦！！！",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/SymG4DKIye.image/svg+xml",
                            "src": "https://static.codemao.cn/flowchunkflex/Sy58S4DWel.jsx"
                        },
                        "流彩背景": {
                            "version": "1.0.0",
                            "description": " 一个缓慢流动的多彩背景，适合当作音乐播放器背景",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/ry8900mSJx.image/svg+xml",
                            "src": "https://static.codemao.cn/flowchunkflex/Sk1srEwbee.jsx"
                        }
                    },
                    "全局控件": {
                        "动画库": {
                            "version": "1.4.0",
                            "description": "给你的控件添加狂拽酷炫的动画",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/glmnwvfs5frmva18",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/ryCx59SKyx.image/svg+xml",
                            "src": "https://static.codemao.cn/flowchunkflex/SJTIkeL-el.jsx"
                        },
                        "对话框": {
                            "version": "1.0.0",
                            "description": "简单好用又好看的对话框控件",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/zob9awzh9ynpt1la",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/B1Q5UP19kg.image/svg+xml?hash=FlzrVxf2Hhk6g1HNMjcoQp2rLgpa",
                            "src": "https://static.codemao.cn/flowchunkflex/SJGNWQ8-xe.jsx"
                        },
                        "轻提示": {
                            "version": "1.0.0",
                            "description": "在屏幕上显示一个提示信息",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/to1ow6ueyqkulm0e",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/r1ZLPEBhkg.image/svg+xml?hash=Fo20LvSKp9j5gfkTUh3v_WrvAmCF",
                            "src": "https://static.codemao.cn/flowchunkflex/SJngzmIbex.jsx"
                        },
                        "全局广播": {
                            "version": "1.0.0",
                            "description": "可以向所有屏幕发送广播",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/ryfFtDEYyg.image/svg+xml",
                            "src": "https://static.codemao.cn/flowchunkflex/HyCOsQwbex.jsx"
                        },
                        "屏幕切换": {
                            "version": "1.0.0",
                            "description": "在切换屏幕的时候加上过渡动画",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/SyODvbcLye.image/svg+xml",
                            "src": "https://static.codemao.cn/flowchunkflex/Hk6WnmDZlg.jsx"
                        },
                        "音频播放器": {
                            "version": "1.2.1",
                            "description": "用来播放音频（废话）",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/Sk3PjGGYJg.image/svg+xml",
                            "src": "https://static.codemao.cn/flowchunkflex/r1Lq3QwZlx.jsx"
                        },
                        "网易云API": {
                            "version": "1.4.0",
                            "description": "调用网易云官方接口实现获取音乐信息。<br>歌曲直链接口来自青柠  \^o^/ ",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/r1RHp5bF1e.image/svg+xml",
                            "src": "https://static.codemao.cn/flowchunkflex/SkhNaQwWlg.jsx"
                        },
                        "全屏水印": {
                            "version": "1.0.0",
                            "description": "在屏幕上显示后，会显得很专业",
                            "docs": "https://www.yuque.com/yuqueyonghuslrsu6/qcqduw/xsz3g8nodpvqmmvv",
                            "icon": "https://static.bcmcdn.com/coco/player/unstable/SyqWsqx51e.image/svg+xml",
                            "src": "https://static.codemao.cn/flowchunkflex/Hytp67D-lx.jsx"
                        }
                    }
                }
            },
            "Yue 控件库": {
                "author": "何我寻月Seeky",
                "icon": "https://static.codemao.cn/flowchunkflex/r1zp0DBZee.svg",
                "description": "一个 CoCo 原生「控件库」",
                "docs": "https://www.yuque.com/yuqueyonghuhelltp/yuekj/dipdxtsnvzdmudx5",
            },
            "官方控件": {
                "author": "CoCo控件商城",
                "icon": "https://coco.codemao.cn/favicon.ico",
                "description": "从CoCo官方控件商城搬运的",
                "docs": "",
                "categoys": {
                    "全部": {
                        "富文本": {
                            "version": "",
                            "description": "富文本编辑器，支持一些复杂格式的文本编辑能力。",
                            "docs": "",
                            "icon": "https://creation.codemao.cn/716/appcraft/IMAGE_iJgrLQPbG_1656656961413.png",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/quill-rich-text.jsx"
                        },
                        "ASCII": {
                            "version": "",
                            "description": "在 ASCII 码和字符之间互相转换",
                            "docs": "",
                            "icon": "https://creation.codemao.cn/716/appcraft/IMAGE_pYUk6GEdj_1654590687623.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/ascii-convert.js"
                        },
                        "颜色选择器": {
                            "version": "",
                            "description": "提供可视化的颜色选择器(颜色选择器样式因设备而异）",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/color-picker-zzx.jpg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/color-picker-zzx.jsx"
                        },
                        "维格云表格": {
                            "version": "",
                            "description": "使用维格表（第三方数据库）实现云端数据的存储、写入、读取、删除等功能；\n数据支持自定义多行多列，可以存储比较复杂的数据。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/vika-table.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/staging/vika-table.js"
                        },
                        "ip": {
                            "version": "",
                            "description": "获取本机 ip 地址",
                            "docs": "",
                            "icon": "https://creation.codemao.cn/716/appcraft/IMAGE_xiIl10o5e_1648113886329.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/ip.js"
                        },
                        "多行输入框": {
                            "version": "",
                            "description": "一个多行文本输入框",
                            "docs": "",
                            "icon": "https://creation.codemao.cn/716/appcraft/IMAGE_Q85_Y91EF_1643253844428.png",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/dl1-textarea.jsx"
                        },
                        "Base编解码": {
                            "version": "",
                            "description": "提供Base64和Base91编解码接口，支持中文。",
                            "docs": "",
                            "icon": "https://creation.codemao.cn/716/appcraft/IMAGE_bZbAOhRcTa_1643095470593.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/base-zxx.js"
                        },
                        "超链接": {
                            "version": "",
                            "description": "这是一个普通的超链接控件，用于在手机上用浏览器打开网页。",
                            "docs": "",
                            "icon": "https://creation.codemao.cn/716/appcraft/IMAGE_o_oOuJOde_1643253567109.png",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/super-link.jsx"
                        },
                        "维格云字典": {
                            "version": "",
                            "description": "使用维格表（https://vika.cn/）实现云端数据的存储、写入、读取、删除等功能；数据以键值对（比如 “姓名”：“编程猫”）的形式存在，建议存储结构简单的数据。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/vika-tinydb.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/vika-tinydb.js"
                        },
                        "评分": {
                            "version": "",
                            "description": "给个五星好评亲！",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/rate.png",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/rate.jsx"
                        },
                        "轮播": {
                            "version": "",
                            "description": "多张图片的幻灯片效果，支持循环播放。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/swiper.png",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/swiper.jsx"
                        },
                        "彩虹文字": {
                            "version": "",
                            "description": "颜色渐变的文本，炫酷。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/rainbow-text2.png",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/rainbow-text.jsx"
                        },
                        "步进器": {
                            "version": "",
                            "description": "由增加按钮、减少按钮、数值组成；每次点击增加按钮（或减少按钮）数字增长（或减少）的指定步幅的数值。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/stepper.png",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/stepper.jsx"
                        },
                        "闪烁按钮": {
                            "version": "",
                            "description": "可以闪烁的按钮，支持调整高度。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/blink-button.png",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/blink-button.jsx"
                        },
                        "uomg": {
                            "version": "",
                            "description": "基于 uomg 网站提供的免费 http 接口，实现了获取土味情话，随机图片，QQ等级信息等功能",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/tmp-extension-widgets/production/uomg2.svg",
                            "src": "https://static.codemao.cn/appcraft/tmp-extension-widgets/production/uomg.js"
                        },
                        "定时器": {
                            "version": "",
                            "description": "就是一个定时器。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/tmp-extension-widgets/production/timer1.svg",
                            "src": "https://static.codemao.cn/appcraft/tmp-extension-widgets/production/timer.js"
                        },
                        "截图工具": {
                            "version": "",
                            "description": "在web浏览器内实现截图、下载图片到本地的功能",
                            "docs": "",
                            "icon": "https://creation.codemao.cn/716/appcraft/ic_screenshot.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/screenshot.js"
                        },
                        "文件工具箱": {
                            "version": "",
                            "description": "如果你想使用打开或下载文件的话，就用这个控件吧，这个控件能满足你的需求！",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-file-tool.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-file-tool.js"
                        },
                        "剪切板": {
                            "version": "",
                            "description": "如果你想复制、读取最近复制的文本，就用这个控件吧，他可以满足你的需求！",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-clipboard.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-clipboard.js"
                        },
                        "ip工具箱": {
                            "version": "",
                            "description": "关于ip的一些功能",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/for-ip.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/for-ip.js"
                        },
                        "编程猫帐号": {
                            "version": "",
                            "description": "支持返回已登录的编程猫用户头像、名称等信息（仅支持在Web环境下使用）",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/ic_bcm.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/codemao-profile.js"
                        },
                        "视频框": {
                            "version": "",
                            "description": "可播放视频",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/video-tian.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/video-tian.jsx"
                        },
                        "列表排序": {
                            "version": "",
                            "description": "列表排序，支持一维列表和二维列表，更有数字和文本两种模式，优点多多哦~使用前请把鼠标悬浮在积木上方查看提示哦~",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/sort-list-cyan.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/sort-list-cyan.js"
                        },
                        "语数英工具": {
                            "version": "",
                            "description": "用好这个控件，让你的程序成为语数英学霸！",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/a-and-nob.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/a-and-nob.js"
                        },
                        "视频播放器": {
                            "version": "",
                            "description": "支持暂停、播放、设置速率、字幕等丰富功能的视频框",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/vedio-fym.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/video-fym.jsx"
                        },
                        "键盘侦测": {
                            "version": "",
                            "description": "支持电脑端键盘或移动端外接键盘按键侦测",
                            "docs": "",
                            "icon": "https://source-static.codemao.cn/appcraft/extension-widgets/production/keyboard-fym.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/keyboard-fym.js"
                        },
                        "数学公式": {
                            "version": "",
                            "description": "一些常用的平面图形与立体图形的相关公式，可以更加简单的实现某些复杂运算。",
                            "docs": "",
                            "icon": "https://creation.codemao.cn/716/appcraft/IMAGE_zxnizigG1C_1674381974559",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/math-formula.js"
                        },
                        "分享第三方": {
                            "version": "",
                            "description": "想让你的作品被更多人知道？那就试试这个个吧！\n支持分享到QQ、QQ空间、新浪微博、豆瓣、Twitter、Facebook\n支持图+文+URL分享\n\n附：各平台图标&获取当前界面URL（获取URL仅Web端），减少开发麻烦",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/share-haozi.svg",
                            "src": "https://source-static.codemao.cn/appcraft/extension-widgets/production/share-haozi.js"
                        },
                        "播网易音乐": {
                            "version": "",
                            "description": "可以嵌入并播放网易云的音乐",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/xjkj_wyy.jpeg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xjkj_wyy.jsx"
                        },
                        "WebSocket": {
                            "version": "",
                            "description": "可进行WebSocket连接",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/webSocket-fym.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/webSocket-fym.js"
                        },
                        "文件工具": {
                            "version": "",
                            "description": "提供一些文件工具",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-coco-file.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-coco-file.js"
                        },
                        "圆形进度指示器": {
                            "version": "",
                            "description": "圆形进度指示器，可用于数据化",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-widget.png",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-circular-progress.jsx"
                        },
                        "文本工具箱": {
                            "version": "",
                            "description": "让处理文本变得更简单！",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/text-toolbox.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/text-toolbox.js"
                        },
                        "图片超链接": {
                            "version": "",
                            "description": "可实现点击图片跳转网页",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/img-url-xiong.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/img-url-xiong.jsx"
                        },
                        "获取设备信息": {
                            "version": "",
                            "description": "支持在无网情况下获取当前设备、运行环境以及网络状态等，可实现不同设备分功能的效果。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/phone-xiong.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/phone-xiong.js"
                        },
                        "极客邮件": {
                            "version": "",
                            "description": "还在为邮件而发愁？\r\n极客邮件来解决！\r\n那极客邮件对比其他邮件控件有什么区别呢？\r\n1.没有任何声明！！！其他的邮件控件都有一些声明，如在后面有一个邮件功能由**提供。而使用极客邮件则没有任何声明。（希望在贡献名单中可以增加极客邮箱，但不增加也没有关系）\r\n2.绝对全免费！！！在极客邮件的官网中除了爱心捐献以外没有任何付费选项！\r\n3.发送速度极快！！！在极客邮件中正常的发送速度只需1秒左右。（部分邮箱有延迟。qq邮箱亲测无延迟）\r\n4.适用于所有邮箱。再也不会因用户使用的邮箱不同而发愁了（部分邮箱可能会标记成垃圾邮件，但主流邮箱如qq邮箱等都没有！）\r\n5.无限次数，不用因次数而发愁啦～\r\n6.发送邮箱验证码，更加美观（使用验证码发送，你发送的验证码会以Html美化后发送）\r\n说到这里你是不是心动了！\r\n极客邮箱稳定版在极客邮箱群里！\r\n极客邮箱beta开发版，在开发群里。\r\n后面我可能会成立极客coco控件工作室。几天后我会建一个极客控件网站，帮助你更好地使用coco编辑器。\r\n如果你要使用极客邮件的话，你可以添加极客邮件官方群，qq群号：870511736。在群文件中获取！\r\n如果你想参与极客邮件的开发，请联系我！QQ：2479957077；",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/geek-mail.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/geek-mail.js"
                        },
                        "弹出菜单": {
                            "version": "",
                            "description": "弹出一个菜单，可自定义多个选项",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/ant-mobile.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xj-action-sheet.jsx"
                        },
                        "时间扩展": {
                            "version": "",
                            "description": "更多关于时间的控件",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/time-extend.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/time-extend.js"
                        },
                        "位运算工具": {
                            "version": "",
                            "description": "可以进行位运算并集成了一些方便的功能",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/bit-operation.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/bit-operation.js"
                        },
                        "颜色选择": {
                            "version": "",
                            "description": "提供可视化的颜色选择器(颜色选择器样式因设备而异）及色彩数据格式转换",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/color-picker-fym.jpg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/color-picker-fym.jsx"
                        },
                        "大小写转换": {
                            "version": "",
                            "description": "这是一款由Zeroone开发的大小写转换程序，它可以将文本转换为全部大写、全部小写、首字母大写的形式。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/bsletter.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/bsletter.js"
                        },
                        "网易云整合搜索": {
                            "version": "",
                            "description": "本控件提供一站式基于网易云的搜歌，获取歌曲歌手，专辑，图片，歌词字符串和获取音乐mp3文件地址功能",
                            "docs": "",
                            "icon": "https://www.lihouse.xyz/coco_widget/music_resource/logo.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/netease-music-resource.js"
                        },
                        "第三方音乐播放器": {
                            "version": "",
                            "description": "本控件提供对外部音频文件链接播放的支持，并且还提供了暂停，跳转，改变音量等调方法以及大量广播回调积木，能够简单高效得构建作品",
                            "docs": "",
                            "icon": "https://www.lihouse.xyz/coco_widget/thirdparty_media/logo.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/thirdparty-mediaplay.js"
                        },
                        "歌词滚动推送": {
                            "version": "",
                            "description": "本控件提供对歌词字符串定时推送的功能，能够让播放器类作品锦上添花",
                            "docs": "",
                            "icon": "https://www.lihouse.xyz/coco_widget/lyric_push/logo.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/lyric-push.js"
                        },
                        "列表筛选": {
                            "version": "",
                            "description": "通过简单的表达式快速筛选列表",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/xj-filtering-list.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xj-filtering-list.js"
                        },
                        "哈希加密": {
                            "version": "",
                            "description": "为Coco提供哈希/加密算法，使用CryptoJS库，支持如下算法哈希算法:MD5、SHA1、SHA224、SHA256、SHA384、SHA512、SHA3、RIPEMD160、HmacMD5、HmacSHA1、HmacSHA224、HmacSHA256、HmacSHA384、HmacSHA512、HmacSHA3、HmacRIPEMD160",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/co-crypto-js.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/co-crypto-js.js"
                        },
                        "五子棋算法": {
                            "version": "",
                            "description": "实现简单的五子棋人机对战算法",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/gobang-ai.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/gobang-ai.js"
                        },
                        "摄像机": {
                            "version": "",
                            "description": "可以获取前置/后置摄像头的截图，并实时显示。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/camera-media.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/camera-media.jsx"
                        },
                        "antd分割线": {
                            "version": "",
                            "description": "区隔内容的分割线，对不同章节的文本段落进行分割。支持自定义分割线内文字、文字颜色、分割线颜色。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/ant-mobile.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/antd-divider.jsx"
                        },
                        "表情字符互转": {
                            "version": "",
                            "description": "云数据表直接存储emoji表情会报错，这个控件可以将emoji表情转换为字符，以便于存储到云数据表，从云数据表中读取时可以再将字符转回emoji表情。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/emo-to-str.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/emo-to-str.js"
                        },
                        "高级列表框": {
                            "version": "",
                            "description": "比列表框功能更多，自定义更强！",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/ant-mobile.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/sun-senior-list.jsx"
                        },
                        "消息提示": {
                            "version": "",
                            "description": "用来提示信息",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/ant-mobile.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/sun-message.jsx"
                        },
                        "选择框": {
                            "version": "",
                            "description": "支持单选/多选，改变选中项的文本颜色",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/mini-radio-list.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/mini-radio-list.jsx"
                        },
                        "扫码": {
                            "version": "",
                            "description": "1.直接嵌入作品，无需调起系统摄像机即可扫码。\r\n2.建议获取数据后立刻关闭扫码，避免多次获取二维码数据。\r\n3.扫码支持的格式：\r\n【二维码】【条形码】=>【阿兹特克】【CODE_39】【CODE_93】【CODE_128】【最大代码】【国际乒联】【EAN_13】【EAN_8】【PDF_417】【RSS_14】【RSS_EXPANDED】【UPC_A】【UPC_E】【数据_矩阵】",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/scan-qrcode.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/scan-qrcode.jsx"
                        },
                        "随机UUID": {
                            "version": "",
                            "description": "生成随机UUID",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-widget.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-random-uuid.js"
                        },
                        "语音录制": {
                            "version": "",
                            "description": "1.支持基本的录制，暂停，播放语音功能。\r\n2.支持录制后的语音上传到编程猫对象存储并转换成链接。\r\n3.支持播放互联网的语音。\r\n4.转文本功能由科大讯飞提供支持，APP_xxx请到科大讯飞开发者平台（语音听写）获取。https://www.xfyun.cn/services/voicedictation\r\n创建（语音听写）的应用，创建后就会有APP_xxx。填入到本积木就可以了。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/recorder-to-text.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/recorder-to-text.js"
                        },
                        "计算机单位工具": {
                            "version": "",
                            "description": "计算机单位工具，支持 B、KB、MB、GB等单位之间的转换",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-widget.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-machine-units.js"
                        },
                        "顶部导航栏": {
                            "version": "",
                            "description": "多标签高级导航栏",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/tab-navigation.png",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/tab-navigation.js"
                        },
                        "轻蓝聊天框": {
                            "version": "",
                            "description": "用简单的积木构建精美的气泡聊天框",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/xj-light-blue-chat.png",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xj-light-blue-chat.jsx"
                        },
                        "返回键功能": {
                            "version": "",
                            "description": "提供 APP 返回键功能，实现 按下返回键返回上一级页面！",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-widget.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xh-backbutton.js"
                        },
                        "论坛列表框": {
                            "version": "",
                            "description": "论坛列表框-小米是一款CoCo编辑器的可见控件，可以快速构建一个精美的论坛样式列表框，样式类似小米论坛。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/mi-xj-forum.png",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/mi-xj-forum.js"
                        },
                        "拖拽传文件": {
                            "version": "",
                            "description": "支持拖拽上传文件",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/xj-drag-upload.png",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xj-drag-upload.js"
                        },
                        "图片查看器": {
                            "version": "",
                            "description": "指令式调用，显示图片，左右滑动切换图片",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/ant-mobile.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xj-image-viewer.jsx"
                        },
                        "修改字典": {
                            "version": "",
                            "description": "简单直接的修改字典，直接返回，非常方便",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/xj-modify-object.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/xj-modify-object.jsx"
                        },
                        "监听网页通信": {
                            "version": "",
                            "description": "使用了原生 window.addEventListener()方式，监听网页框传递过来的数据，但不能发送数据出去，只能接收。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/event-listener-message.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/event-listener-message.js"
                        },
                        "照片转链接": {
                            "version": "",
                            "description": "调用相机拍照和图片管理器选择后转链接",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/camera-to-url.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/camera-to-url.js"
                        },
                        "LC内建账户": {
                            "version": "",
                            "description": "对接LeanCloud（https://www.leancloud.cn/）的内建账户接口，支持登录、注册、重置密码等功能，为开发者提供安全、高效的用户系统方案",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/lean-cloud-account.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/lean-cloud-account.js"
                        },
                        "背景蒙层": {
                            "version": "",
                            "description": "使用antd_Mask方案，常用于模态窗口的背景层，使视觉焦点突出在模态窗口本身。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/ant-mobile.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/antd-mask.jsx"
                        },
                        "步骤条": {
                            "version": "",
                            "description": "使用antd_Steps方案。一个引导用户按照流程完成任务的导航条。可在当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/ant-mobile.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/antd-steps.jsx"
                        },
                        "头像条": {
                            "version": "",
                            "description": "使用antd_Avatar方案。用来代表用户或事物。适合需要更加直观的展现人物或事物特征时使用",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/ant-mobile.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/antd-avatar.jsx"
                        },
                        "结果反馈": {
                            "version": "",
                            "description": "使用antd_Result方案。可以对前一步操作的结果进行反馈。适合当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/ant-mobile.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/antd-result.jsx"
                        },
                        "Web Authentication 控件": {
                            "version": "",
                            "description": "使用 Web Authentication API 验证使用者的身份",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/web-auth.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/web-auth.js"
                        },
                        "步进器multi": {
                            "version": "",
                            "description": "同一个屏幕只能用一个该步进器，再加个步进器请重新导入，另一个屏幕无需查询导入",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/notch-stepper.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/notch-stepper.jsx"
                        },
                        "地理位置": {
                            "version": "",
                            "description": "获取用户所在位置经纬度",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/geo-getter.svg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/geo-getter.js"
                        },
                        "血量条": {
                            "version": "",
                            "description": "还在为血量条显示积木太复杂而担忧吗？快来用这个控件吧！",
                            "docs": "",
                            "icon": "https://static.codemao.cn/appcraft/extension-widgets/production/hp.jpg",
                            "src": "https://static.codemao.cn/appcraft/extension-widgets/production/hp.jsx"
                        }
                    }
                }
            }
        },
        include_libs: function () {
            let script;
            script = document.createElement('script');
            script.setAttribute('src', 'https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js');
            document.getElementsByTagName('head')[0].appendChild(script);
            script = document.createElement('script');
            script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/sweetalert2@11');
            document.getElementsByTagName('head')[0].appendChild(script);
        },
        import_widget: function (src) {
            console.log("导入控件：", src);
            let r = $.get(src);
            function cheakReadyState() {
                if (r.readyState == 4 && r.status == 200) {
                    let data = r.responseText;
                    console.log("已获得控件");
                    let fileInput = document.querySelector("div>span>input[type=file]");
                    if (!fileInput) { document.querySelector("#root > div > header > div > div.Header_left__1k2WD > div.Header_menu__Zy7KP > div.coco-dropdown.Header_fileDropdown__3MYW_ > div > div.coco-popover-children > div").click(); }
                    let file = new File([data], 'widget.js', { type: 'application/json' });
                    let dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    fileInput.files = dataTransfer.files;
                    let event = new Event('change', { bubbles: true });
                    fileInput.dispatchEvent(event);
                    setTimeout(() => {
                        let replace_btn = document.querySelector('button.coco-button.coco-button-primary.coco-button-dangerous.coco-button-circle');
                        if (replace_btn) { replace_btn.click(); }
                    }, 150);
                } else {
                    setTimeout(cheakReadyState, 100);
                }
            }
            cheakReadyState();
        },
        import_kit: function (name) {
            let cats = ccwmpro.data[name].categoys;
            let src_list = [];
            let name_list = [];
            Object.keys(cats).forEach((catn) => {
                let cat = cats[catn];
                Object.keys(cat).forEach((wn) => {
                    src_list.push(cat[wn].src);
                    name_list.push(`<text style="color:purple"> ${name}<text style="color:green"> ${catn}<text style="color:blue"> ${wn}`);
                });
            });
            Swal.fire({
                title: '即将导入这些控件',
                html: name_list.join("<br>"),
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: '取消',
                confirmButtonText: '确定',
            }).then((result) => {
                if (result.isConfirmed) {
                    src_list.forEach((src) => {
                        try {
                            ccwmpro.import_widget(src);
                        } catch (e) { console.log(e); }
                    });
                }
            });
        },
        remove_nov: function () {
            document.querySelectorAll("div.coco-dialog-content > div.WidgetMallDialog_widgetLabel__1fptD").forEach((e) => { e.remove(); });
        },
        remove_cards: function () {
            document.querySelector("#_cocoDialogContainer > div.coco-dialog.WidgetMallDialog_widgetMallDialog__1URzI > div.coco-dialog-scroll > div > div.coco-dialog-content > div.WidgetMallDialog_cardContainer__5WIn4").innerHTML = "";
        },
        load_search: function () {
            let search = document.querySelector(".ccwmp_search");
            if (search) { search.remove(); }
            document.querySelector("#_cocoDialogContainer > div.coco-dialog.WidgetMallDialog_widgetMallDialog__1URzI > div.coco-dialog-scroll > div > div.coco-dialog-title").style.display = 'flex';
            document.querySelector("#_cocoDialogContainer > div.coco-dialog.WidgetMallDialog_widgetMallDialog__1URzI > div.coco-dialog-scroll > div > div.coco-dialog-title > span").insertAdjacentHTML('beforebegin', `<div class="ccwmp_search coco-input style_searchInput__1cwRL" style="margin-top: 15px;width: 300px;margin-left: 20px;"><i class="coco-iconfont"><svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><use xlink:href="#icon-material-search"></use></svg></i><input placeholder="搜索控件" value=""></div>`);
            search = document.querySelector('.ccwmp_search > input');
            search.onchange = () => {
                if (search.value) {
                    ccwmpro.search_widget(search.value);
                } else {
                    ccwmpro.load_home();
                }
            }
        },
        search_widget: function (name) {
            ccwmpro.remove_nov();
            ccwmpro.remove_cards();
            ccwmpro.add_nov_item('主页', () => { ccwmpro.load_home(); });
            ccwmpro.add_nov_item('搜索', () => { }, true);
            Object.keys(ccwmpro.data).forEach(kitn => {
                let cats = ccwmpro.data[kitn].categoys;
                Object.keys(cats).forEach(catn => {
                    let cat = cats[catn];
                    Object.keys(cat).forEach(wn => {
                        let w = cat[wn];
                        if (wn.includes(name)) {
                            let widget = w;
                            ccwmpro.add_card(`${wn} ${widget.version}`, ccwmpro.data[kitn].author, widget.description, widget.docs, widget.icon, () => {
                                ccwmpro.import_widget(widget.src);
                            }, () => { });
                        }
                    });
                });
            });
            console.log('ccwmpro.search_widget', name);
        },
        load_home: function () {
            ccwmpro.remove_nov();
            ccwmpro.remove_cards();
            ccwmpro.add_nov_item('主页', () => { ccwmpro.load_home(); }, true);
            ccwmpro.load_search();
            Object.keys(ccwmpro.data).forEach((key) => {
                let kit = ccwmpro.data[key];
                ccwmpro.add_card(key, kit.author, kit.description, kit.docs, kit.icon, () => {
                    ccwmpro.import_kit(key);
                }, () => {
                    ccwmpro.load_kit(key);
                }
                )
            })
        },
        load_kit: function (name) {
            ccwmpro.remove_nov();
            ccwmpro.remove_cards();
            ccwmpro.add_nov_item('主页', () => { ccwmpro.load_home(); });
            ccwmpro.add_nov_item(name, () => { ccwmpro.load_kit(name); }, true);
            let cats = ccwmpro.data[name].categoys;
            Object.keys(cats).forEach((catn) => {
                ccwmpro.add_nov_item(catn, () => { ccwmpro.load_cat(name, catn); });
                let cat = cats[catn];
                Object.keys(cat).forEach((wn) => {
                    let widget = cat[wn];
                    ccwmpro.add_card(`${wn} ${widget.version}`, ccwmpro.data[name].author, widget.description, widget.docs, widget.icon, () => {
                        ccwmpro.import_widget(widget.src);
                    }, () => { });
                })
            })
        },
        load_cat: function (kit, catn) {
            ccwmpro.remove_nov();
            ccwmpro.remove_cards();
            ccwmpro.add_nov_item('主页', () => { ccwmpro.load_home(); });
            ccwmpro.add_nov_item(kit, () => { ccwmpro.load_kit(kit); });
            let cats = ccwmpro.data[kit].categoys;
            Object.keys(cats).forEach((cn) => {
                if (catn == cn) {
                    ccwmpro.add_nov_item(cn, () => { ccwmpro.load_cat(kit, cn); }, true);
                } else {
                    ccwmpro.add_nov_item(cn, () => { ccwmpro.load_cat(kit, cn); });
                }
            })
            let cat = ccwmpro.data[kit].categoys[catn];
            Object.keys(cat).forEach((wn) => {
                let widget = cat[wn];
                ccwmpro.add_card(`${wn} ${widget.version}`, ccwmpro.data[kit].author, widget.description, widget.docs, widget.icon, () => {
                    ccwmpro.import_widget(widget.src);
                }, () => { });
            })
        },
        add_nov_item: function (text, callback, active = false) {
            let itemhtml = `<div class="WidgetMallDialog_widgetLabel__1fptD">${text}</div>`;
            if (active) {
                itemhtml = `<div class="WidgetMallDialog_widgetLabel__1fptD WidgetMallDialog_active__2jgZK">${text}</div>`;
            }
            let cards_div = document.querySelector('.WidgetMallDialog_cardContainer__5WIn4');
            cards_div.insertAdjacentHTML('beforebegin', itemhtml);
            let items = cards_div.parentNode.querySelectorAll('.WidgetMallDialog_widgetLabel__1fptD');
            let item = items[items.length - 1];
            item.onclick = callback;
        },
        add_card: function (title, author, description, docs, icon, add_callback, click_callback) {
            let cards_div = document.querySelector("div.WidgetMallDialog_cardContainer__5WIn4");
            cards_div.insertAdjacentHTML("beforeend", `<div class="WidgetMallDialog_widgetCard__2zbnR"><div class="WidgetMallDialog_invisibleWidget__R3MUc"><div class="WidgetMallDialog_invisibleWidgetHeader__29lGQ"><img src="${icon}" alt="icon" class="WidgetMallDialog_widgetIcon__1cf9Z"><div class="WidgetMallDialog_widgetInfo__2ll_b"><p class="WidgetMallDialog_widgetName__2HkXL">${title}</p><p class="WidgetMallDialog_authorName__27JoW">${author}</p></div></div><div class="WidgetMallDialog_widgetIntroContainer__2oSQv"><p class="WidgetMallDialog_widgetIntro__3OHZ6">${description}</p></div></div><div class="WidgetMallDialog_widgetCardFooter__1GiB8"><a class="WidgetMallDialog_icon__3dYPY WidgetMallDialog_addIcon__39a1J" style="margin-left:63%;margin-right:0;" href="${docs}" target="_blank"><i class="coco-iconfont"><svg t="1747472853167" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10997" width="32" height="32"><path d="M512 1024C229.7 1024 0 794.34 0 512 0 229.703 229.7 0 512 0c282.338 0 512 229.662 512 512 0 282.34-229.662 512-512 512z m0-950.532c-241.819 0-438.533 196.713-438.533 438.533 0 241.785 196.714 438.532 438.532 438.532 241.786 0 438.534-196.714 438.534-438.532 0-241.82-196.748-438.533-438.534-438.533zM456.9 273.23c0-14.427 5.937-28.764 16.138-38.961 10.202-10.2 24.534-16.143 38.961-16.143 14.429 0 28.76 5.942 38.963 16.143 10.2 10.197 16.137 24.534 16.137 38.961 0 14.423-5.936 28.76-16.137 38.963-10.202 10.2-24.534 16.137-38.963 16.137-14.427 0-28.759-5.936-38.96-16.137-10.202-10.203-16.138-24.54-16.138-38.963zM512 805.875c-20.28 0-36.736-16.424-36.736-36.737V438.534c0-20.28 16.457-36.737 36.735-36.737 20.28 0 36.737 16.457 36.737 36.737v330.604c0 20.313-16.457 36.737-36.737 36.737z" p-id="10998"></path></svg></i></a><div class="WidgetMallDialog_icon__3dYPY WidgetMallDialog_addIcon__39a1J""><i class="coco-iconfont"><svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><use xlink:href="#icon-add"></use></svg></i></div></div></div>`);
            let open_card = cards_div.querySelector(".WidgetMallDialog_widgetCard__2zbnR:last-child>div.WidgetMallDialog_invisibleWidget__R3MUc");
            open_card.onclick = click_callback;
            let import_btn = cards_div.querySelector(".WidgetMallDialog_widgetCard__2zbnR:last-child>.WidgetMallDialog_widgetCardFooter__1GiB8>div");
            import_btn.onclick = add_callback;
        }
    };
    window.ccwmpro = ccwmpro;
    ccwmpro.include_libs();
    function try_register() {
        let widget_mall_btn = document.querySelector("div.WidgetList_widgetMallBtnContainer__34NeJ > button");
        if (widget_mall_btn) {
            widget_mall_btn.onclick = () => {
                setTimeout(() => {
                    ccwmpro.load_home();
                }, 500);
            };
        } else {
            setTimeout(() => {
                try_register();
            }, 100);
        }
    }
    try_register();
})();