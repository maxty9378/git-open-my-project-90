
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Поиск..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-[#02a374] transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="flex items-center bg-[#1f2937] rounded-lg px-3 py-2 mx-3 mb-2">
      <Search className="w-4 h-4 text-gray-400 mr-2" />
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
        autoFocus
      />
      {query && (
        <button
          onClick={clearSearch}
          className="ml-2 p-1 text-gray-400 hover:text-gray-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
