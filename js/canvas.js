/**
 * 画布共创主逻辑(基于jquery的Util)
 * @authors xiezuobing(948466)
 * @date    2017-07-31 15:03:43
 * @version v1.0
 */

(function(window) {
    var saveAsImage = Canvas2Image;
    var noop = function() {};

    var Creation = function(canvas, config) {
        if (!canvas || !canvas.getContext) {
            console.error("this is not a real canvas.");
            return;
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

            //canvas初始大小
            canvasWidth: 1000,
            canvasHeight: 1000,

            //canvas基本配置
            initRenderCount: 5, //初始化的时候渲染的个数
            maxScale: 10, //最大放大倍数
            isEnabledRefercnceLine: false, //是否开启参考线
            refercnceLineWidth: 0.1, //参考线宽度
            refercnceLineColor: '#eeeeee', //参考线颜色

            colors: {
                0x0: '#ff74cc',
                0x1: '#d91934',
                0x2: '#ffb61a',
                0x3: '#fff71a',
                0x4: '#01ff70',
                0x5: '#0c861a',
                0x6: '#52dcff',
                0x7: '#0000ff',
                0x8: '#7324a5',
                0x9: '#000000',
                0xA: '#959595',
                0xB: '#ffffff'
            },

            //保存图片配置
            saveConfig: {
                mimeType: 'png',//支持png、jpeg、gif、bmp
                qrcodeImgUrl: null //二维码图片页面地址
            },

            //回调函数
            //当坐标点变化
            onPointChange: function() {},
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
            //是否被选中
            isSelecting: false,
            //是否触发点击事件
            isClick: false
        };

        //当前canvas合集
        this.canvas = {};

        //初始化数据
        this.data = [];


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
            KEY_ENLARGE: 187
        },

        /**
         * [minxInit 初始化函数]
         * @param  {[type]} config [description]
         * @return {[type]}        [description]
         */
        minxInit: function(config) {
            this.initConfig(config); //配置初始化
            this.initCanvas(canvas); //初始化所有倍数的canvas数组
            // this.initEvent(); //初始化事件 -- (该项移入initData之后)
        },

        /**
         * [initConfig 初始化配置]
         * @param  {[type]} config [description]
         * @return {[type]}        [description]
         */
        initConfig: function(config) {
            var self = this;
            config = config || {};
            for (var key in config) {
                if ((key in self.config) && config[key] !== undefined) {
                    self.config[key] = config;
                }
            }
        },

        /**
         * [initHost 初始化host宿主]
         * @return {[type]} [description]
         */
        setHostSize: function() {
            var self = this;
            self.host.width = document.documentElement.clientWidth;
            self.host.height = document.documentElement.clientHeight;
        },

        /**
         * [initCanvas 初始化canvas图层]
         * @return {[type]} [description]
         */
        initCanvas: function() {
            var self = this;
            self.setHostSize();
            //初始化的个数(这里是初始化的个数，原来是10倍都加载，self.config.maxScale，现在变成配置加载少于最大倍数的个数)
            var initRenderCount = self.config.initRenderCount;
            for (var i = 1; i <= initRenderCount; i++) {
                self.getCanvas(i); //初始化每个canvas的参考线
            }
        },

        /**
         * [getCanvas 生成对应放大尺寸的canvas]
         * @param  {[type]} scale [description]
         * @return {[type]}       [description]
         */
        getCanvas: function(scale) {
            var self = this;
            if (self.canvas[scale]) return self.canvas[scale];
            var canvas = document.createElement('canvas');
            canvas.width = self.config.canvasWidth * scale;
            canvas.height = self.config.canvasHeight * scale;
            canvas.scale = scale;
            self.initRefercnceLine(canvas);
            self.canvas[scale] = canvas;

            return canvas;
        },

        /**
         * [initRefercnceLine 初始化参考线]
         * @return {[type]} [description]
         */
        initRefercnceLine: function(canvas) {
            var self = this;
            var config = self.config,
                scale = canvas.scale;
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, config.canvasWidth * canvas.scale, config.canvasHeight * canvas.scale);
            //是否启用参考线
            if (!self.config.isEnabledRefercnceLine) return;
            for (var i = 0; i < 1001; i++) {
                ctx.lineWidth = config.refercnceLineWidth * scale;
                ctx.strokeStyle = config.refercnceLineColor;
                ctx.beginPath();
                ctx.moveTo(i * scale, 0);
                ctx.lineTo(i * scale, config.canvasHeight * scale);
                ctx.stroke();
                ctx.lineWidth = config.refercnceLineWidth * scale;
                ctx.strokeStyle = config.refercnceLineColor;
                ctx.beginPath();
                ctx.moveTo(0, i * scale);
                ctx.lineTo(config.canvasWidth * scale, i * scale);
                ctx.stroke();
                // ctx.restore();
            }
        },

        /**
         * [initEvent 初始化事件]
         * @return {[type]} [description]
         */
        initEvent: function() {
            var self = this;
            //绑定resize事件
            self.bindResize();
            //1.鼠标放大操作绑定
            self.bindMouseWheel();
            //2.键盘放大操作绑定
            //2.键盘平移
            self.bindKeyEvent();
            //1.鼠标拖动
            self.bindDragEvent();

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

            window.addEventListener(mouseWheel, function(e) {
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
                    default:
                        break;
                }
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
                    self.selectConfig.isClick = true;//设置点击事件触发标志

                    self.dragEventFilter(e, function(evet) {
                        self.startDrag(evet);
                    }, function(){
                        self.dragConfig.isEnableGesture = true;
                        gestureStart = e.touches;
                        // self.gesturestart && self.gesturestart.call(el);
                    });
                }, false)
            });

            //拖拽中
            $(dragEvent.drag).each(function() {
                host.addEventListener(this, function(e) {
                    //设置当前事件不触发click事件
                    if(self.dragConfig.isDraging) {
                        self.selectConfig.isClick = false;
                    }
                    self.dragEventFilter(e, function(evet) {
                        self.drag(evet);
                    }, function(){
                        var now = e.touches;
                        var scale = getDistance(now[0], now[1]) / getDistance(start[0], start[1]);
                        e.scale = scale.toFixed(2);
                        obj.gesturemove && obj.gesturemove.call(el, e);
                    });
                }, false)
            });

            //拖拽结束
            $(dragEvent.end).each(function() {
                host.addEventListener(this, function(e) {
                    if(self.selectConfig.isClick) self.selectHandler();
                    self.dragEventFilter(e, function(evet) {
                        self.endDrag(evet);
                    }, noop);
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
            var self = this;
            self.dragConfig.dragX = e.clientX
            self.dragConfig.dragY = e.clientY
            self.dragConfig.isDraging = true;
        },

        /**
         * [drag 拖拽处理事件]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        drag: function(e) {
            var self = this;
            var offset = $(self.host).offset();
            var x = e.clientX - offset.left - self.config.dragX;
            var y = e.clientY - offset.top - self.config.dragY;
            self.config.pointX = parseInt(x / self.config.scale);
            self.config.pointY = parseInt(y / self.config.scale);
            if (self.config.pointX < 0 || self.config.pointX > self.config.canvasWidth || self.config.pointY < 0 || self.config.pointY > self.config.canvasHeight) {
                return;
            }
            //当左边改变时
            self.config.onPointChange.call(self, self.config.pointX, self.config.pointY);
            if (!self.dragConfig.isDraging) {
                return;
            }
            self.config.dragX += e.clientX - self.dragConfig.dragX;
            self.config.dragY += e.clientY - self.dragConfig.dragY;
            self.dragConfig.dragX = e.clientX;
            self.dragConfig.dragY = e.clientY;
            self.renderSaveHost();
        },

        /**
         * [endDrag 结束拖拽处理事件]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        endDrag: function(e) {
            var self = this;
            self.dragConfig.isDraging = false;
        },

        /**
         * [bindSelectEvent 选中事件处理]
         * @return {[type]} [description]
         */
        selectHandler: function() {
            var self = this;
            self.changeToScale(self.config.maxScale);
            
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
            var self = this;
            self.data = data;
            //渲染
            self.renderData();
            //初始化事件
            this.initEvent();
            //绘制图像到显示屏中
            self.renderSaveHost();
        },

        /**
         * [renderData 渲染数据]
         * @param  {[type]} canvas   [description]
         * @param  {[type]} noUpdate [description]
         * @return {[type]}          [description]
         */
        renderData: function(canvas, cb, context) {
            var t = new Date().getTime();

            var self = context || this;
            var x = 0,
                y = 0;
            var drawRect = !!canvas ? self.drawSingleRect : self.drawRect;
            for (var i = 0, l = self.data.length; i < l; i++) {
                if (self.data[i] == undefined || !self.config.colors[self.data[i]]) continue;
                x = parseInt(i / self.config.canvasHeight);
                y = i % self.config.canvasWidth;
                drawRect.call(self, x, y, self.data[i], canvas);
            }
            if (cb) cb();

            console.log((new Date().getTime() - t) / 1000, "s");
        },

        /**
         * [changeToScale 放大到指定倍数]
         * @param  {[type]} scale [description]
         * @return {[type]}       [description]
         */
        changeToScale: function(scale) {
            var self = this;
            var x = self.config.pointX,
                y = self.config.pointY;
            if (x < 0 || x > self.config.canvasWidth || y < 0 || y > self.config.canvasHeight) {
                return;
            }
            scale = $.isNumeric(scale) ? parseInt(scale) : self.config.scale;

            if(scale == self.config.scale || scale > self.config.maxScale) return;
            var differ = self.config.scale - scale;

            //偏移
            self.config.scale = scale;
            self.config.dragX += differ * x;
            self.config.dragY += differ * y;

            if (!self.canvas[self.config.scale]) {
                self.initScaleCanvas(self.config.scale);
            } else {
                self.renderSaveHost();
            }
        },

        /**
         * [changeScale 放大缩小]
         * @param  {[type]} flag [description]
         * @return {[type]}      [description]
         */
        changeScale: function(flag) {
            var self = this;
            var x = self.config.pointX,
                y = self.config.pointY;
            if (x < 0 || x > self.config.canvasWidth || y < 0 || y > self.config.canvasHeight) {
                return;
            }
            if (flag && self.config.scale + 1 <= self.config.maxScale) {
                self.config.scale = self.config.scale + 1;
                self.config.dragX -= x;
                self.config.dragY -= y;
            }
            if (!flag && self.config.scale - 1 >= 1) {
                self.config.scale = self.config.scale - 1;
                self.config.dragX += x;
                self.config.dragY += y;
            }

            if (!self.canvas[self.config.scale]) {
                self.initScaleCanvas(self.config.scale);
            } else {
                self.renderSaveHost();
            }
        },

        /**
         * [initScaleCanvas 初始化对应的canvas倍数]
         * @param  {[type]} scale [description]
         * @return {[type]}       [description]
         */
        initScaleCanvas: function(scale) {
            var self = this;
            self.renderData(self.getCanvas(scale), function() {
                self.renderSaveHost()
            });
        },

        /**
         * [drawRect description]
         * @param  {[type]} x        [description]
         * @param  {[type]} y        [description]
         * @param  {[type]} color    [description]
         * @param  {[type]} noUpdate [description]
         * @return {[type]}          [description]
         */
        drawRect: function(x, y, color) {
            var self = this;
            for (var key in self.canvas) {
                self.drawSingleRect(x, y, color, self.canvas[key]);
            }
        },

        /**
         * [drawSingleRect 绘制单个矩形区域]
         * @param  {[type]} x      [description]
         * @param  {[type]} y      [description]
         * @param  {[type]} color  [description]
         * @param  {[type]} canvas [description]
         * @return {[type]}        [description]
         */
        drawSingleRect: function(x, y, color, canvas) {
            var self = this;
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = self.config.colors[color];
            ctx.fillRect(x * canvas.scale, y * canvas.scale, canvas.scale, canvas.scale);
        },

        /**
         * [renderSaveHost 绘制画面到页面上]
         * @return {[type]} [description]
         */
        renderSaveHost: function() {
            var self = this;
            var canvas = self.canvas[self.config.scale];
            var ctx = self.host.getContext("2d");
            ctx.clearRect(0, 0, self.host.width, self.host.height);
            ctx.drawImage(self.canvas[self.config.scale], self.config.dragX, self.config.dragY);
        },

        /**
         * [getCurrentCanvas 获取当前的canvas内容]
         * @return {[type]} [description]
         */
        getCurrentCanvas: function(){
            return this.canvas[this.config.scale];
        },

        /**
         * [getDistance description]
         * @param  {[type]} p1 [description]
         * @param  {[type]} p2 [description]
         * @return {[type]}    [description]
         */
        getDistance: function(p1, p2) {
            var x = p2.pageX - p1.pageX,
                y = p2.pageY - p1.pageY;
            return Math.sqrt((x * x) + (y * y));
        }
    });
    window.Creation = Creation;
}(window));