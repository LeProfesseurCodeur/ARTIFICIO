(() => {
    "use strict";
    /* ========================= Helpers ========================= */
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    const isDesktopHover = () =>
        window.matchMedia("(hover:hover) and (min-width:1025px)").matches;

    /* ========================= Mobile menu ========================= */
    function toggleMobileMenu() {
        const mobileMenu = document.querySelector("#mobileMenu");
        const menuBtn = document.querySelector(".mobile-menu-btn");
        if (!mobileMenu || !menuBtn) return;

        mobileMenu.classList.toggle("active");
        menuBtn.classList.toggle("active");

        const spans = menuBtn.querySelectorAll("span");
        if (spans.length >= 3) {
            const open = mobileMenu.classList.contains("active");
            spans[0].style.transform = open ? "rotate(45deg) translate(5px, 5px)" : "none";
            spans[1].style.opacity = open ? "0" : "1";
            spans[2].style.transform = open ? "rotate(-45deg) translate(7px, -6px)" : "none";
        }
    }

    /* ========================= Navbar effects =========================
       Objectif: la navbar devient "solide" au scroll.
       ➜ Le CSS doit gérer #navbar.scrolled (background, blur, border...).
    ================================================================ */
    function initNavbarEffects() {
        const navbar = document.querySelector("#navbar");
        if (!navbar) return;

        const THRESHOLD = 80;

        const onScroll = () => {
            navbar.classList.toggle("scrolled", window.scrollY > THRESHOLD);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ========================= Mega menu (Services) =========================
       - Desktop: hover + clic pour "épingler", clic extérieur / ESC ferme.
       - Mobile: le lien "Services" devient un accordéon, ne ferme pas le menu.
    ======================================================================= */
    function initMegaMenuServices() {
        const bridge = document.querySelector("#navbar .nav-item.mega-bridge");
        if (!bridge) return;

        const link = bridge.querySelector(".nav-link");
        const panel = bridge.querySelector(".mega-menu");

        const mobileMenu = document.querySelector("#mobileMenu");
        const mobileServicesLink =
            mobileMenu?.querySelector('.mobile-menu-link[href="#services"]') ||
            mobileMenu?.querySelector(".mobile-services-toggle");

        let hideTimer = null;
        const open = () => {
            clearTimeout(hideTimer);
            bridge.classList.add("open");
            link?.setAttribute("aria-expanded", "true");
        };
        const close = () => {
            clearTimeout(hideTimer);
            bridge.classList.remove("open");
            link?.setAttribute("aria-expanded", "false");
        };
        const scheduleClose = () => {
            clearTimeout(hideTimer);
            hideTimer = setTimeout(close, 120);
        };

        // ----- Desktop bindings -----
        const bindDesktop = () => {
            if (!link) return;

            // Empêche le scroll #services et toggle
            link.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                bridge.classList.toggle("open");
                link.setAttribute("aria-expanded", bridge.classList.contains("open") ? "true" : "false");
            });

            bridge.addEventListener("mouseenter", open);
            bridge.addEventListener("mouseleave", scheduleClose);

            panel?.addEventListener("mouseenter", open);
            panel?.addEventListener("mouseleave", scheduleClose);

            // Clic extérieur ferme
            document.addEventListener("pointerdown", (e) => {
                if (!isDesktopHover()) return;
                if (!bridge.contains(e.target)) close();
            });

            // ESC ferme
            document.addEventListener("keydown", (e) => {
                if (!isDesktopHover()) return;
                if (e.key === "Escape") close();
            });
        };

        // ----- Mobile bindings (accordéon) -----
        const bindMobile = () => {
            if (!mobileMenu || !mobileServicesLink) return;

            mobileServicesLink.classList.add("mobile-services-toggle");
            mobileServicesLink.setAttribute("role", "button");
            mobileServicesLink.setAttribute("aria-expanded", "false");

            // Création du panneau si absent
            let panelMobile = mobileMenu.querySelector("#mobileServicesPanel");
            if (!panelMobile) {
                panelMobile = document.createElement("div");
                panelMobile.id = "mobileServicesPanel";
                panelMobile.className = "mobile-submenu";
                panelMobile.setAttribute("aria-hidden", "true");
                panelMobile.style.overflow = "hidden";
                panelMobile.style.maxHeight = "0px";
                panelMobile.style.transition = "max-height .3s ease";

                // Récupère les titres du mega menu desktop
                const titles = panel
                    ? Array.from(panel.querySelectorAll(".mega-menu-item .mega-menu-title")).map((el) =>
                        (el.textContent || "").trim()
                    )
                    : [];

                const items = titles.length
                    ? titles
                    : [
                        "Conseil & Stratégie",
                        "Studio Graphique",
                        "Développement Web",
                        "Maintenance & Sécurité",
                        "Social Média",
                        "Marketing Digital",
                    ];

                const ul = document.createElement("ul");
                ul.className = "mobile-submenu-list";

                items.forEach((txt) => {
                    const li = document.createElement("li");
                    li.className = "mobile-submenu-item";
                    const a = document.createElement("a");
                    a.href = "#services";
                    a.className = "mobile-menu-link";
                    a.textContent = txt;
                    a.setAttribute("data-no-close", "1"); // évite la fermeture auto du mobile menu
                    li.appendChild(a);
                    ul.appendChild(li);
                });

                panelMobile.appendChild(ul);
                mobileServicesLink.parentElement.insertAdjacentElement("afterend", panelMobile);
            }

            const togglePanel = (e) => {
                // Seulement si menu mobile ouvert
                if (!mobileMenu.classList.contains("active")) return;

                e.preventDefault();
                e.stopPropagation();

                const willOpen = !panelMobile.classList.contains("open");
                panelMobile.classList.toggle("open", willOpen);
                panelMobile.style.maxHeight = willOpen ? panelMobile.scrollHeight + "px" : "0px";

                mobileServicesLink.setAttribute("aria-expanded", willOpen ? "true" : "false");
                panelMobile.setAttribute("aria-hidden", willOpen ? "false" : "true");
            };

            mobileServicesLink.addEventListener("click", togglePanel, { passive: false });

            // Si on passe en desktop: reset propre
            window.addEventListener(
                "resize",
                () => {
                    if (window.innerWidth >= 1025 && panelMobile) {
                        panelMobile.classList.remove("open");
                        panelMobile.style.maxHeight = "0px";
                        mobileServicesLink.setAttribute("aria-expanded", "false");
                        panelMobile.setAttribute("aria-hidden", "true");
                    }
                },
                { passive: true }
            );
        };

        // Bind selon breakpoint
        const apply = () => {
            close();
            if (isDesktopHover()) bindDesktop();
            else bindMobile();
        };

        apply();
        window.addEventListener("resize", apply, { passive: true });
    }

    /* ========================= Smooth scrolling ========================= */
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach((a) => {
            a.addEventListener("click", (e) => {
                const href = a.getAttribute("href");
                if (!href || href === "#") return;

                // Dans le menu mobile: on ne ferme pas si data-no-close ou si accordéon services
                const inMobileMenu = !!a.closest("#mobileMenu");
                const isServicesToggle = a.classList.contains("mobile-services-toggle");

                if (inMobileMenu && (isServicesToggle || a.hasAttribute("data-no-close"))) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const navbar = document.querySelector("#navbar");
                const offset = navbar ? navbar.offsetHeight + 10 : 0;

                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: "smooth" });

                // Ferme le menu mobile si on vient d'un lien "normal"
                const mobileMenu = document.querySelector("#mobileMenu");
                if (mobileMenu?.classList.contains("active") && inMobileMenu) {
                    toggleMobileMenu();
                }
            });
        });
    }

    /* ========================= Scroll progress ========================= */
    function initScrollProgress() {
        const bar = document.querySelector(".scroll-indicator");
        if (!bar) return;

        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = max > 0 ? window.scrollY / max : 0;
            bar.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ========================= Appear on scroll (fade-in) ========================= */
    function initFadeInOnScroll() {
        const els = document.querySelectorAll(".fade-in");
        if (!els.length) return;

        const io = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        els.forEach((el) => io.observe(el));
    }

    /* ========================= Reveal (why-section, etc.) ========================= */
    function initReveal() {
        const revealEls = document.querySelectorAll(".reveal");
        if (!revealEls.length) return;

        const io = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealEls.forEach((el) => io.observe(el));
    }

    /* ========================= Lazy-loading images ========================= */
    function initLazyLoading() {
        const imgs = document.querySelectorAll("img[data-src]");
        if (!imgs.length) return;

        if (!("IntersectionObserver" in window)) {
            imgs.forEach((img) => {
                img.src = img.dataset.src;
                img.classList.remove("lazy");
            });
            return;
        }

        const io = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((e) => {
                    if (!e.isIntersecting) return;
                    const img = e.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove("lazy");
                        img.classList.add("loaded");
                        obs.unobserve(img);
                    }
                });
            },
            { rootMargin: "200px 0px" }
        );

        imgs.forEach((img) => io.observe(img));
    }

    /* ========================= Back to top ========================= */
    function initBackToTop() {
        const backToTop = document.querySelector("#backToTop");
        if (!backToTop) return;

        window.addEventListener(
            "scroll",
            () => {
                backToTop.classList.toggle("show", window.scrollY > 300);
            },
            { passive: true }
        );

        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ========================= Scroll indicator arrow ========================= */
    function initScrollIndicatorArrow() {
        const btn = document.querySelector(".scroll-indicator-fleche[data-scroll-target]");
        if (!btn) return;

        btn.style.cursor = "pointer";

        btn.addEventListener("click", () => {
            const targetSelector = btn.getAttribute("data-scroll-target");
            const target = targetSelector ? document.querySelector(targetSelector) : null;
            if (!target) return;

            const navbar = document.querySelector("#navbar");
            const offset = navbar ? navbar.offsetHeight + 10 : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({ top, behavior: "smooth" });
        });
    }

    /* ========================= Service cards clickable ========================= */
    function initServiceCardsClickable() {
        document.querySelectorAll(".service-card[data-href]").forEach((card) => {
            const url = card.dataset.href;
            if (!url) return;

            card.setAttribute("role", "link");
            card.setAttribute("tabindex", card.getAttribute("tabindex") || "0");

            card.addEventListener("click", () => {
                window.location.href = url;
            });

            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    window.location.href = url;
                }
            });
        });
    }

    /* ========================= Theme (light/dark) ========================= */
    function initTheme() {
        const stored = localStorage.getItem("artificio-theme");
        const prefersDark =
            window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

        const initial = stored || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", initial);

        const btn = document.querySelector("#themeToggle");
        if (btn) {
            btn.textContent = initial === "dark" ? "☀️" : "🌙";
            btn.setAttribute("aria-label", "Changer le thème");
            btn.addEventListener("click", toggleTheme);
        }
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("artificio-theme", next);

        const btn = document.querySelector("#themeToggle");
        if (btn) btn.textContent = next === "dark" ? "☀️" : "🌙";
    }

    /* ========================= Loader (optional) ========================= */
    function initPageLoader() {
        const loader = document.querySelector("#pageLoader");
        if (!loader) return;

        const show = () => {
            loader.classList.add("show");
            loader.setAttribute("aria-hidden", "false");
        };
        const hide = () => {
            loader.classList.remove("show");
            loader.setAttribute("aria-hidden", "true");
        };

        document.addEventListener("click", (e) => {
            const link = e.target.closest("a");
            if (!link) return;

            const href = link.getAttribute("href");
            if (!href) return;

            // ignore new tab / download / special schemes / external
            if (link.target === "_blank") return;
            if (link.hasAttribute("download")) return;
            if (/^(mailto:|tel:|javascript:)/.test(href)) return;

            const isExternal = link.origin && link.origin !== window.location.origin;
            if (isExternal) return;

            // Si c'est un toggle du mega-menu desktop, on ne déclenche pas le loader
            if (link.closest(".nav-item.mega-bridge")) return;

            // Hash navigation: loader léger puis scroll smooth
            if (href.startsWith("#")) {
                e.preventDefault();
                show();

                setTimeout(() => {
                    const target = document.querySelector(href);
                    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                    hide();
                    history.pushState(null, "", href);
                }, 250);

                return;
            }

            // Navigation classique
            e.preventDefault();
            show();
            setTimeout(() => {
                window.location.href = href;
            }, 250);
        });

        window.addEventListener("pageshow", hide);
    }

    /* ========================= Footer year (optional) ========================= */
    function updateFooterYear() {
        const el = document.querySelector(".footer-bottom p");
        if (!el) return;
        const year = String(new Date().getFullYear());
        el.innerHTML = el.innerHTML.replace(/\b\d{4}\b/, year);
    }

    /* ========================= Accessibility (skip link) ========================= */
    function initAccessibility() {
        const skip = document.createElement("a");
        skip.href = "#accueil";
        skip.textContent = "Aller au contenu principal";
        skip.className = "skip-link";
        skip.style.cssText = [
            "position:absolute",
            "top:-40px",
            "left:6px",
            "z-index:10000",
            "background:var(--primary-purple)",
            "color:#fff",
            "padding:8px",
            "text-decoration:none",
            "border-radius:4px",
            "transition:top .3s",
        ].join(";");

        skip.addEventListener("focus", () => (skip.style.top = "6px"));
        skip.addEventListener("blur", () => (skip.style.top = "-40px"));

        document.body.insertBefore(skip, document.body.firstChild);
    }

    /* ========================= Forms (demo) ========================= */
    function showNotification(message, type = "info") {
        const n = document.createElement("div");
        n.className = `notification notification-${type}`;
        n.textContent = message;

        const bg =
            type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3";

        n.style.cssText = [
            "position:fixed",
            "top:100px",
            "right:20px",
            "z-index:10000",
            `background:${bg}`,
            "color:#fff",
            "padding:1rem 1.5rem",
            "border-radius:8px",
            "box-shadow:0 4px 12px rgba(0,0,0,.15)",
            "transform:translateX(100%)",
            "transition:transform .3s ease",
        ].join(";");

        document.body.appendChild(n);
        requestAnimationFrame(() => (n.style.transform = "translateX(0)"));
        setTimeout(() => {
            n.style.transform = "translateX(100%)";
            setTimeout(() => n.remove(), 300);
        }, 3500);
    }

    function initFormHandling() {
        document.querySelectorAll("form").forEach((form) => {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const original = btn ? btn.textContent : "";
                if (btn) {
                    btn.textContent = "Envoi en cours...";
                    btn.disabled = true;
                }

                try {
                    await new Promise((r) => setTimeout(r, 1000));
                    showNotification("Message envoyé avec succès !", "success");
                    form.reset();
                } catch {
                    showNotification("Erreur lors de l’envoi. Réessayez.", "error");
                } finally {
                    if (btn) {
                        btn.textContent = original;
                        btn.disabled = false;
                    }
                }
            });
        });
    }

    /* ========== Page Loader ========== */
    const loader = document.getElementById("pageLoader");

    function showLoader() {
        loader.classList.add("show");
        loader.setAttribute("aria-hidden", "false");
    }

    // Intercepte les clics sur les liens internes
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;

        const href = link.getAttribute("href");
        if (!href) return;

        // Ignore: new tab, download, external, mailto, tel, javascript
        if (link.target === "_blank") return;
        if (link.hasAttribute("download")) return;
        if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;

        const isExternal = link.origin && link.origin !== window.location.origin;
        if (isExternal) return;

        // Si c'est une ancre sur la même page (#services), on peut animer sans "vraie" redirection
        if (href.startsWith("#")) {
            e.preventDefault();
            showLoader();

            // petit délai pour laisser l'animation se voir
            setTimeout(() => {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                loader.classList.remove("show");
                loader.setAttribute("aria-hidden", "true");
                history.pushState(null, "", href);
            }, 450);

            return;
        }

        // Navigation classique vers une autre page
        e.preventDefault();
        showLoader();

        setTimeout(() => {
            window.location.href = href;
        }, 450);
    });

    /* ========== Service CARD ========== */
    document.querySelectorAll('.service-card[data-href]').forEach(card => {
        const url = card.dataset.href;

        // Clic souris
        card.addEventListener('click', () => {
            window.location.href = url;
        });

        // Clavier (Enter)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                window.location.href = url;
            }
        });
    });

    /* ========== FLIP CARD ========== */
    (function () {
        const cards = document.querySelectorAll(".theme-card");

        cards.forEach(card => {
            const href = card.getAttribute("data-href");

            // Tap/click (mobile): 1er tap => flip, 2e tap => redirect
            card.addEventListener("click", (e) => {
                const isLink = e.target.closest("a");
                if (isLink) return; // si l'utilisateur clique sur le bouton, on laisse le lien faire son taf

                // Sur desktop, le hover fait déjà le flip. Ici on gère surtout mobile/tap.
                if (!card.classList.contains("is-flipped")) {
                    e.preventDefault();
                    // close others
                    cards.forEach(c => c !== card && c.classList.remove("is-flipped"));
                    card.classList.add("is-flipped");
                } else if (href) {
                    window.location.href = href;
                }
            });

            // Clavier: Enter => flip puis Enter => redirect
            card.addEventListener("keydown", (e) => {
                if (e.key !== "Enter") return;
                e.preventDefault();

                if (!card.classList.contains("is-flipped")) {
                    cards.forEach(c => c !== card && c.classList.remove("is-flipped"));
                    card.classList.add("is-flipped");
                } else if (href) {
                    window.location.href = href;
                }
            });
        });

        // Clique hors card => referme
        document.addEventListener("click", (e) => {
            if (e.target.closest(".theme-card")) return;
            cards.forEach(c => c.classList.remove("is-flipped"));
        });
    })();

    /* ========== Wizard Modal Contact ========== */
    (function () {
        const modal = document.getElementById("wizardModal");
        if (!modal) return;

        const openButtons = document.querySelectorAll("[data-open-wizard]");
        const closeButtons = modal.querySelectorAll("[data-close-wizard]");
        const dialog = modal.querySelector(".wizard-dialog");

        function openWizard(e) {
            if (e) e.preventDefault();
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";

            // focus simple
            const focusable = dialog.querySelector("button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])");
            if (focusable) focusable.focus();
        }

        function closeWizard() {
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }

        openButtons.forEach(btn => btn.addEventListener("click", openWizard));
        closeButtons.forEach(btn => btn.addEventListener("click", closeWizard));

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("is-open")) closeWizard();
        });
    })();

    /* ========================= Boot ========================= */
    function initializeWebsite() {
        // Expose globals used by HTML
        window.toggleMobileMenu = toggleMobileMenu;
        window.toggleTheme = toggleTheme;

        initTheme();
        initNavbarEffects();
        initMegaMenuServices();
        initSmoothScrolling();
        initScrollProgress();
        initFadeInOnScroll();
        initReveal();
        initLazyLoading();
        initBackToTop();
        initScrollIndicatorArrow();
        initServiceCardsClickable();
        initPageLoader();
        updateFooterYear();
        initAccessibility();
        initFormHandling();

        // Compatibility no-ops
        window.openWizard =
            window.openWizard ||
            function () {
                try {
                    location.hash = "#contact";
                } catch (_) { }
            };
        window.closeWizard = window.closeWizard || function () { };

        console.log("🚀 Artificio: initialized (clean).");
    }

    window.addEventListener("error", (e) => {
        console.error("[Artificio] JS error:", e.error || e.message || e);
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeWebsite);
    } else {
        initializeWebsite();
    }
})();
