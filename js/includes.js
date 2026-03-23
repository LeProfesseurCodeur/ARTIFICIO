async function include(selector, url, onLoaded) {
    const el = document.querySelector(selector);
    if (!el) return;

    const res = await fetch(url);
    el.innerHTML = await res.text();

    if (typeof onLoaded === "function") onLoaded();
}

function setupNavbarScroll() {
    const navbar = document.getElementById("navbar") || document.querySelector(".navbar");
    if (!navbar) return;

    const update = () => {
        const isScrolled = window.scrollY > 10;
        navbar.classList.toggle("scrolled", isScrolled);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update(); // important : applique l’état tout de suite
}

include("#site-navbar", "/partials/navbar.html", () => {
    setupNavbarScroll();
});

include("#site-footer", "/partials/footer.html");
