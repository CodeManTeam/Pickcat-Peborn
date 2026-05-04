/// <reference path="../_TYPE.d.ts"/>
Extension.metaData = {
    name: "MQTT",
    version: "0.0.1",
    description: "基于MQTT.js，可以连接对WebSocket支持的MQTT服务器",
    author: "Inventocode",
    docs: "https://better-nemo.feishu.cn/wiki/HH4kwHOoJihAVLkEIDacNawKnMf"
};


(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    BN.loadScript("mqtt.min.js");
    // --------------------------------积木-------------------------------
    await BN.waitBlocklyLoaded();
    const mqttEventIconField = {
        type: "field_icon",
        is_head: true,
        src: "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzhweCIgaGVpZ2h0PSIzOHB4IiB2aWV3Qm94PSIwIDAgMzggMzgiIHZlcnNpb249IjEuMSI+CiAgICA8dGl0bGU+aWNuX2Jsb2NrbHlfaGVhZF9pbnRlcm5ldDwvdGl0bGU+CiAgICA8ZyBpZD0iaWNuX2Jsb2NrbHlfaGVhZF9pbnRlcm5ldCI+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0zIiBzdHJva2U9IiNiYjAwYmIiIHN0cm9rZS13aWR0aD0iMS4wOCIgZmlsbD0iI0ZGRkZGRiIgY3g9IjE5IiBjeT0iMTkiIHI9IjE4LjQ2Ii8+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy4wMDAwMDAsIDcuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOC42MTEzOTQxNSw5LjY4NTUzNzQ3IEM4LjYxMTM5NDE1LDkuNjg1NTM3NDcgMTAuMTQ2MTY5Myw5Ljc4MzcyNzc1IDEwLjQwNTUyMiw3Ljk2MDM3NDEgQzEwLjQwNTUyMiw3Ljk2MDM3NDEgMTMuNDQ0NjksOC4yNDMwNjU0MSAxNS44Njg0MzQyLDkuNjg1NTM3NDcgQzE1Ljg2ODQzNDIsOS42ODU1Mzc0NyAxNS4yODQzMzg3LDExLjUyOTkxNjkgMTYuNzg2NDE4NywxMi40MzI3NjI5IEMxNi43ODY0MTg3LDEyLjQzMjc2MjkgMTUuMjcxNTEyOSwxNC43MTg1NzgxIDExLjgyMjM0MjYsMTYuMzYwNzk0OCBDMTEuODIyMzQyNiwxNi4zNjA3OTQ4IDExLjE0MDE2MTksMTQuNzc1ODczMiA5LjM1NTM5MDU2LDE1LjA3MDEyODcgQzkuMzU2NTQ2OTgsMTUuMDcwMTI4NyA4LjYzMTI2MzQ5LDEzLjY2OTcwODIgOC42MTEzOTQxNSw5LjY4NTUzNzQ3IEw4LjYxMTM5NDE1LDkuNjg1NTM3NDcgWiBNOS41MTg5NzA5NSw1LjYxNDk1MDkxIEM5LjUxODk3MDk1LDUuNjE0OTUwOTEgMTAuMjk5MjM2OCw2LjI0NTcyMzYyIDEwLjMyODM1NzUsNi44MjAzNTc1NiBDMTAuMzI4MzU3NSw2LjgyMDM1NzU2IDEzLjYyNjg3ODIsNy4wMjU4ODQzMyAxNi40ODUxMTk2LDguODI1ODk5MzkgQzE2LjQ4NTExOTYsOC44MjU4OTkzOSAxNy43NjE4MDM2LDcuNzczNDU1MTIgMTguOTk2MzMwOSw4LjU1NzE5MDIyIEMxOC45OTYzMzA5LDguNTU3MTkwMjIgMTkuNjczODg1OSw3LjI5ODA2Mjc2IDE5LjgxNjMzNTUsNC45ODQxNzgyIEMxOS44MTYzMzU1LDQuOTg0MTc4MiAxNy4yNjUzODU1LDEuNjIwMjY3MzMgMTEuOTQzNzY2NCwxLjUgQzExLjk0MTQ1MzUsMS41MDExNTY0MiA5Ljg2NDczOTUyLDQuMzMzNjQxMjcgOS41MTg5NzA5NSw1LjYxNDk1MDkxIEw5LjUxODk3MDk1LDUuNjE0OTUwOTEgWiBNMjAuNzI4NTM3OSw2LjI5MzU1NzIyIEMyMC43Mjg1Mzc5LDYuMjkzNTU3MjIgMjMuMzg4MTkxMSw5LjM1Mzg1NjE1IDIyLjE4OTgyOCwxNC41NDgwNTkyIEMyMi4xODk4MjgsMTQuNTQ4MDU5MiAyMC43MTMzOTk0LDEyLjE2MDU4NDUgMTkuOTc4NjU0MywxMS42MDY5NzYzIEMxOS45Nzg2NTQzLDExLjYwNjk3NjMgMjAuNjM3NDk2NCwxMC4zMjY4MjMxIDE5Ljg4MTcyNTYsOS4zODI5NzY4MiBDMTkuODgxNzI1Niw5LjM4MTgyMDQxIDIwLjU4NDkzMiw4LjAwMjQyNTYyIDIwLjcyODUzNzksNi4yOTQ3MTM2MyBMMjAuNzI4NTM3OSw2LjI5MzU1NzIyIFogTTExLjM3MDI4ODksMTguODE0OTIxMiBDMTEuMzcwMjg4OSwxOC44MTQ5MjEyIDExLjgyNDY1NTUsMTguNjE2MzMyOSAxMS45OTI4NjE1LDE3LjUxMTMyNDIgQzExLjk5Mjg2MTUsMTcuNTExMzI0MiAxNS42NTIyODk0LDE2LjIyNTM4ODkgMTcuOTA4OTgzOSwxMi43NzQ5NTcxIEMxNy45MDg5ODM5LDEyLjc3NDk1NzEgMTguNjIzNzU0NSwxMi44MjE3Mzk0IDE5LjEyNDkwMzQsMTIuNDMyNzYyOSBDMTkuMTI0OTAzNCwxMi40MzI3NjI5IDIwLjgzMjUxMDMsMTQuMDI3MTQ2IDIxLjY0MjAwMTksMTYuMTEwOTAzNyBDMjEuNjQyMDAxOSwxNi4xMTA5MDM3IDIwLjA0ODc3NTIsMjAuNjY5NzA4MyAxNC44OTE4OTI5LDIyLjEzNTYyNDEgQzE0Ljg4OTU4MDEsMjIuMTM1NjI0MSAxMi41Njk5MTM0LDIwLjYyMTg3NDcgMTEuMzcwMjg4OSwxOC44MTM3NjQ4IEwxMS4zNzAyODg5LDE4LjgxNDkyMTIgWiBNMy44NDExNzU1MiwxOC42NTEzNDA4IEMzLjg0MTE3NTUyLDE4LjY1MTM0MDggNi42ODA1OTg4OCwyMy4wNDg5ODMgMTMuMjY3MTI3NSwyMi40NDM5NjY4IEMxMy4yNjcxMjc1LDIyLjQ0Mzk2NjggMTAuOTI3NTkxNSwyMC4yMTUzNDE3IDEwLjQ0NjQxNzEsMTkuNDk4MTUzMSBDMTAuNDQ2NDE3MSwxOS40OTgxNTMxIDguNjEyNTUwNTYsMTkuOTUzNzgxMyA3Ljk3OTQ2NTAyLDE4LjY1Mzc1ODcgQzcuOTc4MzA4NiwxOC42NTEzNDA4IDUuNjA5NTQ2ODIsMTkuMDA5OTM1MSAzLjg0MTE3NTUyLDE4LjY1MTM0MDggTDMuODQxMTc1NTIsMTguNjUxMzQwOCBaIE02LjA3OTA1MTk3LDguMTgyMzAwOTcgQzYuMDc5MDUxOTcsOC4xODIzMDA5NyAzLjQwMzEwMzg3LDguNzUyMzA5MjQgMS42ODM4Mjc3MiwxMC4wMjMxMDYgQzEuNjgzODI3NzIsMTAuMDIzMTA2IDAuNzg5MDc2NjMyLDEzLjgwMTY0NDggMi45NDc1ODA4NSwxNy4zMzUwMjMzIEMyLjk0NzU4MDg1LDE3LjMzNTAyMzMgNS4xNzE1ODAzLDE3LjgyMjA4NDkgNy40MDk1NjE4NywxNy41OTU0MjczIEM3LjQwOTU2MTg3LDE3LjU5NTQyNzMgNy4zOTQzMTgyLDE2LjE5Mzg1MDMgOC4zMDMwNTE0MiwxNS40OTI5NTY3IEM4LjMwMzA1MTQyLDE1LjQ5Mjk1NjcgNy4yMDA0NjA3MiwxMi42NDY0ODk3IDcuNDc0OTUxOTgsOS42MTc4MzQ1MyBDNy40NzQ5NTE5OCw5LjYxNjU3Mjk4IDYuMzM5NTYxMSw5LjM0MDkyNTMxIDYuMDgwMzEzNTIsOC4xODM0NTczOSBMNi4wNzkwNTE5Nyw4LjE4MjMwMDk3IFogTTIuMTM4MTk0MzMsOC4zOTYwMjc3OSBDMi4xMzgxOTQzMyw4LjM5NjAyNzc5IDMuOTg3MDk0MjcsMi43MTM2MDY3IDEwLjMzMDc3NTQsMS42Mzc4MjM4NCBDMTAuMzMwNzc1NCwxLjYzNzgyMzg0IDkuMzU3NzAzMzksMy4wMzcwODc5NyA4LjQzMjY3NTIxLDUuMjY4MDI1OTIgQzguNDMyNjc1MjEsNS4yNjgwMjU5MiA2LjQ4Njc0MTQsNS4wNTQyOTkxIDYuMDMxMjE4MzcsNy4wNDExMjgwMSBDNi4wMzEyMTgzNyw3LjA0MjI4NDQyIDMuOTUzMjQyODEsNy40MTg0MzUyMiAyLjEzNjkzMjc5LDguMzk2MDI3NzkgTDIuMTM4MTk0MzMsOC4zOTYwMjc3OSBaIiBpZD0i572R57ucIiBmaWxsPSIjYmIwMGJiIi8+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgo8L3N2Zz4=",
        width: 38,
        height: 38,
        alt: "*",
    };
    BN.regColor("MQTT_HUE", "#bb00bb", "#660066");
    const mqttBlocks = [
        {
            type: "bn_mqtt_connect",
            message0: "连接到 %1 地址 %2 客户端ID %3 用户 %4 密码 %5 重连间隔(ms) %6 连接超时(ms) %7",
            args0: [
                { type: "input_dummy" },
                {
                    type: "input_value",
                    name: "address",
                    check: "String",
                    value: "wss://bemfa.com:9504/wss",
                },
                {
                    type: "input_value",
                    name: "clientID",
                    check: "String",
                    value: "",
                },
                {
                    type: "input_value",
                    name: "user",
                    check: "String",
                    value: "",
                },
                {
                    type: "input_value",
                    name: "password",
                    check: "String",
                    value: "",
                },
                {
                    type: "input_value",
                    name: "reconnectPeriod",
                    check: "Number",
                    value: 2000,
                },
                {
                    type: "input_value",
                    name: "connectTimeout",
                    check: "Number",
                    value: 10000,
                },
            ],
            ...Block.methodBlock,
            inputsInline: false,
        },
        {
            type: "bn_mqtt_on_connect",
            message0: "%1 当 连接成功",
            args0: [mqttEventIconField],
            ...Block.eventBlock,
        },
        {
            type: "bn_mqtt_on_disconnect",
            message0: "%1 当 断开连接",
            args0: [mqttEventIconField],
            ...Block.eventBlock,
        },
        {
            type: "bn_mqtt_on_reconnect",
            message0: "%1 当 重新连接",
            args0: [mqttEventIconField],
            ...Block.eventBlock,
        },
        {
            type: "bn_mqtt_on_offline",
            message0: "%1 当 客户端下线",
            args0: [mqttEventIconField],
            ...Block.eventBlock,
        },
        {
            type: "bn_mqtt_on_error",
            message0: "%1 当 连接失败/出错 %2",
            args0: [
                mqttEventIconField,
                { type: "input_value", name: "param", check: "undefined" },
            ],
            ...Block.eventBlock,
        },
        {
            type: "bn_mqtt_on_error_message",
            text: "错误信息",
            output: "String",
            EventParam: {
                eventBlockId: "bn_mqtt_on_error",
                colorId: "MQTT_HUE",
            },
        },
        {
            type: "bn_mqtt_on_message",
            message0: "%1 当 收到消息 %2",
            args0: [
                mqttEventIconField,
                { type: "input_value", name: "param", check: "undefined" },
            ],
            ...Block.eventBlock,
        },
        {
            type: "bn_mqtt_on_message_message",
            text: "消息",
            output: "String",
            EventParam: {
                eventBlockId: "bn_mqtt_on_message",
                colorId: "MQTT_HUE",
            },
        },
        {
            type: "bn_mqtt_on_publish_error",
            message0: "%1 当 发布时出错 %2",
            args0: [
                mqttEventIconField,
                { type: "input_value", name: "param", check: "undefined" },
            ],
            ...Block.eventBlock,
        },
        {
            type: "bn_mqtt_on_publish_error_message",
            text: "错误信息",
            output: "String",
            EventParam: {
                eventBlockId: "bn_mqtt_on_publish_error",
                colorId: "MQTT_HUE",
            },
        },
        {
            type: "bn_mqtt_on_subscribe_error",
            message0: "%1 当 订阅时出错 %2",
            args0: [
                mqttEventIconField,
                { type: "input_value", name: "param", check: "undefined" },
            ],
            ...Block.eventBlock,
        },
        {
            type: "bn_mqtt_on_subscribe_error_message",
            text: "错误信息",
            output: "String",
            EventParam: {
                eventBlockId: "bn_mqtt_on_subscribe_error",
                colorId: "MQTT_HUE",
            },
        },
        {
            type: "bn_mqtt_publish",
            message0: "向主题 %1 发布消息 %2",
            args0: [
                {
                    type: "input_value",
                    name: "topic",
                    check: "String",
                    value: "light002",
                },
                {
                    type: "input_value",
                    name: "message",
                    check: "String",
                    value: "on",
                },
            ],
            ...Block.methodBlock,
        },
        {
            type: "bn_mqtt_subscribe",
            message0: "订阅主题 %1",
            args0: [
                {
                    type: "input_value",
                    name: "topic",
                    check: "String",
                    value: "light002",
                },
            ],
            ...Block.methodBlock,
        }
    ].map((block) => { return { ...block, colour: "%{BKY_MQTT_HUE}" }; });
    await BN.waitBlockLoaded();
    BN.regBlocks(mqttBlocks);
    // --------------------------------积木盒-------------------------------
    const mqttXML = [
        Toolbox.title("消息队列遥测传输协议 · MQTT"),
        Toolbox.block("bn_mqtt_on_connect"),
        Toolbox.block("bn_mqtt_on_reconnect"),
        Toolbox.block("bn_mqtt_on_disconnect"),
        Toolbox.block("bn_mqtt_on_offline"),
        Toolbox.simpleEventBlock("bn_mqtt_on_error", [
            "param",
            "bn_mqtt_on_error_message",
        ]),
        Toolbox.simpleEventBlock("bn_mqtt_on_message", [
            "param",
            "bn_mqtt_on_message_message",
        ]),
        Toolbox.simpleEventBlock("bn_mqtt_on_subscribe_error", [
            "param",
            "bn_mqtt_on_subscribe_error_message",
        ]),
        Toolbox.simpleEventBlock("bn_mqtt_on_publish_error", [
            "param",
            "bn_mqtt_on_publish_error_message",
        ]),
        Toolbox.block("bn_mqtt_connect"),
        Toolbox.block("bn_mqtt_publish"),
        Toolbox.block("bn_mqtt_subscribe"),
        Toolbox.flyout_bottom(),
    ];
    BN.regIcon('<symbol id="icon-mqtt" viewBox="-365 -365 1000 1000"><path d="M34.9,144c-0.2,0-0.4,0-0.6,0v77.6c0,5.6,4.6,10.2,10.2,10.2h79.9C123.7,183.3,83.8,144,34.9,144z"></path><path d="M34.9,80c-0.2,0-0.4,0-0.6,0v33c65.9,0.3,119.5,53.3,120.2,118.8h34.2C188.1,148,119.3,80,34.9,80z"></path><path d="M237.2,221.7v-70.1C214,94.8,167.3,50,109.1,29H44.5c-5.6,0-10.2,4.6-10.2,10.2V49   c101.4,0.3,183.9,82,184.5,182.8h8.2C232.6,231.8,237.2,227.3,237.2,221.7z"></path><path d="M210.5,57.3c9.4,9.4,19,21.3,26.7,31.8v-50c0-5.6-4.5-10.1-10.1-10.1h-51.5   C187.5,37.3,199.9,46.8,210.5,57.3z"></path></symbol>');
    BN.addToolbox("mqtt", "icon-mqtt", "#660066", mqttXML);
    // --------------------------重复使用的对象-----------------------------
    let mqttClient = undefined;
    // ---------------------------解释器-------------------------------------
    await BN.waitRunmgrLoaded();
    BN.regSimpleEvent('bn_mqtt_on_connect');
    BN.regSimpleEvent('bn_mqtt_on_disconnect');
    BN.regSimpleEvent('bn_mqtt_on_offline');
    BN.regSimpleEvent('bn_mqtt_on_error');
    BN.regSimpleEvent('bn_mqtt_on_message');
    BN.regSimpleEvent('bn_mqtt_on_reconnect');
    BN.regMethod('bn_mqtt_connect', (params, _, __, ___) => {
        const url = params.address;
        const clientId = params.clientID;
        const username = params.user;
        const password = params.password;
        const reconnectPeriod = params.reconnectPeriod;
        const connectTimeout = params.connectTimeout;
        const options = {
            clean: true,
            connectTimeout,
            clientId,
            username,
            password,
            reconnectPeriod,
        }
        mqttClient = mqtt.connect(url, options)
        mqttClient.on('connect', () => { BN.emitSimpleEvent('bn_mqtt_on_connect'); });
        mqttClient.on('reconnect', () => { BN.emitSimpleEvent('bn_mqtt_on_reconnect'); })
        mqttClient.on('close', () => { BN.emitSimpleEvent('bn_mqtt_on_disconnect'); })
        mqttClient.on('offline', () => { BN.emitSimpleEvent('bn_mqtt_on_offline'); })
        mqttClient.on('error', (error) => { BN.emitSimpleEvent('bn_mqtt_on_error', { msg: error }); })
        mqttClient.on('message', (_, payload, __) => { BN.emitSimpleEvent('bn_mqtt_on_message', { msg: payload.toString() }); })

    });
    BN.regMethod('bn_mqtt_publish', (params, _, __, ___) => {
        const topic = params.topic;
        const message = params.message;
        mqttClient.publish(topic, message, { qos: 0, retain: false }, function (error) {
            if (error)
                BN.emitSimpleEvent('bn_mqtt_on_publish_error', { msg: error });
        })
    });
    BN.regMethod('bn_mqtt_subscribe', (params, _, __, ___) => {
        const topic = params.topic;
        mqttClient.subscribe(topic, { qos: 0 }, function (error, _) {
            if (error)
                BN.emitSimpleEvent('bn_mqtt_on_subscribe_error', { msg: error });
        })
    });
    BN.regMethod('bn_mqtt_on_error_message', (_, __, ___, utils) => {
        const params = getEventParams(utils);
        if (params) return params.msg;
        return "ERROR_NOT_IN_ACTION"
    });
    BN.regMethod('bn_mqtt_on_message_message', (_, __, ___, utils) => {
        const params = getEventParams(utils);
        if (params) return params.msg;
        return "ERROR_NOT_IN_ACTION"
    });
    BN.regMethod('bn_mqtt_on_publish_error_message', (_, __, ___, utils) => {
        const params = getEventParams(utils);
        if (params) return params.msg;
        return "ERROR_NOT_IN_ACTION"
    });
    BN.regMethod('bn_mqtt_on_subscribe_error_message', (_, __, ___, utils) => {
        const params = getEventParams(utils);
        if (params) return params.msg;
        return "ERROR_NOT_IN_ACTION"
    });
})();