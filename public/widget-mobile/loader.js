
/**
 * Загрузка контента для мобильных устройств
 */
import { WIDGET_CONFIG } from './config.js';

export async function loadContentForMobile(container) {
    const loadingElement = container.querySelector('.sns-welcome-widget-loading');
    const contentElement = container.querySelector('.sns-welcome-widget-content');
    const containerEl = container.querySelector('.sns-welcome-widget-container');
    
    console.log('Начинаем загрузку контента для мобильных устройств...');
    
    try {
        // Показываем индикатор загрузки
        if (loadingElement) {
            loadingElement.style.display = 'block';
        }
        
        // Попытка загрузки контента напрямую
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
        
        // Обработка HTML для мобильных устройств
        const processedContent = processMobileContent(html);
        
        if (processedContent) {
            contentElement.innerHTML = processedContent;
            console.log('Контент успешно вставлен в DOM');
            
            // Обрабатываем скрипты
            await processScripts(contentElement);
            
            // Обрабатываем стили
            processStyles(html);
            
        } else {
            throw new Error('Не удалось обработать контент');
        }
        
    } catch (error) {
        console.error('Ошибка загрузки контента:', error);
        console.log('Переключаемся на iframe fallback...');
        
        // Fallback на iframe с оптимизацией для мобильных
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
        // Скрываем индикатор загрузки
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
        
        // Показываем контент
        if (containerEl) {
            containerEl.classList.remove('loading');
            containerEl.classList.add('loaded');
        }
        
        console.log('Загрузка завершена');
    }
    
    // Таймаут для завершения загрузки
    setTimeout(finishLoading, WIDGET_CONFIG.loadingTimeout);
    
    // Если контент уже загружен, завершаем
    if (contentElement.innerHTML.trim()) {
        setTimeout(finishLoading, 1000);
    }
}

function processMobileContent(html) {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Получаем основной контент
        const body = doc.body;
        if (!body) {
            throw new Error('Не найден body в HTML');
        }
        
        // Удаляем ненужные элементы для мобильной версии
        const elementsToRemove = body.querySelectorAll('script[src*="analytics"], script[src*="gtag"], script[src*="facebook"], noscript, .hidden-mobile');
        elementsToRemove.forEach(el => el.remove());
        
        // Оптимизируем изображения для мобильных
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
                // Внешний скрипт
                newScript.src = script.src;
                newScript.async = true;
                newScript.defer = true;
            } else if (script.textContent && script.textContent.trim()) {
                // Встроенный скрипт
                newScript.textContent = script.textContent;
            } else {
                continue;
            }
            
            // Добавляем скрипт
            document.head.appendChild(newScript);
            console.log(`Скрипт ${i + 1} добавлен`);
            
            // Небольшая задержка между скриптами
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
        
        // Обрабатываем встроенные стили
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
        
        // Обрабатываем внешние стили
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
