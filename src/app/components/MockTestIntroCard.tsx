
import React from 'react';

interface MockTestIntroCardProps {
  title: string;
  duration: number;
  questions: number;
  subjects: string[];
  onStart: () => void;
}

const MockTestIntroCard: React.FC<MockTestIntroCardProps> = ({
  title,
  duration,
  questions,
  subjects,
  onStart
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-purple-300">Are you ready to test your knowledge?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="text-2xl mb-2">⏱️</div>
          <h3 className="text-white font-semibold">Duration</h3>
          <p className="text-purple-300">{duration} minutes</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-2">📝</div>
          <h3 className="text-white font-semibold">Questions</h3>
          <p className="text-purple-300">{questions} MCQs</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-2">📚</div>
          <h3 className="text-white font-semibold">Subjects</h3>
          <p className="text-purple-300">{subjects.join(', ')}</p>
        </div>
      </div>

      <div className="bg-slate-700/30 border border-purple-500/20 rounded-lg p-4 mb-6">
        <h4 className="text-white font-semibold mb-3">Instructions:</h4>
        <ul className="text-purple-200 text-sm space-y-2">
          <li>• Each question carries equal marks</li>
          <li>• There is no negative marking</li>
          <li>• You can navigate between questions freely</li>
          <li>• Auto-submit when time expires</li>
          <li>• Review your answers before final submission</li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all transform hover:scale-[1.02]"
      >
        Start Mock Test
      </button>
    </div>
  );
};

export default MockTestIntroCard;
