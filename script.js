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
}// ===== ARTIFICIO WEBSITE JAVASCRIPT =====
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
function initNavbarEffects() {
    const navbar = $('#navbar');
    const logo = navbar.querySelector('.logo');
    const navLinks = navbar.querySelectorAll('.nav-link:not(.cta)');
    const ctaButton = navbar.querySelector('.nav-link.cta');
    
    // FORCE BRUTALE EN JAVASCRIPT - État transparent
    function setTransparentMode() {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.borderBottom = 'none';
        navbar.style.boxShadow = 'none';
        
        // Textes en blanc pour fond coloré (même en mode sombre)
        logo.style.color = 'white';
        logo.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        logo.style.background = 'none';
        logo.style.webkitTextFillColor = 'white';
        
        navLinks.forEach(link => {
            link.style.color = 'rgba(255, 255, 255, 0.9)';
            link.style.textShadow = '0 1px 5px rgba(0, 0, 0, 0.2)';
        });
        
        // CTA en mode glassmorphism blanc
        ctaButton.style.background = 'rgba(255, 255, 255, 0.15)';
        ctaButton.style.color = 'white';
        ctaButton.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        ctaButton.style.backdropFilter = 'blur(10px)';
        ctaButton.style.transition = 'all 0.3s ease';
        
        // Animation hover pour mode transparent
        ctaButton.onmouseenter = () => {
            ctaButton.style.background = 'linear-gradient(90deg, #3700AD 0%, #E66C9C 100%)';
            ctaButton.style.border = 'none';
            ctaButton.style.transform = 'translateY(-2px)';
            ctaButton.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        };
        
        ctaButton.onmouseleave = () => {
            ctaButton.style.background = 'rgba(255, 255, 255, 0.15)';
            ctaButton.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            ctaButton.style.transform = 'translateY(0)';
            ctaButton.style.boxShadow = 'none';
        };
    }
    
    // État blanc - adapté au thème
    function setWhiteMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 15, 15, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(55, 0, 173, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(55, 0, 173, 0.1)';
        }
        
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        
        // Textes adaptés au thème
        logo.style.color = 'transparent';
        logo.style.textShadow = 'none';
        logo.style.background = 'linear-gradient(90deg, #3700AD 0%, #E66C9C 100%)';
        logo.style.webkitBackgroundClip = 'text';
        logo.style.webkitTextFillColor = 'transparent';
        
        const textColor = currentTheme === 'dark' ? '#ffffff' : '#1a1a1a';
        navLinks.forEach(link => {
            link.style.color = textColor;
            link.style.textShadow = 'none';
        });
        
        // CTA en mode coloré
        ctaButton.style.background = 'linear-gradient(90deg, #3700AD 0%, #E66C9C 100%)';
        ctaButton.style.color = 'white';
        ctaButton.style.border = 'none';
        ctaButton.style.backdropFilter = 'none';
        ctaButton.style.transition = 'all 0.3s ease';
        
        // Animation hover pour mode blanc
        ctaButton.onmouseenter = () => {
            ctaButton.style.background = 'linear-gradient(90deg, #E66C9C 0%, #3700AD 100%)';
            ctaButton.style.transform = 'translateY(-2px)';
            ctaButton.style.boxShadow = '0 8px 25px rgba(55, 0, 173, 0.4)';
        };
        
        ctaButton.onmouseleave = () => {
            ctaButton.style.background = 'linear-gradient(90deg, #3700AD 0%, #E66C9C 100%)';
            ctaButton.style.transform = 'translateY(0)';
            ctaButton.style.boxShadow = 'none';
        };
    }
    
    // État initial
    setTransparentMode();
    console.log('🔧 Navbar forcée en transparent avec textes blancs');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 300) {
            setWhiteMode();
            navbar.classList.add('scrolled');
            console.log('🔄 Navbar en mode BLANC avec adaptation thème');
        } else {
            setTransparentMode();
            navbar.classList.remove('scrolled');
            console.log('🔄 Navbar en mode TRANSPARENT avec textes blancs');
        }
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

// ===== EXPORT FOR TESTING (if using modules) =====
// export { initializeWebsite, showNotification, toggleMobileMenu };