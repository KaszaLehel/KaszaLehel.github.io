var curX = 0;
var curY = 0;
var tgX = 0;
var tgY = 0;

document.addEventListener('DOMContentLoaded', function () {
    var interBubble = document.querySelector('.interactive');

    function move() {
        // Növeljük az elmozdulás mértékét, hogy gyorsabban kövesse az egeret
        curX += (tgX - curX) / 20; // Az 1/10 gyorsabb mozgást biztosít
        curY += (tgY - curY) / 20; // Az 1/10 gyorsabb mozgást biztosít
        interBubble.style.transform = 'translate(' + Math.round(curX) + 'px, ' + Math.round(curY) + 'px)';

        // Request animation frame újraindítása
        requestAnimationFrame(function () {
            move();
        });
    }

    // Az egér mozgása
    window.addEventListener('mousemove', function (event) {
        tgX = event.clientX;
        tgY = event.clientY;
        console.log(event.clientX);
    });

    move();
});


