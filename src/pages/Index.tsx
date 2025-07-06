import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Building2, Globe, Smartphone, Mail, Database, Layout, Info, ArrowLeft, ChevronLeft, ChevronRight, MessageCircle, Heart, Sparkles, ChevronDown } from 'lucide-react';
import { NotificationBanner } from '../components/NotificationBanner';
import { DayProgress } from '../components/DayProgress';
import { FavoritesSection } from '../components/FavoritesSection';
import { ModeratorCard } from '../components/ModeratorCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

interface DaySchedule {
  day: string;
  schedule: Array<{ time: string; activity: string; isBreak?: boolean }>;
}

interface InfoSection {
  icon: React.ReactNode;
  title: string;
  content: {
    description: string;
    images: string[];
  };
}

interface FavoriteItem {
  id: string;
  time: string;
  activity: string;
  day: string;
  note?: string;
  timestamp: Date;
}

type Page = 'schedule' | 'info' | 'feedback' | 'favorites';

const Index = () => {
  const today = new Date().getDay();
  const initialDay = today === 1 ? 0 : today === 2 ? 1 : 0;
  const [currentDay, setCurrentDay] = useState<number>(initialDay);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('schedule');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const scheduleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('sns-course-favorites');
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        setFavorites(parsed.map((fav: any) => ({
          ...fav,
          timestamp: new Date(fav.timestamp)
        })));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  const saveFavorites = (favoritesToSave: FavoriteItem[]) => {
    localStorage.setItem('sns-course-favorites', JSON.stringify(favoritesToSave));
    setFavorites(favoritesToSave);
  };

  const toggleFavorite = (item: { time: string; activity: string }, dayName: string) => {
    const itemId = `${dayName}-${item.time}-${item.activity}`;
    const existingFavorite = favorites.find(fav => fav.id === itemId);
    
    if (existingFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== itemId);
      saveFavorites(updatedFavorites);
    } else {
      const newFavorite: FavoriteItem = {
        id: itemId,
        time: item.time,
        activity: item.activity,
        day: dayName,
        timestamp: new Date()
      };
      const updatedFavorites = [newFavorite, ...favorites];
      saveFavorites(updatedFavorites);
    }
  };

  const isFavorite = (item: { time: string; activity: string }, dayName: string) => {
    const itemId = `${dayName}-${item.time}-${item.activity}`;
    return favorites.some(fav => fav.id === itemId);
  };

  const schedule: DaySchedule[] = [
    {
      day: "Понедельник",
      schedule: [
        { time: "09:00 – 10:10", activity: "Презентация ГК «СНС»: структура, задачи и функции основных подразделений" },
        { time: "10:10 – 10:25", activity: "Перерыв", isBreak: true },
        { time: "10:25 – 11:10", activity: "Роль ДОиРП в ГК: особенности обучения и развития персонала" },
        { time: "11:10 – 11:45", activity: "Роль ДРПиК: организация работы с персоналом в ГК" },
        { time: "11:45 – 12:15", activity: "Performance management и адаптация сотрудников филиалов" },
        { time: "12:15 – 12:30", activity: "Перерыв", isBreak: true },
        { time: "12:30 – 13:30", activity: "Роль ДТМД в бизнесе ГК. Специфика работы СПП" },
        { time: "13:30 – 14:00", activity: "Особенности работы с розничными ключевыми клиентами (РКК)" },
        { time: "14:00 – 15:00", activity: "Обед", isBreak: true },
        { time: "15:00 – 15:30", activity: "Роль ЮД в бизнесе ГК" },
        { time: "15:30 – 16:30", activity: "Роль СНКТ в бизнесе ГК" },
        { time: "16:30 – 16:45", activity: "Перерыв", isBreak: true },
        { time: "16:45 – 17:40", activity: "Роль BLC в бизнесе ГК" },
        { time: "17:40 – 18:00", activity: "Подведение итогов дня «3 интересных факта»" }
      ]
    },
    {
      day: "Вторник",
      schedule: [
        { time: "09:00 – 09:15", activity: "Практическое упражнение «Сонастройка»" },
        { time: "09:15 – 09:45", activity: "Роль ДИТ в бизнесе ГК" },
        { time: "09:45 – 10:15", activity: "Задачи и работа программы Requests" },
        { time: "10:15 – 10:30", activity: "Перерыв", isBreak: true },
        { time: "10:30 – 11:20", activity: "SAP R3, АСУМТ: знакомство с ПО и структурой поддержки пользователей HD ERP" },
        { time: "11:20 – 11:45", activity: "Роль ДФ в бизнесе ГК" },
        { time: "11:45 – 12:00", activity: "Перерыв", isBreak: true },
        { time: "12:00 – 13:00", activity: "Направление «Коммуникации»: особенности корпоративной культуры и брендбука ГК" },
        { time: "13:00 – 14:00", activity: "Обед", isBreak: true },
        { time: "14:00 – 15:30", activity: "Роль ДБ в бизнесе ГК" },
        { time: "15:30 – 15:45", activity: "Перерыв", isBreak: true },
        { time: "15:45 – 16:40", activity: "Роль GFD RUS в бизнесе ГК" },
        { time: "16:40 – 17:30", activity: "Особенности продвижения продукции GFD RUS" },
        { time: "17:30 – 18:00", activity: "Подведение итогов дня «Схема взаимодействия в ГК», заполнение АОС" }
      ]
    }
  ];

  const infoSections: InfoSection[] = [
    {
      icon: <Info className="w-6 h-6" />,
      title: "Миссия и кодекс ГК",
      content: {
        description: `<div class="space-y-3">
          <p><strong>Миссия и кодекс Компании</strong></p>
          <p>Быть безоговорочным лидером в области дистрибуции товаров FMCG в странах СНГ, предоставляя клиентам высококачественные товары и идеальный сервис, действуя в интересах общества и потребителей, сотрудников и акционеров.</p>
        </div>`,
        images: []
      }
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Инфраструктура главного офиса УК",
      content: {
        description: `<div class="space-y-3">
          <p><strong>В Компании современное благоустроенное офисное пространство, включающее:</strong></p>
          <ul class="space-y-1">
            <li>кофе-поинт (чай/кофе, лимон, молоко, сахар)</li>
            <li>курительную комнату</li>
            <li>3 переговорные комнаты</li>
            <li>предметы искусства</li>
          </ul>
        </div>`,
        images: [
          "https://static.tildacdn.com/tild3332-3438-4538-b034-306432666362/697a5ef1f085bf93276f.jpg",
          "https://sns.ru/upload/resize_cache/iblock/e15/1920_1000_075511db9cefbc414a902a46f1b8fae16/izwdg16zakei4u7nz6cuunr3akbsprs5.png",
          "https://sns.ru/upload/resize_cache/iblock/43a/1190_460_175511db9cefbc414a902a46f1b8fae16/43ad958fda881f6a8fc8c2f19fcb8af1.png",
          "https://sns.ru/upload/resize_cache/iblock/4c4/1504_600_175511db9cefbc414a902a46f1b8fae16/ad5muqgoskylzk1r0to8criw6lijednb.jpg"
        ]
      }
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Внешний сайт",
      content: {
        description: `<div class="space-y-3">
          <p><strong><a href="https://sns.ru" target="_blank" rel="noopener noreferrer" class="text-white hover:text-gray-300 hover:underline">Официальный сайт SNS.RU</a> содержит:</strong></p>
          <ul class="space-y-1">
            <li>историю Компании</li>
            <li>информацию о наградах и благотворительности</li>
            <li>актуальные новости</li>
            <li>направления бизнеса</li>
            <li>раздел с вакансиями</li>
          </ul>
        </div>`,
        images: [
          "https://static.tildacdn.com/tild3936-3938-4033-b964-623739386332/OQPWCW1.jpg"
        ]
      }
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Мобильное приложение SNS",
      content: {
        description: `<div class="space-y-3">
          <p><strong>Корпоративное приложение</strong> с функциями:</p>
          <ul class="space-y-1">
            <li>новостная лента</li>
            <li>поиск сотрудников</li>
            <li>службы обратной связи</li>
            <li>уведомления о днях рождения сотрудников</li>
          </ul>
        </div>`,
        images: [
          "https://static.tildacdn.com/tild3132-3931-4231-b236-376265356166/cbcf9702-ee6f-4f80-8.jpg"
        ]
      }
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Электронная почта",
      content: {
        description: `<div class="space-y-3">
          <p><strong>Ваш корпоративный электронный почтовый адрес состоит из вашего имени и фамилии, написанных в английской транскрипции и разделенных точкой, и почтового домена.</strong></p>
          
          <div>
            <p><strong>Формат адреса:</strong></p>
            <ul class="space-y-1 mt-2">
              <li>Имя.Фамилия@sns.ru (для УК)</li>
              <li>Имя.Фамилия@[филиал].sns.ru</li>
            </ul>
          </div>
          
          <p><strong>Пример:</strong> Ivan.Ivanov@ivanovo.sns.ru</p>
          
          <p>Доступ через Outlook с интеграцией календаря и задач.</p>
        </div>`,
        images: []
      }
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "SAP",
      content: {
        description: `<div class="space-y-3">
          <p><strong>SAP – основной инструмент для HR-процессов и финансовой отчетности.</strong></p>
          
          <ul class="space-y-1">
            <li>Логин для входа в SAP - ваш идентификатор в SAP (SAP HR ID)</li>
            <li>Стандартный пароль необходимо сменить при первом входе</li>
            <li>Поддержка через HelpDesk</li>
          </ul>
        </div>`,
        images: [
          "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iM08a2KeAo7w/v1/-1x-1.jpg"
        ]
      }
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Корпоративный портал",
      content: {
        description: `<div class="space-y-3">
          <p><strong>На корпоративном портале можно узнать:</strong></p>
          <ul class="space-y-1">
            <li>направления бизнеса по брендам</li>
            <li>нормативные документы (правила, положения, бланки)</li>
            <li>справочник (структуру ГК, справочник аббревиатур)</li>
            <li>систему заявок (отпуска, IT-запросы)</li>
            <li>базу знаний и систему отчетности</li>
          </ul>
        </div>`,
        images: [
          "https://static.tildacdn.com/tild3435-3035-4333-b865-623566633235/1.png"
        ]
      }
    },
    {
      icon: <Info className="w-6 h-6" />,
      title: "Сайт Департамента обучения и развития персонала",
      content: {
        description: `<div class="space-y-3">
          <p><strong>Обучение и развитие сотрудников Компании носит системный характер и индивидуальную настройку на конкретную категорию.</strong></p>
          
          <p>Мероприятия по обучению или развитию сотрудников, а также выбор формы, методов, инструментов формируются исходя из конкретной ситуации, бизнес-проблемы.</p>
          
          <div>
            <p><strong>Сотрудник может проходить обучение многогранно:</strong></p>
            <ul class="space-y-1 mt-2">
              <li>очно</li>
              <li>дистанционно</li>
              <li>в полях</li>
              <li>на работе</li>
              <li>индивидуально</li>
            </ul>
          </div>
          
          <p>Полная информация на сайте обучения департамента обучения и развития персонала.</p>
        </div>`,
        images: [
          "https://static.tildacdn.com/tild3765-6533-4161-b936-323639303434/_15.jpg"
        ]
      }
    }
  ];

  const nextDay = () => {
    setCurrentDay((prev) => (prev + 1) % schedule.length);
  };

  const prevDay = () => {
    setCurrentDay((prev) => (prev - 1 + schedule.length) % schedule.length);
  };

  const isCurrentActivity = (timeRange: string) => {
    const [start, end] = timeRange.split(' – ');
    const now = currentTime;
    const parseTime = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      const date = new Date(now);
      date.setHours(hours, minutes, 0, 0);
      return date;
    };
    const startTime = parseTime(start);
    const endTime = parseTime(end);
    return now >= startTime && now <= endTime;
  };

  const getCurrentActivity = () => {
    const currentSchedule = schedule[currentDay]?.schedule;
    if (!currentSchedule) return null;

    const current = currentSchedule.find(item => 
      !item.isBreak && isCurrentActivity(item.time)
    );

    if (current) {
      const currentIndex = currentSchedule.indexOf(current);
      const nextItem = currentSchedule[currentIndex + 1];
      return {
        time: current.time,
        activity: current.activity,
        nextActivity: nextItem ? nextItem.activity : undefined
      };
    }
    return null;
  };

  const renderScheduleItem = (item: { time: string; activity: string; isBreak?: boolean }, index: number) => (
    <div
      key={index}
      className={`glass-effect flex items-center p-3 rounded-lg mb-2 ${
        item.isBreak
          ? 'bg-gray-800/50 border-gray-600/30'
          : isCurrentActivity(item.time)
          ? 'bg-[#02a374]/20 border-[#02a374]'
          : 'active:bg-[#1f2937]'
      } slide-in`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className={`time-container ${item.isBreak ? 'break-time' : ''}`}>
        {item.time}
      </div>
      <span className="flex-1 text-sm leading-tight text-gray-300 px-3">
        {item.activity}
      </span>
      {!item.isBreak && (
        <button
          onClick={() => toggleFavorite(item, schedule[currentDay].day)}
          className={`p-2 transition-colors rounded-full ${
            isFavorite(item, schedule[currentDay].day)
              ? 'text-red-500 hover:text-red-400'
              : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart 
            className={`w-4 h-4 ${
              isFavorite(item, schedule[currentDay].day) ? 'fill-current' : ''
            }`} 
          />
        </button>
      )}
      {isCurrentActivity(item.time) && !item.isBreak && (today === 1 || today === 2) && (
        <span className="text-xs text-[#02a374] font-medium ml-2">Сейчас</span>
      )}
    </div>
  );

  const renderSchedule = () => (
    <div className="flex flex-col h-full bg-[#111827]">
      <div className="sticky top-0 z-10 bg-[#1f2937] border-b border-gray-700/50">
        <div className="flex items-center justify-between px-3 py-2">
          <button
            onClick={prevDay}
            className="p-1.5 text-gray-400 active:bg-gray-700 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-semibold text-gray-100">
            {schedule[currentDay].day}
          </h2>
          <button
            onClick={nextDay}
            className="p-1.5 text-gray-400 active:bg-gray-700 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <DayProgress 
          schedule={schedule[currentDay]?.schedule || []} 
          currentTime={currentTime} 
        />
      </div>

      <NotificationBanner currentActivity={getCurrentActivity()} />

      <div 
        ref={scheduleContainerRef}
        className="flex-1 overflow-y-auto bg-gradient-to-b from-[#111827] to-[#1f2937] px-3 py-2"
      >
        {schedule[currentDay]?.schedule.map(renderScheduleItem)}
        {/* Spacer for bottom navigation */}
        <div className="h-20" />
      </div>
    </div>
  );

  const renderInfoSections = () => (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-[#111827] to-[#1f2937]">
      <div className="p-4 space-y-4">
        <div className="glass-effect rounded-xl p-4 border border-gray-700/30">
          <Accordion type="single" collapsible className="w-full">
            {infoSections.map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-700/30">
                <AccordionTrigger className="hover:no-underline group hover:bg-gray-800/50 rounded-lg px-3 transition-colors">
                  <div className="flex items-center gap-3 w-full">
                    <div className="text-[#02a374] bg-[#02a374]/10 p-2 rounded-lg">
                      {section.icon}
                    </div>
                    <span className="font-medium text-white text-sm flex-1 text-left">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="pl-11 space-y-6">
                    <div className="info-content" dangerouslySetInnerHTML={{ __html: section.content.description }} />
                    
                    {section.content.images.length > 0 && (
                      <div className="grid gap-4">
                        {section.content.images.map((image, imageIndex) => (
                          <div 
                            key={imageIndex} 
                            className="rounded-lg overflow-hidden shadow-lg bg-gray-800/50"
                          >
                            <img 
                              src={image} 
                              alt={`${section.title} - изображение ${imageIndex + 1}`}
                              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Spacer for bottom navigation */}
        <div className="h-20" />
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#111827] to-[#1f2937]">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="max-w-md w-full glass-effect rounded-2xl p-6 text-center border border-gray-700/30">
            <MessageCircle className="w-12 h-12 mx-auto text-[#02a374] mb-4" />
            <h2 className="text-lg font-bold text-gray-100 mb-2">Обратная связь</h2>
            <p className="text-gray-400 mb-6 text-sm">
              Поделитесь своими впечатлениями о двух днях Welcome курса, оцените программу и оставьте пожелания для улучшения
            </p>
            <a 
              href="https://education.sns.ru/welcomeanswer" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#02a374] hover:bg-[#028664] text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
            >
              Перейти к анкете
            </a>
          </div>
          
          <ModeratorCard />
          
          {/* Spacer for bottom navigation */}
          <div className="h-20" />
        </div>
      </div>
    </div>
  );

  if (selectedSection !== null) {
    const section = infoSections[selectedSection];
    return (
      <div className="h-full flex flex-col bg-[#111827]">
        <header className="bg-[#1f2937] text-white py-4 px-4 flex items-center gap-4 border-b border-gray-700">
          <button 
            onClick={() => setSelectedSection(null)}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-base font-medium">{section.title}</h1>
        </header>

        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#111827] to-[#1f2937]">
          <div className="p-4 space-y-6">
            <div className="glass-effect rounded-2xl p-6">
              <div className="info-content" dangerouslySetInnerHTML={{ __html: section.content.description }} />
            </div>

            <div className="grid gap-4">
              {section.content.images.map((image, index) => (
                <div 
                  key={index} 
                  className="rounded-2xl overflow-hidden shadow-lg"
                >
                  <img 
                    src={image} 
                    alt={`${section.title} - изображение ${index + 1}`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            
            {/* Spacer for bottom navigation */}
            <div className="h-20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#111827] mobile-app">
      <header className="bg-gradient-to-r from-[#1f2937] to-[#111827] text-white py-3 px-4 border-b border-gray-700/50 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#02a374]/20 rounded-lg">
              <Calendar className="w-5 h-5 text-[#02a374]" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Welcome курс</h1>
              <p className="text-xs text-gray-400">ГК «СНС»</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-[#02a374]" />
            <span className="text-xs text-gray-400">2025</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {currentPage === 'schedule' ? renderSchedule() : 
         currentPage === 'info' ? renderInfoSections() : 
         currentPage === 'favorites' ? <FavoritesSection /> :
         renderFeedback()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1f2937]/95 backdrop-blur-md border-t border-gray-700/50 shadow-2xl">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <button
            onClick={() => setCurrentPage('schedule')}
            className={`flex flex-col items-center justify-center w-1/4 h-full transition-all duration-200 ${
              currentPage === 'schedule' ? 'text-[#02a374] scale-105' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Calendar className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Программа</span>
          </button>
          <button
            onClick={() => setCurrentPage('info')}
            className={`flex flex-col items-center justify-center w-1/4 h-full transition-all duration-200 ${
              currentPage === 'info' ? 'text-[#02a374] scale-105' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Info className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Информация</span>
          </button>
          <button
            onClick={() => setCurrentPage('favorites')}
            className={`flex flex-col items-center justify-center w-1/4 h-full transition-all duration-200 ${
              currentPage === 'favorites' ? 'text-[#02a374] scale-105' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Heart className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Избранное</span>
          </button>
          <button
            onClick={() => setCurrentPage('feedback')}
            className={`flex flex-col items-center justify-center w-1/4 h-full transition-all duration-200 ${
              currentPage === 'feedback' ? 'text-[#02a374] scale-105' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Mail className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Обратная связь</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
