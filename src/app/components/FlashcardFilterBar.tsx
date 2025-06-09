
import React from 'react';

type FilterType = 'all' | 'bookmarked' | 'difficult' | 'important';


interface FlashcardFilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FlashcardFilterBar: React.FC<FlashcardFilterBarProps> = ({ filter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'All Cards', icon: '📚' },
    { value: 'bookmarked', label: 'Bookmarked', icon: '🔖' },
    { value: 'difficult', label: 'Difficult', icon: '🔥' },
    { value: 'important', label: 'Important', icon: '⭐' }
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8 justify-center">
      {filters.map((filterOption) => (
        <button
          key={filterOption.value}
          onClick={() => onFilterChange(filterOption.value as FilterType )}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            filter === filterOption.value
              ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white'
              : 'bg-slate-800/50 text-purple-300 hover:bg-slate-700/50'
          }`}
        >
          <span>{filterOption.icon}</span>
          <span className="font-medium">{filterOption.label}</span>
        </button>
      ))}
    </div>
  );
};
