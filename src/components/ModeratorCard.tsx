
import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

export const ModeratorCard: React.FC = () => {
  return (
    <div className="glass-effect rounded-xl p-6 mb-4 border border-[#02a374]/20 bg-gradient-to-br from-gray-800/40 to-gray-900/60">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#02a374]/40 shadow-lg">
            <img 
              src="https://static.tildacdn.com/tild3761-3765-4732-a365-316563313161/_.jpg" 
              alt="Марина Котикова"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#02a374] rounded-full flex items-center justify-center border-2 border-gray-900">
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2">
            <h3 className="font-medium text-gray-200 text-sm mb-1">Модератор программы</h3>
            <p className="text-[#02a374] font-bold text-lg">Марина Котикова</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800/30 rounded-lg p-3 space-y-3">
        <div>
          <div className="space-y-1 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#02a374]"></div>
              <span className="font-medium text-gray-300">Бизнес-тренер</span>
            </div>
            <p>Магистр психологии (МИП)</p>
            <p>Коуч, нейропсихолог с опытом работы более 6 лет</p>
            <p>Специалист по построению профессиональной коммуникации</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700/30 pt-3">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-[#02a374]" />
            <span className="text-sm font-medium text-gray-300">Почта</span>
          </div>
          <div className="text-sm text-gray-400">
            <a 
              href="mailto:Marina.Kotikova@sns.ru" 
              className="text-[#02a374] hover:text-[#028664] transition-colors"
            >
              Marina.Kotikova@sns.ru
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
