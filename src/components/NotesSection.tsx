
import React, { useState, useEffect } from 'react';
import { NotebookPen, Save, Plus } from 'lucide-react';

interface Note {
  id: string;
  text: string;
  timestamp: Date;
}

export const NotesSection: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem('sns-course-notes');
    if (savedNotes) {
      try {
        const parsed = JSON.parse(savedNotes);
        setNotes(parsed.map((note: any) => ({
          ...note,
          timestamp: new Date(note.timestamp)
        })));
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    }
  }, []);

  const saveNotes = (notesToSave: Note[]) => {
    localStorage.setItem('sns-course-notes', JSON.stringify(notesToSave));
  };

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        text: newNote.trim(),
        timestamp: new Date()
      };
      const updatedNotes = [note, ...notes];
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-[#111827] to-[#1f2937]">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <NotebookPen className="w-5 h-5 text-[#02a374]" />
            <h2 className="text-lg font-semibold text-gray-200">Мои заметки</h2>
          </div>
          <button
            onClick={() => setIsAddingNote(true)}
            className="p-2 bg-[#02a374] text-white rounded-lg hover:bg-[#028664] transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {isAddingNote && (
          <div className="glass-effect rounded-xl p-4 mb-4">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Введите вашу заметку..."
              className="w-full bg-transparent text-gray-200 placeholder-gray-500 resize-none outline-none text-sm"
              rows={3}
              autoFocus
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={addNote}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#02a374] text-white rounded text-xs hover:bg-[#028664] transition-colors"
              >
                <Save className="w-3 h-3" />
                Сохранить
              </button>
              <button
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNote('');
                }}
                className="px-3 py-1.5 text-gray-400 rounded text-xs hover:text-gray-200 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {notes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <NotebookPen className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Заметок пока нет</p>
              <p className="text-xs">Добавьте первую заметку о курсе</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="glass-effect rounded-xl p-4">
                <p className="text-sm text-gray-200 mb-2">{note.text}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {note.timestamp.toLocaleDateString('ru-RU')} {note.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="h-20" />
      </div>
    </div>
  );
};
