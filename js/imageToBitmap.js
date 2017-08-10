(function(window) {
    var width = 190;
    var height = 261;

    function imageToBitMap(image, canvas) {
        getBitMapByImage('images/test6.jpg',0,0);
    }

    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

    function colorHex(str) {
        var that = str;
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
    /*16进制颜色转为RGB格式*/
    function colorRgb(str) {
        var sColor = str.toLowerCase();
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

    function loadImageByBitMap(bitmap, canvas) {
        console.log(canvas)
        var can = document.createElement('canvas');
        can.width = width;
        can.height = width;
        var ctx = can.getContext('2d');
        var imageData = ctx.createImageData(can.width, can.height);
        var buffer = new ArrayBuffer(imageData.data.length);
        var clampedArray = new Uint8ClampedArray(buffer);
        var uintArray = new Uint32Array(buffer);
        for (var i = 0; i < can.width; i++) {
            for (var j = 0; j < can.height; j++) {
                var m = bitmap[i * can.width + j];
                var color = m;
                if (color != undefined) {
                    var g = colorRgb(('#' + color));
                    uintArray[j * can.width + i] = 255 << 24 | g[2] << 16 | g[1] << 8 | g[0]
                } else {
                    uintArray[j * can.width + i] = 255 << 24 | 255 << 16 | 255 << 8 | 255
                }
            }
        };
        console.log(clampedArray);
        console.log(uintArray);
        imageData.data.set(clampedArray);
        console.log(imageData);
        ctx.putImageData(imageData, 0, 0);
        console.log(imageData);
        var ctx2 = canvas.getContext('2d');
        ctx2.drawImage(can, 100, 100);
    };

    function changeRgba(color) {
        var c = color.toString(16)
        if (color < 16) c = '0' + c;
        return c;
    }

    function getBitMapByImage(src,posX,posY) {
    	posX = posX || 0;
    	posY = posY || 0;
        var image = new Image();
        image.onload = function() {
            var can = document.createElement('canvas');
            console.log(image.naturalWidth, image.naturalHeight);
            can.width = image.naturalWidth/1.92;
            can.height = image.naturalHeight/1.92;
            var ctx = can.getContext('2d');
            ctx.drawImage(image, 0, 0, can.width,can.height);
            var imageData = ctx.getImageData(0, 0, can.width, can.height);
            var clampedArray = imageData.data;
            var bitmap = [];

            console.log(clampedArray.length);
            var color, r, g, b, a;
            for (var i = 0, l = clampedArray.length / 4; i < l; i++) {
                var index = i * 4;
                r = clampedArray[index];
                g = clampedArray[index + 1];
                b = clampedArray[index + 2];
                a = clampedArray[index + 3];
                color = '#' + changeRgba(r) + changeRgba(g) + changeRgba(b);
                var obj = {
                    c: color,
                    r: r,
                    g: g,
                    b: b,
                    a: a,
                }
                bitmap[i] = obj;
            }

            setTimeout(function() {
                var canvas = page.creation.canvas[1];
                var context = canvas.getContext('2d');
                var getDraw = getRandomDraw(can, context, bitmap);
                for(var i = 0;i< 10000;i++) {
                	getDraw();
                }
            }, 2000);
        };

        function getRandomDraw(can, context, bitmap) {
            var indexs = [];
            for (var i = 0; i < can.height; i++) {
                for (var j = 0; j < can.width; j++) {
                    (function(x, y) {
                    	var t = {};
                        t.x = x;
                        t.y = y;
                        indexs.push(t);
                    }(i, j));
                }
            }
            return function() {
	            var index = 0;
	            var random;
	            var timer = setInterval(function() {
	            	random = Math.floor(Math.random() * indexs.length);
	            	var pos = indexs[random];
	            	if(!pos) {
	            		clearInterval(timer);
	            		return;
	            	}
	                index = pos.x * can.width + pos.y;
	                context.fillStyle = bitmap[index].c;
	                context.globalAlpha = bitmap[index].a / 255;
	                context.fillRect(posX + pos.y, posY + pos.x, 1, 1);
	                page.creation.renderSaveHost();
	                indexs.splice(random,1);
	                if (indexs.length == 0) clearInterval(timer);
	            }, 1);
            }
        }

        image.src = src;
    }
    window.getBitMapByImage = getBitMapByImage;
    imageToBitMap(image, canvas);
    window.imageToBitMap = imageToBitMap
}(window));