
(function() {
    'use strict';
    
    // Конфигурация виджета
    const WIDGET_CONFIG = {
        baseUrl: 'https://sns-welcome.vercel.app',
        containerId: 'sns-welcome-widget',
        minHeight: '600px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        background: '#111827'
    };

    // Создание стилей для виджета
    function createWidgetStyles() {
        const styles = `
            .sns-welcome-widget-container {
                width: 100%;
                max-width: 400px;
                margin: 0 auto;
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
            
            @media (max-width: 768px) {
                .sns-welcome-widget-container {
                    max-width: 100%;
                    border-radius: 0;
                    box-shadow: none;
                }
                
                .sns-welcome-widget-iframe {
                    border-radius: 0;
                    min-height: 100vh;
                }
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
                    loading="lazy">
                </iframe>
            </div>
        `;
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
        
        // Вставить HTML
        container.innerHTML = createWidgetHTML();
        
        // Обработка загрузки iframe
        const iframe = container.querySelector('.sns-welcome-widget-iframe');
        const loading = container.querySelector('.sns-welcome-widget-loading');
        
        iframe.addEventListener('load', function() {
            if (loading) {
                loading.style.display = 'none';
            }
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

        console.log('SNS Welcome Widget успешно инициализирован');
    }

    // Автоматическая инициализация при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }

    // Экспорт функции инициализации для ручного вызова
    window.SNSWelcomeWidget = {
        init: initWidget,
        config: WIDGET_CONFIG
    };

})();
