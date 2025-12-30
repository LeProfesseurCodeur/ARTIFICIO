// Bloque toute soumission venant de la modale du wizard (capture = true)
document.addEventListener('submit', (e) => {
    if (e.target && e.target.closest('#aiWizardModal')) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    }
}, true);


/* ==== SAFE STUBS (évite les ReferenceError au boot) =================== */
if (typeof window.initCounterAnimation !== 'function') {
    window.initCounterAnimation = function () { /* no-op */ };
}
if (typeof window.initializeWebsite === 'function') {
    // On garde ta fonction telle quelle ; ce stub évite juste la chute si d'autres calls manquent
    const _origInit = window.initializeWebsite;
    window.initializeWebsite = function () {
        try { if (typeof initCounterAnimation === 'function') initCounterAnimation(); } catch (e) { console.warn('initCounterAnimation skipped:', e); }
        return _origInit.apply(this, arguments);
    };
}
/* ===================================================================== */


/* === SHIMS déjà présents (laisse-les si tu les as) ==================== */
function aiwData(s) { return (s && typeof s === 'object' && 'data' in s) ? (s.data || {}) : (s || {}); }
function aiwArr(x) { return Array.isArray(x) ? x : []; }
function aiwStr(x) { return (x == null) ? '' : String(x); }
/* ===================================================================== */


// ===== MAIN INITIALIZATION =====
function initializeWebsite() {
    // Theme initialization FIRST
    initTheme();

    // Add theme toggle event listener
    const themeButton = document.getElementById('themeToggle');
    if (themeButton) {
        themeButton.addEventListener('click', toggleTheme);
        console.log('✅ Theme button event listener added');
    } else {
        console.error('❌ Theme button not found');
    }

    // Core functionality
    initNavbarEffects();
    initSmoothScrolling();
    initScrollProgress();
    initScrollAnimations();
    initMobileMenuClose();
    initMegaMenuBehavior();
    initPageLoad();
    initCounterAnimation();

    // Enhanced functionality - SURPRISE EFFECTS!
    initCustomCursor();
    initMagneticButtons();
    initParallax();
    updateFooterYear();
    initLazyLoading();
    initAccessibility();
    initFormHandling();

    // Make functions global for potential inline use
    window.toggleTheme = toggleTheme;
    window.triggerShapeAnimation = triggerShapeAnimation;

    console.log('🚀 Artificio website initialized with PREMIUM effects + Theme System!');
}

// ===== ARTIFICIO WEBSITE JAVASCRIPT =====
// Main functionality for Artificio website

// ===== UTILITY FUNCTIONS =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const mobileMenu = $('#mobileMenu');
    const menuBtn = $('.mobile-menu-btn');

    mobileMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');

    // Animate hamburger icon
    const spans = menuBtn.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// ===== NAVBAR SCROLL EFFECTS =====
/**
 * Initializes navbar scroll effects by toggling the 'scrolled' class.
 * All visual styling is handled via CSS - this function only manages state.
 */
function initNavbarEffects() {
    const navbar = $('#navbar');
    const SCROLL_THRESHOLD = 300;

    // Handle scroll events to toggle navbar state
    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > SCROLL_THRESHOLD;
        navbar.classList.toggle('scrolled', isScrolled);
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = $(targetId);

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mobileMenu = $('#mobileMenu');
                if (mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
    const scrollIndicator = $('.scroll-indicator');

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.transform = `scaleX(${Math.min(scrolled / 100, 1)})`;
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    $$('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ===== CLOSE MOBILE MENU ON LINK CLICK =====
function initMobileMenuClose() {
    $$('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = $('#mobileMenu');
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// ===== PREVENT MEGA MENU CLOSE ON CLICK INSIDE =====
function initMegaMenuBehavior() {
    $$('.mega-menu').forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

// ===== LOADING ANIMATION =====
function initPageLoad() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';

        // Add loaded class for any additional animations
        document.body.classList.add('loaded');
    });
}

// ===== DYNAMIC YEAR IN FOOTER =====
function updateFooterYear() {
    const yearElement = $('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace(/\d{4}/, currentYear);
    }
}

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        $$('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        $$('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Debounce scroll events for better performance
    let scrollTimer = null;
    const originalScrollHandler = window.onscroll;

    window.addEventListener('scroll', () => {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(() => {
            if (originalScrollHandler) originalScrollHandler();
        }, 10);
    });

    // Preload critical resources
    const criticalLinks = [
        'styles.css',
        // Add other critical resources here
    ];

    criticalLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#accueil';
    skipLink.textContent = 'Aller au contenu principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-purple);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Keyboard navigation for mega menu
    const serviceLink = $('a[href="#services"]');
    const megaMenu = $('.mega-menu');

    if (serviceLink && megaMenu) {
        serviceLink.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                megaMenu.style.opacity = '1';
                megaMenu.style.visibility = 'visible';
                const firstMenuItem = megaMenu.querySelector('.mega-menu-item');
                if (firstMenuItem) firstMenuItem.focus();
            }
        });
    }
}

// ===== FORM HANDLING (for future contact form) =====
function initFormHandling() {
    const forms = $$('form');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : '';

            if (submitBtn) {
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
            }

            // Simulate form submission
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                showNotification('Message envoyé avec succès !', 'success');
                form.reset();

            } catch (error) {
                showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }
        });
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== THEME SWITCHING (optional feature) =====
function initThemeSwitch() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('artificio-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Create theme toggle button (can be added to navbar later)
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Changer le thème');

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('artificio-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// ===== ANALYTICS TRACKING (placeholder) =====
function initAnalytics() {
    // Track page views, clicks, etc.
    // This is where you'd integrate Google Analytics, Matomo, etc.

    // Track CTA clicks
    $$('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', () => {
            // analytics.track('CTA Click', { button: btn.textContent });
            console.log('CTA clicked:', btn.textContent);
        });
    });

    // Track section views
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.id || entry.target.className;
                // analytics.track('Section View', { section: sectionName });
                console.log('Section viewed:', sectionName);
            }
        });
    }, { threshold: 0.5 });

    $$('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
}

// ===== MAIN INITIALIZATION =====
function initializeWebsite() {
    // Core functionality
    initNavbarEffects();
    initSmoothScrolling();
    initScrollProgress();
    initScrollAnimations();
    initMobileMenuClose();
    initMegaMenuBehavior();
    initPageLoad();
    initCounterAnimation();

    // Enhanced functionality
    updateFooterYear();
    initLazyLoading();
    initAccessibility();
    initFormHandling();

    // Optional features
    // initThemeSwitch();
    // initAnalytics();

    console.log('🚀 Artificio website initialized successfully!');
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', initializeWebsite);

// ===== WINDOW LOAD =====
window.addEventListener('load', () => {
    // Additional initialization after all resources are loaded
    optimizePerformance();
});

(function () {
    'use strict';

    // ========================== AIW SMART ENGINE ==========================
    function aiwInferIndustry(state) {
        const txt = ((state.competitors || '') + ' ' + (state.audience || '')).toLowerCase();
        if (/e-?commerce|shopify|woocommerce|boutique|produit/.test(txt)) return 'ecommerce';
        if (/saas|logiciel|b2b|crm|erp|startup|sme|pme/.test(txt)) return 'b2b_saas';
        if (/restaurant|h[ôo]tel|restauration|food|bar|caf[ée]/.test(txt)) return 'hospitality';
        if (/sant[ée]|m[ée]dical|clinique|docteur|pharma|bien[- ]?[êe]tre/.test(txt)) return 'health';
        if (/education|formation|[ée]cole|universit[ée]/.test(txt)) return 'education';
        return 'generic';
    }

    function aiwRecommendChannels(x) {
        const data = aiwData(x);
        const goals = new Set(aiwArr(data.goals));
        const ind = (typeof aiwInferIndustry === 'function') ? aiwInferIndustry(data) : undefined;

        let rec = [];
        if (goals.has('Leads') || ind === 'b2b_saas') rec.push('LinkedIn', 'SEO', 'SEA (Google Ads)', 'Emailing/CRM');
        if (goals.has('Ventes') || ind === 'ecommerce') rec.push('SEO', 'SEA (Google Ads)', 'Instagram', 'TikTok', 'Emailing/CRM');
        if (goals.has('Notoriété')) rec.push('Instagram', 'TikTok', 'YouTube', 'PR/Blog');
        if (goals.has('Communauté')) rec.push('Instagram', 'TikTok', 'YouTube', 'Newsletter');

        if (goals.has('Création site vitrine')) rec.push('Site web', 'SEO', 'Blog/Content');
        if (goals.has('Création e-commerce')) rec.push('Site web', 'SEO', 'SEA (Google Ads)', 'Emailing/CRM', 'Instagram', 'TikTok');

        return [...new Set(rec)];
    }

    /* === NORMALIZE MODAL DOM (évite les cycles appendChild) ================= */
    /* === NORMALIZE MODAL DOM: dialog > header,progress,form(aiw-form) and form > controls,actions === */
    function aiwNormalizeDOM() {
        const modal = document.getElementById('aiWizardModal');
        if (!modal) return;
        const dialog = modal.querySelector('.aiw-dialog') || modal;

        // Récupère/Crée les blocs
        let header = dialog.querySelector('.aiw-header') || null;
        let progress = dialog.querySelector('.aiw-progress') || null;

        let form = dialog.querySelector('form.aiw-form');
        if (!form) {
            form = document.createElement('form');
            form.className = 'aiw-form';
            form.setAttribute('novalidate', '');
        }

        let controls = form.querySelector('.aiw-controls');
        if (!controls) {
            controls = document.createElement('div');
            controls.className = 'aiw-controls';
        }

        let actions = form.querySelector('.aiw-actions');
        if (!actions) {
            actions = document.createElement('div');
            actions.className = 'aiw-actions';
        }

        // DÉTACHE tout pour éviter tout cycle
        [header, progress, controls, actions, form].forEach(el => {
            if (el && el.parentNode) el.parentNode.removeChild(el);
        });

        // Ré-attache dans l’ordre SAIN
        if (header) dialog.appendChild(header);
        if (progress) dialog.appendChild(progress);
        dialog.appendChild(form);
        form.appendChild(controls);
        form.appendChild(actions);
    }

    /* ======================================================================= */

    function aiwRecommendKPIs(x) {
        const data = aiwData(x);
        const goals = new Set(aiwArr(data.goals));
        const k = [];

        if (goals.has('Notoriété')) k.push('Reach', 'Impressions', 'Branded search');
        if (goals.has('Leads')) k.push('MQLs', 'CPL', 'Form conversions');
        if (goals.has('Ventes') || goals.has('Création e-commerce')) {
            k.push('Revenue', 'ROAS', 'AOV', 'Checkout CR');
        }
        if (goals.has('Création site vitrine')) {
            k.push('Sessions', 'Time on page', 'Form leads', 'Call-to-action CTR');
        }
        if (goals.has('Communauté')) k.push('Followers growth', 'Engagement rate');

        return [...new Set(k)];
    }

    function aiwBudgetSplit(state) {
        const channels = new Set(state.channels || []); let split = {};
        function add(ch, p) { if (channels.has(ch)) split[ch] = (split[ch] || 0) + p; }
        add('SEO', 20); add('SEA (Google Ads)', 25); add('LinkedIn', 15); add('Instagram', 15); add('TikTok', 15); add('Emailing/CRM', 10);
        const sum = Object.values(split).reduce((a, b) => a + b, 0) || 100;
        Object.keys(split).forEach(k => split[k] = Math.round(split[k] * 100 / sum));
        return split;
    }

    function aiwContentIdeas(state) {
        const map = {
            ecommerce: ['UGC TikTok/Instagram', 'Shooting packshots + lifestyle', 'Ads "avant/après"', 'Email flows (abandon, upsell)'],
            b2b_saas: ['Carrousels LinkedIn', 'Études de cas vidéo', 'Landing pages intention', 'Newsletter mensuelle'],
            hospitality: ['Reels ambiance/chefs', 'Influenceurs locaux', 'SEO local (GBP)', 'Calendrier événementiel'],
            health: ['Infographies pédagogiques', 'Avis patients vidéo', 'SEO local', 'Livres blancs'],
            education: ['Témoignages alumni', 'Webinaires découverte', 'SEO longue traîne', 'Ads inscription'],
            generic: ['Brand video manifeste', 'Guides de contenu', 'Calendrier éditorial', 'Optimisation site / UX']
        };
        return map[aiwInferIndustry(state)] || map.generic;
    }

    function aiwToneSuggestions(state) {
        const t = (state.audience || '').toLowerCase();
        if (/dirigeant|c-level|b2b|d[ée]cideur|pro/.test(t)) return ['Expert', 'Clair', 'Data-driven'];
        if (/jeune|gen ?z|tiktok|insta/.test(t)) return ['Audacieux', 'Fun', 'Visuel'];
        return ['Chaleureux', 'Accessible', 'Premium'];
    }

    function aiwPackages(state) {
        const rec = aiwRecommendChannels(state);
        const base = {
            Starter: ['Audit & Stratégie', 'Setup tracking & KPI', 'Calendrier éditorial 1 mois'],
            Growth: ['+ 8–12 contenus/mois', 'Campagnes Ads', 'SEO On-page', 'Email flows'],
            Dominance: ['+ 16–24 contenus/mois', 'Vidéo pro / UGC', 'SEO technique + contenus', 'Multi-variantes Ads']
        };
        function tasks(name) {
            let t = [...base[name]];
            if (rec.includes('LinkedIn')) t.push('Carrousels LinkedIn');
            if (rec.includes('Instagram')) t.push('Reels hebdo');
            if (rec.includes('TikTok')) t.push('Sprints TikTok');
            if (rec.includes('SEO')) t.push('Briefs SEO + 2 articles/mois');
            if (rec.includes('SEA (Google Ads)')) t.push('Search/PMAX');
            if (rec.includes('Emailing/CRM')) t.push('Séquences onboarding + nurture');
            return t;
        }
        return [
            { name: 'Starter', price: '€€', tasks: tasks('Starter') },
            { name: 'Growth', price: '€€€', tasks: tasks('Growth') },
            { name: 'Dominance', price: '€€€€', tasks: tasks('Dominance') }
        ];
    }

    function aiwRoadmap(state) {
        const weeks = [[], [], [], []], tasks = (aiwPackages(state)[1] || aiwPackages(state)[0]).tasks;
        tasks.forEach((t, i) => weeks[i % 4].push(t));
        return weeks.map((w, i) => ({ week: i + 1, tasks: w }));
    }

    function aiwInsight(state) {
        return {
            industry: aiwInferIndustry(state),
            recChannels: aiwRecommendChannels(state),
            recKPIs: aiwRecommendKPIs(state),
            budgetSplit: aiwBudgetSplit(state),
            contentIdeas: aiwContentIdeas(state),
            tone: aiwToneSuggestions(state),
            packages: aiwPackages(state),
            roadmap: aiwRoadmap(state)
        };
    }

    // ============================== WIZARD ==============================
    function initAIWizard() {
        // évite double init si le bloc est collé deux fois
        if (window.__AIW_INIT__) return;
        window.__AIW_INIT__ = true;

        window.addEventListener('resize', aiwFitToolLabels);
        window.addEventListener('orientationchange', aiwFitToolLabels);


        const modal = document.getElementById('aiWizardModal'); if (!modal) return;
        const msgs = document.getElementById('aiwMsgs');
        const COMPACT = true; // <- on force le mode wizard compact (pas de bulles)
        const form = document.getElementById('aiwForm');
        //const controls = document.getElementById('aiwControls');
        const btnPrev = document.getElementById('aiwPrev');
        const btnNext = document.getElementById('aiwNext');
        const actionsBar = form.querySelector('.aiw-actions'); // barre collée en bas
        // Crée la ligne 1 (outils) et la ligne 2 (navigation)
        const toolsBar = document.createElement('div'); toolsBar.className = 'aiw-toolsbar';
        const navBar = document.createElement('div'); navBar.className = 'aiw-navbar';
        const navLeft = document.createElement('div'); navLeft.className = 'aiw-nav-left';
        const navRight = document.createElement('div'); navRight.className = 'aiw-nav-right';

        // Déplace les boutons existants dans la ligne navigation
        navLeft.appendChild(btnPrev);       // ◀ Précédent à gauche
        navRight.appendChild(btnNext);      // Suivant/Terminer à droite
        navBar.append(navLeft, navRight);

        // Nettoie la barre et insère nos deux rangées
        actionsBar.innerHTML = '';
        actionsBar.append(toolsBar, navBar);

        // Construit le set de boutons outils (copier / txt / json / email)
        function buildSummaryTools() {
            const frag = document.createDocumentFragment();

            // Fabrique un bouton avec icône SVG + label
            const mkBtn = (htmlTag, classes, label, short, onClickOrHref, svgPath) => {
                const el = document.createElement(htmlTag);
                el.className = classes;               // "btn btn-white" | "btn btn-outline"
                el.setAttribute('data-short', short); // pour la version courte si besoin
                el.innerHTML = `
      <span class="ico" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${svgPath}
        </svg>
      </span>
      <span class="txt">${label}</span>
    `.trim();

                if (htmlTag === 'a') {
                    el.href = onClickOrHref;
                } else {
                    el.type = 'button';
                    el.addEventListener('click', onClickOrHref);
                }
                return el;
            };

            // Icônes SVG (simples, alignement parfait)
            const ICO_CLIPBOARD = '<path d="M9 5h6M9 3h6a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1V5a2 2 0 0 1 2-2z"/>';
            const ICO_DOWNLOAD = '<path d="M12 3v10m0 0l-4-4m4 4l4-4M5 21h14"/>';
            const ICO_JSON = '<path d="M6 8c-2 0-3 2-3 4s1 4 3 4M18 8c2 0 3 2 3 4s-1 4-3 4M10 6h4m-4 12h4"/>';
            const ICO_MAIL = '<path d="M4 6h16v12H4z"/><path d="M22 6l-10 7L2 6"/>';

            // 1) Copier
            const bCopy = mkBtn('button', 'btn btn-white', 'Copier le brief', 'Copier', () => {
                copyText(makeSummaryMD(state));
            }, ICO_CLIPBOARD);

            document.addEventListener('click', (e) => {
                const b = e.target.closest('#aiWizardModal .aiw-tools .btn[data-short="Copier"]');
                if (b) aiwToast('Brief copié ✔');
            });


            // 2) TXT
            const bTxt = mkBtn('button', 'btn btn-outline', 'Télécharger le débrief', '.txt', () => {
                downloadTextFile('brief-artificio.txt', makeSummaryMD(state));
            }, ICO_DOWNLOAD);
            bTxt.classList.add('prefer-short-md'); // bascule plus tôt en version courte si manque de place

            // 3) JSON
            const bJson = mkBtn('button', 'btn btn-outline', 'JSON', 'JSON', () => {
                downloadJSON(state.data, 'brief-artificio.json');
            }, ICO_JSON);

            // 4) Email
            const mailHref = 'mailto:hello@artificio.fr?subject=Brief%20Artificio&body=' + encodeURIComponent(makeSummaryMD(state));
            const bMail = mkBtn('a', 'btn btn-outline', 'Brouillon email', 'Email', mailHref, ICO_MAIL);

            frag.append(bCopy, bTxt, bJson, bMail);
            return frag;
        }


        // function buildSummaryTools() {
        //     const tools = document.createElement('div');
        //     tools.className = 'aiw-tools';

        //     const bCopy = document.createElement('button');
        //     bCopy.type = 'button';
        //     bCopy.className = 'btn btn-white';
        //     bCopy.setAttribute('data-short', 'Copier');
        //     bCopy.innerHTML = '<span>📋 Copier le brief</span>';
        //     bCopy.addEventListener('click', () => copyText(makeSummaryMD(state)));

        //     const bTxt = document.createElement('button');
        //     bTxt.type = 'button';
        //     bTxt.className = 'btn btn-outline';
        //     bTxt.setAttribute('data-short', '.txt');
        //     bTxt.innerHTML = '<span>⬇️ Télécharger le débrief</span>';
        //     bTxt.addEventListener('click', () => downloadTextFile('brief-artificio.txt', makeSummaryMD(state)));

        //     const bJson = document.createElement('button');
        //     bJson.type = 'button';
        //     bJson.className = 'btn btn-outline';
        //     bJson.setAttribute('data-short', 'JSON');
        //     bJson.innerHTML = '<span>⬇️ JSON</span>';
        //     bJson.addEventListener('click', () => downloadJSON(state.data, 'brief-artificio.json'));

        //     const bMail = document.createElement('a');
        //     bMail.className = 'btn btn-outline';
        //     bMail.setAttribute('data-short', 'Email');
        //     bMail.innerHTML = '<span>✉️ Brouillon email</span>';
        //     bMail.href = 'mailto:hello@artificio.fr?subject=Brief%20Artificio&body=' + encodeURIComponent(makeSummaryMD(state));

        //     tools.append(bCopy, bTxt, bJson, bMail);
        //     return tools;
        // }

        const bar = document.getElementById('aiwBar');

        // Persistence locale
        const STORAGE_KEY = 'artificio_aiw_state_v2';
        let state = {};
        try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"step":0,"data":{}}'); }
        catch (e) { state = { step: 0, data: {} }; }

        const baseQuestions = [
            {
                key: 'goals', label: 'Quel est votre objectif principal ?', type: 'multi', required: true,
                options: ['Notoriété', 'Leads', 'Ventes', 'Recrutement', 'Communauté', 'Autre', 'Création site vitrine', 'Création e-commerce'],
                hint: 'Vous pouvez en choisir plusieurs.'
            },
            {
                key: 'audience', label: 'Décrivez votre audience cible (personas, zones, langues).', type: 'text',
                placeholder: 'Ex : décideurs B2B en France, 25-45 ans...', required: true
            },
            {
                key: 'channels', label: 'Quels canaux prioriser ?', type: 'multi', required: true,
                options: ['Site web', 'SEO', 'SEA (Google Ads)', 'LinkedIn', 'Instagram', 'TikTok', 'YouTube', 'Emailing/CRM', 'Blog/Content'],
                hint: 'Nous pré-sélectionnons des canaux adaptés à vos objectifs.'
            },
            {
                key: 'assets', label: 'Avez-vous déjà des assets ?', type: 'multi', allowOther: true,
                options: ['Logo', 'Charte graphique', 'Site web actuel', 'Contenu/Photos/Vidéos', 'Aucun']
            },
            { key: 'competitors', label: 'Des concurrents ou inspirations à citer ?', type: 'text', placeholder: 'Noms + liens si possible' },
            {
                key: 'kpis', label: 'Quels KPIs sont clés ?', type: 'multi', allowOther: true,
                options: ['Trafic', 'Taux de conversion', 'Leads qualifiés', 'CPL/CPA', 'ROAS', 'Engagement social', 'SEO Rankings']
            },
            {
                key: 'budget', label: 'Budget & deadline ?', type: 'composite',
                fields: [{ sub: 'budgetRange', type: 'select', options: ['< 2k€', '2–5k€', '5–10k€', '10–25k€', '> 25k€'] }, { sub: 'deadline', type: 'date' }]
            },
            {
                key: 'contact', label: 'Vos coordonnées pour vous recontacter', type: 'contact',
                fields: [{ sub: 'fullname', type: 'text', placeholder: 'Nom & prénom', required: true },
                { sub: 'email', type: 'email', placeholder: 'Email', required: true },
                { sub: 'phone', type: 'tel', placeholder: 'Téléphone (optionnel)' },
                { sub: 'company', type: 'text', placeholder: 'Société' },
                { sub: 'website', type: 'url', placeholder: 'Site (optionnel)' }]
            },
            { key: 'summary', label: 'Résumé', type: 'summary' }
        ];

        function currentQuestions() {
            const data = aiwData(state);                   // <- compatible state / state.data
            const q = Array.isArray(baseQuestions) ? [...baseQuestions] : [];

            // si baseQuestions est vide/indéfini, retour de secours
            if (!q.length) {
                return [{
                    key: 'goals',
                    type: 'multi',
                    label: 'Vos objectifs principaux',
                    options: [
                        'Notoriété', 'Leads', 'Ventes', 'Recrutement', 'Communauté', 'Autre',
                        'Création site vitrine', 'Création e-commerce'
                    ]
                }];
            }

            const goals = new Set(aiwArr(data.goals));

            // blocs dynamiques existants (garde-les si tu en avais)
            if (goals.has('Ventes')) q.splice(3, 0, { key: 'ecom', type: 'multi', label: 'Ventes : focus e-commerce ?', options: ['Catalogue', 'Checkout', 'UGC', 'Retargeting', 'Upsell/Cross-sell'] });
            if (goals.has('Leads')) q.splice(3, 0, { key: 'leadgen', type: 'multi', label: 'Leads : précisez le type ?', options: ['Formulaire site', 'Calendly/rdv', 'Téléchargement livre blanc', 'Demo', 'Essai gratuit'] });

            // --- Site vitrine
            if (goals.has('Création site vitrine')) {
                q.splice(3, 0,
                    {
                        key: 'sv_stack', label: 'Stack / CMS pour le site vitrine ?', type: 'composite',
                        fields: [
                            { sub: 'stack', type: 'select', options: ['WordPress', 'Webflow', 'Next.js + Headless (Sanity/Strapi/Contentful)', 'Autre'] },
                            { sub: 'multilingue', type: 'select', options: ['Français', 'FR/EN', 'FR/EN/ES', 'Autre'] }
                        ]
                    },
                    {
                        key: 'sv_pages', label: 'Pages envisagées', type: 'multi', allowOther: true,
                        options: ['Accueil', 'À propos', 'Services', 'Portfolio/Réalisations', 'Blog', 'FAQ', 'Contact', 'Mentions légales/RGPD']
                    },
                    {
                        key: 'sv_features', label: 'Fonctionnalités', type: 'multi', allowOther: true,
                        options: ['Formulaire avancé', 'Prise de rendez-vous (Calendly)', 'Blog', 'Animations/Motion', 'Chat', 'Intégration Analytics', 'SEO on-page']
                    },
                    {
                        key: 'sv_content', label: 'Contenus disponibles', type: 'multi', allowOther: true,
                        options: ['Textes fournis', 'Photos fournies', 'Vidéos fournies', 'À produire (rédaction)', 'À produire (shooting)']
                    }
                );
            }

            // --- E-commerce
            if (goals.has('Création e-commerce')) {
                q.splice(3, 0,
                    {
                        key: 'ec_platform', label: 'Plateforme e-commerce', type: 'composite',
                        fields: [
                            { sub: 'platform', type: 'select', options: ['Shopify', 'Shopify + Headless', 'WooCommerce', 'PrestaShop', 'Autre'] },
                            { sub: 'catalogSize', type: 'select', options: ['< 50 produits', '50–200', '200–1k', '> 1k'] }
                        ]
                    },
                    {
                        key: 'ec_variants', label: 'Catalogue & règles', type: 'multi', allowOther: true,
                        options: ['Variantes (taille/couleur)', 'Bundles', 'Abonnements', 'Produits digitaux', 'B2B (prix/collecte TVA)']
                    },
                    {
                        key: 'ec_payments', label: 'Paiements', type: 'multi', allowOther: true,
                        options: ['Stripe', 'PayPal', 'Apple Pay/Google Pay', '3x/4x', 'Virement/Chèque']
                    },
                    {
                        key: 'ec_shipping', label: 'Livraison', type: 'multi', allowOther: true,
                        options: ['Colissimo/La Poste', 'Mondial Relay', 'DHL/UPS/Chronopost', 'International', 'Click & Collect']
                    },
                    {
                        key: 'ec_integrations', label: 'Intégrations', type: 'multi', allowOther: true,
                        options: ['Klaviyo/Emailing', 'Meta/Google Catalog', 'Avis/Reviews', 'ERP/Stock', 'CRM', 'Comptabilité']
                    }
                );
            }

            // garde toujours au moins 1 question
            return q.length ? q : [{
                key: 'goals', type: 'multi', label: 'Vos objectifs principaux',
                options: ['Notoriété', 'Leads', 'Ventes', 'Communauté', 'Création site vitrine', 'Création e-commerce']
            }];
        }



        function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { } }

        function addMsg(text, who = 'bot') {
            const wrap = document.createElement('div'); wrap.className = 'aiw-msg ' + who;
            const bubble = document.createElement('div'); bubble.className = 'bubble'; bubble.innerHTML = text;
            wrap.appendChild(bubble); msgs.appendChild(wrap); msgs.scrollTop = msgs.scrollHeight;
        }

        function setProgress() {
            const q = currentQuestions(); const pct = Math.round((state.step) / (q.length - 1) * 100);
            if (bar) bar.style.width = pct + '%';
        }

        function renderControls(q) {
            // Normalise la structure de la modale (évite les cycles DOM)
            aiwNormalizeDOM();

            // === SAFE HOST (évite "container is not defined" & cycles DOM) ==========
            // const dialog = document.querySelector('#aiWizardModal .aiw-dialog')
            //     || document.querySelector('#aiWizardModal');

            // Références stables
            const dialog = document.querySelector('#aiWizardModal .aiw-dialog') || document.getElementById('aiWizardModal');
            const form = dialog.querySelector('form.aiw-form') || dialog;
            const controls = form.querySelector('.aiw-controls');
            const actions = form.querySelector('.aiw-actions') || dialog.querySelector('.aiw-actions');
            if (actions) {
                const btnPrev = actions.querySelector('#aiwPrev, .aiw-prev');
                const btnNext = actions.querySelector('#aiwNext, .aiw-next');

                if (btnPrev) { btnPrev.setAttribute('type', 'button'); btnPrev.onclick = (ev) => { ev.preventDefault(); aiwPrev(); }; }
                if (btnNext) { btnNext.setAttribute('type', 'button'); btnNext.onclick = (ev) => { ev.preventDefault(); aiwNext(); }; }
            }
            controls.innerHTML = '';

            // let controls = dialog.querySelector('.aiw-controls');
            if (!controls) {
                const body = dialog.querySelector('.aiw-body') || dialog;
                controls = document.createElement('div');
                controls.className = 'aiw-controls';
                body.appendChild(controls);
            }
            // vide proprement le host d'étape
            controls.innerHTML = '';

            // alias rétro compatible pour le reste du code
            const container = controls;

            // la barre d'actions doit rester SOEUR de .aiw-controls (jamais dedans)
            //const actions = dialog.querySelector('.aiw-actions');
            // if (actions && actions.parentElement !== dialog) {
            //     dialog.appendChild(actions);
            // }
            // ========================================================================

            // === SAFE HOST (fix "container is not defined") ==========================
            // let controls = document.querySelector('#aiWizardModal .aiw-controls');
            // if (!controls) {
            //     // on crée l'hôte si absent, dans le corps de la modale
            //     const body = document.querySelector('#aiWizardModal .aiw-body')
            //         || document.querySelector('#aiWizardModal');
            //     controls = document.createElement('div');
            //     controls.className = 'aiw-controls';
            //     body.appendChild(controls);
            // }
            // controls.innerHTML = '';

            // // alias rétro-compatible pour le reste du code
            // const container = controls;
            // ========================================================================
            //const container = document.createElement('div');
            container.className = 'aiw-controls';

            // Panneau de cohérence (non bloquant)
            try {
                if (q.type !== 'summary') {
                    const coh = aiwCheckCoherence(state);
                    if (coh.issues.length) {
                        const box = document.createElement('div');
                        box.className = 'aiw-coh';
                        const badge = coh.level === 'ok' ? 'OK' : (coh.level === 'warn' ? 'À ajuster' : 'À risque');
                        box.innerHTML = `<h4>Cohérence du brief <span class="aiw-badge ${coh.level}">${badge}</span></h4>
                         <ul>${coh.issues.map(i => `<li><strong>${i.msg}</strong><div class="tip">${i.tip || ''}</div></li>`).join('')}</ul>`;
                        container.appendChild(box);
                    }
                }
            } catch (e) { console.warn('coherence panel skipped:', e); }




            const title = document.createElement('h3');
            title.className = 'aiw-step-title';
            title.textContent = (q.type === 'summary') ? 'Récapitulatif' : q.label;
            container.appendChild(title);

            if (q.type === 'text') {
                const i = document.createElement('textarea'); i.className = 'aiw-text'; i.rows = 3; i.placeholder = q.placeholder || '';
                if (state.data[q.key]) i.value = state.data[q.key];
                container.appendChild(i);
            }

            if (q.type === 'multi') {
                const g = document.createElement('div'); g.className = 'aiw-chipgroup';
                (q.options || []).forEach(opt => {
                    const chip = document.createElement('button'); chip.type = 'button'; chip.className = 'aiw-chip'; chip.textContent = opt;
                    // Pré-sélection “intelligente” pour la question des canaux
                    if (q.key === 'channels') { try { const rec = aiwRecommendChannels(state.data); if (rec.includes(opt)) chip.classList.add('selected'); } catch (e) { } }
                    if ((state.data[q.key] || []).includes(opt)) chip.classList.add('selected');
                    chip.addEventListener('click', () => chip.classList.toggle('selected'));
                    g.appendChild(chip);
                });
                if (q.allowOther) {
                    const o = document.createElement('input'); o.className = 'aiw-text'; o.placeholder = 'Autre (optionnel)'; o.dataset.other = 'true';
                    g.appendChild(o);
                }
                container.appendChild(g);
            }

            if (q.type === 'composite') {
                const g = document.createElement('div'); g.className = 'aiw-grid-2';
                q.fields.forEach(f => {
                    let el;
                    if (f.type === 'select') {
                        el = document.createElement('select'); el.className = 'aiw-text';
                        (f.options || []).forEach(op => { const o = document.createElement('option'); o.value = op; o.textContent = op; el.appendChild(o); });
                    } else if (f.type === 'date') {
                        el = document.createElement('input'); el.type = 'date'; el.className = 'aiw-date';
                    }
                    if (state.data[q.key]?.[f.sub]) el.value = state.data[q.key][f.sub];
                    el.dataset.sub = f.sub; g.appendChild(el);
                });
                container.appendChild(g);
            }

            if (q.type === 'contact') {
                const g = document.createElement('div'); g.className = 'aiw-grid-2';
                q.fields.forEach(f => {
                    const i = document.createElement('input'); i.className = 'aiw-' + (f.type === 'text' ? 'text' : f.type);
                    i.placeholder = f.placeholder || ''; i.type = f.type === 'text' ? 'text' : f.type; i.required = !!f.required;
                    if (state.data[q.key]?.[f.sub]) i.value = state.data[q.key][f.sub];
                    i.dataset.sub = f.sub; g.appendChild(i);
                });
                container.appendChild(g);
            }

            if (q.hint) {
                const hint = document.createElement('div'); hint.className = 'aiw-hint'; hint.textContent = q.hint;
                container.appendChild(hint);
            }

            if (q.type === 'summary') {
                const sum = document.createElement('div'); sum.className = 'aiw-summary';
                const insight = aiwInsight(state.data);

                // Onglets
                const tabs = document.createElement('div'); tabs.className = 'aiw-tabs';
                const t1 = Object.assign(document.createElement('button'), { className: 'aiw-tab active', textContent: 'Résumé' });
                const t2 = Object.assign(document.createElement('button'), { className: 'aiw-tab', textContent: 'Recommandations' });
                const t3 = Object.assign(document.createElement('button'), { className: 'aiw-tab', textContent: 'Roadmap 4 semaines' });
                tabs.append(t1, t2, t3); container.appendChild(tabs);

                const p1 = document.createElement('div'); p1.className = 'aiw-tabpanel active';
                const p2 = document.createElement('div'); p2.className = 'aiw-tabpanel';
                const p3 = document.createElement('div'); p3.className = 'aiw-tabpanel';

                // Panel 1 : récap basique
                p1.innerHTML = makeSummaryHTML(state);

                // Panel 2 : reco
                const budgetRows = Object.entries(insight.budgetSplit).map(([k, v]) => `<tr><td>${k}</td><td>${v}%</td></tr>`).join('');
                const ideas = insight.contentIdeas.map(i => `<span class="aiw-badge">${i}</span>`).join('');
                const pkgs = insight.packages.map(p => `<tr><td><b>${p.name}</b></td><td>${p.price}</td><td>${p.tasks.slice(0, 4).join(', ')}…</td></tr>`).join('');
                p2.innerHTML = `
          <div class="aiw-kv">
            <div class="k">Industrie (détectée)</div><div><b>${insight.industry}</b></div>
            <div class="k">Canaux recommandés</div><div>${insight.recChannels.join(', ') || '-'}</div>
            <div class="k">KPIs clés</div><div>${insight.recKPIs.join(', ') || '-'}</div>
            <div class="k">Ton & style</div><div>${insight.tone.join(' / ')}</div>
          </div>
          <div class="aiw-hr"></div>
          <h4>Répartition budgétaire proposée</h4>
          <table class="aiw-table"><tbody>${budgetRows}</tbody></table>
          <div class="aiw-hr"></div>
          <h4>Idées de contenus</h4>
          <div class="aiw-badges">${ideas}</div>
          <div class="aiw-hr"></div>
          <h4>Packages</h4>
          <table class="aiw-table"><thead><tr><th>Pack</th><th>€</th><th>Livrables principaux</th></tr></thead><tbody>${pkgs}</tbody></table>
        `;

                // Carte Cohérence dans l’onglet Recommandations
                const coh = aiwCheckCoherence(state.data);
                const badge = `<span class="aiw-badge ${coh.level}">${coh.level === 'ok' ? 'OK' : (coh.level === 'warn' ? 'À ajuster' : 'À risque')}</span>`;
                const cohList = coh.issues.length ? ('<ul>' + coh.issues.map(i => `<li><strong>${i.msg}</strong> — <span class="tip">${i.tip || ''}</span></li>`).join('') + '</ul>')
                    : '<div class="tip">Rien à signaler.</div>';
                const cohCard = document.createElement('div');
                cohCard.className = 'aiw-card';
                cohCard.innerHTML = `<h5>Cohérence du brief ${badge}</h5>${cohList}`;
                p2.prepend(cohCard);

                // Panel 3 : roadmap
                const weeks = insight.roadmap.map(w => `<tr><td>Semaine ${w.week}</td><td>${w.tasks.join(', ')}</td></tr>`).join('');
                p3.innerHTML = `<table class="aiw-table"><thead><tr><th>Semaine</th><th>Actions</th></tr></thead><tbody>${weeks}</tbody></table>`;

                sum.append(p1, p2, p3); container.appendChild(sum);

                // ... après container.appendChild(sum); ajouter les actions :
                // const util = document.createElement('div');
                // util.className = 'aiw-actions-row';

                // const btnCopy = document.createElement('button');
                // btnCopy.type = 'button';
                // btnCopy.className = 'btn btn-white';
                // btnCopy.textContent = '📋 Copier le brief';
                // btnCopy.addEventListener('click', () => copyText(makeSummaryMD(state.data)));

                // const btnTxt = document.createElement('button');
                // btnTxt.type = 'button';
                // btnTxt.className = 'btn btn-outline';
                // btnTxt.textContent = '⬇️ Télécharger le débrief (.txt)';
                // btnTxt.addEventListener('click', () => downloadTextFile('brief-artificio.txt', makeSummaryMD(state.data)));

                // const btnJson = document.createElement('button');
                // btnJson.type = 'button';
                // btnJson.className = 'btn btn-outline';
                // btnJson.textContent = '⬇️ Télécharger JSON';
                // btnJson.addEventListener('click', () => downloadJSON(state.data, 'brief-artificio.json'));

                // // (optionnel) Brouillon e-mail
                // const btnMail = document.createElement('a');
                // btnMail.className = 'btn btn-outline';
                // btnMail.textContent = '✉️ Brouillon email';
                // btnMail.href = 'mailto:hello@artificio.fr?subject=Brief%20Artificio&body=' + encodeURIComponent(makeSummaryMD(state.data));

                // util.append(btnCopy, btnTxt, btnJson, btnMail);   // <-- assure-toi que btnTxt est bien dedans
                // container.appendChild(util);

                const qs = currentQuestions() || [];
                if (!qs.length) return;
                state.step = Math.max(0, Math.min(state.step ?? 0, qs.length - 1));
                const q = qs[state.step] || qs[0];

                btnNext.textContent = 'Terminer';

            }
            // controls.appendChild(container);
        }


        // Place avec tes helpers (en haut du fichier)
        function aiwNormalizeToolButtons() {
            // cible tes 4 boutons dans la barre sticky
            const btns = document.querySelectorAll('#aiWizardModal .aiw-actions .aiw-tools .btn, #aiWizardModal .aiw-actions .aiw-tools a.btn');
            if (!btns.length) return;

            const ICONS = {
                Copier: '<path d="M9 5h6M9 3h6a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1V5a2 2 0 0 1 2-2z"/>',
                '.txt': '<path d="M12 3v10m0 0l-4-4m4 4l4-4M5 21h14"/>',
                JSON: '<path d="M6 8c-2 0-3 2-3 4s1 4 3 4M18 8c2 0 3 2 3 4s-1 4-3 4M10 6h4m-4 12h4"/>',
                Email: '<path d="M4 6h16v12H4z"/><path d="M22 6l-10 7L2 6"/>'
            };

            btns.forEach(btn => {
                if (btn.dataset.normalized === '1') return; // déjà fait
                const key = btn.getAttribute('data-short') || '';          // "Copier" | ".txt" | "JSON" | "Email"
                const label = btn.textContent.trim() || key;               // garde ton libellé actuel
                const path = ICONS[key] || ICONS.JSON;                     // fallback

                btn.innerHTML = `
      <span class="ico" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>
      </span>
      <span class="txt">${label}</span>
    `.trim();

                btn.dataset.normalized = '1';
            });
        }

        function aiwToast(msg) {
            const host = document.querySelector('#aiWizardModal .aiw-dialog');
            if (!host) return;
            const t = document.createElement('div');
            t.className = 'aiw-toast';
            t.setAttribute('role', 'status');
            t.setAttribute('aria-live', 'polite');
            t.textContent = msg;
            host.appendChild(t);
            requestAnimationFrame(() => t.classList.add('show'));
            setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 220); }, 1600);
        }

        // ---------- COHERENCE ENGINE ----------
        function aiwEffortScore(x) {
            const data = aiwData(x);
            let pts = 0;
            const g = new Set(aiwArr(data.goals));

            if (g.has('Création site vitrine')) pts += 20;
            if (g.has('Création e-commerce')) pts += 40;
            if (g.has('Leads')) pts += 8;
            if (g.has('Notoriété')) pts += 6;
            if (g.has('Ventes')) pts += 10;

            if (data.sv_pages) pts += Math.max(0, aiwArr(data.sv_pages).length - 4) * 2;
            if (data.sv_features) pts += aiwArr(data.sv_features).length * 3;
            if (data.sv_stack?.multilingue && !/^fr(an)?çais?$/i.test(data.sv_stack.multilingue)) pts += 8;

            const plat = aiwStr(data.ec_platform?.platform).toLowerCase();
            if (plat.includes('headless')) pts += 12;
            else if (plat.includes('prestashop')) pts += 10;
            else if (plat.includes('woocommerce')) pts += 6;
            else if (plat.includes('shopify')) pts += 8;

            const cat = data.ec_platform?.catalogSize;
            if (cat === '< 50 produits') pts += 5;
            else if (cat === '50–200') pts += 10;
            else if (cat === '200–1k') pts += 20;
            else if (cat === '> 1k') pts += 30;

            if (data.ec_variants) pts += aiwArr(data.ec_variants).length * 3;
            if (data.ec_payments) pts += Math.max(0, aiwArr(data.ec_payments).length - 1) * 2;
            if (data.ec_shipping) pts += Math.max(0, aiwArr(data.ec_shipping).length - 1) * 2;
            if (data.ec_integrations) pts += aiwArr(data.ec_integrations).length * 4;

            const ch = new Set(aiwArr(data.channels));
            ['SEO', 'SEA (Google Ads)', 'Instagram', 'TikTok', 'YouTube', 'Emailing/CRM', 'LinkedIn', 'Blog/Content']
                .forEach(c => { if (ch.has(c)) pts += 3; });

            return pts;
        }

        //Fourchette budget recommandée selon effort
        function aiwBudgetBracket(score) {
            if (score <= 15) return '< 2k€';
            if (score <= 30) return '2–5k€';
            if (score <= 50) return '5–10k€';
            if (score <= 80) return '10–25k€';
            return '> 25k€';
        }

        // Ranking d’une fourchette pour comparer
        function aiwBudgetRank(b) { return ['< 2k€', '2–5k€', '5–10k€', '10–25k€', '> 25k€'].indexOf(b); }
        function aiwMinDays(score, hasE, hasS) {
            let d = 10; if (hasS) d += 10; if (hasE) d += 20; d += Math.floor(score / 10) * 3; return Math.min(Math.max(d, 14), 90);
        }

        // Génère la liste d’issues (warnings/risks + tips)
        function aiwCheckCoherence(state) {
            const data = aiwData(x);                // ✅ utilise bien le paramètre reçu
            const issues = [];
            const score = aiwEffortScore(data);
            const recBudget = aiwBudgetBracket(score);
            const chosen = data.budget?.budgetRange || '';
            const g = new Set(aiwArr(data.goals));
            const hasE = g.has('Création e-commerce');
            const hasS = g.has('Création site vitrine');

            // Budget
            if (chosen) {
                const gap = aiwBudgetRank(recBudget) - aiwBudgetRank(chosen);
                if (gap > 0) {
                    issues.push({
                        severity: gap >= 2 ? 'risk' : 'warn',
                        msg: `Budget estimé trop bas pour le scope : recommandé **${recBudget}** (actuel **${chosen}**).`,
                        tip: hasE ? 'Réduire les intégrations/variantes ou augmenter la fourchette.' : 'Limiter pages/animations ou élargir la fourchette.'
                    });
                }
            } else {
                issues.push({ severity: 'warn', msg: 'Budget non renseigné.', tip: 'Choisir une fourchette pour cadrer le périmètre.' });
            }

            // Délai
            const dl = data.budget?.deadline;
            if (dl) {
                const today = new Date();
                const deadline = new Date(dl);
                const days = Math.round((deadline - today) / (1000 * 60 * 60 * 24));
                const minDays = aiwMinDays(score, hasE, hasS);
                if (!isNaN(days) && days < minDays) {
                    issues.push({
                        severity: days < minDays / 2 ? 'risk' : 'warn',
                        msg: `Délai serré : **${days}j** vs besoin estimé **${minDays}j**.`,
                        tip: 'Étendre la deadline ou réduire le scope (pages/features/intégrations).'
                    });
                }
            }

            // Prérequis
            if (!aiwArr(data.kpis).length) issues.push({ severity: 'warn', msg: 'KPIs non définis.', tip: 'Sélectionner 2–3 KPIs clés.' });
            if (!aiwArr(data.channels).length) issues.push({ severity: 'warn', msg: 'Canaux non définis.', tip: 'Choisir les canaux prioritaires.' });

            if (hasE && /headless/i.test(aiwStr(data.ec_platform?.platform)) && aiwBudgetRank(chosen) < 3) {
                issues.push({ severity: 'risk', msg: 'E-commerce headless coûteux avec budget bas.', tip: 'Passer Shopify classique ou augmenter le budget.' });
            }

            const level = issues.some(i => i.severity === 'risk') ? 'risk'
                : issues.some(i => i.severity === 'warn') ? 'warn' : 'ok';
            return { score, recBudget, issues, level };
        }

        function collectAnswer(q) {
            // Toujours récupérer le conteneur d’étape courant
            const dialog = document.querySelector('#aiWizardModal .aiw-dialog') || document.getElementById('aiWizardModal');
            const form = dialog.querySelector('form.aiw-form');
            const root = form.querySelector('.aiw-controls');
            let val = null;

            if (q.type === 'text') {
                val = root.querySelector('textarea')?.value?.trim() || '';
                if (q.required && !val) return null;
            }

            if (q.type === 'multi') {
                const selected = [...root.querySelectorAll('.aiw-chip.selected')].map(c => c.textContent.trim());
                const other = root.querySelector('input[data-other="true"]')?.value?.trim();
                val = selected;
                if (other) val = [...selected, other];
                if (q.required && (!val || !val.length)) return null;
            }

            if (q.type === 'composite') {
                val = {};
                root.querySelectorAll('[data-sub]').forEach(el => { val[el.dataset.sub] = el.value; });
            }

            if (q.type === 'contact') {
                val = {
                    fullname: root.querySelector('input[name="fullname"]')?.value?.trim() || '',
                    email: root.querySelector('input[name="email"]')?.value?.trim() || '',
                    phone: root.querySelector('input[name="phone"]')?.value?.trim() || '',
                    company: root.querySelector('input[name="company"]')?.value?.trim() || '',
                    website: root.querySelector('input[name="website"]')?.value?.trim() || ''
                };
                if (q.required && (!val.fullname || !val.email)) return null;
            }

            if (q.type === 'summary') return '__done__';
            return val;
        }


        function aiwEscape(s) {
            return String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
        }

        function makeSummaryHTML(state) {
            const lines = [];

            function add(label, value) {
                if (value == null) return;
                if (Array.isArray(value) && !value.length) return;
                if (typeof value === 'object' && Object.keys(value).length === 0) return;
                const pretty = Array.isArray(value) ? value.join(', ')
                    : (typeof value === 'object' ? Object.entries(value).map(([k, v]) => `<b>${k}</b>: ${v || '-'}`).join(' — ') : value);
                lines.push(`<li><span class="k"><b>${label}</b></span><span class="v">${pretty || '-'}</span></li>`);
            }

            const ulOpen = '<ul class="aiw-kvlist">', ulClose = '</ul>';

            add('Objectifs', data.goals || []);
            add('Audience', data.audience || '');
            add('Canaux', data.channels || []);
            add('Assets', data.assets || []);
            add('Concurrents', data.competitors || '');
            add('KPIs', data.kpis || []);
            add('Budget', data.budget?.budgetRange || '');
            add('Deadline', data.budget?.deadline || '');

            // Nouveaux blocs
            if (data.sv_stack || data.sv_pages || data.sv_features || data.sv_content) {
                const sv = [
                    data.sv_stack ? (`Stack/CMS: ${data.sv_stack.stack || '-'} — Langues: ${data.sv_stack.multilingue || '-'}`) : null,
                    (data.sv_pages || []).length ? `Pages: ${(data.sv_pages || []).join(', ')}` : null,
                    (data.sv_features || []).length ? `Fonctionnalités: ${(data.sv_features || []).join(', ')}` : null,
                    (data.sv_content || []).length ? `Contenus: ${(data.sv_content || []).join(', ')}` : null
                ].filter(Boolean).join(' — ');
                add('Site vitrine', sv);
            }

            if (data.ec_platform || data.ec_variants || data.ec_payments || data.ec_shipping || data.ec_integrations) {
                const ec = [
                    data.ec_platform ? (`Plateforme: ${data.ec_platform.platform || '-'} — Catalogue: ${data.ec_platform.catalogSize || '-'}`) : null,
                    (data.ec_variants || []).length ? `Catalogue: ${(data.ec_variants || []).join(', ')}` : null,
                    (data.ec_payments || []).length ? `Paiements: ${(data.ec_payments || []).join(', ')}` : null,
                    (data.ec_shipping || []).length ? `Livraison: ${(data.ec_shipping || []).join(', ')}` : null,
                    (data.ec_integrations || []).length ? `Intégrations: ${(data.ec_integrations || []).join(', ')}` : null
                ].filter(Boolean).join(' — ');
                add('E-commerce', ec);
            }

            add('Contact', data.contact ? `${data.contact.fullname || ''} — ${data.contact.email || ''}${data.contact.phone ? (' (' + data.contact.phone + ')') : ''} — ${data.contact.company || ''} ${data.contact.website ? ('(' + data.contact.website + ')') : ''}` : '');

            return ulOpen + lines.join('') + ulClose;
        }


        function makeSummaryMD(data) {
            const out = [];
            out.push('# Brief Artificio');
            out.push(`- **Objectifs**: ${(data.goals || []).join(', ')}`);
            out.push(`- **Audience**: ${data.audience || ''}`);
            out.push(`- **Canaux**: ${(data.channels || []).join(', ')}`);
            out.push(`- **Assets**: ${(data.assets || []).join(', ')}`);
            out.push(`- **Concurrents/Inspirations**: ${data.competitors || ''}`);
            out.push(`- **KPIs**: ${(data.kpis || []).join(', ')}`);
            if (data.sv_stack || data.sv_pages || data.sv_features || data.sv_content) {
                out.push(`- **Site vitrine**: ${[
                    data.sv_stack ? `Stack ${data.sv_stack.stack || '-'} / Langues ${data.sv_stack.multilingue || '-'}` : null,
                    (data.sv_pages || []).length ? `Pages: ${(data.sv_pages || []).join(', ')}` : null,
                    (data.sv_features || []).length ? `Features: ${(data.sv_features || []).join(', ')}` : null,
                    (data.sv_content || []).length ? `Contenus: ${(data.sv_content || []).join(', ')}` : null
                ].filter(Boolean).join(' — ')}`);
            }
            if (data.ec_platform || data.ec_variants || data.ec_payments || data.ec_shipping || data.ec_integrations) {
                out.push(`- **E-commerce**: ${[
                    data.ec_platform ? `Plateforme ${data.ec_platform.platform || '-'} / Catalogue ${data.ec_platform.catalogSize || '-'}` : null,
                    (data.ec_variants || []).length ? `Catalogue: ${(data.ec_variants || []).join(', ')}` : null,
                    (data.ec_payments || []).length ? `Paiements: ${(data.ec_payments || []).join(', ')}` : null,
                    (data.ec_shipping || []).length ? `Livraison: ${(data.ec_shipping || []).join(', ')}` : null,
                    (data.ec_integrations || []).length ? `Intégrations: ${(data.ec_integrations || []).join(', ')}` : null
                ].filter(Boolean).join(' — ')}`);
            }
            out.push(`- **Budget**: ${data.budget?.budgetRange || ''}`);
            out.push(`- **Deadline**: ${data.budget?.deadline || ''}`);
            out.push(`- **Contact**: ${data.contact?.fullname || ''} — ${data.contact?.email || ''}${data.contact?.phone ? (' (' + data.contact.phone + ')') : ''} — ${data.contact?.company || ''} ${data.contact?.website ? ('(' + data.contact.website + ')') : ''}`);
            return out.join('\n');
        }


        function copyText(text) {
            (navigator.clipboard?.writeText(text) || Promise.reject()).then(() => alert('Brief copié dans le presse-papiers ✅'))
                .catch(() => {
                    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
                    document.execCommand('copy'); ta.remove(); alert('Brief copié ✅');
                });
        }

        function downloadJSON(data, filename) {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click(); URL.revokeObjectURL(a.href);
        }

        function downloadTextFile(filename, text) {
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            a.click();
            URL.revokeObjectURL(a.href);
        }

        function aiwPrev() {
            const qs = currentQuestions() || [];
            if (!qs.length) return;
            if ((state.step ?? 0) > 0) {
                state.step--;
                showStep();
            }
        }

        function aiwNext() {
            const qs = currentQuestions() || [];
            if (!qs.length) return;
            const q = qs[state.step] || qs[0];

            const ans = collectAnswer(q);
            if (ans === null) {
                // petit feedback si requis manquant
                if (typeof aiwToast === 'function') aiwToast('Merci de compléter cette étape.');
                return;
            }
            if (ans !== '__done__') state.data[q.key] = ans;

            if (state.step < qs.length - 1) {
                state.step++;
                showStep();
            } else {
                // dernière étape : on affiche le récap si tu l’as dans la pile
                showStep();
            }
        }


        function showStep() {
            document.querySelectorAll('#aiWizardModal .aiw-body .aiw-actions-row, #aiWizardModal .aiw-body .aiw-tools, #aiWizardModal .aiw-body .aiw-toolsbar')
                .forEach(el => el.remove());

            const qs = currentQuestions() || [];
            if (!qs.length) return;
            state.step = Math.max(0, Math.min(state.step ?? 0, qs.length - 1));
            const q = qs[state.step] || qs[0];

            // SÉCURITÉ: normalise (au cas où la modale a été bidouillée avant)
            aiwNormalizeDOM();

            renderControls(q);
            setProgress();

            // btnPrev.disabled = state.step === 0;
            // renderControls(q);
            // setProgress();


            // --- Toolbars sticky ---
            toolsBar.innerHTML = '';
            const isSummary = (q.type === 'summary');
            toolsBar.classList.toggle('is-hidden', !isSummary);

            if (isSummary) {
                toolsBar.append(buildSummaryTools());     // tes 4 boutons
                aiwNormalizeToolButtons();            // ⬅️ uniformise (icône SVG + label)
                aiwFitToolLabels?.();                     // si tu utilises l’auto-compact
                attachAIWButtonHover?.();                 // si tu as gardé l’animation
                btnNext.textContent = 'Terminer';
            } else {
                btnNext.textContent = 'Suivant ▶';
            }

            // (sécurité) retire tout ancien bloc inline dans le contenu
            //document.querySelectorAll('#aiWizardModal .aiw-summary .aiw-actions-row').forEach(el => el.remove());

            // Place/clear summary tools in the sticky actions bar
            actionsBar.querySelector('.aiw-tools')?.remove();
            if (q.type === 'summary') {
                actionsBar.prepend(buildSummaryTools());   // boutons à gauche
                btnNext.textContent = 'Terminer';
            } else {
                btnNext.textContent = 'Suivant ▶';
            }

            // En compact, on n'empile plus de messages
            if (!COMPACT && q.type !== 'summary') {
                addMsg(q.label, 'bot');
            } else if (COMPACT && q.type === 'summary') {
                addMsg('Voilà votre récapitulatif. Vous pouvez copier ou télécharger votre brief. ✅', 'bot');
            }
            attachActionsShadow();
        }

        function attachAIWButtonHover() {
            const btns = document.querySelectorAll('#aiWizardModal .aiw-actions .aiw-tools .btn');
            btns.forEach(btn => {
                btn.addEventListener('pointermove', (e) => {
                    const r = btn.getBoundingClientRect();
                    const x = ((e.clientX - r.left) / r.width) * 100;
                    const y = ((e.clientY - r.top) / r.height) * 100;
                    btn.style.setProperty('--x', x + '%');
                    btn.style.setProperty('--y', y + '%');
                });
                // reset propre quand on sort du bouton
                btn.addEventListener('pointerleave', () => {
                    btn.style.removeProperty('--x');
                    btn.style.removeProperty('--y');
                });
            });
        }


        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const qs = currentQuestions(); const q = qs[state.step]; const val = collectAnswer(q);
            if (val === null) return;
            if (val !== '__done__') {
                state.data[q.key] = val;
                addMsg(formatUser(val, q), 'user');
                save();
            }
            //  
            const coh = aiwCheckCoherence(state.data);
            const blockingRisk = coh.issues.some(i => i.severity === 'risk');
            if (blockingRisk) {
                // on n’empêche pas d’avancer, mais on met sous les yeux
                alert('⚠️ Attention : incohérences majeures détectées (budget/délai vs scope). Consultez le panneau de cohérence.');
            }
            if (state.step < qs.length - 1) { state.step++; showStep(); } else { closeModal(); }


        });

        btnPrev.addEventListener('click', () => { if (state.step > 0) { state.step--; showStep(); save(); } });

        function formatUser(val, q) {
            if (q.type === 'text') return val || '(vide)';
            if (q.type === 'multi') return (val || []).join(', ') || '(aucun)';
            if (q.type === 'composite') return `${val.budgetRange || '-'} — ${val.deadline || '-'}`;
            if (q.type === 'contact') return `${val.fullname || ''} — ${val.email || ''}${val.phone ? (' (' + val.phone + ')') : ''}`;
            return typeof val === 'string' ? val : JSON.stringify(val);
        }

        function openModal() {
            modal.classList.add('aiw-compact'); // active le layout compact
            modal.hidden = false; document.body.style.overflow = 'hidden';
            msgs.innerHTML = '';
            if (Object.keys(state.data || {}).length === 0) {
                addMsg('Salut 👋 Je suis l’assistant Artificio. Je vais vous poser quelques questions pour préparer un brief précis.');
            }
            showStep();
        }
        function closeModal() { modal.hidden = true; document.body.style.overflow = ''; }

        function attachActionsShadow() {
            const scrollers = [
                document.querySelector('.aiw-summary'),
                document.querySelector('.aiw-body')
            ].filter(Boolean);

            const update = () => {
                const s = scrollers.find(x => x && x.offsetParent !== null);
                if (!s || !actionsBar) return;
                const atTop = s.scrollTop <= 0;
                actionsBar.style.boxShadow = atTop ? 'inset 0 1px 0 rgba(0,0,0,.06)'
                    : '0 -10px 28px rgba(0,0,0,.10)';
            };
            scrollers.forEach(s => s?.addEventListener('scroll', update, { passive: true }));
            update();
        }

        function aiwFitToolLabels() {
            const btns = document.querySelectorAll('#aiWizardModal .aiw-actions .aiw-tools .btn');
            btns.forEach(btn => {
                // reset d’abord
                btn.classList.remove('compact');
                // marge de sécurité (bordures/padding)
                const allowance = 8;
                // si le texte dépasse la largeur dispo -> on passe en compact
                if (btn.scrollWidth > btn.clientWidth + allowance) {
                    btn.classList.add('compact');
                }
            });
        }

        // Ouvrir sur le CTA (bouton Démarrer un projet)
        document.querySelectorAll('.cta-boost, #open-brief').forEach(btn => {
            btn.addEventListener('click', (ev) => { ev.preventDefault(); openModal(); });
        });

        // Fermer (backdrop / croix / ESC)
        modal.querySelectorAll('[data-aiw-close]').forEach(el => el.addEventListener('click', closeModal));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
    }

    // ============================== AUTO-INIT ==============================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAIWizard);
    } else {
        initAIWizard();
    }

    // (Optionnel) exposer les insights pour debug
    window.aiwInsight = aiwInsight;

})();