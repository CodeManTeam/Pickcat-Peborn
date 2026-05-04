/// <reference path="../_TYPE.d.ts"/>


Extension.metaData = {
  name: "数组计算",
  version: "1.0.1",
  description: "提供各种常见的数组计算，使用numjs库",
  author: "皌 & DeepSeek",
  docs: ""
};

(async () => {
  // 在这里定义了一些必要的API
  /** @type {BetterNemo} */
  const BN = Extension.API;
  const Block = BN.Block;
  const Toolbox = BN.Toolbox;
    BN.loadScript("numjs.min.js");

  // --------------------------------积木-------------------------------
  // 这条语句会等待Blockly加载完毕，别动
  await BN.waitBlocklyLoaded();
  // 数组转换函数
  function arrayToString(arr) {
    if (typeof arr === 'string') return arr;
    if (Array.isArray(arr)) {
      return JSON.stringify(arr);
    }
    if (arr && arr.tolist) {
      return JSON.stringify(arr.tolist());
    }
    return String(arr);
  }

  function stringToArray(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      try {
        // 尝试解析形状字符串如 "(2, 3)"
        if (str.startsWith('(') && str.endsWith(')')) {
          const shapeStr = str.slice(1, -1);
          return shapeStr.split(',').map(Number);
        }
        return str;
      } catch (e2) {
        return str;
      }
    }
  }

  function getNJArray(str) {
    const arr = stringToArray(str);
    if (Array.isArray(arr)) {
      return nj.array(arr);
    }
    throw new Error('无法解析数组字符串: ' + str);
  }

  // 开始定义你的自定义积木吧
  const arrayBlocks = [
    // ========== 特殊数组创建 ==========
    // nj.arange
    {
      type: "list_ops_arange",
      message0: "等差序列 从 %1 到 %2 间隔 %3",
      args0: [{
        type: "input_value",
        name: "START",
        check: "Number",
        value: 1
      },
        {
          type: "input_value",
          name: "END",
          check: "Number",
          value: 5
        },
        {
          type: "input_value",
          name: "STEP",
          check: "Number",
          value: 1
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // nj.zeros
    {
      type: "list_ops_zeros",
      message0: "全零数组 形状 %1",
      args0: [{
        type: "input_value",
        name: "SHAPE",
        check: "String",
        value: "(2, 3)"
      }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // nj.ones
    {
      type: "list_ops_ones",
      message0: "全一数组 形状 %1",
      args0: [{
        type: "input_value",
        name: "SHAPE",
        check: "String",
        value: "(2, 3)"
      }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // nj.eye (单位矩阵)
    {
      type: "list_ops_eye",
      message0: "单位矩阵 大小 %1",
      args0: [{
        type: "input_value",
        name: "SIZE",
        check: "Number",
        align: "RIGHT",
        value: 3
      }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // nj.linspace
    {
      type: "list_ops_linspace",
      message0: "线性间隔 从 %1 到 %2 数量 %3",
      args0: [{
        type: "input_value",
        name: "START",
        check: "Number",
        align: "RIGHT",
        value: 1
      },
        {
          type: "input_value",
          name: "END",
          check: "Number",
          align: "RIGHT",
          value: 5
        },
        {
          type: "input_value",
          name: "COUNT",
          check: "Number",
          align: "RIGHT",
          value: 10
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // nj.random.rand
    {
      type: "list_ops_random",
      message0: "随机数组 形状 %1",
      args0: [{
        type: "input_value",
        name: "SHAPE",
        check: "String",
        value: "(2, 3)"
      }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },

    // ========== 数组转换 ==========
    // 从列表创建
    {
      type: "list_ops_create",
      message0: "创建数组 数据 %1",
      args0: [{
        type: "input_value",
        name: "DATA",
        check: "String",
        value: "[1, 2, 3]"
      }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 重塑形状
    {
      type: "list_ops_reshape",
      message0: "重塑形状 %1 为 %2",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "String",
        value: "[1, 2, 3, 4, 5, 6]"
      },
        {
          type: "input_value",
          name: "SHAPE",
          check: "String",
          value: "(2, 3)"
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 展平数组
    {
      type: "list_ops_flatten",
      message0: "展平 %1",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 转置数组
    {
      type: "list_ops_transpose",
      message0: "转置 %1",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },

    // ========== 数组运算 ==========
    // 元素级运算
    {
      type: "list_ops_operation",
      message0: " %1 %2 %3",
      args0: [{
        type: "input_value",
        name: "ARRAY1",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      },
        {
          type: "field_dropdown",
          name: "OPERATOR",
          options: [
            ["+",
              "add"],
            ["-",
              "subtract"],
            ["×",
              "multiply"],
            ["÷",
              "divide"],
            ["@",
              "dot"],
            ["*",
              "elementwise_multiply"]
          ]
        },
        {
          type: "input_value",
          name: "ARRAY2",
          check: ["String",
            "Number"],
          value: "[1, 2, 3, 4, 5]"
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 数学函数
    {
      type: "list_ops_math_func",
      message0: "计算 %1 %2",
      args0: [{
        type: "field_dropdown",
        name: "FUNCTION",
        options: [
          ["正弦",
            "sin"],
          ["余弦",
            "cos"],
          ["正切",
            "tan"],
          ["指数",
            "exp"],
          ["对数",
            "log"],
          ["平方根",
            "sqrt"],
          ["绝对值",
            "abs"]
        ]
      },
        {
          type: "input_value",
          name: "ARRAY",
          check: "String",
          value: "[1, 2, 3, 4, 5]"
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 点积
    {
      type: "list_ops_dot",
      message0: "点积 %1 和 %2",
      args0: [{
        type: "input_value",
        name: "ARRAY1",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      },
        {
          type: "input_value",
          name: "ARRAY2",
          check: "String",
          value: "[1, 2, 3, 4, 5]"
        }],
      output: "Number",
      colour: "%{LISTS_HUE}"
    },

    // ========== 基本统计 ==========
    // ========== 基本统计 ==========
    // 综合统计
    {
      type: "list_ops_statistics",
      message0: "%1 %2",
      args0: [{
        type: "field_dropdown",
        name: "STAT_TYPE",
        options: [
          ["求和",
            "sum"],
          ["平均值",
            "mean"],
          ["最小值",
            "min"],
          ["最大值",
            "max"],
          ["标准差",
            "std"],
          ["中位数",
            "median"]
        ]
      },
        {
          type: "input_value",
          name: "ARRAY",
          check: "String",
          value: "[1, 2, 3, 4, 5]"
        }],
      output: "Number",
      colour: "%{LISTS_HUE}"
    },
    // 沿轴统计
    {
      type: "list_ops_axis_operation",
      message0: "沿轴 %1 %2 %3",
      args0: [{
        type: "field_dropdown",
        name: "AXIS",
        options: [
          ["行",
            "0"],
          ["列",
            "1"]
        ]
      },
        {
          type: "field_dropdown",
          name: "STAT_TYPE",
          options: [
            ["求和",
              "sum"],
            ["平均",
              "mean"],
            ["最小",
              "min"],
            ["最大",
              "max"]
          ]
        },
        {
          type: "input_value",
          name: "ARRAY",
          check: "String",
          value: "[[1, 2], [3, 4]]"
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },

    // ========== 数组操作 ==========
    // 连接数组
    {
      type: "list_ops_concatenate",
      message0: "连接 %1 和 %2 方向 %3",
      args0: [{
        type: "input_value",
        name: "ARRAY1",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      },
        {
          type: "input_value",
          name: "ARRAY2",
          check: "String",
          value: "[1, 2, 3, 4, 5]"
        },
        {
          type: "field_dropdown",
          name: "AXIS",
          options: [
            ["水平",
              "1"],
            ["垂直",
              "0"]
          ]
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 切片
    {
      type: "list_ops_slice",
      message0: "切片 %1 从 %2 到 %3",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      },
        {
          type: "input_value",
          name: "START",
          check: "String",
          value: "0"
        },
        {
          type: "input_value",
          name: "END",
          check: "String",
          value: "3"
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 条件筛选
    {
      type: "list_ops_filter",
      message0: "筛选 %1 条件 %2",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      },
        {
          type: "input_value",
          name: "CONDITION",
          check: "String",
          value: "item > 0"
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 替换值
    {
      type: "list_ops_replace",
      message0: "替换 %1 中 %2 为 %3",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      },
        {
          type: "input_value",
          name: "OLD_VALUE",
          check: "String",
          value: "0"
        },
        {
          type: "input_value",
          name: "NEW_VALUE",
          check: ["String",
            "Number"],
          value: 1
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },

    // ========== 线性代数 ==========
    // 矩阵求逆
    {
      type: "list_ops_inverse",
      message0: "矩阵求逆 %1",
      args0: [{
        type: "input_value",
        name: "MATRIX",
        check: "String",
        value: "[[1, 2], [3, 4]]"
      }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 矩阵行列式
    {
      type: "list_ops_determinant",
      message0: "矩阵行列式 %1",
      args0: [{
        type: "input_value",
        name: "MATRIX",
        check: "String",
        value: "[[1, 2], [3, 4]]"
      }],
      output: "Number",
      colour: "%{LISTS_HUE}"
    },
    // 解方程
    {
      type: "list_ops_solve",
      message0: "解方程 A=%1 b=%2",
      args0: [{
        type: "input_value",
        name: "A",
        check: "String",
        value: "[[2, 1], [1, 2]]"
      },
        {
          type: "input_value",
          name: "B",
          check: "String",
          value: "[3, 3]"
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },

    // ========== 实用工具 ==========
    // 获取形状
    {
      type: "list_ops_shape",
      message0: "获取形状 %1",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 获取大小
    {
      type: "list_ops_size",
      message0: "获取大小 %1",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      }],
      output: "Number",
      colour: "%{LISTS_HUE}"
    },
    // 数组转字符串
    {
      type: "list_ops_to_string",
      message0: "数组转文本 %1",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 判断形状
    {
      type: "list_ops_check_shape",
      message0: "%1 的形状是 %2 吗？",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      },
        {
          type: "input_value",
          name: "TARGET_SHAPE",
          check: "String",
          value: "(2, 3)"
        }],
      output: "Boolean",
      colour: "%{LISTS_HUE}"
    },

    // ========== 高级功能 ==========
    // 广播运算
    {
      type: "list_ops_broadcast",
      message0: "广播运算 %1 %2 %3",
      args0: [{
        type: "input_value",
        name: "ARRAY1",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      },
        {
          type: "field_dropdown",
          name: "OPERATOR",
          options: [
            ["+",
              "add"],
            ["-",
              "subtract"],
            ["×",
              "multiply"],
            ["÷",
              "divide"]
          ]
        },
        {
          type: "input_value",
          name: "ARRAY2",
          check: "String",
          value: "[1, 2, 3, 4, 5]"
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 卷积运算（简化版）
    {
      type: "list_ops_convolve",
      message0: "卷积 %1 和 %2",
      args0: [{
        type: "input_value",
        name: "SIGNAL",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      },
        {
          type: "input_value",
          name: "KERNEL",
          check: "String",
          value: "[0.2, 0.6, 0.2]"
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 傅里叶变换
    {
      type: "list_ops_fft",
      message0: "傅里叶变换 %1",
      args0: [{
        type: "input_value",
        name: "SIGNAL",
        check: "String",
        value: "[1, 2, 3, 4]"
      }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },

    // ========== 排序和索引 ==========
    // 排序
    {
      type: "list_ops_sort",
      message0: "排序 %1 顺序 %2",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      },
        {
          type: "field_dropdown",
          name: "ORDER",
          options: [
            ["升序",
              "ascending"],
            ["降序",
              "descending"]
          ]
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 获取索引
    {
      type: "list_ops_get_index",
      message0: "获取索引 %1 的值 %2",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      },
        {
          type: "input_value",
          name: "INDEX",
          check: "String",
          value: "0"
        }],
      output: "Number",
      colour: "%{LISTS_HUE}"
    },
    // 查找位置
    {
      type: "list_ops_find_index",
      message0: "查找位置 %1 值 %2",
      args0: [{
        type: "input_value",
        name: "ARRAY",
        check: "String",
        value: "[1, 2, 3, 4, 5]"
      },
        {
          type: "input_value",
          name: "VALUE",
          check: ["String",
            "Number"],
          value: 0
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },

    // ========== 游戏/动画相关 ==========
    // 线性插值
    {
      type: "list_ops_lerp",
      message0: "线性插值 从 %1 到 %2 比例 %3",
      args0: [{
        type: "input_value",
        name: "START",
        check: "Number",
        value: 5
      },
        {
          type: "input_value",
          name: "END",
          check: "Number",
          value: 5
        },
        {
          type: "input_value",
          name: "RATIO",
          check: "Number",
          value: 0.5
        }],
      output: "Number",
      colour: "%{LISTS_HUE}"
    },
    // 颜色混合
    {
      type: "list_ops_color_blend",
      message0: "颜色混合 %1 和 %2 比例 %3",
      args0: [{
        type: "input_value",
        name: "COLOR1",
        check: "String",
        value: "[255, 0, 0]"
      },
        {
          type: "input_value",
          name: "COLOR2",
          check: "String",
          value: "[0, 0, 255]"
        },
        {
          type: "input_value",
          name: "RATIO",
          check: "Number",
          value: 0.5
        }],
      output: "String",
      colour: "%{LISTS_HUE}"
    },
    // 距离计算
    {
      type: "list_ops_distance",
      message0: "计算距离 点1 %1 点2 %2",
      args0: [{
        type: "input_value",
        name: "POINT1",
        check: "String",
        value: "[0, 0]"
      },
        {
          type: "input_value",
          name: "POINT2",
          check: "String",
          value: "[3, 4]"
        }],
      output: "Number",
      colour: "%{LISTS_HUE}"
    }];

  // 等待积木对象加载完毕，别动
  await BN.waitBlockLoaded();
  // 注册你的积木
  BN.regBlocks(arrayBlocks);

  // --------------------------------积木盒-------------------------------
  // 定义你的积木盒
  const arrayXML = [
    Toolbox.title("数组运算 · Array Operators"),
    Toolbox.line("特殊数组创建"),
    Toolbox.block("list_ops_arange"),
    Toolbox.block("list_ops_zeros"),
    Toolbox.block("list_ops_ones"),
    Toolbox.block("list_ops_eye"),
    Toolbox.block("list_ops_linspace"),
    Toolbox.block("list_ops_random"),
    Toolbox.line("数组转换"),
    Toolbox.block("list_ops_create"),
    Toolbox.block("list_ops_reshape"),
    Toolbox.block("list_ops_flatten"),
    Toolbox.block("list_ops_transpose"),
    Toolbox.line("数组运算"),
    Toolbox.block("list_ops_operation"),
    Toolbox.block("list_ops_math_func"),
    Toolbox.block("list_ops_dot"),
    Toolbox.line("基本统计"),
    Toolbox.block("list_ops_statistics"),
    Toolbox.block("list_ops_axis_operation"),
    Toolbox.line("数组操作"),
    Toolbox.block("list_ops_concatenate"),
    Toolbox.block("list_ops_slice"),
    Toolbox.block("list_ops_filter"),
    Toolbox.block("list_ops_replace"),
    Toolbox.line("线性代数"),
    Toolbox.block("list_ops_inverse"),
    Toolbox.block("list_ops_determinant"),
    Toolbox.block("list_ops_solve"),
    Toolbox.line("实用工具"),
    Toolbox.block("list_ops_shape"),
    Toolbox.block("list_ops_size"),
    Toolbox.block("list_ops_to_string"),
    Toolbox.block("list_ops_check_shape"),
    Toolbox.line("高级功能"),
    Toolbox.block("list_ops_broadcast"),
    Toolbox.block("list_ops_convolve"),
    Toolbox.block("list_ops_fft"),
    Toolbox.line("排序和索引"),
    Toolbox.block("list_ops_sort"),
    Toolbox.block("list_ops_get_index"),
    Toolbox.block("list_ops_find_index"),
    Toolbox.line("游戏/动画相关"),
    Toolbox.block("list_ops_lerp"),
    Toolbox.block("list_ops_color_blend"),
    Toolbox.block("list_ops_distance"),
    Toolbox.flyout_bottom(),
  ];

  // 为你的积木盒注册一个图标
  BN.regIcon(`<symbol id="icon-list-ops" viewBox="-1074 -1074 2864 2864">
                <path d="M 46.5,114.5 C 74.5079,114.167 102.508,114.5 130.5,115.5C 131.635,123.451 131.802,131.451 131,139.5C 128.578,144.256 124.745,147.09 119.5,148C 107.838,148.5 96.1714,148.667 84.5,148.5C 84.5,288.5 84.5,428.5 84.5,568.5C 96.5046,568.333 108.505,568.5 120.5,569C 125.274,570.298 128.774,573.132 131,577.5C 131.74,585.868 131.574,594.202 130.5,602.5C 102.498,602.667 74.498,602.5 46.5,602C 45.8742,601.25 45.3742,600.416 45,599.5C 44.3333,438.833 44.3333,278.167 45,117.5C 45.5133,116.473 46.0133,115.473 46.5,114.5 Z"/>
                <path d="M 586.5,114.5 C 614.502,114.333 642.502,114.5 670.5,115C 671.126,115.75 671.626,116.584 672,117.5C 672.667,277.833 672.667,438.167 672,598.5C 671.691,599.766 671.191,600.933 670.5,602C 642.494,602.833 614.494,602.667 586.5,601.5C 585.365,593.549 585.198,585.549 586,577.5C 587.833,574.333 590.333,571.833 593.5,570C 606.496,569.5 619.496,569.333 632.5,569.5C 632.5,429.167 632.5,288.833 632.5,148.5C 620.162,148.667 607.829,148.5 595.5,148C 590.333,146.833 587.167,143.667 586,138.5C 585.23,130.452 585.397,122.452 586.5,114.5 Z"/>
                <path d="M 184.5,160.5 C 290.834,160.333 397.167,160.5 503.5,161C 507.491,161.412 510.658,163.246 513,166.5C 524.333,192.5 535.667,218.5 547,244.5C 548.109,252.447 544.942,257.947 537.5,261C 531.5,261.667 525.5,261.667 519.5,261C 518.167,260.333 516.833,259.667 515.5,259C 510.372,250.574 504.872,242.408 499,234.5C 483.013,219.589 464.18,210.089 442.5,206C 428.58,203.68 414.58,202.013 400.5,201C 353.84,199.619 307.174,199.286 260.5,200C 296.211,249.255 332.044,298.422 368,347.5C 373.622,354.209 373.955,361.209 369,368.5C 328.981,413.685 289.147,459.018 249.5,504.5C 293.496,505.667 337.496,505.833 381.5,505C 403.326,504.501 424.993,502.501 446.5,499C 477.954,494.021 500.287,477.187 513.5,448.5C 514.5,447.667 515.5,446.833 516.5,446C 524.061,444.402 531.728,444.069 539.5,445C 545.629,448.423 548.129,453.59 547,460.5C 536.333,489.167 525.667,517.833 515,546.5C 513.073,551.428 509.573,554.594 504.5,556C 397.5,556.667 290.5,556.667 183.5,556C 172.886,553.287 168.386,546.454 170,535.5C 171.271,532.567 172.938,529.901 175,527.5C 219.393,477.61 263.226,427.277 306.5,376.5C 261.473,315.307 216.64,253.974 172,192.5C 167.977,182.942 168.811,173.942 174.5,165.5C 177.395,162.719 180.728,161.052 184.5,160.5 Z"/>
              </symbol>`);
  // 添加你的积木盒
  BN.addToolbox("list-ops", "icon-list-ops", "#f9a633", arrayXML);

  // ---------------------------解释器-------------------------------------
  // 等待Runmgr加载完毕，别动
  await BN.waitRunmgrLoaded();


  // ========== 特殊数组创建 ==========

  // 等差序列
  BN.regMethod('list_ops_arange', (params) => {
    try {
      const start = parseFloat(params.START) || 0;
      const end = parseFloat(params.END) || 10;
      const step = parseFloat(params.STEP) || 1;

      const arr = nj.arange(start, end, step);
      return arrayToString(arr);
    } catch (error) {
      BN.error('数组运算', '等差序列创建失败:', error.message);
      return '[]';
    }
  });

  // 全零数组
  BN.regMethod('list_ops_zeros', (params) => {
    try {
      const shapeStr = params.SHAPE || '(2, 3)';
      const shape = stringToArray(shapeStr);
      const arr = nj.zeros(shape);
      return arrayToString(arr);
    } catch (error) {
      BN.error('数组运算', '全零数组创建失败:', error.message);
      return '[]';
    }
  });

  // 全一数组
  BN.regMethod('list_ops_ones', (params) => {
    try {
      const shapeStr = params.SHAPE || '(2, 3)';
      const shape = stringToArray(shapeStr);
      const arr = nj.ones(shape);
      return arrayToString(arr);
    } catch (error) {
      BN.error('数组运算', '全一数组创建失败:', error.message);
      return '[]';
    }
  });

  // 单位矩阵
  BN.regMethod('list_ops_eye', (params) => {
    try {
      const size = parseInt(params.SIZE) || 3;
      const arr = nj.eye(size);
      return arrayToString(arr);
    } catch (error) {
      BN.error('数组运算', '单位矩阵创建失败:', error.message);
      return '[]';
    }
  });

  // 线性间隔
  BN.regMethod('list_ops_linspace', (params) => {
    try {
      const start = parseFloat(params.START) || 0;
      const end = parseFloat(params.END) || 10;
      const count = parseInt(params.COUNT) || 10;

      const arr = nj.linspace(start, end, count);
      return arrayToString(arr);
    } catch (error) {
      BN.error('数组运算', '线性间隔创建失败:', error.message);
      return '[]';
    }
  });

  // 随机数组
  BN.regMethod('list_ops_random', (params) => {
    try {
      const shapeStr = params.SHAPE || '(2, 3)';
      const shape = stringToArray(shapeStr);
      const arr = nj.random(shape);
      return arrayToString(arr);
    } catch (error) {
      BN.error('数组运算', '随机数组创建失败:', error.message);
      return '[]';
    }
  });

  // ========== 数组转换 ==========

  // 从列表创建
  BN.regMethod('list_ops_create', (params) => {
    try {
      const dataStr = params.DATA || '[1, 2, 3]';
      const data = stringToArray(dataStr);
      const arr = nj.array(data);
      return arrayToString(arr);
    } catch (error) {
      BN.error('数组运算', '数组创建失败:', error.message);
      return '[]';
    }
  });

  // 重塑形状
  BN.regMethod('list_ops_reshape', (params) => {
    try {
      const arrayStr = params.ARRAY || '[]';
      const shapeStr = params.SHAPE || '(2, 3)';

      const arr = getNJArray(arrayStr);
      const shape = stringToArray(shapeStr);
      const reshaped = arr.reshape(shape);
      return arrayToString(reshaped);
    } catch (error) {
      BN.error('数组运算', '重塑形状失败:', error.message);
      return '[]';
    }
  });

  // 展平数组
  BN.regMethod('list_ops_flatten', (params) => {
    try {
      const arrayStr = params.ARRAY || '[]';
      const arr = getNJArray(arrayStr);
      const flattened = arr.flatten();
      return arrayToString(flattened);
    } catch (error) {
      BN.error('数组运算', '展平数组失败:', error.message);
      return '[]';
    }
  });

  // 转置数组
  BN.regMethod('list_ops_transpose', (params) => {
    try {
      const arrayStr = params.ARRAY || '[]';
      const arr = getNJArray(arrayStr);
      const transposed = arr.T;
      return arrayToString(transposed);
    } catch (error) {
      BN.error('数组运算', '转置数组失败:', error.message);
      return '[]';
    }
  });

  // ========== 数组运算 ==========

  // 元素级运算
  BN.regMethod('list_ops_operation', (params) => {
    try {
      const array1Str = params.ARRAY1 || '[]';
      const operator = params.OPERATOR || 'add';
      const array2Str = params.ARRAY2 || '[]';

      const arr1 = getNJArray(array1Str);
      let result;

      // 判断第二个参数是数组还是标量
      const array2 = stringToArray(array2Str);
      let arr2;
      if (Array.isArray(array2)) {
        arr2 = nj.array(array2);
      } else {
        arr2 = parseFloat(array2Str) || 0;
      }

      switch (operator) {
        case 'add':
          result = arr1.add(arr2);
          break;
        case 'subtract':
          result = arr1.subtract(arr2);
          break;
        case 'multiply':
          result = arr1.multiply(arr2);
          break;
        case 'divide':
          result = arr1.divide(arr2);
          break;
        case 'dot':
          if (typeof arr2 === 'number') {
            result = arr1.multiply(arr2);
          } else {
            result = nj.dot(arr1, arr2);
          }
          break;
        case 'elementwise_multiply':
          result = arr1.multiply(arr2);
          break;
        default:
          result = arr1;
        }

        return arrayToString(result);
      } catch (error) {
        BN.error('数组运算', '数组运算失败:', error.message);
        return '[]';
      }
    });

    // 数学函数
    BN.regMethod('list_ops_math_func',
      (params) => {
        try {
          const func = params.FUNCTION || 'sin';
          const arrayStr = params.ARRAY || '[]';

          const arr = getNJArray(arrayStr);
          let result;

          switch (func) {
          case 'sin':
            result = nj.sin(arr);
            break;
          case 'cos':
            result = nj.cos(arr);
            break;
          case 'tan':
            result = nj.tan(arr);
            break;
          case 'exp':
            result = nj.exp(arr);
            break;
          case 'log':
            result = nj.log(arr);
            break;
          case 'sqrt':
            result = nj.sqrt(arr);
            break;
          case 'abs':
            result = nj.abs(arr);
            break;
          default:
            result = arr;
          }

          return arrayToString(result);
        } catch (error) {
          BN.error('数组运算', '数学函数计算失败:', error.message);
          return '[]';
        }
      });

    // 点积
    BN.regMethod('list_ops_dot',
      (params) => {
        try {
          const array1Str = params.ARRAY1 || '[]';
          const array2Str = params.ARRAY2 || '[]';

          const arr1 = getNJArray(array1Str);
          const arr2 = getNJArray(array2Str);

          // 展平并计算点积
          const vec1 = arr1.flatten();
          const vec2 = arr2.flatten();
          const result = nj.dot(vec1, vec2);

          // 递归提取标量值
          const extractScalar = (value) => {
            if (Array.isArray(value)) {
              return extractScalar(value[0]);
            }
            return value;
          };

          return extractScalar(result.tolist());
        } catch (error) {
          BN.error('array', '点积计算失败:', error.message);
          return 0;
        }
      });

    // ========== 基本统计 ==========

    // 综合统计
    BN.regMethod('list_ops_statistics',
      (params) => {
        try {
          const statType = params.STAT_TYPE || 'sum';
          const arrayStr = params.ARRAY || '[]';
          const arr = getNJArray(arrayStr);

          switch (statType) {
          case 'sum':
            return arr.sum();
          case 'mean':
            return arr.mean();
          case 'min':
            return arr.min();
          case 'max':
            return arr.max();
          case 'std':
            return arr.std();
          case 'median':
            const flatData = arr.flatten().tolist();
            flatData.sort((a, b) => a - b);
            const mid = Math.floor(flatData.length / 2);
            return flatData.length % 2 === 0 ?
            (flatData[mid - 1] + flatData[mid]) / 2:
            flatData[mid];
          default:
            return arr.sum();
          }
        } catch (error) {
          BN.error('数组运算', '统计计算失败:', error.message);
          return 0;
        }
      });

    // 沿轴统计
    BN.regMethod('list_ops_axis_operation',
      (params) => {
        try {
          const axis = parseInt(params.AXIS) || 0;
          const arrayStr = params.ARRAY || '[]';
          const operation = params.OPERATION || 'sum';

          const arr = getNJArray(arrayStr);
          let result;

          switch (operation) {
          case 'sum':
            result = arr.sum(axis);
            break;
          case 'mean':
            result = arr.mean(axis);
            break;
          case 'min':
            result = arr.min(axis);
            break;
          case 'max':
            result = arr.max(axis);
            break;
          default:
            result = arr;
          }

          return arrayToString(result);
        } catch (error) {
          BN.error('数组运算', '沿轴统计失败:', error.message);
          return '[]';
        }
      });

    // ========== 数组操作 ==========

    // 连接数组
    BN.regMethod('list_ops_concatenate',
      (params) => {
        try {
          const array1Str = params.ARRAY1 || '[]';
          const array2Str = params.ARRAY2 || '[]';
          const axis = parseInt(params.AXIS) || 0;

          const arr1 = getNJArray(array1Str);
          const arr2 = getNJArray(array2Str);
          const result = nj.concatenate([arr1, arr2], axis);

          return arrayToString(result);
        } catch (error) {
          BN.error('数组运算', '数组连接失败:', error.message);
          return '[]';
        }
      });

    // 切片
    BN.regMethod('list_ops_slice',
      (params) => {
        try {
          const arrayStr = params.ARRAY || '[]';
          const startStr = params.START || '0';
          const endStr = params.END || '3';

          const arr = getNJArray(arrayStr);
          const start = stringToArray(startStr);
          const end = stringToArray(endStr);

          // 简化实现：一维切片
          if (arr.shape.length === 1) {
            const startIdx = parseInt(start) || 0;
            const endIdx = parseInt(end) || arr.shape[0];
            const result = arr.slice([startIdx, endIdx]);
            return arrayToString(result);
          }

          return arrayToString(arr);
        } catch (error) {
          BN.error('数组运算', '数组切片失败:', error.message);
          return '[]';
        }
      });

    // 条件筛选（改进版）
    BN.regMethod('list_ops_filter',
      (params) => {
        try {
          const arrayStr = params.ARRAY || '[]';
          const condition = params.CONDITION || 'item > 0';

          const arr = getNJArray(arrayStr);
          const data = arr.flatten().tolist();

          // 使用eval创建过滤函数
          // 注意：这里使用Function构造函数比直接eval更安全
          const filterFunc = new Function('item', 'return ' + condition);

          const filtered = data.filter(item => {
            try {
              return filterFunc(item);
            } catch (e) {
              return false;
            }
          });

          return arrayToString(filtered);
        } catch (error) {
          BN.error('array', '条件筛选失败:', error.message);
          return '[]';
        }
      });

    // 替换值
    BN.regMethod('list_ops_replace',
      (params) => {
        try {
          const arrayStr = params.ARRAY || '[]';
          const oldValueStr = params.OLD_VALUE || '0';
          const newValueStr = params.NEW_VALUE || '1';

          const arr = getNJArray(arrayStr);
          const flatArr = arr.flatten();
          const data = flatArr.tolist();

          const oldValue = parseFloat(oldValueStr) || oldValueStr;
          const newValue = parseFloat(newValueStr) || newValueStr;

          const replaced = data.map(item => item == oldValue ? newValue: item);
          const result = nj.array(replaced).reshape(arr.shape);

          return arrayToString(result);
        } catch (error) {
          BN.error('数组运算', '值替换失败:', error.message);
          return '[]';
        }
      });

    // ========== 线性代数 ==========

    // 矩阵求逆
    BN.regMethod('list_ops_inverse',
      (params) => {
        try {
          const matrixStr = params.MATRIX || '[[1, 0], [0, 1]]';
          const matrix = getNJArray(matrixStr);

          // 检查是否为方阵
          if (matrix.shape.length !== 2 || matrix.shape[0] !== matrix.shape[1]) {
            throw new Error('矩阵必须是方阵才能求逆');
          }

          // 使用numjs的求逆方法（如果可用）
          if (matrix.inv) {
            const result = matrix.inv();
            return arrayToString(result);
          } else {
            // 简单实现：对于2x2矩阵
            if (matrix.shape[0] === 2) {
              const a = matrix.get(0, 0);
              const b = matrix.get(0, 1);
              const c = matrix.get(1, 0);
              const d = matrix.get(1, 1);
              const det = a * d - b * c;

              if (Math.abs(det) < 1e-10) {
                throw new Error('矩阵不可逆（行列式为0）');
              }

              const invDet = 1 / det;
              const result = nj.array([[d * invDet, -b * invDet], [-c * invDet, a * invDet]]);
              return arrayToString(result);
            }
            throw new Error('仅支持2x2矩阵求逆');
          }
        } catch (error) {
          BN.error('数组运算', '矩阵求逆失败:', error.message);
          return '[]';
        }
      });

    // 矩阵行列式
    BN.regMethod('list_ops_determinant',
      (params) => {
        try {
          const matrixStr = params.MATRIX || '[[1, 0], [0, 1]]';
          const matrix = getNJArray(matrixStr);

          // 检查是否为方阵
          if (matrix.shape.length !== 2 || matrix.shape[0] !== matrix.shape[1]) {
            throw new Error('矩阵必须是方阵才能计算行列式');
          }

          // 简单实现：对于2x2和3x3矩阵
          const size = matrix.shape[0];

          if (size === 2) {
            const a = matrix.get(0, 0);
            const b = matrix.get(0, 1);
            const c = matrix.get(1, 0);
            const d = matrix.get(1, 1);
            return a * d - b * c;
          } else if (size === 3) {
            const a = matrix.get(0, 0),
            b = matrix.get(0, 1),
            c = matrix.get(0, 2);
            const d = matrix.get(1, 0),
            e = matrix.get(1, 1),
            f = matrix.get(1, 2);
            const g = matrix.get(2, 0),
            h = matrix.get(2, 1),
            i = matrix.get(2, 2);
            return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
          } else {
            // 使用递归计算行列式
            if (matrix.det) {
              return matrix.det();
            } else {
              throw new Error('仅支持2x2和3x3矩阵行列式计算');
            }
          }
        } catch (error) {
          BN.error('数组运算', '矩阵行列式计算失败:', error.message);
          return 0;
        }
      });

    // 解方程
    BN.regMethod('list_ops_solve',
      (params) => {
        try {
          const aStr = params.A || '[[2, 1], [1, 2]]';
          const bStr = params.B || '[3, 3]';

          const A = getNJArray(aStr);
          const b = getNJArray(bStr);

          // 简单实现：使用逆矩阵求解（Ax = b => x = A^-1 * b）
          if (A.shape.length !== 2 || A.shape[0] !== A.shape[1]) {
            throw new Error('系数矩阵A必须是方阵');
          }

          // 对于2x2矩阵
          if (A.shape[0] === 2) {
            const a11 = A.get(0, 0),
            a12 = A.get(0, 1);
            const a21 = A.get(1, 0),
            a22 = A.get(1, 1);
            const det = a11 * a22 - a12 * a21;

            if (Math.abs(det) < 1e-10) {
              throw new Error('方程组无唯一解');
            }

            const b1 = b.get(0),
            b2 = b.get(1);
            const x1 = (a22 * b1 - a12 * b2) / det;
            const x2 = (-a21 * b1 + a11 * b2) / det;

            return arrayToString([x1, x2]);
          }

          throw new Error('仅支持2x2方程组求解');
        } catch (error) {
          BN.error('数组运算', '解方程失败:', error.message);
          return '[]';
        }
      });

    // ========== 实用工具 ==========

    // 获取形状
    BN.regMethod('list_ops_shape',
      (params) => {
        try {
          const arrayStr = params.ARRAY || '[]';
          const arr = getNJArray(arrayStr);
          return '(' + arr.shape.join(', ') + ')';
        } catch (error) {
          BN.error('数组运算', '获取形状失败:', error.message);
          return '()';
        }
      });

    // 获取大小
    BN.regMethod('list_ops_size',
      (params) => {
        try {
          const arrayStr = params.ARRAY || '[]';
          const arr = getNJArray(arrayStr);
          return arr.size;
        } catch (error) {
          BN.error('数组运算', '获取大小失败:', error.message);
          return 0;
        }
      });

    // 数组转字符串
    BN.regMethod('list_ops_to_string',
      (params) => {
        try {
          const arrayStr = params.ARRAY || '[]';
          const arr = getNJArray(arrayStr);
          return JSON.stringify(arr.tolist());
        } catch (error) {
          BN.error('数组运算', '数组转字符串失败:', error.message);
          return '[]';
        }
      });

    // 判断形状
    BN.regMethod('list_ops_check_shape',
      (params) => {
        try {
          const arrayStr = params.ARRAY || '[]';
          const targetShapeStr = params.TARGET_SHAPE || '(2, 3)';

          const arr = getNJArray(arrayStr);
          const targetShape = stringToArray(targetShapeStr);

          return JSON.stringify(arr.shape) === JSON.stringify(targetShape);
        } catch (error) {
          BN.error('数组运算', '判断形状失败:', error.message);
          return false;
        }
      });

    // ========== 高级功能 ==========

    // 广播运算
    BN.regMethod('list_ops_broadcast',
      (params) => {
        try {
          const array1Str = params.ARRAY1 || '[]';
          const operator = params.OPERATOR || 'add';
          const array2Str = params.ARRAY2 || '[]';

          const arr1 = getNJArray(array1Str);
          const arr2 = getNJArray(array2Str);
          let result;

          // 简单的广播实现：将小数组扩展到与大数组相同形状
          const broadcastArray = (small, large) => {
            const smallShape = small.shape;
            const largeShape = large.shape;

            if (smallShape.length !== largeShape.length) {
              throw new Error('维度不匹配，无法广播');
            }

            let resultData = [];
            const largeData = large.tolist();

            const broadcastRecursive = (smallData, largeData, dim) => {
              if (dim === smallShape.length) {
                return smallData;
              }

              if (smallShape[dim] === 1) {
                // 维度为1，可以广播
                const newSmallData = [];
                for (let i = 0; i < largeShape[dim]; i++) {
                  newSmallData.push(smallData);
                }
                return newSmallData;
              } else if (smallShape[dim] === largeShape[dim]) {
                // 维度相同，递归处理
                const result = [];
                for (let i = 0; i < smallData.length; i++) {
                  result.push(broadcastRecursive(smallData[i], largeData[i], dim + 1));
                }
                return result;
              } else {
                throw new Error('维度不匹配，无法广播');
              }
            };

            const broadcasted = broadcastRecursive(small.tolist(), largeData, 0);
            return nj.array(broadcasted);
          };

          // 确定哪个数组更小
          let broadcasted1 = arr1;
          let broadcasted2 = arr2;

          if (arr1.size < arr2.size) {
            broadcasted1 = broadcastArray(arr1, arr2);
          } else if (arr2.size < arr1.size) {
            broadcasted2 = broadcastArray(arr2, arr1);
          }

          switch (operator) {
          case 'add':
            result = broadcasted1.add(broadcasted2);
            break;
          case 'subtract':
            result = broadcasted1.subtract(broadcasted2);
            break;
          case 'multiply':
            result = broadcasted1.multiply(broadcasted2);
            break;
          case 'divide':
            result = broadcasted1.divide(broadcasted2);
            break;
          default:
            result = broadcasted1;
          }

          return arrayToString(result);
        } catch (error) {
          BN.error('数组运算', '广播运算失败:', error.message);
          return '[]';
        }
      });

    // 卷积运算（简化版）
    BN.regMethod('list_ops_convolve',
      (params) => {
        try {
          const signalStr = params.SIGNAL || '[1, 2, 3, 4, 5]';
          const kernelStr = params.KERNEL || '[0.2, 0.6, 0.2]';

          const signal = getNJArray(signalStr);
          const kernel = getNJArray(kernelStr);

          // 简化的一维卷积
          const signalData = signal.flatten().tolist();
          const kernelData = kernel.flatten().tolist();
          const resultLength = signalData.length - kernelData.length + 1;

          const result = [];
          for (let i = 0; i < resultLength; i++) {
            let sum = 0;
            for (let j = 0; j < kernelData.length; j++) {
              sum += signalData[i + j] * kernelData[j];
            }
            result.push(sum);
          }

          return arrayToString(result);
        } catch (error) {
          BN.error('数组运算', '卷积运算失败:', error.message);
          return '[]';
        }
      });

    // 傅里叶变换
    BN.regMethod('list_ops_fft',
      (params) => {
        try {
          const signalStr = params.SIGNAL || '[1, 2, 3, 4]';
          const signal = getNJArray(signalStr);
          const signalData = signal.flatten().tolist();

          // 简化的离散傅里叶变换（DFT）
          const N = signalData.length;
          const result = [];

          for (let k = 0; k < N; k++) {
            let real = 0;
            let imag = 0;
            for (let n = 0; n < N; n++) {
              const angle = -2 * Math.PI * k * n / N;
              real += signalData[n] * Math.cos(angle);
              imag += signalData[n] * Math.sin(angle);
            }
            // 返回幅度谱
            result.push(Math.sqrt(real * real + imag * imag));
          }

          return arrayToString(result);
        } catch (error) {
          BN.error('数组运算', '傅里叶变换失败:', error.message);
          return '[]';
        }
      });

    // ========== 排序和索引 ==========

    // 排序
    BN.regMethod('list_ops_sort',
      (params) => {
        try {
          const arrayStr = params.ARRAY || '[]';
          const order = params.ORDER || 'ascending';

          const arr = getNJArray(arrayStr);
          const data = arr.flatten().tolist();

          const sorted = data.slice().sort((a, b) => {
            if (order === 'ascending') {
              return a - b;
            } else {
              return b - a;
            }
          });

          const result = nj.array(sorted).reshape(arr.shape);
          return arrayToString(result);
        } catch (error) {
          BN.error('数组运算',
            '排序失败:',
            error.message);
          return '[]';
        }
      });

    // 获取索引
    BN.regMethod('list_ops_get_index', (params) => {
      try {
        const arrayStr = params.ARRAY || '[]';
        const indexStr = params.INDEX || '0';

        const arr = getNJArray(arrayStr);
        const index = stringToArray(indexStr);

        if (Array.isArray(index)) {
          // 多维索引
          if (index.length !== arr.shape.length) {
            throw new Error('索引维度与数组维度不匹配');
          }
          return arr.get(index);
        } else {
          // 一维索引或扁平化访问
          const flatArr = arr.flatten();
          const idx = parseInt(index) || 0;
          if (idx >= 0 && idx < flatArr.size) {
            return flatArr.get(idx);
          }
          return 0;
        }
      } catch (error) {
        BN.error('数组运算', '获取索引值失败:', error.message);
        return 0;
      }
    });

    // 查找位置
    BN.regMethod('list_ops_find_index',
      (params) => {
        try {
          const arrayStr = params.ARRAY || '[]';
          const valueStr = params.VALUE || '0';

          const arr = getNJArray(arrayStr);
          const data = arr.flatten().tolist();
          const value = parseFloat(valueStr) || valueStr;

          const indices = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i] == value) {
              indices.push(i);
            }
          }

          return arrayToString(indices);
        } catch (error) {
          BN.error('数组运算', '查找位置失败:', error.message);
          return '[]';
        }
      });

    // ========== 游戏/动画相关 ==========

    // 线性插值
    BN.regMethod('list_ops_lerp',
      (params) => {
        try {
          const start = parseFloat(params.START) || 0;
          const end = parseFloat(params.END) || 1;
          const ratio = parseFloat(params.RATIO) || 0.5;

          const clampedRatio = Math.max(0, Math.min(1, ratio));
          return start + (end - start) * clampedRatio;
        } catch (error) {
          BN.error('数组运算', '线性插值失败:', error.message);
          return 0;
        }
      });

    // 颜色混合
    BN.regMethod('list_ops_color_blend',
      (params) => {
        try {
          const color1Str = params.COLOR1 || '[255, 0, 0]';
          const color2Str = params.COLOR2 || '[0, 0, 255]';
          const ratio = parseFloat(params.RATIO) || 0.5;

          const color1 = stringToArray(color1Str);
          const color2 = stringToArray(color2Str);

          const clampedRatio = Math.max(0, Math.min(1, ratio));

          const blended = [
            Math.round(color1[0] * (1 - clampedRatio) + color2[0] * clampedRatio),
            Math.round(color1[1] * (1 - clampedRatio) + color2[1] * clampedRatio),
            Math.round(color1[2] * (1 - clampedRatio) + color2[2] * clampedRatio)
          ];

          return arrayToString(blended);
        } catch (error) {
          BN.error('数组运算', '颜色混合失败:', error.message);
          return '[0, 0, 0]';
        }
      });

    // 距离计算
    BN.regMethod('list_ops_distance',
      (params) => {
        try {
          const point1Str = params.POINT1 || '[0, 0]';
          const point2Str = params.POINT2 || '[3, 4]';

          const point1 = stringToArray(point1Str);
          const point2 = stringToArray(point2Str);

          if (point1.length !== point2.length) {
            throw new Error('点坐标维度不匹配');
          }

          let sum = 0;
          for (let i = 0; i < point1.length; i++) {
            const diff = point2[i] - point1[i];
            sum += diff * diff;
          }

          return Math.sqrt(sum);
        } catch (error) {
          BN.error('数组运算', '距离计算失败:', error.message);
          return 0;
        }
      });

  })();