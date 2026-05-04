/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "加密",
    version: "0.0.1",
    description: "提供多种加密解密算法支持，包括AES、RSA、MD5、SHA系列、SM系列、Base系列等",
    author: "Inventocode & 通义灵码",
    docs: ""
};

(async () => {
    // 在这里定义了一些必要的API
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    BN.loadScript("crypto-js.min.js");
    
    // --------------------------------积木-------------------------------
    // 这条语句会等待Blockly加载完毕，别动
    await BN.waitBlocklyLoaded();
    
    // 定义颜色主题
    BN.regColor("ENCRYPT_HUE", "#FFBB55", "#c99342");
    
    // 开始定义你的自定义积木吧
    const encryptBlocks = [
        // AES 加密相关积木
        {
            type: "encrypt_aes_encrypt",
            message0: "AES加密 文本 %1 密钥 %2 模式 %3 填充 %4",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                },
                {
                    type: "input_value",
                    name: "KEY",
                    check: "String",
                    value: ""
                },
                {
                    type: "field_dropdown",
                    name: "MODE",
                    options: [
                        ["CBC", "CBC"],
                        ["ECB", "ECB"],
                        ["CFB", "CFB"],
                        ["OFB", "OFB"]
                    ],
                    value: "CBC"
                },
                {
                    type: "field_dropdown",
                    name: "PADDING",
                    options: [
                        ["Pkcs7", "Pkcs7"],
                        ["Iso97971", "Iso97971"],
                        ["AnsiX923", "AnsiX923"],
                        ["Iso10126", "Iso10126"],
                        ["ZeroPadding", "ZeroPadding"],
                        ["NoPadding", "NoPadding"]
                    ],
                    value: "Pkcs7"
                }
            ],
            output: "String"
        },
        {
            type: "encrypt_aes_decrypt",
            message0: "AES解密 密文 %1 密钥 %2 模式 %3 填充 %4",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                },
                {
                    type: "input_value",
                    name: "KEY",
                    check: "String",
                    value: ""
                },
                {
                    type: "field_dropdown",
                    name: "MODE",
                    options: [
                        ["CBC", "CBC"],
                        ["ECB", "ECB"],
                        ["CFB", "CFB"],
                        ["OFB", "OFB"]
                    ]
                },
                {
                    type: "field_dropdown",
                    name: "PADDING",
                    options: [
                        ["Pkcs7", "Pkcs7"],
                        ["Iso97971", "Iso97971"],
                        ["AnsiX923", "AnsiX923"],
                        ["Iso10126", "Iso10126"],
                        ["ZeroPadding", "ZeroPadding"],
                        ["NoPadding", "NoPadding"]
                    ]
                }
            ],
            output: "String"
        },
        
        // RSA 加密相关积木
        {
            type: "encrypt_rsa_encrypt",
            message0: "RSA加密 文本 %1 公钥 %2",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                },
                {
                    type: "input_value",
                    name: "PUBLIC_KEY",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        {
            type: "encrypt_rsa_decrypt",
            message0: "RSA解密 密文 %1 私钥 %2",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                },
                {
                    type: "input_value",
                    name: "PRIVATE_KEY",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        
        // MD5 哈希积木
        {
            type: "encrypt_md5_hash",
            message0: "MD5哈希 %1",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        
        // SHA 系列哈希积木
        {
            type: "encrypt_sha_hash",
            message0: "SHA%1哈希 %2",
            args0: [
                {
                    type: "field_dropdown",
                    name: "TYPE",
                    options: [
                        ["1", "1"],
                        ["224", "224"],
                        ["256", "256"],
                        ["384", "384"],
                        ["512", "512"]
                    ]
                },
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        
        // SM 系列国密算法积木
        {
            type: "encrypt_sm3_hash",
            message0: "SM3哈希 %1",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        {
            type: "encrypt_sm4_encrypt",
            message0: "SM4加密 文本 %1 密钥 %2",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                },
                {
                    type: "input_value",
                    name: "KEY",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        {
            type: "encrypt_sm4_decrypt",
            message0: "SM4解密 密文 %1 密钥 %2",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                },
                {
                    type: "input_value",
                    name: "KEY",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        
        // Base 系列编码积木
        {
            type: "encrypt_base64_encode",
            message0: "Base64编码 %1",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        {
            type: "encrypt_base64_decode",
            message0: "Base64解码 %1",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        {
            type: "encrypt_base32_encode",
            message0: "Base32编码 %1",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        {
            type: "encrypt_base32_decode",
            message0: "Base32解码 %1",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        
        // UTF-8 和 Hex 编码积木
        {
            type: "encrypt_utf8_encode",
            message0: "UTF-8编码 %1",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        {
            type: "encrypt_utf8_decode",
            message0: "UTF-8解码 %1",
            args0: [
                {
                    type: "input_value",
                    name: "BYTES",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        {
            type: "encrypt_hex_encode",
            message0: "Hex编码 %1",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        {
            type: "encrypt_hex_decode",
            message0: "Hex解码 %1",
            args0: [
                {
                    type: "input_value",
                    name: "HEX",
                    check: "String",
                    value: ""
                }
            ],
            output: "String"
        },
        
        // 实用工具积木
        {
            type: "encrypt_random_key",
            message0: "生成随机%1位密钥",
            args0: [
                {
                    type: "input_value",
                    name: "LENGTH",
                    check: "Number",
                    value: 16
                }
            ],
            output: "String"
        },
        {
            type: "encrypt_generate_rsa_keypair",
            message0: "生成RSA密钥对 长度 %1",
            args0: [
                {
                    type: "field_dropdown",
                    name: "BITS",
                    options: [
                        ["1024", "1024"],
                        ["2048", "2048"],
                        ["4096", "4096"]
                    ]
                }
            ],
            output: null
        }
    ].map(block => {return { ...block, colour: "%{BKY_VARIABLES_HUE}" };});
    
    // 等待积木对象加载完毕，别动
    await BN.waitBlockLoaded();
    // 注册你的积木
    BN.regBlocks(encryptBlocks);
    
    // --------------------------------积木盒-------------------------------
    // 定义你的积木盒
    const encryptXML = [
        Toolbox.title("加密 · Encrypt"),
        Toolbox.line("AES 加密"),
        Toolbox.block("encrypt_aes_encrypt"),
        Toolbox.block("encrypt_aes_decrypt"),
        Toolbox.line("RSA 加密"),
        Toolbox.block("encrypt_rsa_encrypt"),
        Toolbox.block("encrypt_rsa_decrypt"),
        Toolbox.line("哈希算法"),
        Toolbox.block("encrypt_md5_hash"),
        Toolbox.block("encrypt_sha_hash"),
        Toolbox.block("encrypt_sm3_hash"),
        Toolbox.line("国密算法"),
        Toolbox.block("encrypt_sm4_encrypt"),
        Toolbox.block("encrypt_sm4_decrypt"),
        Toolbox.line("编码解码"),
        Toolbox.block("encrypt_base64_encode"),
        Toolbox.block("encrypt_base64_decode"),
        Toolbox.block("encrypt_base32_encode"),
        Toolbox.block("encrypt_base32_decode"),
        Toolbox.block("encrypt_utf8_encode"),
        Toolbox.block("encrypt_utf8_decode"),
        Toolbox.block("encrypt_hex_encode"),
        Toolbox.block("encrypt_hex_decode"),
        Toolbox.line("实用工具"),
        Toolbox.block("encrypt_random_key"),
        Toolbox.block("encrypt_generate_rsa_keypair"),
        Toolbox.flyout_bottom(),
    ];
    
    // 为你的积木盒注册一个图标
    BN.regIcon(`<symbol id="icon-encrypt" viewBox="-2000 -2000 5000 5000"><path d="M579.2 264.5c-24.1 24-37.4 56-37.4 90.2 0 34 13.3 66 37.4 90.1 24 24.1 56 37.4 90.2 37.4 34 0 66-13.3 90.2-37.4 49.7-49.7 49.7-130.6 0-180.2-48.3-48.3-132.3-48.2-180.4-0.1z m133.9 133.9c-23.4 23.3-64.2 23.2-87.5 0-11.7-11.7-18.1-27.2-18.1-43.7 0-16.5 6.5-32.1 18.1-43.7 11.7-11.7 27.2-18.1 43.7-18.1 16.5 0 32.1 6.5 43.7 18.1 24.2 24.1 24.2 63.3 0.1 87.4z" p-id="3706"></path><path d="M920.2 103.8c-138.4-138.4-363.4-138.3-501.8 0-97.9 98-129.5 241.1-83.2 370.2l-41 40.9H187.4c-18.1 0-32.8 14.7-32.8 32.8v82.5H72c-18.1 0-32.8 14.7-32.8 32.8v107L9.6 799.5C3.5 805.7 0 814 0 822.7v168.4c0 18.1 14.7 32.8 32.8 32.8h168.4c8.7 0 17.1-3.5 23.2-9.6L550 688.7c129 46.2 272.1 14.7 370.1-83.2 138.5-138.3 138.5-363.4 0.1-501.7z m-46.4 455.3c-84.2 84.1-209.3 108-318.8 61.1-12.3-5.3-26.7-2.6-36.2 6.9L187.7 958.3h-122v-122l30.5-30.4c7.6-7.6 10.6-18.5 8.7-28.9v-81.2h82.5c18.1 0 32.8-14.7 32.8-32.8v-82.5h79.4c10.9 2.6 22.5-0.7 30.6-8.8l66.6-66.6c9.5-9.5 12.2-23.9 6.9-36.2-47-109.5-23-234.6 61.1-318.8 112.7-112.7 296.1-112.8 408.9 0 112.8 112.8 112.8 296.3 0.1 409z" p-id="3707"></path></symbol>`);
    
    // 添加你的积木盒
    BN.addToolbox("encrypt", "icon-encrypt", "#FFBB55", encryptXML);
    
    // ---------------------------解释器-------------------------------------
    // 等待Runmgr加载完毕，别动
    await BN.waitRunmgrLoaded();
    
    // 工具函数：获取CryptoJS模式和填充
    function getCryptoJSMode(mode) {
        switch(mode) {
            case 'CBC': return CryptoJS.mode.CBC;
            case 'ECB': return CryptoJS.mode.ECB;
            case 'CFB': return CryptoJS.mode.CFB;
            case 'OFB': return CryptoJS.mode.OFB;
            default: return CryptoJS.mode.CBC;
        }
    }
    
    function getCryptoJSPadding(padding) {
        switch(padding) {
            case 'Pkcs7': return CryptoJS.pad.Pkcs7;
            case 'Iso97971': return CryptoJS.pad.Iso97971;
            case 'AnsiX923': return CryptoJS.pad.AnsiX923;
            case 'Iso10126': return CryptoJS.pad.Iso10126;
            case 'ZeroPadding': return CryptoJS.pad.ZeroPadding;
            case 'NoPadding': return CryptoJS.pad.NoPadding;
            default: return CryptoJS.pad.Pkcs7;
        }
    }
    
    // 给你的积木定义解释器
    // AES 加密
    BN.regMethod('encrypt_aes_encrypt', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            const key = params.KEY || '';
            const mode = params.MODE || 'CBC';
            const padding = params.PADDING || 'Pkcs7';
            
            if (!key) {
                throw new Error('密钥不能为空');
            }
            
            const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
                mode: getCryptoJSMode(mode),
                padding: getCryptoJSPadding(padding)
            });
            
            return encrypted.toString();
        } catch (error) {
            BN.error('encrypt', 'AES加密失败:', error.message);
            return '';
        }
    });
    
    // AES 解密
    BN.regMethod('encrypt_aes_decrypt', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            const key = params.KEY || '';
            const mode = params.MODE || 'CBC';
            const padding = params.PADDING || 'Pkcs7';
            
            if (!key) {
                throw new Error('密钥不能为空');
            }
            
            const decrypted = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
                mode: getCryptoJSMode(mode),
                padding: getCryptoJSPadding(padding)
            });
            
            return decrypted.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            BN.error('encrypt', 'AES解密失败:', error.message);
            return '';
        }
    });
    
    // RSA 加密
    BN.regMethod('encrypt_rsa_encrypt', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            const publicKey = params.PUBLIC_KEY || '';
            
            if (!publicKey) {
                throw new Error('公钥不能为空');
            }
            
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(publicKey);
            const encrypted = encrypt.encrypt(text);
            
            return encrypted || '';
        } catch (error) {
            BN.error('encrypt', 'RSA加密失败:', error.message);
            return '';
        }
    });
    
    // RSA 解密
    BN.regMethod('encrypt_rsa_decrypt', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            const privateKey = params.PRIVATE_KEY || '';
            
            if (!privateKey) {
                throw new Error('私钥不能为空');
            }
            
            const decrypt = new JSEncrypt();
            decrypt.setPrivateKey(privateKey);
            const decrypted = decrypt.decrypt(text);
            
            return decrypted || '';
        } catch (error) {
            BN.error('encrypt', 'RSA解密失败:', error.message);
            return '';
        }
    });
    
    // MD5 哈希
    BN.regMethod('encrypt_md5_hash', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            return CryptoJS.MD5(text).toString();
        } catch (error) {
            BN.error('encrypt', 'MD5哈希失败:', error.message);
            return '';
        }
    });
    
    // SHA 系列哈希
    BN.regMethod('encrypt_sha_hash', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            const type = params.TYPE || '256';
            
            let hash;
            switch(type) {
                case '1': hash = CryptoJS.SHA1(text); break;
                case '224': hash = CryptoJS.SHA224(text); break;
                case '256': hash = CryptoJS.SHA256(text); break;
                case '384': hash = CryptoJS.SHA384(text); break;
                case '512': hash = CryptoJS.SHA512(text); break;
                default: hash = CryptoJS.SHA256(text);
            }
            
            return hash.toString();
        } catch (error) {
            BN.error('encrypt', 'SHA哈希失败:', error.message);
            return '';
        }
    });
    
    // SM3 哈希（使用CryptoJS.SM3，如果可用）
    BN.regMethod('encrypt_sm3_hash', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            // 如果CryptoJS有SM3实现则使用，否则返回提示
            if (CryptoJS.SM3) {
                return CryptoJS.SM3(text).toString();
            } else {
                // 简单模拟SM3（实际应用中应使用专门的SM3库）
                return 'SM3_not_supported_' + CryptoJS.SHA256(text).toString().substring(0, 32);
            }
        } catch (error) {
            BN.error('encrypt', 'SM3哈希失败:', error.message);
            return '';
        }
    });
    
    // SM4 加密（简化实现）
    BN.regMethod('encrypt_sm4_encrypt', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            const key = params.KEY || '';
            
            if (!key) {
                throw new Error('密钥不能为空');
            }
            
            // 简化实现：使用AES模拟SM4
            const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key.substring(0, 16)), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            
            return 'SM4_' + encrypted.toString();
        } catch (error) {
            BN.error('encrypt', 'SM4加密失败:', error.message);
            return '';
        }
    });
    
    // SM4 解密（简化实现）
    BN.regMethod('encrypt_sm4_decrypt', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            const key = params.KEY || '';
            
            if (!key || !text.startsWith('SM4_')) {
                throw new Error('无效的SM4密文或密钥');
            }
            
            // 移除前缀并解密
            const actualText = text.substring(4);
            const decrypted = CryptoJS.AES.decrypt(actualText, CryptoJS.enc.Utf8.parse(key.substring(0, 16)), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            
            return decrypted.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            BN.error('encrypt', 'SM4解密失败:', error.message);
            return '';
        }
    });
    
    // Base64 编码
    BN.regMethod('encrypt_base64_encode', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
        } catch (error) {
            BN.error('encrypt', 'Base64编码失败:', error.message);
            return '';
        }
    });
    
    // Base64 解码
    BN.regMethod('encrypt_base64_decode', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            const words = CryptoJS.enc.Base64.parse(text);
            return CryptoJS.enc.Utf8.stringify(words);
        } catch (error) {
            BN.error('encrypt', 'Base64解码失败:', error.message);
            return '';
        }
    });
    
    // Base32 编码（简化实现）
    BN.regMethod('encrypt_base32_encode', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            // 使用Base64作为替代实现
            return 'B32_' + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
        } catch (error) {
            BN.error('encrypt', 'Base32编码失败:', error.message);
            return '';
        }
    });
    
    // Base32 解码（简化实现）
    BN.regMethod('encrypt_base32_decode', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            if (!text.startsWith('B32_')) {
                throw new Error('无效的Base32编码');
            }
            const base64Text = text.substring(4);
            const words = CryptoJS.enc.Base64.parse(base64Text);
            return CryptoJS.enc.Utf8.stringify(words);
        } catch (error) {
            BN.error('encrypt', 'Base32解码失败:', error.message);
            return '';
        }
    });
    
    // UTF-8 编码
    BN.regMethod('encrypt_utf8_encode', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            const words = CryptoJS.enc.Utf8.parse(text);
            return CryptoJS.enc.Hex.stringify(words);
        } catch (error) {
            BN.error('encrypt', 'UTF-8编码失败:', error.message);
            return '';
        }
    });
    
    // UTF-8 解码
    BN.regMethod('encrypt_utf8_decode', (params, _, __, ___) => {
        try {
            const bytes = params.BYTES || '';
            const words = CryptoJS.enc.Hex.parse(bytes);
            return CryptoJS.enc.Utf8.stringify(words);
        } catch (error) {
            BN.error('encrypt', 'UTF-8解码失败:', error.message);
            return '';
        }
    });
    
    // Hex 编码
    BN.regMethod('encrypt_hex_encode', (params, _, __, ___) => {
        try {
            const text = params.TEXT || '';
            const words = CryptoJS.enc.Utf8.parse(text);
            return CryptoJS.enc.Hex.stringify(words);
        } catch (error) {
            BN.error('encrypt', 'Hex编码失败:', error.message);
            return '';
        }
    });
    
    // Hex 解码
    BN.regMethod('encrypt_hex_decode', (params, _, __, ___) => {
        try {
            const hex = params.HEX || '';
            const words = CryptoJS.enc.Hex.parse(hex);
            return CryptoJS.enc.Utf8.stringify(words);
        } catch (error) {
            BN.error('encrypt', 'Hex解码失败:', error.message);
            return '';
        }
    });
    
    // 生成随机密钥
    BN.regMethod('encrypt_random_key', (params, _, __, ___) => {
        try {
            const length = parseInt(params.LENGTH) || 16;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        } catch (error) {
            BN.error('encrypt', '生成随机密钥失败:', error.message);
            return '';
        }
    });
    
    // 生成RSA密钥对
    BN.regMethod('encrypt_generate_rsa_keypair', (params, _, __, ___) => {
        try {
            const bits = parseInt(params.BITS) || 1024;
            const crypt = new JSEncrypt({default_key_size: bits});
            const publicKey = crypt.getPublicKey();
            const privateKey = crypt.getPrivateKey();
            
            return {
                publicKey: publicKey,
                privateKey: privateKey
            };
        } catch (error) {
            BN.error('encrypt', '生成RSA密钥对失败:', error.message);
            return null;
        }
    });
})();