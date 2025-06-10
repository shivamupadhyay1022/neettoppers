import React from 'react';

interface FlashcardFilterBarProps {
  difficulty: string;
  subject: string;
  chapter: string;
  onDifficultyChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onChapterChange: (value: string) => void;
  chaptersBySubject: { [subject: string]: string[] };
}

export const FlashcardFilterBar: React.FC<FlashcardFilterBarProps> = ({
  difficulty,
  subject,
  chapter,
  onDifficultyChange,
  onSubjectChange,
  onChapterChange,
  chaptersBySubject,
}) => {
  const difficulties = ['easy', 'medium', 'hard'];
  const subjects = ['physics', 'Chemistry', 'biology'];
  const chapters = chaptersBySubject[subject] || [];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-center gap-6 mb-8">
      {/* Difficulty Filter */}
      <div className='w-full' >
        <label className="block text-purple-300 text-sm mb-1">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">All</option>
          {difficulties.map((level) => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Filter */}
      <div className='w-full'>
        <label className="block text-purple-300 text-sm mb-1">Subject</label>
        <select
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">All</option>
          {subjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj.charAt(0).toUpperCase() + subj.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Chapter Filter */}
      <div className='w-full'>
        <label className="block text-purple-300 text-sm mb-1">Chapter</label>
        <select
          value={chapter}
          onChange={(e) => onChapterChange(e.target.value)}
          className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!subject}
        >
          <option value="">All</option>
          {chapters.map((ch) => (
            <option key={ch} value={ch}>
              {ch}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
