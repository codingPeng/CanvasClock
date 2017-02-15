window.onload = function () {
    var dom = document.getElementById("clock");
    var ctx = dom.getContext('2d');
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var r = width / 2;
    var rem = width / 200;

    //时钟的外圆
    function drawBackground() {
        ctx.save();
        ctx.translate(r, r);
        ctx.beginPath(); //确定路径的起始
        ctx.lineWidth = 10 * rem;
        ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI);//画圆
        ctx.stroke();//绘制定义的路径

        var hourNumber = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];
        ctx.font = 18 * rem + 'px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        hourNumber.forEach(function (number, i) {
            var rad = 2 * Math.PI / 12 * i;
            var x = Math.cos(rad) * (r - 30 * rem);
            var y = Math.sin(rad) * (r - 30 * rem);
            ctx.fillText(number, x, y);
        })

        for (var i = 0; i < 60; i++) {
            var rad = 2 * Math.PI / 60 * i;
            var x = Math.cos(rad) * (r - 18 * rem);
            var y = Math.sin(rad) * (r - 18 * rem);
            ctx.beginPath();
            if (i % 5 === 0) {

                ctx.fillStyle = '#000';
                ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
            } else {

                ctx.fillStyle = '#ccc';
                ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
            }
            ctx.fill();
        }
    }

    //小时
    function drawhour(hour, minute) {
        ctx.save();
        ctx.beginPath();
        var rad = 2 * Math.PI / 12 * hour;
        var mrad = 2 * Math.PI / 12 / 60 * minute;
        ctx.rotate(rad + mrad);
        ctx.lineWidth = 6 * rem;
        ctx.lineCap = 'round';
        ctx.moveTo(0, 10 * rem);
        ctx.lineTo(0, -r / 2);
        ctx.stroke();
        ctx.restore();
    }

    //分钟
    function drawMinute(minute) {
        ctx.save();
        ctx.beginPath();
        var rad = 2 * Math.PI / 60 * minute;
        ctx.rotate(rad);
        ctx.lineWidth = 3 * rem;
        ctx.lineCap = 'round';
        ctx.moveTo(0, 10);
        ctx.lineTo(0, -r + 30 * rem);
        ctx.stroke();
        ctx.restore();
    }

    //秒钟
    function drawSecond(second) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = 'red'
        var rad = 2 * Math.PI / 60 * second;
        ctx.rotate(rad);
        ctx.moveTo(-2 * rem, 20 * rem);
        ctx.lineTo(2 * rem, 20 * rem);
        ctx.lineTo(1, -r + 18 * rem);
        ctx.lineTo(-1, -r + 18 * rem);
        ctx.fill();
        ctx.restore();
    }

    //中心原点
    function drawDot() {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    //动态的时分秒
    function draw() {
        ctx.clearRect(0, 0, width, height);
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        drawBackground();
        drawhour(hour, minute);
        drawMinute(minute);
        drawSecond(second);
        drawDot();
        ctx.restore();
    }

    setInterval(draw, 1000)

}