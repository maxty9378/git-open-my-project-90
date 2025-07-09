/**
 * SNS Welcome Course Widget для Tilda
 * Оптимизированная версия для мобильных устройств
 * Версия 3.0 - с поддержкой меню на iPhone
 */
(function() {
    'use strict';
    
    // Конфигурация виджета
    const WIDGET_CONFIG = {
        baseUrl: window.location.origin,
        containerId: 'sns-welcome-widget',
        background: '#111827',
        loadingTimeout: 10000
    };

    // Создание стилей для мобильного виджета
    function createMobileWidgetStyles() {
        const styles = `
            .sns-tilda-widget-container {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                height: 100dvh !important;
                margin: 0 !important;
                padding: 0 !important;
                background: ${WIDGET_CONFIG.background} !important;
                overflow: hidden !important;
                z-index: 999999 !important;
                display: flex !important;
                flex-direction: column !important;
                box-sizing: border-box !important;
            }
            
            .sns-tilda-widget-content {
                flex: 1 !important;
                width: 100% !important;
                height: 100% !important;
                background: ${WIDGET_CONFIG.background} !important;
                display: block !important;
                position: relative !important;
                overflow: hidden !important;
                box-sizing: border-box !important;
            }
            
            .sns-tilda-widget-loading {
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
            
            .sns-tilda-widget-spinner {
                border: 2px solid #374151 !important;
                border-top: 2px solid #02a374 !important;
                border-radius: 50% !important;
                width: 30px !important;
                height: 30px !important;
                animation: sns-tilda-spin 1s linear infinite !important;
                margin: 0 auto 10px !important;
            }
            
            @keyframes sns-tilda-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .sns-tilda-widget-close {
                position: absolute !important;
                top: 20px !important;
                right: 20px !important;
                width: 40px !important;
                height: 40px !important;
                background: rgba(0, 0, 0, 0.5) !important;
                border: none !important;
                border-radius: 50% !important;
                color: white !important;
                font-size: 20px !important;
                cursor: pointer !important;
                z-index: 1000 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: background-color 0.2s ease !important;
            }
            
            .sns-tilda-widget-close:hover {
                background: rgba(0, 0, 0, 0.7) !important;
            }
            
            /* Скрытие всех элементов страницы */
            body.sns-tilda-widget-active > *:not(.sns-tilda-widget-container) {
                display: none !important;
                visibility: hidden !important;
            }
            
            body.sns-tilda-widget-active {
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
            
            html.sns-tilda-widget-active {
                height: 100% !important;
                height: 100dvh !important;
                max-height: none !important;
                overflow: hidden !important;
                position: fixed !important;
                width: 100% !important;
            }
            
            /* Специальные стили для iPhone */
            @supports (-webkit-touch-callout: none) {
                .sns-tilda-widget-container {
                    height: 100vh !important;
                    height: -webkit-fill-available !important;
                }
                
                .sns-tilda-widget-content {
                    height: 100% !important;
                    height: -webkit-fill-available !important;
                }
                
                body.sns-tilda-widget-active {
                    height: 100vh !important;
                    height: -webkit-fill-available !important;
                }
                
                html.sns-tilda-widget-active {
                    height: 100vh !important;
                    height: -webkit-fill-available !important;
                }
            }
            
            /* Анимации */
            .sns-tilda-widget-container.loading {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .sns-tilda-widget-container.loaded {
                opacity: 1;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        styleSheet.id = 'sns-tilda-widget-styles';
        document.head.appendChild(styleSheet);
    }

    // Создание HTML структуры
    function createWidgetHTML() {
        return `
            <div class="sns-tilda-widget-container loading">
                <button class="sns-tilda-widget-close" onclick="SNSTildaWidget.close()" title="Закрыть">×</button>
                <div class="sns-tilda-widget-loading">
                    <div class="sns-tilda-widget-spinner"></div>
                    <div>Загрузка Welcome курса...</div>
                </div>
                <div class="sns-tilda-widget-content" id="sns-tilda-widget-content"></div>
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
        
        window.SNSTildaWidget._originalViewport = viewportMeta.content;
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content';
    }

    // Включение полноэкранного режима
    function enableFullscreen() {
        document.documentElement.classList.add('sns-tilda-widget-active');
        document.body.classList.add('sns-tilda-widget-active');
        
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
        
        window.SNSTildaWidget._originalStyles = {
            bodyOverflow: originalBodyOverflow,
            htmlOverflow: originalHtmlOverflow,
            bodyPosition: originalBodyPosition
        };
        
        setupMobileViewport();
    }

    // Отключение полноэкранного режима
    function disableFullscreen() {
        document.documentElement.classList.remove('sns-tilda-widget-active');
        document.body.classList.remove('sns-tilda-widget-active');
        
        if (window.SNSTildaWidget._originalStyles) {
            const styles = window.SNSTildaWidget._originalStyles;
            document.body.style.overflow = styles.bodyOverflow || '';
            document.documentElement.style.overflow = styles.htmlOverflow || '';
            document.body.style.position = styles.bodyPosition || '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.style.top = '';
            document.body.style.left = '';
        }
        
        if (window.SNSTildaWidget._originalViewport) {
            const viewportMeta = document.querySelector('meta[name="viewport"]');
            if (viewportMeta) {
                viewportMeta.content = window.SNSTildaWidget._originalViewport;
            }
        }
    }

    // Загрузка контента приложения
    async function loadAppContent(container) {
        const loadingElement = container.querySelector('.sns-tilda-widget-loading');
        const contentElement = container.querySelector('.sns-tilda-widget-content');
        const containerEl = container.querySelector('.sns-tilda-widget-container');
        
        console.log('Загрузка контента приложения...');
        
        try {
            if (loadingElement) {
                loadingElement.style.display = 'block';
            }
            
            // Создаем iframe с приложением
            const iframe = document.createElement('iframe');
            iframe.src = WIDGET_CONFIG.baseUrl;
            iframe.style.cssText = `
                width: 100% !important;
                height: 100% !important;
                border: none !important;
                background: ${WIDGET_CONFIG.background} !important;
                display: block !important;
            `;
            iframe.title = 'SNS Welcome Course';
            iframe.allowFullscreen = true;
            iframe.setAttribute('allow', 'accelerometer; autoplay; camera; clipboard-read; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; magnetometer; microphone; midi; payment; picture-in-picture; publickey-credentials-get; screen-wake-lock; web-share; xr-spatial-tracking');
            iframe.setAttribute('sandbox', 'allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation');
            iframe.loading = 'eager';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            
            iframe.onload = () => {
                console.log('Приложение загружено успешно');
                finishLoading();
            };
            
            iframe.onerror = () => {
                console.error('Ошибка загрузки приложения');
                finishLoading();
            };
            
            contentElement.appendChild(iframe);
            
        } catch (error) {
            console.error('Ошибка загрузки контента:', error);
            finishLoading();
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
    }

    // Основной класс виджета
    class TildaWelcomeWidget {
        constructor() {
            this.initialized = false;
            this.container = null;
        }
        
        async init() {
            if (this.initialized) {
                console.log('Виджет уже инициализирован');
                return;
            }
            
            console.log('Инициализация виджета для Tilda...');
            
            this.container = document.getElementById(WIDGET_CONFIG.containerId);
            if (!this.container) {
                console.error(`Контейнер с ID "${WIDGET_CONFIG.containerId}" не найден`);
                return;
            }
            
            try {
                createMobileWidgetStyles();
                enableFullscreen();
                this.container.innerHTML = createWidgetHTML();
                await loadAppContent(this.container);
                this.setupEventListeners();
                
                this.initialized = true;
                console.log('Виджет успешно инициализирован');
                
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
            
            // Обработка изменения ориентации
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    this.adjustForOrientation();
                }, 100);
            });
            
            // Обработка изменения размера окна
            window.addEventListener('resize', () => {
                this.adjustForOrientation();
            });
            
            // Обработка клавиши Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.initialized) {
                    this.close();
                }
            });
        }
        
        adjustForOrientation() {
            if (!this.container) return;
            
            const containerEl = this.container.querySelector('.sns-tilda-widget-container');
            const contentEl = this.container.querySelector('.sns-tilda-widget-content');
            
            if (containerEl && contentEl) {
                containerEl.style.height = '100vh';
                containerEl.style.height = '100dvh';
                contentEl.style.height = '100%';
                
                console.log('Виджет адаптирован под новую ориентацию');
            }
        }
        
        close() {
            if (!this.initialized) return;
            
            console.log('Закрытие виджета...');
            
            disableFullscreen();
            
            if (this.container) {
                this.container.innerHTML = '';
            }
            
            const styleElement = document.getElementById('sns-tilda-widget-styles');
            if (styleElement) {
                styleElement.remove();
            }
            
            this.initialized = false;
            console.log('Виджет закрыт');
        }
    }

    // Автоматическая инициализация
    function autoInit() {
        const widget = new TildaWelcomeWidget();
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => widget.init());
        } else {
            widget.init();
        }
        
        window.SNSTildaWidget = {
            init: () => widget.init(),
            close: () => widget.close(),
            config: WIDGET_CONFIG,
            widget: widget
        };
    }

    autoInit();
})();