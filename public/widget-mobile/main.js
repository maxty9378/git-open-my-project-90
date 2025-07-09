
/**
 * Основной модуль виджета для мобильных устройств
 */
import { WIDGET_CONFIG } from './config.js';
import { createMobileOptimizedStyles } from './styles.js';
import { createWidgetHTML, enableFullscreen, disableFullscreen } from './dom.js';
import { loadContentForMobile } from './loader.js';

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
        
        // Находим контейнер
        this.container = document.getElementById(WIDGET_CONFIG.containerId);
        if (!this.container) {
            console.error(`Контейнер с ID "${WIDGET_CONFIG.containerId}" не найден`);
            return;
        }
        
        try {
            // Создаем стили
            createMobileOptimizedStyles();
            
            // Включаем полноэкранный режим
            enableFullscreen();
            
            // Создаем HTML структуру
            this.container.innerHTML = createWidgetHTML();
            
            // Загружаем контент
            await loadContentForMobile(this.container);
            
            // Добавляем обработчики событий
            this.setupEventListeners();
            
            this.initialized = true;
            console.log('Мобильный виджет успешно инициализирован');
            
        } catch (error) {
            console.error('Ошибка инициализации виджета:', error);
        }
    }
    
    setupEventListeners() {
        // Предотвращаем закрытие по случайному клику
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
    }
    
    adjustForOrientation() {
        if (!this.container) return;
        
        const containerEl = this.container.querySelector('.sns-welcome-widget-container');
        const contentEl = this.container.querySelector('.sns-welcome-widget-content');
        
        if (containerEl && contentEl) {
            // Пересчитываем высоту для новой ориентации
            containerEl.style.height = '100vh';
            containerEl.style.height = '100dvh';
            contentEl.style.height = '100%';
            
            console.log('Виджет адаптирован под новую ориентацию');
        }
    }
    
    destroy() {
        if (!this.initialized) return;
        
        console.log('Закрытие мобильного виджета...');
        
        // Отключаем полноэкранный режим
        disableFullscreen();
        
        // Очищаем контейнер
        if (this.container) {
            this.container.innerHTML = '';
        }
        
        // Удаляем стили
        const styleElement = document.getElementById('sns-widget-styles');
        if (styleElement) {
            styleElement.remove();
        }
        
        // Удаляем добавленные стили контента
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
    
    // Экспорт для ручного управления
    window.SNSWelcomeWidget = {
        init: () => widget.init(),
        destroy: () => widget.destroy(),
        config: WIDGET_CONFIG,
        widget: widget
    };
}

// Запуск
autoInit();
