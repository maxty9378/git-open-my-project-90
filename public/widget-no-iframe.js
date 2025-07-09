
(function() {
    'use strict';
    
    // Конфигурация виджета
    const WIDGET_CONFIG = {
        baseUrl: 'https://sns-welcome.vercel.app',
        containerId: 'sns-welcome-widget',
        background: '#111827'
    };

    // Создание стилей для виджета
    function createWidgetStyles() {
        const styles = `
            .sns-welcome-widget-container {
                width: 100%;
                height: 100vh;
                margin: 0;
                padding: 0;
                background: ${WIDGET_CONFIG.background};
                overflow: hidden;
                position: relative;
                min-height: 100vh;
            }
            
            .sns-welcome-widget-content {
                width: 100%;
                height: 100%;
                min-height: 100vh;
                background: ${WIDGET_CONFIG.background};
                display: block;
                position: relative;
                z-index: 1;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
            }
            
            .sns-welcome-widget-loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #02a374;
                font-family: Arial, sans-serif;
                font-size: 16px;
                z-index: 10;
                text-align: center;
            }
            
            .sns-welcome-widget-spinner {
                border: 2px solid #374151;
                border-top: 2px solid #02a374;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                animation: sns-widget-spin 1s linear infinite;
                margin: 0 auto 10px;
            }
            
            @keyframes sns-widget-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            /* Полноэкранные стили */
            body.sns-widget-fullscreen {
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                height: 100vh !important;
                max-height: 100vh !important;
            }
            
            body.sns-widget-fullscreen .sns-welcome-widget-container {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                z-index: 2147483647 !important;
                width: 100vw !important;
                height: 100vh !important;
                max-width: 100vw !important;
                max-height: 100vh !important;
            }
            
            body.sns-widget-fullscreen .sns-welcome-widget-content {
                width: 100vw !important;
                height: 100vh !important;
                max-width: 100vw !important;
                max-height: 100vh !important;
                min-height: 100vh !important;
            }
            
            /* Принудительное скрытие всех элементов страницы кроме виджета */
            body.sns-widget-fullscreen > *:not(.sns-welcome-widget-container) {
                display: none !important;
            }
            
            /* Стили для корректного отображения меню */
            .sns-welcome-widget-content * {
                box-sizing: border-box;
            }
            
            /* Мобильные устройства */
            @media screen and (max-width: 768px) {
                .sns-welcome-widget-container {
                    height: 100vh !important;
                    min-height: 100vh !important;
                    max-height: 100vh !important;
                }
                
                .sns-welcome-widget-content {
                    height: 100vh !important;
                    min-height: 100vh !important;
                    max-height: 100vh !important;
                }
                
                body.sns-widget-fullscreen {
                    position: fixed !important;
                    width: 100% !important;
                    height: 100% !important;
                }
            }
            
            /* Поддержка iPhone */
            @supports (-webkit-touch-callout: none) {
                .sns-welcome-widget-content {
                    -webkit-overflow-scrolling: touch;
                    overflow-y: scroll;
                }
            }
            
            /* Убираем любые ограничения по высоте от родительских элементов */
            html.sns-widget-active, 
            html.sns-widget-active body {
                height: 100% !important;
                max-height: none !important;
                overflow: hidden !important;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Создание HTML структуры виджета
    function createWidgetHTML() {
        return `
            <div class="sns-welcome-widget-container">
                <div class="sns-welcome-widget-loading">
                    <div class="sns-welcome-widget-spinner"></div>
                    <div>Загрузка Welcome курса...</div>
                </div>
                <div class="sns-welcome-widget-content" id="sns-widget-content"></div>
            </div>
        `;
    }

    // Функция для загрузки контента с сайта
    async function loadContent(container) {
        const loadingElement = container.querySelector('.sns-welcome-widget-loading');
        const contentElement = container.querySelector('.sns-welcome-widget-content');
        
        try {
            // Пытаемся загрузить контент с сайта
            const response = await fetch(`${WIDGET_CONFIG.baseUrl}?widget=true`, {
                method: 'GET',
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                },
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            
            // Вставляем загруженный HTML
            contentElement.innerHTML = html;
            
            // Обрабатываем скрипты в загруженном контенте
            const scripts = contentElement.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.head.appendChild(newScript);
            });
            
            // Скрываем индикатор загрузки
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            console.log('SNS Welcome Widget (без iframe) успешно загружен');
            
        } catch (error) {
            console.error('Ошибка загрузки контента:', error);
            
            // Fallback - используем iframe если прямая загрузка не работает
            contentElement.innerHTML = `
                <iframe 
                    src="${WIDGET_CONFIG.baseUrl}"
                    style="width: 100%; height: 100%; border: none; background: ${WIDGET_CONFIG.background};"
                    title="SNS Welcome Course"
                    allowfullscreen
                    allow="accelerometer; autoplay; camera; clipboard-read; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; magnetometer; microphone; midi; payment; picture-in-picture; publickey-credentials-get; screen-wake-lock; web-share; xr-spatial-tracking">
                </iframe>
            `;
            
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            console.log('Использован fallback с iframe');
        }
    }

    // Функция для полноэкранного режима
    function enableFullscreen() {
        document.documentElement.classList.add('sns-widget-active');
        document.body.classList.add('sns-widget-fullscreen');
        
        const originalOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;
        
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        window.SNSWelcomeWidget._originalOverflow = originalOverflow;
        window.SNSWelcomeWidget._originalHtmlOverflow = originalHtmlOverflow;
        
        // Настройка viewport для мобильных устройств
        let viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
            viewportMeta = document.createElement('meta');
            viewportMeta.name = 'viewport';
            document.head.appendChild(viewportMeta);
        }
        
        window.SNSWelcomeWidget._originalViewport = viewportMeta.content;
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    }

    // Инициализация виджета
    function initWidget() {
        const container = document.getElementById(WIDGET_CONFIG.containerId);
        
        if (!container) {
            console.error(`SNS Widget: Контейнер с ID "${WIDGET_CONFIG.containerId}" не найден`);
            return;
        }

        createWidgetStyles();
        enableFullscreen();
        
        container.innerHTML = createWidgetHTML();
        
        // Загружаем контент
        loadContent(container);
        
        // Предотвращаем закрытие по случайному клику
        container.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        console.log('SNS Welcome Widget (без iframe) инициализирован');
    }

    // Функция для восстановления оригинального состояния страницы
    function destroy() {
        document.documentElement.classList.remove('sns-widget-active');
        document.body.classList.remove('sns-widget-fullscreen');
        
        if (window.SNSWelcomeWidget._originalOverflow !== undefined) {
            document.body.style.overflow = window.SNSWelcomeWidget._originalOverflow;
        }
        
        if (window.SNSWelcomeWidget._originalHtmlOverflow !== undefined) {
            document.documentElement.style.overflow = window.SNSWelcomeWidget._originalHtmlOverflow;
        }
        
        if (window.SNSWelcomeWidget._originalViewport !== undefined) {
            const viewportMeta = document.querySelector('meta[name="viewport"]');
            if (viewportMeta) {
                viewportMeta.content = window.SNSWelcomeWidget._originalViewport;
            }
        }
        
        const container = document.getElementById(WIDGET_CONFIG.containerId);
        if (container) {
            container.innerHTML = '';
        }
        
        console.log('SNS Welcome Widget закрыт');
    }

    // Автоматическая инициализация при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }

    // Экспорт функций для ручного управления
    window.SNSWelcomeWidget = {
        init: initWidget,
        destroy: destroy,
        config: WIDGET_CONFIG
    };

})();
