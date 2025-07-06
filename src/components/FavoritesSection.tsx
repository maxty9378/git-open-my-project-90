import React, { useState, useEffect } from 'react';
import { Heart, NotebookPen, Save, Plus, Trash2, Copy, Check } from 'lucide-react';

interface FavoriteItem {
  id: string;
  time: string;
  activity: string;
  day: string;
  note?: string;
  timestamp: Date;
}

export const FavoritesSection: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const placeholderExamples = ['Классная презентация', 'Очень информативно', 'Супер спикер'];

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

  useEffect(() => {
    if (showPlaceholder && noteText === '') {
      const interval = setInterval(() => {
        setCurrentExampleIndex((prev) => (prev + 1) % placeholderExamples.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showPlaceholder, noteText, placeholderExamples.length]);

  const saveFavorites = (favoritesToSave: FavoriteItem[]) => {
    localStorage.setItem('sns-course-favorites', JSON.stringify(favoritesToSave));
  };

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const addNote = (favoriteId: string) => {
    const updatedFavorites = favorites.map(fav => 
      fav.id === favoriteId 
        ? { ...fav, note: noteText.trim() }
        : fav
    );
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
    setEditingNote(null);
    setNoteText('');
    setShowPlaceholder(true);
  };

  const startEditing = (favorite: FavoriteItem) => {
    setEditingNote(favorite.id);
    setNoteText(favorite.note || '');
    setShowPlaceholder(!favorite.note);
  };

  const cancelEditing = () => {
    setEditingNote(null);
    setNoteText('');
    setShowPlaceholder(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
    setShowPlaceholder(e.target.value === '');
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-[#111827] to-[#1f2937]">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-[#02a374]" />
          <h2 className="text-lg font-semibold text-gray-200">Вам понравилось:</h2>
        </div>

        <div className="space-y-3">
          {favorites.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Heart className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Избранного пока нет</p>
              <p className="text-xs">Лайкайте программы, чтобы не забыть понравившиеся</p>
            </div>
          ) : (
            favorites.map((favorite) => (
              <div key={favorite.id} className="glass-effect rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="time-container text-xs">
                        {favorite.time}
                      </div>
                      <span className="text-xs text-gray-400">{favorite.day}</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">{favorite.activity}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => copyToClipboard(favorite.activity, favorite.id)}
                      className="text-gray-400 hover:text-[#02a374] p-1 transition-colors"
                      title="Копировать в буфер обмена"
                    >
                      {copiedId === favorite.id ? (
                        <Check className="w-4 h-4 text-[#02a374]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => removeFavorite(favorite.id)}
                      className="text-red-400 hover:text-red-300 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {editingNote === favorite.id ? (
                  <div className="mt-3 p-3 bg-gray-800/50 rounded-lg relative">
                    <textarea
                      value={noteText}
                      onChange={handleTextChange}
                      placeholder="Добавьте заметку к этой программе..."
                      className="w-full bg-transparent text-gray-200 placeholder-gray-500 resize-none outline-none text-sm"
                      rows={3}
                      autoFocus
                    />
                    {showPlaceholder && noteText === '' && (
                      <div className="absolute top-12 left-6 text-xs text-gray-600 pointer-events-none">
                        <div className="transition-opacity duration-500">
                          "{placeholderExamples[currentExampleIndex]}"
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => addNote(favorite.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#02a374] text-white rounded text-xs hover:bg-[#028664] transition-colors"
                      >
                        <Save className="w-3 h-3" />
                        Сохранить
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-1.5 text-gray-400 rounded text-xs hover:text-gray-200 transition-colors"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3">
                    {favorite.note ? (
                      <div className="p-3 bg-gray-800/30 rounded-lg mb-2">
                        <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed break-words">{favorite.note}</p>
                      </div>
                    ) : null}
                    <button
                      onClick={() => startEditing(favorite)}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#02a374] transition-colors"
                    >
                      <NotebookPen className="w-3 h-3" />
                      {favorite.note ? 'Редактировать заметку' : 'Добавить заметку'}
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-700/30">
                  <span className="text-xs text-gray-500">
                    {favorite.timestamp.toLocaleDateString('ru-RU')} {favorite.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Spacer for bottom navigation */}
        <div className="h-20" />
      </div>
    </div>
  );
};
