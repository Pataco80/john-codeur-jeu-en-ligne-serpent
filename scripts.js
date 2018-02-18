window.onload = function() {
    // Global variables
    var canvas;
    var ctx;
    var delay = 1000;
    var xCoord = 0;
    var yCoord = 0;

    init();

    function init() {
        canvas = this.document.createElement("canvas");
        canvas.width = 900;
        canvas.height = 600;
        canvas.style.border = "1px blue solid";
        document.body.appendChild(canvas);

        ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(xCoord, yCoord, 100, 50);
    }

    function refrechCanvas() {

    }

};