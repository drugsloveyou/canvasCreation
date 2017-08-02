/**
 * 页面业务
 * @authors xiezuobing(948466)
 * @date    2017-07-31 15:03:43
 * @version v1.0
 */
            var creation = new Creation(canvas);
(function(window) {
    var page = {};
    $.extend(page, {
        init: function() {
            var canvas = document.getElementById('canvas');
            creation.config.onPointChange = function(x, y) {
                // console.log(x, y);
            }

                // creation.initData([]);
            test5(creation);
        }
    });

    function test5(creation) {
        var array = [];
        // creation.config.canvasWidth * creation.config.canvasHeight
        for(var i = 0;i< 1000000; i++) {
            array[i] = getRandom(40);
        }
        creation.initData(array);
    }

    function test4(creation) {
        var array = [];
        for (var i = 0; i < creation.config.canvasWidth; i++) {
            if(!array[i]) array[i] = [];
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

    window.onload = function() {
        page.init();
    }

}(window));