/* =========================================================
  ULTRA LOADER — ARTIFICIO
========================================================= */
window.addEventListener('load', () => {
    const loader = document.getElementById('artificioLoader');
    const progressBar = loader?.querySelector('.artificio-loader__progress-bar');
    const percentText = document.getElementById('loaderPercent');
    const statusText = loader?.querySelector('.artificio-loader__status');

    if (!loader || !progressBar || !percentText || !statusText) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        progressBar.style.width = '100%';
        percentText.textContent = '100%';
        statusText.textContent = 'Prêt';
        setTimeout(() => {
            loader.classList.add('is-hiding');
            setTimeout(() => loader.remove(), 400);
        }, 250);
        return;
    }

    const steps = [
        { until: 22, label: 'Initialisation' },
        { until: 48, label: 'Chargement interface' },
        { until: 74, label: 'Préparation expérience' },
        { until: 92, label: 'Optimisation' },
        { until: 100, label: 'Prêt' }
    ];

    let current = 0;
    const minDuration = 2200;
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const updateLoader = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / minDuration, 1);
        const eased = easeOutCubic(progress);
        current = Math.round(eased * 100);

        progressBar.style.width = `${current}%`;
        percentText.textContent = `${current}%`;

        const currentStep = steps.find(step => current <= step.until);
        if (currentStep) {
            statusText.textContent = currentStep.label;
        }

        if (progress < 1) {
            requestAnimationFrame(updateLoader);
            return;
        }

        setTimeout(() => {
            loader.classList.add('is-hiding');

            // Activation du site (TRÈS IMPORTANT)
            document.documentElement.classList.add('site-loaded');

            // effet smooth sur le scroll reset
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });

            setTimeout(() => {
                loader.remove();
            }, 900);

        }, 180);
    };

    requestAnimationFrame(updateLoader);
});