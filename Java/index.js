document.addEventListener('DOMContentLoaded', () => {
    let btn = document.querySelector('#button-style');
    
    btn.onmousemove = function(e) {
        let rect = btn.getBoundingClientRect(); // Az elem pozíciója
        let x = e.clientX - rect.left; // Egér X pozíciója az elem relatív koordinátáján
        let y = e.clientY - rect.top; // Egér Y pozíciója az elem relatív koordinátáján
        
        // Beállítjuk a CSS változókat
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
    };
});
