// --- Liquid Router & SW Engine ---
const router = {
    init() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(() => { });
        }
        document.addEventListener('click', e => {
            const link = e.target.closest('a');
            if (this.shouldHandle(link)) {
                e.preventDefault();
                this.navigate(link.href);
            }
        });
        window.addEventListener('popstate', () => this.navigate(window.location.href, false));
        this.setupPrefetching();
        this.fadeIn();
        this.handleHashAction();
        this.initMobileMenu();
    },
    shouldHandle(link) {
        if (!link || !link.href) return false;
        const url = new URL(link.href);
        const isInternal = url.origin === window.location.origin;
        const href = link.getAttribute('href');
        const isRelHash = href && href.startsWith('#');
        return isInternal && !link.hasAttribute('download') && link.target !== '_blank' && !isRelHash;
    },
    async navigate(url, addToHistory = true) {
        this.closeMobileMenu();
        const targetUrl = new URL(url);
        const isSamePage = targetUrl.pathname === window.location.pathname ||
            (targetUrl.pathname === '/' && window.location.pathname === '/index.html') ||
            (targetUrl.pathname === '/index.html' && window.location.pathname === '/');

        if (isSamePage && targetUrl.hash) {
            if (addToHistory) history.pushState(null, '', url);
            this.scrollToHash(targetUrl.hash);
            return;
        }

        try {
            const response = await fetch(url);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('#content-area');
            const currentContent = document.querySelector('#content-area');

            if (newContent && currentContent) {
                document.body.style.opacity = '0';
                setTimeout(() => {
                    currentContent.innerHTML = newContent.innerHTML;
                    document.title = doc.title;
                    if (addToHistory) history.pushState(null, '', url);

                    // Re-execute scripts in the swapped content
                    currentContent.querySelectorAll('script').forEach(oldScript => {
                        const newScript = document.createElement('script');
                        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                        oldScript.parentNode.replaceChild(newScript, oldScript);
                    });

                    if (targetUrl.hash) {
                        this.scrollToHash(targetUrl.hash);
                    } else {
                        window.scrollTo(0, 0);
                    }

                    this.updateNavLinks();
                    this.fadeIn();
                    this.setupPrefetching();
                    this.initMobileMenu();
                }, 200);
            } else { window.location.href = url; }
        } catch (e) { window.location.href = url; }
    },
    closeMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        const menuPanel = menu ? menu.querySelector('.w-64') : null;
        if (!menu || menu.classList.contains('hidden')) return;

        menu.classList.remove('opacity-100');
        menu.classList.add('opacity-0');
        if (menuPanel) {
            menuPanel.classList.remove('translate-x-0');
            menuPanel.classList.add('translate-x-full');
        }

        setTimeout(() => {
            if (menu.classList.contains('opacity-0')) {
                menu.classList.add('hidden');
            }
        }, 300);
        document.body.style.overflow = 'auto';
    },
    scrollToHash(hash) {
        const el = document.querySelector(hash);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        } else if (hash === '#top' || hash === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    handleHashAction() {
        if (window.location.hash) {
            setTimeout(() => this.scrollToHash(window.location.hash), 500);
        }
    },
    updateNavLinks() {
        const path = window.location.pathname;
        const page = path.split('/').pop();

        // Main nav links
        document.querySelectorAll('nav a:not([data-segment])').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const isHome = path === '/' || path === '/index.html';
            const isMatch = isHome
                ? (href === 'index.html#top' || href === 'index.html' || href === '/' || href === '#top')
                : (href.includes(page) && !href.includes('#'));
            if (isMatch) {
                link.classList.add('text-primary', 'font-bold');
                link.classList.remove('text-gray-600', 'dark:text-gray-300', 'font-semibold');
            } else {
                link.classList.remove('text-primary', 'font-bold');
                link.classList.add('text-gray-600', 'dark:text-gray-300', 'font-semibold');
            }
        });

        // Segment toggle pills (Sliding Logic)
        const updatePill = (containerId, pillId) => {
            const container = document.querySelector(containerId);
            const pill = document.getElementById(pillId);
            if (!container || !pill) return;

            let targetSegment = null;
            if (page === 'global_companies.html') targetSegment = 'global';
            else if (page === 'indian_businesses.html') targetSegment = 'indian';

            const activeLink = targetSegment ? container.querySelector(`[data-segment="${targetSegment}"]`) : null;

            if (activeLink) {
                pill.style.opacity = '1';
                pill.style.left = activeLink.offsetLeft + 'px';
                pill.style.width = activeLink.offsetWidth + 'px';

                // Update text colors
                container.querySelectorAll('[data-segment]').forEach(link => {
                    if (link === activeLink) {
                        link.classList.add('text-primary', 'dark:text-white');
                        link.classList.remove('text-gray-600', 'dark:text-gray-300', 'text-gray-500');
                    } else {
                        link.classList.remove('text-primary', 'dark:text-white');
                        link.classList.add('text-gray-600', 'dark:text-gray-300');
                    }
                });
            } else {
                pill.style.opacity = '0';
                // Reset all links to default unselected state
                container.querySelectorAll('[data-segment]').forEach(link => {
                    link.classList.remove('text-primary', 'dark:text-white');
                    link.classList.add('text-gray-600', 'dark:text-gray-300');
                });
            }
        };

        // Run for desktop and mobile
        updatePill('nav .hidden.lg\\:flex', 'segment-pill');
        updatePill('nav .md\\:hidden .flex', 'mobile-segment-pill');
    },
    initMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('close-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const menuPanel = menu ? menu.querySelector('.w-64') : null;

        if (!btn || !menu || !menuPanel) return;

        // Function to open the menu
        const openMenu = () => {
            menu.classList.remove('hidden');
            // Reflow
            void menu.offsetWidth;
            menu.classList.remove('opacity-0');
            menu.classList.add('opacity-100');
            menuPanel.classList.remove('translate-x-full');
            menuPanel.classList.add('translate-x-0');
            document.body.style.overflow = 'hidden';
        };

        // Handle re-initialization safely
        if (this._menuCleanup) this._menuCleanup();

        const onMenuBtnClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            openMenu();
        };

        const onCloseBtnClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.closeMobileMenu();
        };

        const onOverlayClick = (e) => {
            if (e.target === menu) this.closeMobileMenu();
        };

        const onLinkClick = (e) => {
            if (e.target.closest('a')) {
                const isHash = e.target.closest('a').getAttribute('href').includes('#');
                setTimeout(() => this.closeMobileMenu(), isHash ? 300 : 150);
            }
        };

        btn.addEventListener('click', onMenuBtnClick);
        if (closeBtn) closeBtn.addEventListener('click', onCloseBtnClick);
        menu.addEventListener('click', onOverlayClick);
        menu.addEventListener('click', onLinkClick);

        // Store cleanup function to remove listeners before re-init
        this._menuCleanup = () => {
            btn.removeEventListener('click', onMenuBtnClick);
            if (closeBtn) closeBtn.removeEventListener('click', onCloseBtnClick);
            menu.removeEventListener('click', onOverlayClick);
            menu.removeEventListener('click', onLinkClick);
            this._menuCleanup = null;
        };
    },
    fadeIn() { requestAnimationFrame(() => { document.body.style.opacity = '1'; }); },
    setupPrefetching() {
        document.querySelectorAll('a').forEach(link => {
            if (this.shouldHandle(link)) {
                link.addEventListener('mouseenter', () => {
                    const p = document.createElement('link');
                    p.rel = 'prefetch'; p.href = link.href;
                    document.head.appendChild(p);
                }, { once: true });
            }
        });
    }
};
router.init();