function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    body.classList.toggle('menu-open');
    navLinks.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".slideshow-container");
    container.innerHTML += container.innerHTML; // 画像を複製して途切れなくする
});

