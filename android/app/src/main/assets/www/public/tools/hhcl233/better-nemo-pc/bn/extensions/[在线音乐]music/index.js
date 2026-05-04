/// <reference path="../_TYPE.d.ts"/>
Extension.metaData = {
    name: "在线音乐",
    version: "1.2.1",
    description: "音乐播放模块，支持MP3音乐文件的初始化、播放、音量控制、暂停和停止",
    author: "部鑫",
    docs: ""
};


(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    const Runtime = (await waitHook('Runtime')).get_webview_runtime();
    // --------------------------------积木-------------------------------
    await BN.waitBlocklyLoaded();
    BN.regColor("MUSIC_HUE", "#ff6600", "#993d00");
    const musicBlocks = [
        {
            type: "bn_music_init",
            message0: "初始化音乐 %1",
            args0: [
                {
                    type: "input_value",
                    name: "url",
                    check: "String",
                    value: "https://example.com/music.mp3",
                },
            ],
            ...Block.methodBlock,
            inputsInline: true,
        },
        {
            type: "bn_music_play",
            message0: "播放音乐",
            args0: [],
            ...Block.methodBlock,
            inputsInline: true,
        },
        {
            type: "bn_music_set_volume",
            message0: "设置音量 %1",
            args0: [
                {
                    type: "input_value",
                    name: "volume",
                    check: "Number",
                    value: 50,
                },
            ],
            ...Block.methodBlock,
            inputsInline: true,
        },
        {
            type: "bn_music_pause",
            message0: "暂停音乐",
            args0: [],
            ...Block.methodBlock,
            inputsInline: true,
        },
        {
            type: "bn_music_stop",
            message0: "停止音乐",
            args0: [],
            ...Block.methodBlock,
            inputsInline: true,
        },
        {
            type: "bn_music_is_loaded",
            message0: "音乐初始化是否加载完成",
            args0: [],
            ...Block.valueBlock,
            output: "Boolean",
            inputsInline: true,
        },
        {
            type: "bn_music_is_playing",
            message0: "音乐是否正在播放",
            args0: [],
            ...Block.valueBlock,
            output: "Boolean",
            inputsInline: true,
        },
        {
            type: "bn_music_current_time",
            message0: "当前播放进度（秒）",
            args0: [],
            ...Block.valueBlock,
            output: "Number",
            inputsInline: true,
        },
        {
            type: "bn_music_duration",
            message0: "音乐总时长（秒）",
            args0: [],
            ...Block.valueBlock,
            output: "Number",
            inputsInline: true,
        },
        {
            type: "bn_music_set_current_time",
            message0: "设置播放进度 %1 %2",
            args0: [
                {
                    type: "input_value",
                    name: "time",
                    check: "Number",
                    value: 0,
                },
                {
                    type: "field_dropdown",
                    name: "unit",
                    options: [
                        ["秒", "seconds"],
                        ["进度%", "percent"],
                    ],
                },
            ],
            ...Block.methodBlock,
            inputsInline: true,
        },
    ].map((block) => { return { ...block, colour: "%{BKY_MUSIC_HUE}" }; });
    await BN.waitBlockLoaded();
    BN.regBlocks(musicBlocks);
    // --------------------------------积木盒-------------------------------
    const musicXML = [
        Toolbox.title("音乐 · Music"),
        Toolbox.block("bn_music_init"),
        Toolbox.block("bn_music_play"),
        Toolbox.block("bn_music_pause"),
        Toolbox.block("bn_music_stop"),
        Toolbox.block("bn_music_set_volume"),
        Toolbox.block("bn_music_set_current_time"),
        Toolbox.block("bn_music_is_loaded"),
        Toolbox.block("bn_music_is_playing"),
        Toolbox.block("bn_music_current_time"),
        Toolbox.block("bn_music_duration"),
        Toolbox.flyout_bottom(),
    ];
    BN.regIcon('<symbol id="icon-music" viewBox="-217.81 -217.81 640.62 640.62"><path d="M153.699 71.824L129.645 114.4a25.6 25.6 0 1 1-0.33-18.458l18.157-32.131A59.04 59.04 0 0 0 104 44.8C71.302 44.8 44.8 71.302 44.8 104S71.302 163.2 104 163.2C136.694 163.2 163.2 136.694 163.2 104c0-11.866-3.488-22.912-9.501-32.176zM120.054 112.47l-0.054-0.029 0.33-0.582a16 16 0 1 0-0.275 0.614zM172.8 104C172.8 141.997 141.997 172.8 104 172.8S35.2 141.997 35.2 104 66.003 35.2 104 35.2 172.8 66.003 172.8 104z"></path></symbol>');
    BN.addToolbox("music", "icon-music", "#d4237a", musicXML);
    // --------------------------重复使用的对象-----------------------------
    let audioElement = null;
    let isInitialized = false;
    let audioContext = null;
    let hasUserInteraction = false;
    
    // 监听用户交互，解锁音频
    function unlockAudio() {
        if (!hasUserInteraction) {
            hasUserInteraction = true;
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            const silentAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
            silentAudio.volume = 0;
            silentAudio.play().catch(() => {});
            silentAudio.remove();
        }
    }
    // 监听各种用户交互事件
    const interactionEvents = ['click', 'touchstart', 'keydown', 'mousedown'];
    interactionEvents.forEach(event => {
        document.addEventListener(event, unlockAudio, { once: true, passive: true });
    });
    
    // ---------------------------解释器-------------------------------------
    await BN.waitRunmgrLoaded();
    BN.regMethod('bn_music_init', (params, _, __, ___) => {
        const url = params.url;
        if (audioElement) {
            audioElement.pause();
            audioElement = null;
        }
        audioElement = new Audio(url);
        audioElement.volume = 0.5;
        audioElement.preload = 'auto';
        isInitialized = true;
    });
    BN.regMethod('bn_music_play', (params, _, __, ___) => {
        if (!isInitialized || !audioElement) {
            console.warn('音乐未初始化，请先调用初始化音乐积木');
            return;
        }
        try {
            // 重置ended状态
            if (audioElement.ended) {
                audioElement.currentTime = 0;
            }
            audioElement.play().catch(error => {
                if (error.name === 'NotAllowedError') {
                    console.warn('播放被浏览器阻止：需要用户交互才能播放音频');
                } else if (error.name === 'AbortError') {
                    console.warn('播放请求被中断，尝试重新播放');
                    // 尝试重新播放
                    setTimeout(() => {
                        audioElement.play().catch(() => {});
                    }, 100);
                } else {
                    console.error('播放错误:', error);
                }
            });
        } catch (error) {
            console.error('播放错误:', error);
        }
    });
    BN.regMethod('bn_music_set_volume', (params, _, __, ___) => {
        if (!isInitialized || !audioElement) {
            console.warn('音乐未初始化，请先调用初始化音乐积木');
            return;
        }
        let volume = params.volume;
        if (volume < 0) volume = 0;
        if (volume > 100) volume = 100;
        audioElement.volume = volume / 100;
    });
    BN.regMethod('bn_music_pause', (params, _, __, ___) => {
        if (!isInitialized || !audioElement) {
            console.warn('音乐未初始化，请先调用初始化音乐积木');
            return;
        }
        audioElement.pause();
    });
    BN.regMethod('bn_music_stop', (params, _, __, ___) => {
        if (!isInitialized || !audioElement) {
            console.warn('音乐未初始化，请先调用初始化音乐积木');
            return;
        }
        audioElement.pause();
        audioElement.currentTime = 0;
        isInitialized = false;
        audioElement = null;
    });
    BN.regMethod('bn_music_is_loaded', (params, _, __, ___) => {
        return isInitialized && audioElement !== null;
    });
    BN.regMethod('bn_music_is_playing', (params, _, __, ___) => {
        if (!isInitialized || !audioElement) {
            return false;
        }
        return !audioElement.paused && !audioElement.ended;
    });
    BN.regMethod('bn_music_current_time', (params, _, __, ___) => {
        if (!isInitialized || !audioElement) {
            return 0;
        }
        return audioElement.currentTime;
    });
    BN.regMethod('bn_music_duration', (params, _, __, ___) => {
        if (!isInitialized || !audioElement) {
            return 0;
        }
        return audioElement.duration || 0;
    });
    BN.regMethod('bn_music_set_current_time', (params, _, __, ___) => {
        if (!isInitialized || !audioElement) {
            console.warn('音乐未初始化，请先调用初始化音乐积木');
            return;
        }
        let time = params.time;
        const unit = params.unit;
        const maxDuration = audioElement.duration || 0;
        
        if (isNaN(maxDuration) || maxDuration === Infinity) {
            console.warn('音乐时长未加载完成，无法设置播放进度');
            return;
        }
        
        if (unit === 'percent') {
            if (time < 0) {
                time = 0;
            }
            if (time > 100) {
                time = 100;
            }
            time = (time / 100) * maxDuration;
        } else {
            if (time < 0) {
                time = 0;
            }
            if (time > maxDuration) {
                time = maxDuration;
            }
        }
        if (time < 0) {
            time = 0;
        }
        if (time > maxDuration) {
            time = maxDuration;
        }
        try {
            const wasPlaying = !audioElement.paused && !audioElement.ended;
            
            // 避免设置到非常接近结束的位置
            if (time >= maxDuration - 0.1) {
                time = maxDuration - 0.1;
            }            
            // 重置ended状态
            if (audioElement.ended) {
                audioElement.ended = false;
            }
            // AbortError
            audioElement.pause();
            audioElement.currentTime = time;
            if (wasPlaying) {
                setTimeout(() => {
                    audioElement.play().catch(error => {
                        if (error.name !== 'AbortError') {
                            console.error('恢复播放失败:', error);
                        }
                    });
                }, 50);
            }
        } catch (error) {
            console.error('设置播放进度失败:', error);
            try {
                if (audioElement) {
                    audioElement.pause();
                    audioElement.currentTime = 0;
                }
            } catch (e) {
            }
        }
    });
    
    // ---------------------------运行时检测-----------------------------  
    setInterval(() => {
        if (!Runtime.heart.heart.get_runtime_data().is_running()) {
            // 当用户停止运行时，停止音乐
            if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0;
                isInitialized = false;
                audioElement = null;
            }
        }
    }, 100);
})();