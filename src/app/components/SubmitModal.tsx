
import React from 'react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  answeredCount: number;
  totalQuestions: number;
  timeLeft: string;
}

const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  answeredCount,
  totalQuestions,
  timeLeft
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 max-w-md mx-4">
        <h2 className="text-2xl font-bold text-white mb-4">Submit Test?</h2>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-purple-200">
            <span>Questions Answered:</span>
            <span className="text-white font-semibold">{answeredCount}/{totalQuestions}</span>
          </div>
          <div className="flex justify-between text-purple-200">
            <span>Time Remaining:</span>
            <span className="text-white font-semibold">{timeLeft}</span>
          </div>
          <div className="flex justify-between text-purple-200">
            <span>Unanswered Questions:</span>
            <span className="text-amber-400 font-semibold">{totalQuestions - answeredCount}</span>
          </div>
        </div>

        <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 mb-6">
          <p className="text-amber-200 text-sm">
            ⚠️ Once submitted, you cannot change your answers. Make sure you've reviewed all questions.
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-600 transition-all"
          >
            Continue Test
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-700 hover:to-red-600 transition-all"
          >
            Submit Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
