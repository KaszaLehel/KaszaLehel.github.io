const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        navbar.classList.remove('hidden');
    } else {
        navbar.classList.add('hidden');
    }
});
