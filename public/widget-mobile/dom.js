
/**
 * Работа с DOM и создание структуры виджета
 */
export function createWidgetHTML() {
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

export function setupMobileViewport() {
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        document.head.appendChild(viewportMeta);
    }
    
    // Сохраняем исходный viewport
    window.SNSWelcomeWidget._originalViewport = viewportMeta.content;
    
    // Устанавливаем оптимальный viewport для мобильных устройств
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content';
}

export function enableFullscreen() {
    document.documentElement.classList.add('sns-widget-active');
    document.body.classList.add('sns-widget-active');
    
    // Сохраняем исходные стили
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyPosition = document.body.style.position;
    
    // Применяем стили для полноэкранного режима
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.top = '0';
    document.body.style.left = '0';
    
    // Сохраняем для восстановления
    window.SNSWelcomeWidget._originalStyles = {
        bodyOverflow: originalBodyOverflow,
        htmlOverflow: originalHtmlOverflow,
        bodyPosition: originalBodyPosition
    };
    
    setupMobileViewport();
}

export function disableFullscreen() {
    document.documentElement.classList.remove('sns-widget-active');
    document.body.classList.remove('sns-widget-active');
    
    // Восстанавливаем исходные стили
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
    
    // Восстанавливаем viewport
    if (window.SNSWelcomeWidget._originalViewport) {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.content = window.SNSWelcomeWidget._originalViewport;
        }
    }
}
