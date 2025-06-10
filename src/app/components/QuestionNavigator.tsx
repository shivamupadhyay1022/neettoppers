

interface Question {
  id: number;
  isAnswered: boolean;
  isMarked: boolean;
}

interface QuestionNavigatorProps {
  questions: Question[];
  currentQuestion: number;
  onQuestionSelect: (questionId: number) => void;
}

const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  questions,
  currentQuestion,
  onQuestionSelect
}) => {
  const getQuestionStatus = (question: Question, isCurrent: boolean) => {
    if (isCurrent) return 'bg-purple-600 text-white border-purple-400';
    if (question.isAnswered && question.isMarked) return 'bg-amber-600 text-white border-amber-400';
    if (question.isAnswered) return 'bg-green-600 text-white border-green-400';
    if (question.isMarked) return 'bg-red-600 text-white border-red-400';
    return 'bg-slate-700 text-purple-200 border-purple-500/30 hover:bg-slate-600';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-4">Question Navigator</h3>
      
      <div className="grid grid-cols-5 gap-2 mb-4">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => onQuestionSelect(question.id)}
            className={`w-10 h-10 rounded-lg border-2 transition-all font-medium ${getQuestionStatus(
              question,
              question.id === currentQuestion
            )}`}
          >
            {question.id}
          </button>
        ))}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span className="text-purple-200">Answered</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span className="text-purple-200">Marked for Review</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-amber-600 rounded"></div>
          <span className="text-purple-200">Answered & Marked</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-slate-700 border border-purple-500/30 rounded"></div>
          <span className="text-purple-200">Not Answered</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigator;
