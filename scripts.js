window.onload = function() {
    // Global variables
    var canvas;
    var ctx;
    var delay = 1000;
    var xCoord = 0;
    var yCoord = 0;

    init();

    function init() {
        var canvas = this.document.createElement("canvas");
        canvas.width = 900;
        canvas.height = 600;
        canvas.style.border = "1px blue solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext("2d");
        refrechCanvas();
    }

    function refrechCanvas() {
        xCoord += 2;
        yCoord += 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(xCoord, yCoord, 100, 50);
        setTimeout(refrechCanvas, delay);
    }

};