/**
 * 页面业务
 * @authors xiezuobing(948466)
 * @date    2017-07-31 15:03:43
 * @version v1.0
 */
(function(window) {

    /**
     * [variable 可供调用的变量]
     * @type {Object}
     */
    var variable = {

    };

    /**
     * [description 颜色选择操作对象]
     * @param  {Object} ) {                   
     * @return {[type]}   [description]
     */
    var ColorPicker = (function() {
        //-------------------------------------  

        var colorConfig = {
            aniStyle: 'ani-flash'
        };
        var curColor = 0x0;
        /*init*/
        var $colorMask;
        var colorsArray;
        var color = {};
        color.initColorSelect = function() {
            var $colors = $(".j-colors>span");
            $colors.each(function(index) {
                $(this).click(function() {
                    curColor = index;
                    $(this).addClass('active').siblings().removeClass('active');
                    if ($colorMask) $colorMask.css({
                        backgroundColor: '#' + colorsArray[curColor]
                    });
                });
            });
        };
        color.initColorSelect();
        $.extend(color, {
            setColorMask: function(colors) {
                if ($colorMask) {
                    $colorMask.removeClass('hide');
                    return;
                }
                $colorMask = $('<span class="colorMask"></span>');
                if (!colorsArray) colorsArray = colors;
                if (arguments.length != 0) $colorMask.css({
                    backgroundColor: '#' + colorsArray[curColor]
                });
                $('.main').append($colorMask);
            },
            moveColorMask: function(point) {

                if ($colorMask) $colorMask.css({
                    left: point.posX,
                    top: point.posY,
                    width: point.width,
                    height: point.height
                });
            },
            setScale: function(scale) {
                if ($colorMask) $colorMask.css({
                    width: scale,
                    height: scale
                });
            },
            removeColorMask: function() {
                if ($colorMask) $colorMask.addClass('hide');
                else { return; };
            },
            //获取当前颜色
            getCurColor: function() {
                return curColor;
            },
            //跟随部分
        });

        return color;
    }());

    /**
     * [page 页面业务对象]
     * @type {Object}
     */
    var page = {
        /**
         * [config 全局配置配置项]
         * @type {Object}
         */
        config: {
            //保存图片配置
            saveConfig: {
                imageWidth: 512,
                mimeType: 'png', //支持png、jpeg、gif、bmp
                qrcodeImgUrl: null //二维码图片页面地址
            },

        }
    };
    $.extend(page, {

        appVersion: {}, //浏览器信息
        creation: null, //画布对象
        init: function(canvas, config, data) {
            this.initCreation(canvas, null, data);
            // // page.saveCurrentCanvasToImage();
            this.initEvent();

        },
        initVersion: function() {
            var t = navigator.userAgent;
            self.appVersion = {
                trident: /Trident/i.test(t),
                presto: /Presto/i.test(t),
                webKit: /AppleWebKit/i.test(t),
                gecko: /Gecko/i.test(t) && !/KHTML/i.test(t),
                mobile: /AppleWebKit.*Mobile.*/i.test(t),
                ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(t),
                android: /Android/i.test(t) || /Linux/i.test(t),
                windowsphone: /Windows Phone/i.test(t),
                iPhone: /iPhone/i.test(t),
                iPad: /iPad/i.test(t),
                MicroMessenger: /MicroMessenger/i.test(t),
                webApp: !/Safari/i.test(t),
                edge: /edge/i.test(t),
                weibo: /Weibo/i.test(t),
                uc: /UCBrowser/i.test(t),
                qq: /MQQBrowser/i.test(t),
                baidu: /Baidu/i.test(t)
            }
        },
        /**
         * [initCreation 初始化画布共创对象]
         * @param  {[type]} canvas [canvas对像]
         * @param  {[type]} config [description]
         * @param  {[type]} data   [description]
         * @return {[type]}        [description]
         */
        initCreation: function(canvas, config, data) {
            this.creation = new Creation(canvas, config);
            this.initCreationEvent();
            this.initCreationData(data);
        },
        //初始化事件
        initCreationEvent: function() {
            var self = this;
            //每次坐标点变化时回调
            self.creation.config.onPointChange = function(point) {
                // console.log(x, y);
                // 当坐标点变换时
                self.updatePoint(point.x, point.y);
                if (self.creation.mode.painMode || self.creation.isMobile) {
                    var left = self.creation.config.pointX * self.creation.config.scale + self.creation.config.dragX;
                    var top = self.creation.config.pointY * self.creation.config.scale + self.creation.config.dragY;
                    //剩余拖动点击要做
                    ColorPicker.moveColorMask({
                        posX: left,
                        posY: top,
                        // posX: point.posX - self.creation.config.scale,
                        // posY: point.posY - self.creation.config.scale,
                        width: self.creation.config.scale,
                        height: self.creation.config.scale
                    });
                }
            }

            //每次点击时回调 point为当前点
            self.creation.config.onSelect = function(point, confirm) {
                var h = self.creation.config.canvasWidth - 160,
                    w = self.creation.config.canvasHeight - 160;
                if (self.creation.config.qrcodeImgUrl && (self.creation.config.pointX > w || self.creation.config.pointY > h)) return;
                if (!self.creation.mode.painMode && !self.creation.isMobile) return;
                var color = ColorPicker.getCurColor();
                if (color !== null) {
                    var left = self.creation.config.pointX * self.creation.config.scale + self.creation.config.dragX;
                    var top = self.creation.config.pointY * self.creation.config.scale + self.creation.config.dragY + 58;
                    self.btnsBoxOpt(top, left, function() {
                        self.update(point.x, point.y, color);

                    });
                }
            }

            //当画布移动的时候
            self.creation.config.onDrag = function(point) {
                // console.log(point);
            }

            //当画布模式转换
            self.creation.config.onModeChange = function(flag) {
                if (flag.painMode) {
                    if (flag.ctrlKey) {
                        self.creation.host.style.cursor = 'move';
                        ColorPicker.removeColorMask();
                    } else {
                        self.creation.host.style.cursor = 'crosshair';
                        ColorPicker.setColorMask(self.creation.config.colors);
                    }
                } else {
                    ColorPicker.removeColorMask();
                    self.creation.host.style.cursor = 'move';
                }
            }

            //当用户往下拉画布
            self.creation.config.onDragToDown = function(flag) {
                var $main = $('.main');
                var act = 'hideBar';
                if (flag && !$main.hasClass(act)) $main.addClass(act);
                else if (!flag && $main.hasClass(act)) $main.removeClass(act);
            }

            self.creation.config.onScaleChange = function(scale) {
                ColorPicker.setScale(scale);
            }
        },

        //初始化数据
        initCreationData: function(data) {
            this.creation.initData(data);
        },

        //兼容性处理
        compatible: function() {
            var self = this;
            //该浏览器不支持canvas 或者canvas传参不正确
            if (self.creation === false) {

                alert('你的浏览器不支持canvas哦~ 建议使用最新版本的谷歌浏览器体验最佳！');
            } else if (self.creation.isMobile) { //手机端对页面进行兼容性处理
                //待处理
                console.log('%c待处理', "background:#abdcad;color:white;");
            }
        },
        initEvent: function() { //页面的时间初始化
            //初始化事件
            var self = this;
            //缩小到最小
            var $smallBtn = $('.small-btn');
            var $scaleBtn = $('.scale-btn');
            var $saveBtn = $('.screenshot-btn');
            var $shareBtn = $('.share-btn'); //分享按钮

            $smallBtn.click(function() {
                self.creation.changeScale(false);
            });
            $scaleBtn.click(function() {
                self.creation.changeScale(true);
            });
            $saveBtn.click(function() {
                self.saveCurrentCanvasToImage();
            });
            $shareBtn.click(function() {
                self.popShareOpt( /*传要复制的url*/ );
            });

            var $tipBtn = $('.tip-btn');

            $tipBtn.click(function() {
                if($tipBtn.hasClass('active')) $tipBtn.removeClass('active');
                else  $tipBtn.addClass('active');
            });

            //登录事件绑定
            var $loginBtn = $('.user-name.login');
            var $thirdLogin = $('.third-login');
            $loginBtn.click(function() {
                if ($thirdLogin.hasClass('hide')) $thirdLogin.removeClass('hide');
                else $thirdLogin.addClass('hide');
            });
            $thirdLogin.children().each(function(index) {
                if (index == 0) {
                    //微博登录
                } else if (index == 1) {
                    //qq登录
                }
            });
        },
        /**
         * 若config中的saveConfig对象中的qrcodeimage没有配置的话，则直接生成画布中的图片
         * [saveCurrentCanvasToImage 保存canvas图片到本地]
         * @return {[type]} [description]
         */
        saveCurrentCanvasToImage: function() {
            var self = this;
            var curCanvas = self.creation.getCurrentCanvas();
            var canvas = document.createElement('canvas');
            var config = self.config;
            var width = height = config.saveConfig.imageWidth;
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            if (config.saveConfig.qrcodeImgUrl) {
                var image = new Image();
                image.onload = function() {
                    canvas.height = height + this.naturalHeight;
                    ctx.drawImage(curCanvas, 0, 0, width, height);
                    ctx.drawImage(image, canvas.width - this.naturalWidth, canvas.width, this.naturalWidth, this.naturalHeight);
                    Canvas2Image.saveAsImage(canvas, null, null, config.saveConfig.mimeType);
                }
                image.src = config.saveConfig.qrcodeImgUrl;
            } else {

                ctx.drawImage(curCanvas, 0, 0, width, height);
                Canvas2Image.saveAsImage(canvas, null, null, config.saveConfig.mimeType);
            }
        },
        //根据点与颜色更新画布
        update: function(x, y, color) {
            var self = this;
            self.creation.drawRect(x, y, color);
            self.creation.renderSaveHost();
        },
        //canvas选中的点
        updatePoint: function(x, y) {
            var $point = $(".j-point");
            $point.html("X" + x + ",Y" + y);
        },

        /**
         * [getBase64Image 图片转base64]
         * @param  {[type]} img [description]
         * @return {[type]}     [description]
         */
        getBase64Image: function(img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var dataURL = canvas.toDataURL("image/png");
            return dataURL // return dataURL.replace("data:image/png;base64,", ""); 
        },

        /**
         * [popOpt 弹窗]
         *
         * 当用户专门点击分享按钮：
            这么优秀的游戏，一定要分享给优秀的人，这样，显得你最优秀哦。
            【立即分享→链接已复制】

            当用户没有次数点击不可点处时的弹窗：
            急死了！1秒都不想等！快分享给好友一起来闹，好友通过你的链接首次登录，就能增加涂抹次数！
            【立即分享→链接已复制】

         * 
         * @param  {[type]} title   [标题]
         * @param  {[type]} msg     [提示]
         * @param  {[type]} confirm [确认回调]
         * @param  {[type]} cancel  [取消回调]
         * @return {[type]}         [description]
         */
        popOpt: function(title, msg, confirm, cancel, btn, content, confirmNotToHide) {
            title = title || "提示";
            msg = msg || "提示";
            btn = btn || "确定"
            content = content || "";
            var self = this;
            var $pop = $('<div class="pop"></div>');
            var $popMain = $('<div class="pop-main"></div>');
            var $fadeBg = $('<div class="fade-bg"></div>');
            var $closeBtn = $('<a href="javascript:void(0);" class="close-btn"></a>');
            var $popCon = $('<div class="pop-con ' + (content ? " nopadding" : "") + '"></div>');
            var $title = $('<p>' + title + '</p>');
            var $content = $('<p> ' + msg + '</p>');
            $popCon.append($title).append($content).append($(content));
            var $shareBtn = $('<a href="javascript:;" class="share-btn" data-clipboard-target="#clipborad-copy" id="copy-clip">' + btn + '</a>');
            $popMain.append($closeBtn).append($popCon);
            if(confirm)  $popMain.append($shareBtn);
            $pop.append($popMain).append($fadeBg);

            $closeBtn.click(function() {
                $pop.remove();
                cancel && cancel();
            });
            $shareBtn.click(function() {
                confirm && confirm.call(this);
                if (!confirmNotToHide) $pop.remove();
            });

            $('.main').append($pop);
        },

        /**
         * [popShareOpt 分享]
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        popShareOpt: function(url) {
            url = url || location.href;

            this.popOpt('SORRY啦~', '您当前处于禁止时间内哦，<br>点击分享立即获取填坑次数！', function() {
                console.log();
            }, function() {},'立即分享', '<input value="' + url + '" id="clipborad-copy">', true);

            var clip = new Clipboard('#copy-clip');
            clip.on('success', function() {
                $('#copy-clip').html('成功复制链接');
            });
            clip.on('error', function() {
                $('#copy-clip').html('复制失败');
            });
        },

       /**
        * [unLoginPop 未登录弹窗]
        * @param  {[type]} wbLogin [微博登录触发事件]
        * @param  {[type]} qqLogin [QQ登录触发事件]
        * @return {[type]}         [description]
        */
        unLoginPop: function(wbLogin,qqLogin){
            var $thirdLogin = $('<div class="third-login normal bigger">');
            var $wbLogin = $('<a href="javascript:;" class="wb-login login-icon bigger"></a>');
            var $qqLgin = $('<a href="javascript:;" class="qq-login login-icon bigger"></a>');
            $thirdLogin.append($wbLogin).append($qqLgin);
            $wbLogin.click(function(){
                wbLogin && wbLogin();
            });

            $qqLgin.click(function(){
                qqLogin && qqLogin();
            });
            this.popOpt('糟糕！', '您当前处于未登录状态，无法参加游戏。快来登录实现大神的骚操作！', null, function() {},'确定', $thirdLogin );

        },

        /**
         * [unsupportPop 不支持canvas时，的弹窗提示]
         * @return {[type]} [description]
         */
        unsupportPop: function(){
            this.popOpt('好可惜哦~', '由于您的浏览器版本过低，不能参与这个超好玩的<span class="stroke-bold">像素大绘</span>活动中。花点时间更新一下，一起来玩吧', function() {
                console.log();
            }, function() {},'确定');
        },

        /**
         * [btnsBoxOpt 瞄点确认]
         * @param  {[type]} top     [description]
         * @param  {[type]} left    [description]
         * @param  {[type]} canfirm [description]
         * @param  {[type]} cancel  [description]
         * @return {[type]}         [description]
         */
        btnsBoxOpt: function(top, left, canfirm, cancel) {
            var $btnsBox = $("<div class='btns-box'></div>");
            var okBtn = $('<a href="javascript:;" class="ok-btn"></a>');
            var cancelBtn = $('<a href="javascript:;" class="cancel-btn"></a>');
            var $mask = $('<div class="btns-box-mask"></div>');
            okBtn.click(function() {
                canfirm && canfirm();
                $btnsBox.remove();
                $mask.remove()
            });
            cancelBtn.click(function() {
                cancel && cancel();
                $btnsBox.remove();
                $mask.remove();
            });
            if (top !== undefined && left !== undefined) $btnsBox.css({
                top: top,
                left: left
            });
            $btnsBox.append(okBtn).append(cancelBtn);
            $('.main').append($btnsBox).append($mask);
        },
        /**
         * [setCurrentNum 设置在线人数]
         * @param {[type]} num [description]
         */
        setCurrentNum: function(num) {
            var num = parseInt(num);
            num = num || 0;
            var $currentNums = $('.current-num em');
            var g = s = b = q = w = 0;
            g = parseInt(num % 10);
            s = parseInt(num % 100 / 10);
            b = parseInt(num % 1000 / 100);
            q = parseInt(num % 10000 / 1000);
            w = parseInt(num / 10000);
            $currentNums.eq(0).html(w);
            $currentNums.eq(1).html(q);
            $currentNums.eq(2).html(b);
            $currentNums.eq(3).html(s);
            $currentNums.eq(4).html(g);

        },
        /**
         * [setUserTimes 设置累计涂抹次数]
         * @param {[type]} num [description]
         */
        setUserTimes: function(num) {
            var $useTimes = $('.use-times');
            var num = parseInt(num);
            num = num || 0;
            $useTimes.html(num);
        },

        /**
         * [setCurrentTimes 设置当前次数]
         * @param {[type]} num [description]
         */
        setCurrentTimes: function(num) {
            var $currentTimes = $('.current-times');
            var num = parseInt(num);
            num = num || 0;
            $currentTimes.html(num);
        },

        /**
         * [setTimeCountDown 设置倒计时间]
         * @param {[type]} time [description]
         */
        setTimeCountDown: function() {
            var self = this;
            var $disabledTime = $('.disabled-time');
            self.countDown(0, 0, 10, function(h, m, s) {
                $disabledTime.html(m + ':' + s);
            });

        },
        countDown: function(hours, minutes, seconds, callback) {
            var self = this;
            var time = (seconds + minutes * 60 + hours * 3600) * 1000;
            var timer = null;
            timer = setInterval(function() {
                time -= 1000;
                if (time < 0) {
                    clearInterval(timer);
                    return;
                }
                hours = self.checkTime(parseInt(time / 1000 / 3600 % 24));
                minutes = self.checkTime(parseInt(time / 1000 / 60 % 60));
                seconds = self.checkTime(parseInt(time / 1000 % 60));
                callback(hours, minutes, seconds);
            }, 1000);
            hours = hours || 0;
            minutes = minutes || 0;
            seconds = seconds || 0;
        },
        checkTime: function(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        },
        /**
         * [setUserName 设置昵称]
         * @param {[type]} userName [description]
         */
        setUserName: function(userName) {
            var $userName = $('.user-name');
            $userName.html(userName);
        }
    });
    page.setTimeCountDown();
    /**
     * [http 网络请求对象]
     * @type {Object}
     */
    var http = {
        config: {
            //描绘的色块Url
            painUrl: '',
            //登录Url
            loginUrl: ''
        },
    };
    $.extend(http, {
        init: function(config) {
            $.extend(this.config, config);
        },
        //选中描绘点时
        pain: function(params, callback, error) {
            params = params || {};
            var self = this;
            $.ajax({
                url: self.config.painUrl,
                data: params,
                success: function(data) {
                    if (callback) callback(data);
                },
                fail: function(err) {
                    if (error) error(err);
                }
            });
        },
        //登录
        login: function(params, callback, error) {
            params = params || {};
            var self = this;
            $.ajax({
                url: self.config.loginUrl,
                data: params,
                success: function(data) {
                    if (callback) callback(data);
                },
                fail: function(err) {
                    if (error) error(err);
                }
            });
        }
    });


    /**
     * [socket socket对象]
     * @type {Object}
     */
    var socket = {};
    $.extend(socket, {
        init: function(url, event) {
            if (!url) return;
            this.io = io(url);
            this.bindEvent(event);
        },
        bindEvent: function(event) {
            var self = this;
            for (var key in event) {
                self.io.on(key, event[key]);
            }
        },
    });

    /**
     * [onload 页面载入]
     * @return {[type]} [description]
     */
    window.onload = function() {
        http.init({
            painUrl: '',
            login: '',
        });
        /**
         * 需要三个参数
         * canvas:第一个参数 画布对象
         * config：第二个参数 画布对象的配置参数  具体参见Creation.js的config对象
         * data：画布初始化的数据
         * 
         */
        page.init(canvas, null, []); //test5()
        /*socket对象*/
        socket.init('', {
            /*获取在线人数*/
            'onLogin': function(data) {
                //设置在线人数
                console.log('设置在线人数');
            },
            /*其他人绘点事件*/
            'onPain': function(data) {
                var x = data.x,
                    y = data.y,
                    color = data.color;
                //绘制点
                page.update(x, y, color);
            }
        });

    }
    window.page = page;

    /*******************************************************************/
    /******************************测试代码*****************************/
    /*******************************************************************/
    function test5() {
        var array = [];
        // creation.config.canvasWidth * creation.config.canvasHeight
        for (var i = 0; i < 1000000; i++) {
            array[i] = getRandom(10);
        }
        return array;
    }

    function test4(creation) {
        var array = [];
        for (var i = 0; i < creation.config.canvasWidth; i++) {
            if (!array[i]) array[i] = [];
            for (var j = 0; j < creation.config.canvasHeight; j++) {
                array[i][j] = getRandom(12);
            }
        }
        creation.initData(array);
    }

    function test3(creation) {
        var array = [];
        var r;
        for (var i = 0; i < 1000; i++) {
            r = {
                x: getRandom(),
                y: getRandom(),
                color: getRandom(12)
            }
            array.push(r);
        }
        creation.initData(array);
    }

    function test2(creation) {
        var array = [];
        var r;
        for (var i = 0; i < 100000; i++) {
            r = getRandom();
            if (!array[r]) array[r] = [];
            array[r][getRandom()] = getRandom(12);
        }
        console.log(array);
        creation.initData(array);
    }

    function test1(creation) {
        var x = 0;
        var y = 0;
        var timer = setInterval(function() {
            if (x == 1000 && y == 1000) {
                clearInterval(timer);
            }
            if (x == 1000) {
                x = 0;
                y++;
            }
            creation.drawRect(getRandom(), getRandom(), getRandom(12));
            x++;
        }, 1000 / 1000000);
        // clearInterval(timer);
    }

    function getRandom(max) {
        max = max || 1000;
        return Math.floor(Math.random() * max);
    }

    /*******************************************************************/
    /******************************测试代码*****************************/
    /*******************************************************************/


}(window));