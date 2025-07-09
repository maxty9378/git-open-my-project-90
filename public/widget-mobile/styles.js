
/**
 * Создание стилей для виджета с улучшенной поддержкой мобильных устройств
 */
import { WIDGET_CONFIG } from './config.js';

export function createMobileOptimizedStyles() {
    const styles = `
        .sns-welcome-widget-container {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            height: 100dvh !important; /* Динамическая высота для мобильных */
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
        
        /* Принудительное скрытие всех элементов страницы */
        body.sns-widget-active > *:not(.sns-welcome-widget-container) {
            display: none !important;
            visibility: hidden !important;
        }
        
        /* Мобильные стили */
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
        
        /* Стили контента для корректного отображения */
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
        
        /* Специальные стили для iPhone */
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
        
        /* Дополнительные стили для Samsung Internet и других мобильных браузеров */
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
        
        /* Убираем системную полосу прокрутки */
        .sns-welcome-widget-content::-webkit-scrollbar {
            width: 0px !important;
            background: transparent !important;
        }
        
        /* Анимации для плавного появления */
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
