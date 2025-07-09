# 🎯 Интеграция SNS Welcome Widget в Tilda

## 📱 Особенности мобильной версии

Виджет специально оптимизирован для корректной работы на мобильных устройствах, включая iPhone. Основные улучшения:

- ✅ Полноэкранный режим на всех устройствах
- ✅ Корректное отображение нижнего меню на iPhone
- ✅ Поддержка viewport-fit=cover для iPhone X и новее
- ✅ Оптимизация для iOS Safari
- ✅ Адаптация под поворот экрана

## 🚀 Быстрая интеграция

### Шаг 1: Добавьте HTML блок в Tilda
1. Откройте редактор страницы в Tilda
2. Нажмите "Добавить блок"
3. Выберите "Другое → HTML" или найдите блок "HTML"

### Шаг 2: Вставьте код виджета

```html
<!-- Контейнер для виджета -->
<div id="sns-welcome-widget"></div>

<!-- Кнопка запуска -->
<button onclick="SNSTildaWidget.init()" 
        style="background: #02a374; color: white; border: none; 
               padding: 15px 30px; border-radius: 8px; cursor: pointer; 
               font-size: 16px; font-weight: 600;">
    🎓 Открыть Welcome курс
</button>

<!-- Скрипт виджета -->
<script src="https://charming-salmiakki-34396f.netlify.app/widget-tilda.min.js"></script>
```

### Шаг 3: Сохраните и опубликуйте
1. Нажмите "Сохранить"
2. Нажмите "Опубликовать страницу"

## 🎨 Варианты кнопок запуска

### Стандартная кнопка
```html
<button onclick="SNSTildaWidget.init()" 
        style="background: #02a374; color: white; border: none; 
               padding: 15px 30px; border-radius: 8px; cursor: pointer; 
               font-size: 16px; font-weight: 600;">
    🎓 Открыть Welcome курс
</button>
```

### Градиентная кнопка
```html
<button onclick="SNSTildaWidget.init()" 
        style="background: linear-gradient(135deg, #02a374, #028664); 
               color: white; border: none; padding: 20px 40px; 
               border-radius: 12px; cursor: pointer; font-size: 18px; 
               font-weight: 700; box-shadow: 0 4px 15px rgba(2, 163, 116, 0.3);
               transition: all 0.2s ease;">
    🎓 Начать Welcome курс ГК «СНС»
</button>
```

### Автоматический запуск
```html
<!-- Контейнер для виджета -->
<div id="sns-welcome-widget"></div>

<!-- Скрипт с автозапуском -->
<script src="https://charming-salmiakki-34396f.netlify.app/widget-tilda.min.js"></script>
<script>
// Автоматический запуск через 1 секунду после загрузки
setTimeout(() => {
    SNSTildaWidget.init();
}, 1000);
</script>
```

## 🔧 API виджета

### Методы
- `SNSTildaWidget.init()` - Запуск виджета
- `SNSTildaWidget.close()` - Закрытие виджета

### Конфигурация
```javascript
SNSTildaWidget.config = {
    baseUrl: window.location.origin,
    containerId: 'sns-welcome-widget',
    background: '#111827',
    loadingTimeout: 10000
};
```

## 📱 Мобильные особенности

### iPhone оптимизация
- Использование `-webkit-fill-available` для корректной высоты
- Поддержка `viewport-fit=cover` для iPhone X+
- Оптимизация для iOS Safari
- Корректное отображение нижнего меню

### Android оптимизация
- Поддержка `100dvh` для динамической высоты
- Адаптация под различные браузеры
- Оптимизация touch-событий

## 🎯 Технические характеристики

- **Размер:** ~4KB (минифицированная версия)
- **Зависимости:** Нет внешних зависимостей
- **Время загрузки:** ~300ms
- **Поддержка HTTPS:** Да
- **Кроссбраузерность:** Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

## 🔒 Безопасность

- Все запросы выполняются через HTTPS
- Использование sandbox для iframe
- Соответствие стандартам безопасности
- Нет сбора персональных данных

## 🆘 Устранение неполадок

### Виджет не запускается
1. Проверьте консоль браузера (F12)
2. Убедитесь, что контейнер `sns-welcome-widget` существует
3. Проверьте подключение к интернету

### Проблемы на iPhone
1. Убедитесь, что используете последнюю версию скрипта
2. Проверьте настройки viewport на странице
3. Очистите кэш браузера

### Виджет не закрывается
1. Нажмите кнопку "×" в правом верхнем углу
2. Используйте клавишу Escape
3. Обновите страницу

## 📞 Поддержка

При возникновении проблем:
1. Проверьте демо: https://sns-welcome.vercel.app/tilda-demo.html
2. Проверьте консоль браузера на ошибки
3. Убедитесь в правильности интеграции кода

## 📈 Changelog

### v3.0 (Текущая версия)
- ✅ Полная поддержка iPhone и мобильных устройств
- ✅ Корректное отображение меню на всех устройствах
- ✅ Оптимизация для Tilda
- ✅ Улучшенная производительность
- ✅ Кнопка закрытия виджета
- ✅ Поддержка клавиши Escape

### v2.0
- Базовая мобильная поддержка
- Iframe интеграция

### v1.0
- Первый релиз
- Только десктопная версия