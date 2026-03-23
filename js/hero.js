// // // /* =========================================================
// // //    HERO UI INTERACTIF — V4
// // // ========================================================= */
// // // document.addEventListener('DOMContentLoaded', () => {
// // //     const heroVisual = document.querySelector('.hero-visual-ui-v4');
// // //     const heroCard = document.getElementById('heroInteractiveCard');
// // //     const heroShell = heroCard?.querySelector('.hero-ui-shell');
// // //     const ambientEls = document.querySelectorAll('.hero-ui-ambient');

// // //     if (!heroVisual || !heroCard || !heroShell) return;
// // //     if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

// // //     let currentX = 0;
// // //     let currentY = 0;
// // //     let targetX = 0;
// // //     let targetY = 0;
// // //     let rafId = null;

// // //     const animate = () => {
// // //         currentX += (targetX - currentX) * 0.1;
// // //         currentY += (targetY - currentY) * 0.1;

// // //         heroCard.style.transform = `
// // //             translateY(6px)
// // //             rotateY(${currentX}deg)
// // //             rotateX(${currentY}deg)
// // //         `;

// // //         ambientEls.forEach((el, index) => {
// // //             const factor = index === 0 ? 10 : 16;
// // //             el.style.transform = `translate(${currentX * factor * 0.12}px, ${currentY * factor * -0.12}px)`;
// // //         });

// // //         rafId = requestAnimationFrame(animate);
// // //     };

// // //     heroVisual.addEventListener('mousemove', (e) => {
// // //         if (window.innerWidth < 1024) return;

// // //         const rect = heroVisual.getBoundingClientRect();
// // //         const px = (e.clientX - rect.left) / rect.width - 0.5;
// // //         const py = (e.clientY - rect.top) / rect.height - 0.5;

// // //         targetX = px * 6;
// // //         targetY = py * -6;

// // //         if (!rafId) rafId = requestAnimationFrame(animate);
// // //     });

// // //     heroVisual.addEventListener('mouseleave', () => {
// // //         targetX = 0;
// // //         targetY = 0;

// // //         const reset = () => {
// // //             currentX *= 0.86;
// // //             currentY *= 0.86;

// // //             heroCard.style.transform = `
// // //                 translateY(6px)
// // //                 rotateY(${currentX}deg)
// // //                 rotateX(${currentY}deg)
// // //             `;

// // //             ambientEls.forEach((el, index) => {
// // //                 const factor = index === 0 ? 10 : 16;
// // //                 el.style.transform = `translate(${currentX * factor * 0.12}px, ${currentY * factor * -0.12}px)`;
// // //             });

// // //             if (Math.abs(currentX) < 0.05 && Math.abs(currentY) < 0.05) {
// // //                 heroCard.style.transform = 'translateY(6px)';
// // //                 ambientEls.forEach((el) => el.style.transform = '');
// // //                 if (rafId) cancelAnimationFrame(rafId);
// // //                 rafId = null;
// // //                 return;
// // //             }

// // //             requestAnimationFrame(reset);
// // //         };

// // //         requestAnimationFrame(reset);
// // //     });
// // // });

// // document.addEventListener('DOMContentLoaded', () => {
// //     const hero = document.querySelector('.hero-visual-ui-v4');
// //     const card = document.getElementById('heroInteractiveCard');

// //     if (!hero || !card) return;

// //     let currentX = 0;
// //     let currentY = 0;
// //     let targetX = 0;
// //     let targetY = 0;
// //     let rafId = null;

// //     const animate = () => {
// //         currentX += (targetX - currentX) * 0.12;
// //         currentY += (targetY - currentY) * 0.12;

// //         card.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg)`;

// //         rafId = requestAnimationFrame(animate);
// //     };

// //     hero.addEventListener('mousemove', (e) => {
// //         const rect = hero.getBoundingClientRect();
// //         const px = (e.clientX - rect.left) / rect.width - 0.5;
// //         const py = (e.clientY - rect.top) / rect.height - 0.5;

// //         targetX = px * 10;
// //         targetY = py * -10;

// //         if (!rafId) rafId = requestAnimationFrame(animate);
// //     });

// //     hero.addEventListener('mouseleave', () => {
// //         targetX = 0;
// //         targetY = 0;

// //         const reset = () => {
// //             currentX *= 0.85;
// //             currentY *= 0.85;

// //             card.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg)`;

// //             if (Math.abs(currentX) < 0.05 && Math.abs(currentY) < 0.05) {
// //                 card.style.transform = 'rotateY(0deg) rotateX(0deg)';
// //                 if (rafId) cancelAnimationFrame(rafId);
// //                 rafId = null;
// //                 return;
// //             }

// //             requestAnimationFrame(reset);
// //         };

// //         requestAnimationFrame(reset);
// //     });
// // });

// document.addEventListener('DOMContentLoaded', () => {
//     const hero = document.querySelector('.hero-visual-ui-v4');
//     const card = document.getElementById('heroInteractiveCard');
//     const ambientEls = document.querySelectorAll('.hero-ui-ambient');

//     if (!hero || !card) return;
//     if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

//     let currentX = 0;
//     let currentY = 0;
//     let targetX = 0;
//     let targetY = 0;
//     let rafId = null;

//     const animate = () => {
//         currentX += (targetX - currentX) * 0.12;
//         currentY += (targetY - currentY) * 0.12;

//         card.style.transform = `
//             rotateY(${currentX}deg)
//             rotateX(${currentY}deg)
//         `;

//         ambientEls.forEach((el, index) => {
//             const factor = index === 0 ? 10 : 16;
//             el.style.transform = `translate(${currentX * factor * 0.12}px, ${currentY * factor * -0.12}px)`;
//         });

//         rafId = requestAnimationFrame(animate);
//     };

//     hero.addEventListener('mousemove', (e) => {
//         if (window.innerWidth < 1024) return;

//         const rect = hero.getBoundingClientRect();
//         const px = (e.clientX - rect.left) / rect.width - 0.5;
//         const py = (e.clientY - rect.top) / rect.height - 0.5;

//         targetX = px * 8;
//         targetY = py * -8;

//         if (!rafId) rafId = requestAnimationFrame(animate);
//     });

//     hero.addEventListener('mouseleave', () => {
//         targetX = 0;
//         targetY = 0;

//         const reset = () => {
//             currentX *= 0.86;
//             currentY *= 0.86;

//             card.style.transform = `
//                 rotateY(${currentX}deg)
//                 rotateX(${currentY}deg)
//             `;

//             ambientEls.forEach((el, index) => {
//                 const factor = index === 0 ? 10 : 16;
//                 el.style.transform = `translate(${currentX * factor * 0.12}px, ${currentY * factor * -0.12}px)`;
//             });

//             if (Math.abs(currentX) < 0.05 && Math.abs(currentY) < 0.05) {
//                 card.style.transform = 'rotateY(0deg) rotateX(0deg)';
//                 ambientEls.forEach((el) => {
//                     el.style.transform = '';
//                 });

//                 if (rafId) cancelAnimationFrame(rafId);
//                 rafId = null;
//                 return;
//             }

//             requestAnimationFrame(reset);
//         };

//         requestAnimationFrame(reset);
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero-visual-ui-v4');
    const card = document.getElementById('heroInteractiveCard');
    const ambientEls = document.querySelectorAll('.hero-ui-ambient');
    const shell = card?.querySelector('.hero-ui-shell');
    const uiButton = card?.querySelector('.hero-ui-btn');

    if (!hero || !card || !shell) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId = null;

    const animate = () => {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;

        card.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg)`;

        ambientEls.forEach((el, index) => {
            const factor = index === 0 ? 10 : 16;
            el.style.transform = `translate(${currentX * factor * 0.12}px, ${currentY * factor * -0.12}px)`;
        });

        rafId = requestAnimationFrame(animate);
    };

    hero.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 1024) return;

        const rect = hero.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;

        targetX = px * 8;
        targetY = py * -8;

        const mx = ((e.clientX - rect.left) / rect.width) * 100;
        const my = ((e.clientY - rect.top) / rect.height) * 100;

        hero.style.setProperty('--mx', `${mx}%`);
        hero.style.setProperty('--my', `${my}%`);
        hero.classList.add('is-interacting');

        if (!rafId) rafId = requestAnimationFrame(animate);
    });

    hero.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
        hero.classList.remove('is-interacting');

        const reset = () => {
            currentX *= 0.86;
            currentY *= 0.86;

            card.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg)`;

            ambientEls.forEach((el, index) => {
                const factor = index === 0 ? 10 : 16;
                el.style.transform = `translate(${currentX * factor * 0.12}px, ${currentY * factor * -0.12}px)`;
            });

            if (Math.abs(currentX) < 0.05 && Math.abs(currentY) < 0.05) {
                card.style.transform = 'rotateY(0deg) rotateX(0deg)';
                ambientEls.forEach((el) => {
                    el.style.transform = '';
                });

                if (rafId) cancelAnimationFrame(rafId);
                rafId = null;
                return;
            }

            requestAnimationFrame(reset);
        };

        requestAnimationFrame(reset);
    });

    if (uiButton) {
        uiButton.addEventListener('mousemove', (e) => {
            const rect = uiButton.getBoundingClientRect();
            const bx = ((e.clientX - rect.left) / rect.width) * 100;
            const by = ((e.clientY - rect.top) / rect.height) * 100;

            uiButton.style.setProperty('--btnx', `${bx}%`);
            uiButton.style.setProperty('--btny', `${by}%`);
        });
    }
});