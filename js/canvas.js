/**
 * 画布共创主逻辑(基于jquery的Util)
 * @authors xiezuobing(948466)
 * @date    2017-07-31 15:03:43
 * @version v1.0
 */

(function(window) {
    var noop = function() {};

    var Creation = function(canvas, config) {
        if (!canvas || !canvas.getContext) {
            console.error("this is not a real canvas element Or your browser is not support canvas.");
            return false;
        }
        //宿主
        this.host = canvas;
        this.scaleRate = 1;
        this.config = {
            //二维码地址
            qrcodeImgUrl: 'images/qrcode.png',

            case: 1, //1：方案1（高性能方案），方案2（中低性能方案）
            //全局属性配置
            dragX: 0, //被拖拽的横向偏移
            dragY: 0, //被拖拽的竖向偏移

            pointX: 0, //当前被指向的横轴
            pointY: 0, //当前被指向的数轴

            //host宿主canvas的大小
            hostWidth: 0,
            hostHeight: 0,

            //canvas初始大小
            canvasWidth: 1000,
            canvasHeight: 1000,
            //图像是否居中
            alignCenter: true,

            //canvas基本配置
            scale: 1, //当前放大倍数
            singleScale: 4, //单词放大的倍数
            maxScale: 16, //最大放大倍数

            colors: {
                0x0: 'ff74cc',
                0x1: 'd91934',
                0x2: 'ffb61a',
                0x3: 'fff71a',
                0x4: '01ff70',
                0x5: '0c861a',
                0x6: '52dcff',
                0x7: '0000ff',
                0x8: '7324a5',
                0x9: '000000',
                0xA: '959595',
                0xB: 'ffffff'
            },

            //回调函数
            /**
             * [onPointChange 当做标点产生变化]
             * @param  {[type]} x [x坐标]
             * @param  {[type]} y [y坐标]
             * @return {[type]}   [description]
             */
            onPointChange: function(x, y) {},

            /**
             * [onSelect 被点击时调用]
             * @param  {[type]}  point     [当前点]
             * @param  {Boolean} confirm [前台是否着色，若着色则调用confirm(true),若为着色则调用confirm(false)]
             * @return {[type]}            [description]
             */
            onSelect: function(point, confirm) {},

            /**
             * [onDrag 当被拖拽的时候触发]
             * @param  {[type]} point [description]
             * @return {[type]}       [description]
             */
            onDrag: function(point) {},

            /**
             * [onModeChange 当画布模式改变]
             * @param  {[type]} flag [true为进入画笔模式，false为退出画笔模式]
             * @return {[type]}      [description]
             */
            onModeChange: function(flag) {},

            /**
             * [onDragToDown 当用户向下拖动画布]
             * @return {[type]} [description]
             */
            onDragToDown: function() {},

            /**
             * [onScaleChange 当scale发生变化]
             * @param  {[type]} scale [description]
             * @return {[type]}       [description]
             */
            onScaleChange: function(scale) {}
        };

        /**
         * [dragConfig 拖拽配置项]
         * @type {Object}
         */
        this.dragConfig = {
            dragX: 0, //保存拖拽的横坐标
            dragY: 0, //保存拖拽的竖坐标
            isDraging: false, //是否在拖拽
            isEnableGesture: false //是否触发手势事件
        };

        //是否在选择状态中
        this.selectConfig = {
            //是否被选中（改参数暂时无实际用途）
            isSelecting: false,
            //是否触发点击事件
            isClick: false

        };

        this.mode = {
            painMode: false,
            ctrlKey: false,
            altKey: false,
            shiftKey: false
        };

        //当前canvas合集
        this.canvas = {};

        //是否手机端
        this.isMobile = false;

        //当前的放大次数
        this.scaleCount = 0;

        //缓存的canvas
        this.ctx;

        //初始化
        this.minxInit(canvas, config);
    }

    $.extend(Creation.prototype, {

        /**
         * [dragEvent 拖拽事件]
         * @type {Object}
         */
        dragEvent: {
            start: ['mousedown', 'touchstart'],
            drag: ['mousemove', 'touchmove'],
            end: ['mouseup', 'touchend']
        },

        /**
         * [keyCode 按键代码]
         * @type {Object}
         */
        keyCode: {
            KEY_UP: 38,
            KEY_W: 87,
            KEY_RIGHT: 37,
            KEY_D: 65,
            KEY_DOWN: 40,
            KEY_S: 83,
            KEY_LEFT: 39,
            KEY_A: 68,
            KEY_REDUCE: 189,
            KEY_ENLARGE: 187,
            KEY_ESC: 27,
            KEY_B: 66
        },

        /**
         * [minxInit 初始化函数]
         * @param  {[type]} config [description]
         * @return {[type]}        [description]
         */
        minxInit: function(config) {
            this.setPlatform(); //设置平台
            this.initConfig(config); //配置初始化
            this.initCanvas(canvas); //初始化所有倍数的canvas数组
            // this.initEvent(); //初始化事件 -- (该项移入initData之后)

        },

        //加测是否手机端
        setPlatform: function() {
            // 检测userAgent
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {　　
                this.isMobile = true;
            }
        },

        /**
         * [initConfig 初始化配置]
         * @param  {[type]} config [description]
         * @return {[type]}        [description]
         */
        initConfig: function(config) {
            config = config || {};
            for (var key in config) {
                if ((key in this.config) && config[key] !== undefined) {
                    this.config[key] = config;
                }
            }
        },

        /**
         * [initHost 初始化host宿主]
         * @return {[type]} [description]
         */
        setHostSize: function() {
            this.host.width = this.config.hostWidth || document.documentElement.clientWidth;
            this.host.height = this.config.hostHeight || document.documentElement.clientHeight;

        },

        /**
         * [initCanvas 初始化canvas图层]
         * @return {[type]} [description]
         */
        initCanvas: function() {
            this.setHostSize();
            this.setAlignCenter();
            if (this.config.case == 1 && !this.isNotSmothing()) this.config.case = 2;
            //初始化的个数(这里是初始化的个数，原来是10倍都加载，self.config.maxScale，现在变成配置加载少于最大倍数的个数)
            var initRenderCount = parseInt(this.config.maxScale / this.config.singleScale);
            if (this.config.case == 1) {
                initRenderCount = 0;
            }
            for (var i = 0; i <= initRenderCount; i++) {
                var index = this.getScaleByIndex(i);
                this.getCanvas(index); //初始化每个canvas的参考线
            }
        },

        isNotSmothing: function() {
            var ctx = this.host.getContext('2d');
            return 'imageSmoothingEnabled' in ctx ||
                'mozImageSmoothingEnabled' in ctx ||
                'webkitImageSmoothingEnabled' in ctx ||
                'msImageSmoothingEnabled' in ctx;
        },

        /**
         * [getScaleByIndex 获取按8倍增大的倍数]
         * @param  {[type]} n [description]
         * @return {[type]}   [description]
         */
        getScaleByIndex: function(n) {
            return [(0.5 - n) / Math.abs(0.5 - n) + 1] / 2 + this.config.singleScale * n;
        },

        /**
         * [setAlignCenter 画布图像居中]
         */
        setAlignCenter: function() {
            if (!this.config.alignCenter) return;
            var width = this.host.width,
                height = this.host.height;
            this.config.dragX = parseInt((width - this.config.canvasWidth) / 2);
            this.config.dragY = parseInt((height - this.config.canvasHeight) / 2);
        },

        /**
         * [getCanvas 生成对应放大尺寸的canvas]
         * @param  {[type]} scale [description]
         * @return {[type]}       [description]
         */
        getCanvas: function(scale) {
            if (this.canvas[scale]) return this.canvas[scale];
            var canvas = document.createElement('canvas');
            canvas.width = this.config.canvasWidth * scale;
            canvas.height = this.config.canvasHeight * scale;
            canvas.scale = scale;
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            this.canvas[scale] = canvas;
            return canvas;
        },

        /**
         * [initEvent 初始化事件]
         * @return {[type]} [description]
         */
        initEvent: function() {
            //绑定resize事件
            this.bindResize();
            //1.鼠标放大操作绑定
            this.bindMouseWheel();
            //2.键盘放大操作绑定
            //2.键盘平移
            this.bindKeyEvent();
            //1.鼠标拖动
            this.bindDragEvent();
        },

        /**
         * [bindResize size变化事件]
         * @return {[type]} [description]
         */
        bindResize: function() {
            var self = this;
            window.addEventListener("resize", function() {
                self.setHostSize();
                self.renderSaveHost();
            }, false);
        },

        /**
         * [bindMouseWheel 绑定鼠标事件]
         * @return {[type]} [description]
         */
        bindMouseWheel: function() {
            var self = this;
            var mouseWheel = "onmousewheel" in window ? "mousewheel" : "DOMMouseScroll";

            self.host.addEventListener(mouseWheel, function(e) {
                if (e.wheelDelta > 0 && self.config.scale + 1 <= self.config.maxScale) {
                    self.changeScale(true)
                }
                if (e.wheelDelta < 0 && self.config.scale - 1 >= 1) {
                    self.changeScale(false)
                }
            }, false);
        },

        /**
         * [bindKeyEvent 绑定键盘事件]
         * @return {[type]} [description]
         */
        bindKeyEvent: function() {
            var self = this;
            window.addEventListener("keydown", function(e) {
                $.extend(self.mode, {
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey
                });
                var keycode = window.event ? e.keyCode : e.which;
                switch (keycode) {
                    //上移
                    case self.keyCode.KEY_UP:
                    case self.keyCode.KEY_W:
                        self.config.dragY -= 40;
                        self.renderSaveHost();
                        break;
                        //右移
                    case self.keyCode.KEY_RIGHT:
                    case self.keyCode.KEY_D:
                        self.config.dragX -= 40;
                        self.renderSaveHost();
                        break;
                        //下移
                    case self.keyCode.KEY_DOWN:
                    case self.keyCode.KEY_S:
                        self.config.dragY += 40;
                        self.renderSaveHost();
                        break;
                        //左移
                    case self.keyCode.KEY_LEFT:
                    case self.keyCode.KEY_A:
                        self.config.dragX += 40;
                        self.renderSaveHost();
                        break;
                        //缩小
                    case self.keyCode.KEY_REDUCE:
                        self.changeScale(false);
                        break;
                        //放大
                    case self.keyCode.KEY_ENLARGE:
                        self.changeScale(true);
                        break;
                    case self.keyCode.KEY_B:
                        //进入画笔模式
                        self.mode.painMode = true;

                        break;
                    case self.keyCode.KEY_ESC:
                        //退出画笔模式
                        self.mode.painMode = false;
                        break;
                    default:
                        break;
                }
                self.config.onModeChange(self.mode);
            }, false);
            window.addEventListener('keyup', function(e) {
                $.extend(self.mode, {
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey
                });
                self.config.onModeChange(self.mode);
            }, false);
        },



        /**
         * [bindDragEvent 绑定拖拽事件]
         * @return {[type]} [description]
         */
        bindDragEvent: function() {
            var self = this;
            //鼠标按下事件
            var host = self.host;
            var dragEvent = self.dragEvent;
            //gestureStart
            var gestureStart = [];

            //拖拽开始事件
            $(dragEvent.start).each(function() {
                host.addEventListener(this, function(e) {
                    e.preventDefault();
                    self.selectConfig.isClick = true; //设置点击事件触发标志
                    self.dragEventFilter(e, function(evet) {
                        self.startDrag(evet);
                    }, function() {
                        self.dragConfig.isEnableGesture = true;
                        gestureStart = e.touches;
                        self.gesturestart && self.gesturestart.call(self);
                    });
                }, false);
            });

            //拖拽中
            $(dragEvent.drag).each(function() {
                host.addEventListener(this, function(e) {
                    //设置当前事件不触发click事件
                    if (self.dragConfig.isDraging) {
                        self.selectConfig.isClick = false;
                    }
                    self.dragEventFilter(e, function(evet) {
                        self.drag(evet);
                    }, function() {
                        if (!self.dragConfig.isEnableGesture) return;
                        var now = e.touches;
                        var scale = self.getDistance(now[0], now[1]) / self.getDistance(gestureStart[0], gestureStart[1]);
                        e.scale = scale.toFixed(2);
                        self.gesturemove && self.gesturemove.call(self, e);
                    });
                }, false)
            });

            //拖拽结束
            $(dragEvent.end).each(function() {
                host.addEventListener(this, function(e) {
                    if (self.selectConfig.isClick) self.selectHandler(e);
                    self.dragEventFilter(e, function(evet) {
                        self.endDrag(evet);
                    }, function() {
                        if (self.dragConfig.isEnableGesture) {
                            self.dragConfig.isEnableGesture = false;
                            self.gestureend && self.gestureend.call(self);
                        };
                    });
                }, false)
            });
        },

        /**
         * [dragEventFilter description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        dragEventFilter: function(e, drag, gesture) {
            if (e.touches) {
                if (e.touches.length == 1) drag(e.touches[0]);
                else if (e.touches.length >= 2) gesture(e);
            } else {
                drag(e);
            }
        },

        /**
         * [startDrag 开始拖拽处理事件]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        startDrag: function(e) {
            this.dragConfig.dragX = e.clientX
            this.dragConfig.dragY = e.clientY
            this.dragConfig.isDraging = true;
        },

        /**
         * [drag 拖拽处理事件]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        drag: function(e) {
            var offset = $(this.host).offset();
            var x = e.clientX - offset.left - this.config.dragX;
            var y = e.clientY - offset.top - this.config.dragY;
            var originPointX = this.config.pointX;
            var originPointY = this.config.pointY;
            this.config.pointX = parseInt(x / this.config.scale);
            this.config.pointY = parseInt(y / this.config.scale);
            if (!this.isInPainterRage()) {
                return;
            }
            //当左边改变时
            if (originPointX != this.config.pointX || originPointY != this.config.pointY) this.config.onPointChange.call(this, {
                posX: e.clientX,
                posY: e.clientY,
                x: this.config.pointX,
                y: this.config.pointY
            });
            if (!this.dragConfig.isDraging) {
                return;
            }
            this.config.onDrag.call(this, {
                posX: e.clientX,
                posY: e.clientY
            });
            if ((this.mode.painMode && !this.mode.ctrlKey) && !this.isMobile) return;
            var deltaY = e.clientY - this.dragConfig.dragY;
            this.config.onDragToDown.call(this, !!(deltaY > 0));
            this.config.dragX += e.clientX - this.dragConfig.dragX;
            this.config.dragY += e.clientY - this.dragConfig.dragY;
            this.dragConfig.dragX = e.clientX;
            this.dragConfig.dragY = e.clientY;

            this.renderSaveHost();
        },

        /**
         * [endDrag 结束拖拽处理事件]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        endDrag: function(e) {
            this.dragConfig.isDraging = false;
        },

        /**
         * [gesturemove 手势事件]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        gesturemove: function(e) {
            if (e.scale > 1.5) this.changeScale(true);
            else if (e.scale < 1.5) this.changeScale(false);
        },

        /**
         * [bindSelectEvent 选中事件处理]
         * @return {[type]} [description]
         */
        selectHandler: function(e) {
            if (!this.isInPainterRage()) {
                return;
            }

            this.selectConfig.isSelecting = true;
            var offset = $(this.host).offset();
            this.config.onSelect.call(self, {
                posX: this.config.pointX * this.config.scale + this.config.dragX + offset.left,
                posY: this.config.pointY * this.config.scale + this.config.dragY + offset.top,
                x: this.config.pointX,
                y: this.config.pointY,
                canvas: this.canvas[this.config.scale]
            }, function(flag) {
                this.selectConfig.isSelecting = false;
            });

        },

        /**
         * [initData 初始化绘图数据（外部调用）]
         * @param  {[type]} data [{
         *                          x:0,
         *                          y:0,
         *                          color: rgba
         *                       }]
         * @return {[type]}      [description]
         */
        initData: function(data) {
            this.initColorUtil();
            //渲染
            if (this.config.case == 1) {
                this.loadImageByBitMap(data, this.canvas[1]);
            } else {
                this.renderData(null, null, null, data);
            }
            //初始化事件
            this.initEvent();
            if (this.isMobile) {
                this.config.onModeChange.call(this, this.mode.painMode = true);
            }
            //绘制图像到显示屏中
            this.renderSaveHost();
            // this.loadImageByBitMap(data);
        },

        initColorUtil: function() {
            //十六进制颜色值的正则表达式  
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            /*RGB颜色转换为16进制*/
            String.prototype.colorHex = function() {
                var that = this;
                if (/^(rgb|RGB)/.test(that)) {
                    var aColor = that.replace(/(?:||rgb|RGB)*/g, "").split(",");
                    var strHex = "#";
                    for (var i = 0; i < aColor.length; i++) {
                        var hex = Number(aColor[i]).toString(16);
                        if (hex === "0") {
                            hex += hex;
                        }
                        strHex += hex;
                    }
                    if (strHex.length !== 7) {
                        strHex = that;
                    }
                    return strHex;
                } else if (reg.test(that)) {
                    var aNum = that.replace(/#/, "").split("");
                    if (aNum.length === 6) {
                        return that;
                    } else if (aNum.length === 3) {
                        var numHex = "#";
                        for (var i = 0; i < aNum.length; i += 1) {
                            numHex += (aNum[i] + aNum[i]);
                        }
                        return numHex;
                    }
                } else {
                    return that;
                }
            };

            //-------------------------------------------------  

            /*16进制颜色转为RGB格式*/
            String.prototype.colorRgb = function() {
                var sColor = this.toLowerCase();
                if (sColor && reg.test(sColor)) {
                    if (sColor.length === 4) {
                        var sColorNew = "#";
                        for (var i = 1; i < 4; i += 1) {
                            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                        }
                        sColor = sColorNew;
                    }
                    //处理六位的颜色值  
                    var sColorChange = [];
                    for (var i = 1; i < 7; i += 2) {
                        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                    }
                    return sColorChange;
                } else {
                    return sColor;
                }
            };
        },
        /**
         * [renderData 渲染数据]
         * @param  {[type]} canvas   [description]
         * @param  {[type]} noUpdate [description]
         * @return {[type]}          [description]
         */
        renderData: function(canvas, cb, context, data) {
            var self = context || this;
            var x = 0,
                y = 0;
            var drawRect = !!canvas ? self.drawSingleRect : self.drawRect;
            for (var i = 0, l = data.length; i < l; i++) {
                if (data[i] == undefined || !self.config.colors[data[i]]) continue;
                x = parseInt(i / self.config.canvasHeight);
                y = i % self.config.canvasWidth;
                drawRect.call(self, x, y, data[i], canvas);
            }
            if (cb) cb();
        },

        /**
         * [changeScale 放大缩小]
         * @param  {[type]} flag [description]
         * @return {[type]}      [description]
         */
        changeScale: function(flag) {
            var x = this.config.pointX,
                y = this.config.pointY;
            var number = 1;
            // if (!this.isInPainterRage()) {
            //     return;
            // }
            if (flag && this.getScaleByIndex(this.scaleCount + 1) <= this.config.maxScale) {
                this.scaleCount++;
                number = this.getScaleByIndex(this.scaleCount) - this.config.scale;
                this.config.scale = this.getScaleByIndex(this.scaleCount);
                this.config.dragX -= x * number;
                this.config.dragY -= y * number;
            }
            if (!flag && this.getScaleByIndex(this.scaleCount - 1) >= 1) {
                this.scaleCount--;
                number = this.config.scale - this.getScaleByIndex(this.scaleCount);
                this.config.scale = this.getScaleByIndex(this.scaleCount);
                this.config.dragX += x * number;
                this.config.dragY += y * number;
            }
            this.config.onScaleChange.call(this, this.config.scale);
            this.renderSaveHost();
        },

        /**
         * [drawRect 绘制矩形区域]
         * @param  {[number]} x      [positionX]
         * @param  {[number]} y      [positionY]
         * @param  {[String]} color  [color]
         * @param  {[canvasElement]} canvas [canvasElement]
         * @return {[void]}        [void]
         */
        drawRect: function(x, y, color) {

            for (var key in this.canvas) {
                this.ctx = this.canvas[key].getContext('2d');
                this.drawSingleRect(x, y, color, this.canvas[key], this.ctx);
            }
        },

        /**
         * [drawSingleRect 绘制单个矩形区域]
         * @param  {[number]} x      [positionX]
         * @param  {[number]} y      [positionY]
         * @param  {[String]} color  [color]
         * @param  {[canvasElement]} canvas [canvasElement]
         * @return {[void]}        [void]
         */
        drawSingleRect: function(x, y, color, canvas, ctx) {
            // ctx = canvas.getContext('2d');
            ctx.fillStyle = $.isNumeric(color) ? '#' + this.config.colors[color] : color;
            ctx.fillRect(x * canvas.scale, y * canvas.scale, canvas.scale, canvas.scale);
        },

        setScale: function(ctx) {
            ctx.scale(this.config.scale / this.scaleRate, this.config.scale / this.scaleRate);
            this.scaleRate = this.config.scale;
        },

        /**
         * [renderSaveHost 绘制画面到页面上]
         * @return {[void]} [void]
         */
        renderSaveHost: function() {
            var canvas = this.canvas[this.config.scale];
            this.ctx = this.host.getContext("2d");
            var x = this.config.dragX,
                y = this.config.dragY;
            if (this.config.case == 1) {
                canvas = this.canvas[1];
                var ctx = this.ctx;
                ["mozImageSmoothingEnabled", "webkitImageSmoothingEnabled", "msImageSmoothingEnabled", "imageSmoothingEnabled"].forEach(function(e) {
                    ctx[e] = false;
                })
                this.setScale(this.ctx);
                x /= this.config.scale;
                y /= this.config.scale;
            }
            this.ctx.clearRect(0, 0, this.host.width, this.host.height);
            this.ctx.drawImage(canvas, x, y);
        },

        /**
         * [getCurrentCanvas 获取当前的canvas内容]
         * @return {[canvasElement]} [canvasElement]
         */
        getCurrentCanvas: function() {
            var scale = this.config.scale;
            if (this.config.case == 1) scale = 1;
            return this.canvas[scale];
        },

        /**
         * [isInPainterRage 判断当前点是否在作画发安徽之内]
         * @return {Boolean} [description]
         */
        isInPainterRage: function() {
            if (this.config.pointX < 0 || this.config.pointX > this.config.canvasWidth || this.config.pointY < 0 || this.config.pointY > this.config.canvasHeight) {
                return false;
            } else {
                return true;
            }
        },

        /**
         * [getDistance 获取两点之间的距离]
         * @param  {[Event]} p1 [point1]
         * @param  {[Event]} p2 [point2]
         * @return {[floor]}    [distance]
         */
        getDistance: function(p1, p2) {
            var x = p2.pageX - p1.pageX,
                y = p2.pageY - p1.pageY;
            return Math.sqrt((x * x) + (y * y));
        },

        /**
         * [loadImageByBitMap 通过bitmap加载图片]
         * @param  {[type]} bitmap [description]
         * @return {[type]}        [description]
         */
        loadImageByBitMap: function(bitmap, canvas, rawColor) {
            var can = canvas;
            can.width = this.config.canvasWidth;
            can.height = this.config.canvasHeight;
            var ctx = can.getContext('2d');
            var imageData = ctx.createImageData(can.width, can.height);
            var buffer = new ArrayBuffer(imageData.data.length);
            var clampedArray = new Uint8ClampedArray(buffer);
            var uintArray = new Uint32Array(buffer);
            for (var i = 0; i < can.width; i++) {
                for (var j = 0; j < can.height; j++) {
                    var m = bitmap[i * can.width + j];
                    var color = rawColor ? m : this.config.colors[m]
                    if (color != undefined) {
                        var g = ('#' + color).colorRgb();
                        uintArray[j * can.width + i] = 255 << 24 | g[2] << 16 | g[1] << 8 | g[0]
                    } else {
                        uintArray[j * can.width + i] = 255 << 24 | 255 << 16 | 255 << 8 | 255
                    }
                }
            };
            imageData.data.set(clampedArray);
            ctx.putImageData(imageData, 0, 0);
            if (this.config.qrcodeImgUrl) this.addQrcode(ctx);
        },

        addQrcode: function(ctx) {
            var self = this;
            var image = new Image();
            image.onload = function() {
                ctx.drawImage(image, self.config.canvasWidth - image.naturalWidth, self.config.canvasHeight - image.naturalHeight);
                self.renderSaveHost();
            };
            image.onerror = function() {
                self.config.qrcodeImgUrl = null;
            };
            image.src = self.config.qrcodeImgUrl;
        },
    });
    window.Creation = Creation;
}(window));