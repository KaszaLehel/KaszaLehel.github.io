var curX = 0;
var curY = 0;
var tgX = 0;
var tgY = 0;

document.addEventListener('DOMContentLoaded', function () {
    var interBubble = document.querySelector('.interactive');

    function move() {
        curX += (tgX - curX) / 20; 
        curY += (tgY - curY) / 20; 
        interBubble.style.transform = 'translate(' + Math.round(curX) + 'px, ' + Math.round(curY) + 'px)';
        
        requestAnimationFrame(function () {
            move();
        });
    }

    window.addEventListener('mousemove', function (event) {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});


