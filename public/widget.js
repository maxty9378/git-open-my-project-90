
(function() {
    'use strict';
    
    // Конфигурация виджета
    const WIDGET_CONFIG = {
        baseUrl: 'https://sns-welcome.vercel.app',
        containerId: 'sns-welcome-widget',
        minHeight: '100vh',
        borderRadius: '0px',
        boxShadow: 'none',
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
                border-radius: ${WIDGET_CONFIG.borderRadius};
                box-shadow: ${WIDGET_CONFIG.boxShadow};
                overflow: hidden;
                position: relative;
                min-height: ${WIDGET_CONFIG.minHeight};
            }
            
            .sns-welcome-widget-iframe {
                width: 100%;
                height: 100%;
                min-height: ${WIDGET_CONFIG.minHeight};
                border: none;
                border-radius: ${WIDGET_CONFIG.borderRadius};
                background: ${WIDGET_CONFIG.background};
                display: block;
                position: relative;
                z-index: 1;
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
            
            body.sns-widget-fullscreen .sns-welcome-widget-iframe {
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
            
            /* Обеспечиваем корректное отображение на всех устройствах */
            @media screen and (max-width: 768px) {
                .sns-welcome-widget-container {
                    height: 100vh !important;
                    min-height: 100vh !important;
                    max-height: 100vh !important;
                }
                
                .sns-welcome-widget-iframe {
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
            
            @media screen and (max-height: 600px) {
                .sns-welcome-widget-container {
                    height: 100vh !important;
                    min-height: 100vh !important;
                }
                
                .sns-welcome-widget-iframe {
                    height: 100vh !important;
                    min-height: 100vh !important;
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
                <iframe 
                    class="sns-welcome-widget-iframe"
                    src="${WIDGET_CONFIG.baseUrl}"
                    title="SNS Welcome Course"
                    frameborder="0"
                    allowfullscreen
                    allow="accelerometer; autoplay; camera; clipboard-read; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; magnetometer; microphone; midi; payment; picture-in-picture; publickey-credentials-get; screen-wake-lock; web-share; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
                    loading="eager"
                    referrerpolicy="strict-origin-when-cross-origin">
                </iframe>
            </div>
        `;
    }

    // Функция для полноэкранного режима
    function enableFullscreen() {
        // Добавляем класс к html для полного контроля
        document.documentElement.classList.add('sns-widget-active');
        document.body.classList.add('sns-widget-fullscreen');
        
        // Скрываем скроллбары страницы
        const originalOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;
        
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        // Сохраняем оригинальное состояние для возможного восстановления
        window.SNSWelcomeWidget._originalOverflow = originalOverflow;
        window.SNSWelcomeWidget._originalHtmlOverflow = originalHtmlOverflow;
        
        // Принудительно устанавливаем viewport для мобильных устройств
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
        // Найти контейнер для виджета
        const container = document.getElementById(WIDGET_CONFIG.containerId);
        
        if (!container) {
            console.error(`SNS Widget: Контейнер с ID "${WIDGET_CONFIG.containerId}" не найден`);
            return;
        }

        // Создать стили
        createWidgetStyles();
        
        // Всегда включаем полноэкранный режим для корректного отображения меню
        enableFullscreen();
        
        // Вставить HTML
        container.innerHTML = createWidgetHTML();
        
        // Обработка загрузки iframe
        const iframe = container.querySelector('.sns-welcome-widget-iframe');
        const loading = container.querySelector('.sns-welcome-widget-loading');
        
        iframe.addEventListener('load', function() {
            if (loading) {
                loading.style.display = 'none';
            }
            
            // Дополнительные настройки после загрузки
            try {
                // Попытка настроить iframe для лучшего отображения меню
                iframe.style.pointerEvents = 'auto';
                iframe.style.touchAction = 'auto';
            } catch (e) {
                console.log('Некоторые настройки iframe недоступны:', e);
            }
            
            console.log('SNS Welcome Widget успешно загружен');
        });

        // Обработка ошибок загрузки
        iframe.addEventListener('error', function() {
            if (loading) {
                loading.innerHTML = `
                    <div style="text-align: center; color: #ef4444;">
                        <div style="font-size: 20px; margin-bottom: 10px;">⚠️</div>
                        <div>Ошибка загрузки виджета</div>
                        <div style="font-size: 12px; margin-top: 5px; opacity: 0.7;">
                            Проверьте подключение к интернету
                        </div>
                    </div>
                `;
            }
        });

        // Предотвращаем закрытие по случайному клику
        container.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        console.log('SNS Welcome Widget инициализирован в полноэкранном режиме');
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
        
        // Восстанавливаем viewport
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
