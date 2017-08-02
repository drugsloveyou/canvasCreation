var buycolorNum = 0;
var tpp = 120;
var inputting = false;
var saveCampleted = false;
var map = new Array();
var cur = new Array();
var allmcanvas = new Array();
var colorsown = new Array(10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0);
for (var i = 1; i <= 512; i++) {
    cur[i] = 1;
}
for (var i = 1; i <= 512; i++) {
    map[i] = cur.slice();
}
window.onmousewheel = document.onmousewheel = scrollFunc;
if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
if (window.innerHeight)
    document.getElementById("myCanvas").height = window.innerHeight - 40;
else if ((document.body) && (document.body.clientHeight))
    document.getElementById("myCanvas").height = document.body.clientHeight - 40;
if (window.innerWidth)
    document.getElementById("myCanvas").width = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
    document.getElementById("myCanvas").width = document.body.clientWidth;
var dragging = false
var timeleft = 0
var dcolor = "UNSET"
var colors = ["#FFFFFF", "#DDDDDD", "#999999", "#111111", "#F012BE", "#FF4136", "#FF851B", "#85144B", "#FFDC00", "#01FF70", "#2ECC40", "#3D9970", "#39CCCC", "#7FDBFF", "#0074D9", "#0000FF", "#FF0000", "#66CCFF", "#002F4F"]
var allEles = document.childNodes;
for (var i = 0; i < allEles.length; i++) {
    if (allEles[i].className && allEles[i].className == "plate-color") {
        allEles[i].onclick = setColor(event);
    }
}
var dragx = 0;
var posx = 0;
var coordx = 0;
var dragy = 0;
var posy = 0;
var coordy = 0;
var colorNum = 16;
var scale = 10;
var curn = 1;
var coins = 0;
var curscale = 10;

function setGesture(el) {
    var obj = {};
    var istouch = false;
    var start = [];
    el.addEventListener("touchstart", function(e) {
        if (e.touches.length == 1) {
            startdrag(e.touches[0]);
        };
        if (e.touches.length >= 2) {
            istouch = true;
            start = e.touches;
            obj.gesturestart && obj.gesturestart.call(el);
        };
    }, false);
    document.addEventListener("touchmove", function(e) {
        if (e.touches.length == 1) {
            drag(e.touches[0]);
        };
        if (e.touches.length >= 2 && istouch) {
            var now = e.touches;
            var scale = getDistance(now[0], now[1]) / getDistance(start[0], start[1]);
            e.scale = scale.toFixed(2);
            obj.gesturemove && obj.gesturemove.call(el, e);
        };
    }, false);
    document.addEventListener("touchend", function(e) {
        if (istouch) {
            istouch = false;
            obj.gestureend && obj.gestureend.call(el);
        };
        dragging = false;
    }, false);
    return obj;
};

function getDistance(p1, p2) {
    var x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
    return Math.sqrt((x * x) + (y * y));
};
var cav = document.querySelector("#myCanvas");
var boxGesture = setGesture(cav);
boxGesture.gesturemove = function(e) {
    curscale *= e.scale
    if (parseInt(curscale) != scale && parseInt(curscale) >= 1 && parseInt(curscale) <= 10)
        scale = parseInt(curscale);
};

function dsignin() {
    var p = $("#password").val(),
        r = $("#repassword").val(),
        u = $("#username").val(),
        m = $("#email").val(),
        v = $("#vcode").val();
    var patrn = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (p !== r) {
        alert("表格填写不规范\n两次密码不一致");
    } else if (p.length < 8) {
        alert("表格填写不规范\n密码长度不足8位")
    } else if (u == "" || r == "" || p == "" || m == "") {
        alert("表格填写不规范\n请填满所有项");
    } else if (v.length < 4) {
        alert("表格填写不规范\n验证码长度不足4位");
    } else if (u.match(/^[a-zA-Z0-9]$/g) || p.match(/^[a-zA-Z0-9]$/g)) {
        alert("表格填写不规范\n用户名和密码不能含有汉字等非英文字符");
    } else if (!patrn.exec(m)) {
        alert("表格填写不规范\n邮箱格式不正确");
    } else {
        $("#registerform").submit();
    };
}

function dlogin() {
    var p = $("#lgpassword").val(),
        u = $("#lgusername").val(),
        v = $("#lgvcode").val();
    if (u == "" || p == "") {
        alert("表格填写不规范\n请填满所有项");
    } else if (v.length < 4) {
        alert("表格填写不规范\n验证码长度不足4位");
    } else if (u.match(/^[a-zA-Z0-9]$/g) || p.match(/^[a-zA-Z0-9]$/g)) {
        alert("表格填写不规范\n用户名和密码不能含有汉字等非英文字符");
    } else {
        sendlogin();
    };
    getuserinfo();
}

function sendlogin() {
    var p = $("#lgpassword").val(),
        u = $("#lgusername").val(),
        v = $("#lgvcode").val();
    var XMLHttp = new XMLHttpRequest();
    XMLHttp.open("POST", "login.php", false);
    XMLHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XMLHttp.send("username=" + u + "&password=" + p + "&vcode=" + v);
    if (XMLHttp.responseText == '1') {
        document.getElementById("register").style.display = "none"
        document.getElementById("login").style.display = "none"
        document.getElementById("lgcv").style.display = "none"
    } else {
        alert("登录失败！" + XMLHttp.responseText)
    }
}

function scrollFunc(e) {
    if (e.wheelDelta > 0 && scale + 1 <= 10) {
        changeScale(true)
    }
    if (e.wheelDelta < 0 && scale - 1 >= 1) {
        changeScale(false)
    }
}

function changeScale(dir) {
    var x = coordx,
        y = coordy;
    if (x < 0 || x > 512 || y < 0 || y > 512) {
        return
    }
    if (dir && scale + 1 <= 10) {
        scale = scale + 1;
        posx -= x;
        posy -= y;
    }
    if (!dir && scale - 1 >= 1) {
        scale = scale - 1;
        posx += x;
        posy += y;
    }
    showSaved()
}

function getTop(e) {
    var offset = e.offsetTop;
    if (e.offsetParent != null)
        offset += getTop(e.offsetParent);
    return restore;
}

function getLeft(e) {
    var offset = e.offsetLeft;
    if (e.offsetParent != null)
        offset += getLeft(e.offsetParent);
    return offset;
}

function ApplyCanvas() {
    if (!saveCampleted) {
        return
    }
    var XMLHttp = new XMLHttpRequest()
    XMLHttp.open("GET", "gmap.php?l=" + curn.toString() + "&t=" + Math.random(), true);
    XMLHttp.send();
    XMLHttp.onreadystatechange = function() {
        if (XMLHttp.readyState == 4 && XMLHttp.status == 200) {
            var c = document.getElementById("myCanvas");
            var cxt = c.getContext("2d");
            for (var a in XMLHttp.responseText.split("\n")) {
                try {
                    a = XMLHttp.responseText.split("\n")[a];
                    var posx = parseInt(a.split(" ")[0]);
                    var posy = parseInt(a.split(" ")[1]);
                    if (posx == "65536") {
                        curn += posy;
                        document.getElementById("rtinfo").innerHTML = "在线人数：" + a.split(" ")[2]
                        break;
                    }
                    map[posx][posy] = parseInt(a.split(" ")[2]);
                    drawMore(posx, posy, parseInt(a.split(" ")[2]))
                } catch (err) {}
            }
        }
    }

    showSaved();
}

function drawEach(num) {
    mcanvas.width = 512 * scale;
    mcanvas.height = 512 * scale;
    var cxt = mcanvas.getContext("2d");
    cxt.fillStyle = "#FFFFFF";
    cxt.fillRect(0, 0, 512 * scale, 512 * scale);
    for (var x = 1; x <= 512; x++) {
        for (var y = 1; y <= 512; y++) {
            var dx = x * scale + posx;
            var dy = y * scale + posy;
            if (map[x][y] != 0) {
                cxt.fillStyle = colors[map[x][y] - 1]
                cxt.fillRect(x * scale - scale, y * scale - scale, scale, scale);
            }
        }
    }
    showSaved()
}

function drawMore(x, y, c) {
    for (var cscale = 1; cscale < 11; cscale++) {
        var cxt = allmcanvas[cscale].getContext("2d");
        cxt.fillStyle = colors[c - 1];
        cxt.fillRect(x * cscale - cscale, y * cscale - cscale, cscale, cscale);
    }
}

function drawEach(num) {
    allmcanvas[num].width = (512 * num).toString();
    allmcanvas[num].height = (512 * num).toString();
    var cxt = allmcanvas[num].getContext("2d");
    cxt.fillStyle = "#FFFFFF";
    cxt.fillRect(0, 0, 512 * num, 512 * num);
    for (var x = 1; x <= 512; x++) {
        for (var y = 1; y <= 512; y++) {
            var dx = x * num + posx;
            var dy = y * num + posy;
            if (map[x][y] != 0) {
                cxt.fillStyle = colors[map[x][y] - 1];
                cxt.fillRect(x * num - num, y * num - num, num, num);
            }
        }
    }
    document.getElementById("ldinfo").innerHTML = "LOADING" + num.toString()
}

function showSaved() {
    var c = document.getElementById("myCanvas");
    var cxt = c.getContext("2d");
    cxt.fillStyle = "#66ccff";
    cxt.fillRect(0, 0, 3000, 3000);
    cxt.drawImage(allmcanvas[scale], posx, posy);
}

function setPixel(e) {
    if (dcolor == "UNSET") {
        return;
    }
    if (timeleft > 0) {
        return
    }
    var x = e.clientX - getLeft(document.getElementById("myCanvas")) - posx;
    var y = e.clientY - getTop(document.getElementById("myCanvas")) - posy;
    x = parseInt(x / scale) + 1;
    y = parseInt(y / scale) + 1;
    if (x < 0 || x > 512 || y < 0 || y > 512) {
        return
    }
    gPixel(x, y, dcolor);
    dcolor = "UNSET"
}

function startdrag(e) {
    dragx = e.clientX
    dragy = e.clientY
    dragging = true;
}

function drag(e) {
    var x = e.clientX + 2
    var y = e.clientY + 2
    if (dcolor != "UNSET") {
        document.getElementById('myCanvas').style.cursor = "crosshair"
        document.getElementById('ct').style.display = ""
        document.getElementById('ct').style.left = x.toString() + 'px'
        document.getElementById('ct').style.top = y.toString() + 'px'
    } else {
        document.getElementById('myCanvas').style.cursor = "move"
        document.getElementById('ct').style.display = "none"
    }
    dragMap(e)
}

function dragMap(e) {
    var x = e.clientX - getLeft(document.getElementById("myCanvas")) - posx;
    var y = e.clientY - getTop(document.getElementById("myCanvas")) - posy;
    coordx = parseInt(x / scale) + 1;
    coordy = parseInt(y / scale) + 1;
    if (coordx < 0 || coordx > 512 || coordy < 0 || coordy > 512) {
        return
    }
    document.getElementById('lfinfo').innerHTML = "(" + coordx.toString() + "," + coordy.toString() + ")"
    if (!dragging) {
        return;
    }
    posx += e.clientX - dragx
    posy += e.clientY - dragy
    dragx = e.clientX
    dragy = e.clientY
    showSaved()
}

function setColor(obj) {
    colorNum = parseInt(obj.id);
    dcolor = obj.style.backgroundColor;
    document.getElementById('ct').style.backgroundColor = dcolor;
}

function gPixel(x, y, c) {
    var XMLHttp = new XMLHttpRequest();
    XMLHttp.open("POST", "i.php", true);
    XMLHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XMLHttp.send("x=" + x.toString() + "&y=" + y.toString() + "&c=" + colorNum.toString());
    setTimeout("getuserinfo()", 1000);
}

function keyD(e) {
    var keynum;
    var keychar;
    keynum = window.event ? e.keyCode : e.which;
    keychar = String.fromCharCode(keynum);
    if (inputting)
        return;
    switch (keychar) {
        case "W":
            posy += 40;
            showSaved();
            break;
        case "A":
            posx += 40;
            showSaved();
            break;
        case "S":
            posy -= 40;
            showSaved();
            break;
        case "D":
            posx -= 40;
            showSaved();
            break;
        case "I":
            toginfo();
    }
    switch (keynum) {
        case 187:
            changeScale(true)
            break;
        case 189:
            changeScale(false)
            break;
    }
}

function load() {
    var XMLHttp = new XMLHttpRequest()
    XMLHttp.open("GET", "gmap.php?l=1&t=" + Math.random(), false);
    XMLHttp.send();
    for (var a in XMLHttp.responseText.split("\n")) {
        try {
            a = XMLHttp.responseText.split("\n")[a];
            var posx = parseInt(a.split(" ")[0]);
            var posy = parseInt(a.split(" ")[1]);
            if (posx == "65536") {
                curn = posy;
                break;
            }
            map[posx][posy] = parseInt(a.split(" ")[2]);
        } catch (err) {}
    }
    XMLHttp.open("GET", "time.php?t=" + Math.random(), false);
    XMLHttp.send();
    if (XMLHttp.responseText != "") {
        document.getElementById("lgcv").style.display = "none";
        document.getElementById("getmoretimeinfo").style.display = "";
    }
    getuserinfo()
    for (num = 1; num < 11; num++) {
        allmcanvas[num] = document.createElement("canvas");
    }
    for (num = 1; num < 11; num++) {
        drawEach(num);
    }
    document.getElementById("ld").style.display = "none";
    saveCampleted = true;
}

function getuserinfo() {
    var XMLHttp = new XMLHttpRequest()
    XMLHttp.open("GET", "time.php", true);
    XMLHttp.send();
    XMLHttp.onreadystatechange = function() {
        if (XMLHttp.readyState == 4 && XMLHttp.status == 200) {
            if (XMLHttp.responseText != "") {
                if (XMLHttp.responseText.split("\n")[4].length >= 3) {
                    if (XMLHttp.responseText.split("\n")[4][0] == "b")
                        colorsown[17] = 2;
                    if (XMLHttp.responseText.split("\n")[4][0] == "c")
                        colorsown[17] = 1;
                    if (XMLHttp.responseText.split("\n")[4][1] == "b")
                        colorsown[18] = 2;
                    if (XMLHttp.responseText.split("\n")[4][1] == "c")
                        colorsown[18] = 1;
                    if (XMLHttp.responseText.split("\n")[4][2] == "b")
                        colorsown[19] = 2;
                    if (XMLHttp.responseText.split("\n")[4][2] == "c")
                        colorsown[19] = 1;
                }
                timeleft = parseInt(XMLHttp.responseText.split("\n")[0])
                coins = parseInt(XMLHttp.responseText.split("\n")[3])
                tpp = parseInt(XMLHttp.responseText.split("\n")[5])
                document.getElementById("usernametitle").innerHTML = "欢迎你， " + XMLHttp.responseText.split("\n")[1]
                document.getElementById("userpoints").innerHTML = "已画点数:\t" + XMLHttp.responseText.split("\n")[2]
                document.getElementById("usercoins").innerHTML = "像素硬币:\t" + XMLHttp.responseText.split("\n")[3]
                document.getElementById("userlogout").style.display = ""
                document.getElementById("getmoretimeinfo").style.display = ""
                document.getElementById("waitingp1").innerHTML = "您现在的等待时间：" + tpp.toString() + " s"
                document.getElementById("waitingp2").innerHTML = "减少时间到" + (tpp - 10).toString() + "s 需要" + (Math.pow(2, parseInt((120 - tpp) / 10)) * 10).toString() + "硬币"
                if (timeleft <= 0) {
                    document.getElementById("cv").style.display = "none";
                } else {
                    document.getElementById("cv").style.display = "";
                    document.getElementById("cvinfo").innerHTML = timeleft.toString() + "s"
                }
            }
        }
    }
}

function dotime() {
    timeleft -= 1
    if (timeleft <= 0) {
        document.getElementById("cv").style.display = "none";
    } else {
        document.getElementById("cv").style.display = "";
        document.getElementById("cvinfo").innerHTML = timeleft.toString() + "s"
    }
}

function create_code() {
    document.getElementById('code').src = 'vcode.php?' + Math.random() * 10000;
}

function togreg() {
    if (document.getElementById("register").style.display == "") {
        inputting = false;
        document.getElementById("register").style.display = "none"
    } else {
        inputting = true;
        document.getElementById("register").style.display = ""
        document.getElementById("login").style.display = "none"
        create_code()
    }
}

function toglog() {
    if (document.getElementById("login").style.display == "") {
        inputting = false;
        document.getElementById("login").style.display = "none"
    } else {
        inputting = true;
        document.getElementById("login").style.display = ""
        document.getElementById("register").style.display = "none"
        create_code2()
    }
}

function toggleother(el) {
    if (document.getElementById(el).style.display == "") {
        document.getElementById(el).style.display = "none"
    } else {
        document.getElementById(el).style.display = ""
    }
}

function toginfo() {
    if (document.getElementById("infobar").className == "info open") {
        document.getElementById("infobar").className = "info"
    } else {
        document.getElementById("infobar").className = "info open"
    }
}

function logout() {
    setTimeout('window.location.href="logout.php";', 100);
}

function create_code2() {
    document.getElementById('lgcode').src = 'vcode.php?' + Math.random() * 10000;
}

function getColor(e) {
    buycolorNum = parseInt(e.id);
    if (colorsown[buycolorNum] == 1) {
        setColor(e)
        return
    }
    if (colorsown[buycolorNum] == 2) {
        colorsown[buycolorNum] = 0
        setColor(e)
        return
    }
    document.getElementById("buycolorblock").style.backgroundColor = e.style.backgroundColor
    document.getElementById("buycolor").style.display = ""
    document.getElementById("buycolorinfo").innerHTML = String(e.style.backgroundColor)
}

function buycoloronce() {
    if (coins < 2) {
        alert("硬币数量不足。")
        return
    }
    var XMLHttp = new XMLHttpRequest()
    XMLHttp.open("POST", "getcolor.php", false);
    XMLHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XMLHttp.send("color=" + buycolorNum + "&time=2");
    if (XMLHttp.responseText == '1') {
        colorsown[buycolorNum] = 2
        toggleother("buycolor")
        setColor(document.getElementById(buycolorNum.toString()))
    } else {
        alert("获取颜色失败！" + XMLHttp.responseText)
    }
    getuserinfo()
}

function buycolorforever() {
    if (coins < 20) {
        alert("硬币数量不足。")
        return
    }
    var XMLHttp = new XMLHttpRequest()
    XMLHttp.open("POST", "getcolor.php", false);
    XMLHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XMLHttp.send("color=" + buycolorNum + "&time=1");
    if (XMLHttp.responseText == '1') {
        colorsown[buycolorNum] = 1
        toggleother("buycolor")
        setColor(document.getElementById(buycolorNum.toString()))
    } else {
        alert("获取颜色失败！" + XMLHttp.responseText)
    }
    getuserinfo()
}

function buytime() {
    if (coins < Math.pow(2, parseInt((120 - tpp) / 10)) * 10) {
        alert("硬币数量不足。")
        return
    }
    var XMLHttp = new XMLHttpRequest()
    XMLHttp.open("GET", "gettime.php", false);
    XMLHttp.send();
    if (XMLHttp.responseText == '1') {
        alert("购买成功！")
    } else {
        alert("购买失败！" + XMLHttp.responseText)
    }
    getuserinfo()
}
setTimeout("load();", 2);
setInterval("ApplyCanvas()", 1000);
setInterval("dotime()", 1000);
setInterval("getuserinfo()", 10000);
document.getElementById("register").style.display = "none"
document.getElementById("login").style.display = "none"
document.getElementById("userlogout").style.display = "none"
document.getElementById("buycolor").style.display = "none"
document.getElementById("getmoretimeinfo").style.display = "none"