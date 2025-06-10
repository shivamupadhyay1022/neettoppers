

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isBookmarked, onToggle }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`p-2 rounded-full transition-all ${
        isBookmarked 
          ? 'bg-amber-500 text-white' 
          : 'bg-slate-700/50 text-purple-300 hover:bg-slate-600/50'
      }`}
    >
      <svg
        className="w-4 h-4"
        fill={isBookmarked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
};
