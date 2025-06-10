

interface SubjectResult {
  name: string;
  correct: number;
  total: number;
  percentage: number;
}

interface ResultCardProps {
  totalScore: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: string;
  subjectResults: SubjectResult[];
  onReturnToDashboard: () => void;
  onReviewAnswers: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
  totalScore,
  totalQuestions,
  percentage,
  timeTaken,
  subjectResults,
  onReturnToDashboard,
  onReviewAnswers
}) => {
  const getPerformanceColor = (percent: number) => {
    if (percent >= 80) return 'text-green-400';
    if (percent >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getPerformanceEmoji = (percent: number) => {
    if (percent >= 90) return '🎉';
    if (percent >= 80) return '🎯';
    if (percent >= 60) return '👍';
    return '📚';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{getPerformanceEmoji(percentage)}</div>
        <h2 className="text-3xl font-bold text-white mb-2">Test Completed!</h2>
        <p className="text-purple-300">Here's how you performed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-700/30 border border-purple-500/20 rounded-xl p-6 text-center">
          <h3 className="text-purple-200 mb-2">Total Score</h3>
          <p className={`text-3xl font-bold ${getPerformanceColor(percentage)}`}>
            {totalScore}/{totalQuestions}
          </p>
        </div>
        
        <div className="bg-slate-700/30 border border-purple-500/20 rounded-xl p-6 text-center">
          <h3 className="text-purple-200 mb-2">Percentage</h3>
          <p className={`text-3xl font-bold ${getPerformanceColor(percentage)}`}>
            {percentage.toFixed(1)}%
          </p>
        </div>
        
        <div className="bg-slate-700/30 border border-purple-500/20 rounded-xl p-6 text-center">
          <h3 className="text-purple-200 mb-2">Time Taken</h3>
          <p className="text-3xl font-bold text-purple-400">{timeTaken}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Subject-wise Performance</h3>
        <div className="space-y-4">
          {subjectResults.map((subject, index) => (
            <div key={index} className="bg-slate-700/30 border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold">{subject.name}</h4>
                <span className={`font-bold ${getPerformanceColor(subject.percentage)}`}>
                  {subject.correct}/{subject.total} ({subject.percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    subject.percentage >= 80 ? 'bg-green-500' :
                    subject.percentage >= 60 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${subject.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onReviewAnswers}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all"
        >
          Review Answers
        </button>
        <button
          onClick={onReturnToDashboard}
          className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-amber-700 hover:to-amber-600 transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
