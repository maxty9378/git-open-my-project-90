
/**
 * Основной файл мобильного виджета SNS Welcome
 * Версия 2.0 - оптимизированная для мобильных устройств
 */
(function() {
    'use strict';
    
    // Конфигурация виджета
    const WIDGET_CONFIG = {
        baseUrl: 'https://sns-welcome.vercel.app',
        containerId: 'sns-welcome-widget',
        background: '#111827',
        mobileBreakpoint: 768,
        loadingTimeout: 15000
    };

    // Создание оптимизированных стилей для мобильных устройств
    function createMobileOptimizedStyles() {
        const styles = `
            .sns-welcome-widget-container {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                height: 100dvh !important;
                margin: 0 !important;
                padding: 0 !important;
                background: ${WIDGET_CONFIG.background} !important;
                overflow: hidden !important;
                z-index: 2147483647 !important;
                display: flex !important;
                flex-direction: column !important;
                box-sizing: border-box !important;
            }
            
            .sns-welcome-widget-content {
                flex: 1 !important;
                width: 100% !important;
                height: 100% !important;
                background: ${WIDGET_CONFIG.background} !important;
                display: block !important;
                position: relative !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                -webkit-overflow-scrolling: touch !important;
                box-sizing: border-box !important;
            }
            
            .sns-welcome-widget-loading {
                position: absolute !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                color: #02a374 !important;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif !important;
                font-size: 16px !important;
                z-index: 10 !important;
                text-align: center !important;
                background: ${WIDGET_CONFIG.background} !important;
                padding: 20px !important;
                border-radius: 8px !important;
            }
            
            .sns-welcome-widget-spinner {
                border: 2px solid #374151 !important;
                border-top: 2px solid #02a374 !important;
                border-radius: 50% !important;
                width: 30px !important;
                height: 30px !important;
                animation: sns-widget-spin 1s linear infinite !important;
                margin: 0 auto 10px !important;
            }
            
            @keyframes sns-widget-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            body.sns-widget-active > *:not(.sns-welcome-widget-container) {
                display: none !important;
                visibility: hidden !important;
            }
            
            body.sns-widget-active {
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                height: 100vh !important;
                height: 100dvh !important;
                max-height: 100vh !important;
                max-height: 100dvh !important;
                position: fixed !important;
                width: 100% !important;
                top: 0 !important;
                left: 0 !important;
            }
            
            html.sns-widget-active {
                height: 100% !important;
                height: 100dvh !important;
                max-height: none !important;
                overflow: hidden !important;
                position: fixed !important;
                width: 100% !important;
            }
            
            .sns-welcome-widget-content * {
                box-sizing: border-box !important;
            }
            
            .sns-welcome-widget-content img {
                max-width: 100% !important;
                height: auto !important;
            }
            
            .sns-welcome-widget-content iframe {
                width: 100% !important;
                height: 100% !important;
                border: none !important;
                background: ${WIDGET_CONFIG.background} !important;
            }
            
            @supports (-webkit-touch-callout: none) {
                .sns-welcome-widget-container {
                    height: 100vh !important;
                    height: -webkit-fill-available !important;
                }
                
                .sns-welcome-widget-content {
                    height: 100% !important;
                    height: -webkit-fill-available !important;
                    -webkit-overflow-scrolling: touch !important;
                    overflow-y: scroll !important;
                }
                
                body.sns-widget-active {
                    height: 100vh !important;
                    height: -webkit-fill-available !important;
                }
                
                html.sns-widget-active {
                    height: 100vh !important;
                    height: -webkit-fill-available !important;
                }
            }
            
            @media screen and (max-width: ${WIDGET_CONFIG.mobileBreakpoint}px) {
                .sns-welcome-widget-container {
                    position: fixed !important;
                    inset: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    height: 100dvh !important;
                }
                
                .sns-welcome-widget-content {
                    width: 100% !important;
                    height: 100% !important;
                    min-height: 100vh !important;
                    min-height: 100dvh !important;
                }
                
                body.sns-widget-active {
                    position: fixed !important;
                    inset: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                }
            }
            
            .sns-welcome-widget-content::-webkit-scrollbar {
                width: 0px !important;
                background: transparent !important;
            }
            
            .sns-welcome-widget-container.loading {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .sns-welcome-widget-container.loaded {
                opacity: 1;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        styleSheet.id = 'sns-widget-styles';
        document.head.appendChild(styleSheet);
    }

    // Создание HTML структуры
    function createWidgetHTML() {
        return `
            <div class="sns-welcome-widget-container loading">
                <div class="sns-welcome-widget-loading">
                    <div class="sns-welcome-widget-spinner"></div>
                    <div>Загрузка Welcome курса...</div>
                </div>
                <div class="sns-welcome-widget-content" id="sns-widget-content"></div>
            </div>
        `;
    }

    // Настройка viewport для мобильных устройств
    function setupMobileViewport() {
        let viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
            viewportMeta = document.createElement('meta');
            viewportMeta.name = 'viewport';
            document.head.appendChild(viewportMeta);
        }
        
        window.SNSWelcomeWidget._originalViewport = viewportMeta.content;
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content';
    }

    // Включение полноэкранного режима
    function enableFullscreen() {
        document.documentElement.classList.add('sns-widget-active');
        document.body.classList.add('sns-widget-active');
        
        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyPosition = document.body.style.position;
        
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        document.body.style.top = '0';
        document.body.style.left = '0';
        
        window.SNSWelcomeWidget._originalStyles = {
            bodyOverflow: originalBodyOverflow,
            htmlOverflow: originalHtmlOverflow,
            bodyPosition: originalBodyPosition
        };
        
        setupMobileViewport();
    }

    // Загрузка контента
    async function loadContentForMobile(container) {
        const loadingElement = container.querySelector('.sns-welcome-widget-loading');
        const contentElement = container.querySelector('.sns-welcome-widget-content');
        const containerEl = container.querySelector('.sns-welcome-widget-container');
        
        console.log('Начинаем загрузку контента для мобильных устройств...');
        
        try {
            if (loadingElement) {
                loadingElement.style.display = 'block';
            }
            
            const response = await fetch(WIDGET_CONFIG.baseUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'User-Agent': 'SNSWelcomeWidget/2.0 Mobile',
                    'Cache-Control': 'no-cache'
                },
                mode: 'cors',
                credentials: 'omit'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            console.log('HTML контент получен, размер:', html.length);
            
            const processedContent = processMobileContent(html);
            
            if (processedContent) {
                contentElement.innerHTML = processedContent;
                console.log('Контент успешно вставлен в DOM');
                
                await processScripts(contentElement);
                processStyles(html);
                
            } else {
                throw new Error('Не удалось обработать контент');
            }
            
        } catch (error) {
            console.error('Ошибка загрузки контента:', error);
            console.log('Переключаемся на iframe fallback...');
            
            contentElement.innerHTML = `
                <iframe 
                    src="${WIDGET_CONFIG.baseUrl}"
                    style="width: 100%; height: 100%; border: none; background: ${WIDGET_CONFIG.background}; display: block;"
                    title="SNS Welcome Course"
                    allowfullscreen
                    allow="accelerometer; autoplay; camera; clipboard-read; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; magnetometer; microphone; midi; payment; picture-in-picture; publickey-credentials-get; screen-wake-lock; web-share; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
                    loading="eager"
                    referrerpolicy="strict-origin-when-cross-origin">
                </iframe>
            `;
            
            const iframe = contentElement.querySelector('iframe');
            if (iframe) {
                iframe.onload = () => {
                    console.log('Iframe загружен успешно');
                    finishLoading();
                };
                iframe.onerror = () => {
                    console.error('Ошибка загрузки iframe');
                    finishLoading();
                };
            }
        }
        
        function finishLoading() {
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            if (containerEl) {
                containerEl.classList.remove('loading');
                containerEl.classList.add('loaded');
            }
            
            console.log('Загрузка завершена');
        }
        
        setTimeout(finishLoading, WIDGET_CONFIG.loadingTimeout);
        
        if (contentElement.innerHTML.trim()) {
            setTimeout(finishLoading, 1000);
        }
    }

    function processMobileContent(html) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const body = doc.body;
            if (!body) {
                throw new Error('Не найден body в HTML');
            }
            
            const elementsToRemove = body.querySelectorAll('script[src*="analytics"], script[src*="gtag"], script[src*="facebook"], noscript, .hidden-mobile');
            elementsToRemove.forEach(el => el.remove());
            
            const images = body.querySelectorAll('img');
            images.forEach(img => {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                img.loading = 'lazy';
            });
            
            return body.innerHTML;
            
        } catch (error) {
            console.error('Ошибка обработки контента:', error);
            return null;
        }
    }

    async function processScripts(contentElement) {
        const scripts = contentElement.querySelectorAll('script');
        console.log('Найдено скриптов:', scripts.length);
        
        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i];
            try {
                const newScript = document.createElement('script');
                
                if (script.src) {
                    newScript.src = script.src;
                    newScript.async = true;
                    newScript.defer = true;
                } else if (script.textContent && script.textContent.trim()) {
                    newScript.textContent = script.textContent;
                } else {
                    continue;
                }
                
                document.head.appendChild(newScript);
                console.log(`Скрипт ${i + 1} добавлен`);
                
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                console.warn(`Ошибка при обработке скрипта ${i + 1}:`, error);
            }
        }
    }

    function processStyles(html) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const styleElements = doc.querySelectorAll('style');
            styleElements.forEach((style, index) => {
                if (style.textContent && style.textContent.trim()) {
                    const newStyle = document.createElement('style');
                    newStyle.textContent = style.textContent;
                    newStyle.id = `sns-widget-style-${index}`;
                    document.head.appendChild(newStyle);
                    console.log(`Стиль ${index + 1} добавлен`);
                }
            });
            
            const linkElements = doc.querySelectorAll('link[rel="stylesheet"]');
            linkElements.forEach((link, index) => {
                if (link.href) {
                    const newLink = document.createElement('link');
                    newLink.rel = 'stylesheet';
                    newLink.href = link.href;
                    newLink.id = `sns-widget-link-${index}`;
                    document.head.appendChild(newLink);
                    console.log(`Внешний стиль ${index + 1} добавлен`);
                }
            });
            
        } catch (error) {
            console.warn('Ошибка при обработке стилей:', error);
        }
    }

    // Основной класс виджета
    class MobileWelcomeWidget {
        constructor() {
            this.initialized = false;
            this.container = null;
        }
        
        async init() {
            if (this.initialized) {
                console.log('Виджет уже инициализирован');
                return;
            }
            
            console.log('Инициализация мобильного виджета...');
            
            this.container = document.getElementById(WIDGET_CONFIG.containerId);
            if (!this.container) {
                console.error(`Контейнер с ID "${WIDGET_CONFIG.containerId}" не найден`);
                return;
            }
            
            try {
                createMobileOptimizedStyles();
                enableFullscreen();
                this.container.innerHTML = createWidgetHTML();
                await loadContentForMobile(this.container);
                this.setupEventListeners();
                
                this.initialized = true;
                console.log('Мобильный виджет успешно инициализирован');
                
            } catch (error) {
                console.error('Ошибка инициализации виджета:', error);
            }
        }
        
        setupEventListeners() {
            if (this.container) {
                this.container.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
            
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    this.adjustForOrientation();
                }, 100);
            });
            
            window.addEventListener('resize', () => {
                this.adjustForOrientation();
            });
        }
        
        adjustForOrientation() {
            if (!this.container) return;
            
            const containerEl = this.container.querySelector('.sns-welcome-widget-container');
            const contentEl = this.container.querySelector('.sns-welcome-widget-content');
            
            if (containerEl && contentEl) {
                containerEl.style.height = '100vh';
                containerEl.style.height = '100dvh';
                contentEl.style.height = '100%';
                
                console.log('Виджет адаптирован под новую ориентацию');
            }
        }
        
        destroy() {
            if (!this.initialized) return;
            
            console.log('Закрытие мобильного виджета...');
            
            document.documentElement.classList.remove('sns-widget-active');
            document.body.classList.remove('sns-widget-active');
            
            if (window.SNSWelcomeWidget._originalStyles) {
                const styles = window.SNSWelcomeWidget._originalStyles;
                document.body.style.overflow = styles.bodyOverflow || '';
                document.documentElement.style.overflow = styles.htmlOverflow || '';
                document.body.style.position = styles.bodyPosition || '';
                document.body.style.width = '';
                document.body.style.height = '';
                document.body.style.top = '';
                document.body.style.left = '';
            }
            
            if (window.SNSWelcomeWidget._originalViewport) {
                const viewportMeta = document.querySelector('meta[name="viewport"]');
                if (viewportMeta) {
                    viewportMeta.content = window.SNSWelcomeWidget._originalViewport;
                }
            }
            
            if (this.container) {
                this.container.innerHTML = '';
            }
            
            const styleElement = document.getElementById('sns-widget-styles');
            if (styleElement) {
                styleElement.remove();
            }
            
            const addedStyles = document.querySelectorAll('[id^="sns-widget-style-"], [id^="sns-widget-link-"]');
            addedStyles.forEach(el => el.remove());
            
            this.initialized = false;
            console.log('Мобильный виджет закрыт');
        }
    }

    // Автоматическая инициализация
    function autoInit() {
        const widget = new MobileWelcomeWidget();
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => widget.init());
        } else {
            widget.init();
        }
        
        window.SNSWelcomeWidget = {
            init: () => widget.init(),
            destroy: () => widget.destroy(),
            config: WIDGET_CONFIG,
            widget: widget
        };
    }

    autoInit();
})();
