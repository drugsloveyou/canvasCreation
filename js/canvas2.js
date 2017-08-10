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
        
        this.config = {
            //全局属性配置
            scale: 1, //当前放大倍数
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
            singleScale: 8, //单词放大的倍数
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
            onDragToDown: function() {}
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
            isClick: false,

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
            //初始化的个数(这里是初始化的个数，原来是10倍都加载，self.config.maxScale，现在变成配置加载少于最大倍数的个数)
            var initRenderCount = parseInt(this.config.maxScale / this.config.singleScale);
            for (var i = 0; i <= initRenderCount; i++) {
                var index = this.getScaleByIndex(i);
                this.getCanvas(index); //初始化每个canvas的参考线
            }
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
            this.config.dragX = (width - this.config.canvasWidth) / 2;
            this.config.dragY = (height - this.config.canvasHeight) / 2;
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
            if ((this.mode.painMode && !this.mode.ctrlKey)) return;
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
            if (e.scale > 1) this.changeScale(true);
            else if (e.scale < 1) this.changeScale(false);
            $(".use-times").html(e.scale);
        },

        /**
         * [bindSelectEvent 选中事件处理]
         * @return {[type]} [description]
         */
        selectHandler: function(e) {
            if (!this.isInPainterRage()) {
                return;
            }
            // self.drag({
            //     clientX: self.dragConfig.dragX,
            //     clientY: self.dragConfig.dragY
            // });
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
            //渲染
            this.renderData(null,null,null,data);
            //初始化事件
            this.initEvent();
            //绘制图像到显示屏中
            this.renderSaveHost();
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
            if (!this.isInPainterRage()) {
                return;
            }
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

            if (!this.canvas[this.config.scale]) {
                this.initScaleCanvas(this.config.scale);
            } else {
                this.renderSaveHost();
            }
        },

        /**
         * [initScaleCanvas 初始化对应的canvas倍数]
         * @param  {[number]} scale [scale number]
         * @return {[void]}       [void]
         */
        initScaleCanvas: function(scale) {
            this.renderData(this.getCanvas(scale), function() {
                this.renderSaveHost()
            });
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
                this.drawSingleRect(x, y, color, this.canvas[key],this.ctx);
            }
        },

        drawPointSign: function(x, y, color) {

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
            ctx.fillStyle = '#' + this.config.colors[color];
            ctx.fillRect(x * canvas.scale, y * canvas.scale, canvas.scale, canvas.scale);
        },

        /**
         * [renderSaveHost 绘制画面到页面上]
         * @return {[void]} [void]
         */
        renderSaveHost: function() {
            var canvas = this.canvas[this.config.scale];
            if (!canvas) {
                return this.initScaleCanvas(this.config.scale);
            }
            this.ctx = this.host.getContext("2d");
            this.ctx.clearRect(0, 0, this.host.width, this.host.height);
            this.ctx.drawImage(this.canvas[this.config.scale], this.config.dragX, this.config.dragY);
        },

        /**
         * [getCurrentCanvas 获取当前的canvas内容]
         * @return {[canvasElement]} [canvasElement]
         */
        getCurrentCanvas: function() {
            return this.canvas[this.config.scale];
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
        }
    });
    window.Creation = Creation;
}(window));