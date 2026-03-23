/* =========================================================
   ARTIFICIO — SCRIPT GLOBAL PREMIUM (FUSION CLEAN)
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* =========================================================
       HELPERS
    ========================================================= */
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    /* =========================================================
       FADE-IN + STAGGER
    ========================================================= */
    const fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length) {
        if (prefersReducedMotion) {
            fadeElements.forEach(el => el.classList.add('visible'));
        } else {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);

                    const revealItems = entry.target.querySelectorAll(
                        '.service-showcase__badge, h3, p, .service-showcase__meta li, .service-showcase__actions .btn'
                    );

                    revealItems.forEach((item, index) => {
                        item.style.transitionDelay = `${index * 70}ms`;
                        item.classList.add('is-revealed');
                    });
                });
            }, {
                threshold: 0.16,
                rootMargin: '0px 0px -60px 0px'
            });

            fadeElements.forEach(el => observer.observe(el));
        }
    }

    /* =========================================================
       TILT / PARALLAX
    ========================================================= */
    const visuals = document.querySelectorAll('.offer-visual');

    visuals.forEach((visual) => {
        if (prefersReducedMotion) return;

        const innerWindow = visual.querySelector('.offer-window');
        const floatingBits = visual.querySelectorAll('.orb, .gear, .cone, .shop-roof, .shop-body, .monitor');

        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let raf = null;

        const animate = () => {
            currentX += (targetX - currentX) * 0.12;
            currentY += (targetY - currentY) * 0.12;

            visual.style.transform = `
                perspective(1200px)
                rotateX(${currentY}deg)
                rotateY(${currentX}deg)
                scale(1.015)
            `;

            if (innerWindow) {
                innerWindow.style.transform = `
                    translate3d(${currentX * 1.5}px, ${currentY * -1.5}px, 0)
                `;
            }

            floatingBits.forEach((el, i) => {
                const factor = (i % 3 + 1);
                el.style.transform = `translate3d(${currentX * factor}px, ${currentY * -factor}px, 0)`;
            });

            raf = requestAnimationFrame(animate);
        };

        visual.addEventListener('mouseenter', () => {
            if (window.innerWidth < 1024) return;
            if (!raf) raf = requestAnimationFrame(animate);
        });

        visual.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 1024) return;

            const rect = visual.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;

            targetX = clamp(px * 10, -5, 5);
            targetY = clamp(py * -10, -5, 5);
        });

        visual.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;

            const reset = () => {
                currentX *= 0.85;
                currentY *= 0.85;

                visual.style.transform = `
                    perspective(1200px)
                    rotateX(${currentY}deg)
                    rotateY(${currentX}deg)
                `;

                if (Math.abs(currentX) < 0.05 && Math.abs(currentY) < 0.05) {
                    visual.style.transform = '';
                    if (raf) cancelAnimationFrame(raf);
                    raf = null;
                    return;
                }

                requestAnimationFrame(reset);
            };

            requestAnimationFrame(reset);
        });
    });

    /* =========================================================
       FLOATING ORBS
    ========================================================= */
    document.querySelectorAll('.orb').forEach((orb) => {
        if (prefersReducedMotion) return;

        let angle = Math.random() * Math.PI * 2;
        const speed = 0.003 + Math.random() * 0.003;
        const radius = 6 + Math.random() * 8;

        const float = () => {
            angle += speed;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            orb.style.transform = `translate(${x}px, ${y}px)`;

            requestAnimationFrame(float);
        };

        float();
    });

    /* =========================================================
       BUTTON INTERACTIONS
    ========================================================= */
    document.querySelectorAll('.btn').forEach((btn) => {

        btn.addEventListener('mouseenter', () => {
            if (prefersReducedMotion) return;
            btn.style.transform = 'translateY(-3px) scale(1.02)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    /* =========================================================
       MAGNETIC EFFECT
    ========================================================= */
    document.querySelectorAll('.service-showcase__actions .btn').forEach((btn) => {
        if (prefersReducedMotion) return;

        btn.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 1024) return;

            const rect = btn.getBoundingClientRect();
            const moveX = (e.clientX - rect.left - rect.width / 2) * 0.15;
            const moveY = (e.clientY - rect.top - rect.height / 2) * 0.2;

            btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.03)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    /* =========================================================
       SCROLL PROGRESS EFFECT
    ========================================================= */
    const cards = document.querySelectorAll('.service-showcase');

    if (cards.length && !prefersReducedMotion) {

        const update = () => {
            const vh = window.innerHeight;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const progress = clamp(1 - rect.top / vh, 0, 1);

                const visual = card.querySelector('.offer-visual');
                if (visual) {
                    visual.style.opacity = 0.6 + progress * 0.4;
                }
            });
        };

        window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
        update();
    }

});