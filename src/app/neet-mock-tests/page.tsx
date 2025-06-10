"use client"
import { useState, useMemo } from 'react';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';
import MockTestIntroCard from '../components/MockTestIntroCard';
import LiveTimer from '../components/LiveTimer';
import QuestionNavigator from '../components/QuestionNavigator';
import SubmitModal from '../components/SubmitModal';
import ResultCard from '../components/ResultCard';

const NeetMocktests = () => {
//   const router = useRouter();

  const [testPhase, setTestPhase] = useState<'intro' | 'active' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  // SEO meta data
  const pageTitle = 'NEET Mock Test #1 | Practice Full-Length Exam Online';
  const pageDesc =
    'Attempt NEET Mock Test #1 – 180 questions, real-time timer, auto-scoring, and subject-wise breakdown. Start your practice now.';

  // Mock test config
  const mockTest = {
    title: 'NEET Full Length Mock Test #1',
    duration: 180,
    questions: 180,
    subjects: ['Physics', 'Chemistry', 'Biology'],
  };

  // Mocked question states
  const questions = useMemo(() =>
    Array.from({ length: 180 }, (_, i) => ({
      id: i + 1,
      isAnswered: Math.random() > 0.7,
      isMarked: Math.random() > 0.9,
    })), []);

  const answeredCount = useMemo(() => questions.filter(q => q.isAnswered).length, [questions]);

  const mockResults = {
    totalScore: 145,
    totalQuestions: 180,
    percentage: 80.6,
    timeTaken: '2h 45m',
    subjectResults: [
      { name: 'Physics', correct: 42, total: 45, percentage: 93.3 },
      { name: 'Chemistry', correct: 38, total: 45, percentage: 84.4 },
      { name: 'Biology', correct: 65, total: 90, percentage: 72.2 },
    ],
  };

  const handleStartTest = () => setTestPhase('active');
  const handleTimeUp = () => setTestPhase('result');
  const handleSubmitTest = () => setShowSubmitModal(true);
  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    setTestPhase('result');
  };

  const handleReturnToDashboard = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/dashboard';
  }
};
  const handleReviewAnswers = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/review-answers';
  }
}; // Update route as needed

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <NavBar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {testPhase === 'intro' && (
            <MockTestIntroCard
              title={mockTest.title}
              duration={mockTest.duration}
              questions={mockTest.questions}
              subjects={mockTest.subjects}
              onStart={handleStartTest}
            />
          )}

          {testPhase === 'active' && (
            <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fadeIn">
              <div className="lg:col-span-3 space-y-6">
                <LiveTimer totalMinutes={mockTest.duration} onTimeUp={handleTimeUp} isActive />

                <div className="bg-slate-800/60 border border-purple-500/30 rounded-xl p-8 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Question {currentQuestion} of {mockTest.questions}</h2>
                    <span className="text-sm bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full">Physics</span>
                  </div>

                  <p className="mb-4 text-lg leading-relaxed">
                    A particle moves in a circle of radius R with constant angular velocity ω.
                    The magnitude of average acceleration of the particle over a quarter circle is:
                  </p>

                  <form className="space-y-4">
                    {['ω²R/√2', 'ω²R√2', 'ω²R', 'ω²R/2'].map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-3 p-4 bg-slate-700/40 rounded-lg hover:bg-slate-700/60 cursor-pointer transition"
                      >
                        <input
                          type="radio"
                          name="answer"
                          className="w-4 h-4 text-purple-600 focus:ring-purple-400"
                        />
                        <span>({String.fromCharCode(65 + index)}) {option}</span>
                      </label>
                    ))}
                  </form>

                  <div className="flex justify-between mt-8">
                    <div className="space-x-4">
                      <button className="btn btn-warning">Mark for Review</button>
                      <button className="btn btn-success">Save & Next</button>
                    </div>
                    <button
                      onClick={handleSubmitTest}
                      className="btn btn-danger"
                    >
                      Submit Test
                    </button>
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-1">
                <QuestionNavigator
                  questions={questions}
                  currentQuestion={currentQuestion}
                  onQuestionSelect={setCurrentQuestion}
                />
              </aside>
            </section>
          )}

          {testPhase === 'result' && (
            <ResultCard
              totalScore={mockResults.totalScore}
              totalQuestions={mockResults.totalQuestions}
              percentage={mockResults.percentage}
              timeTaken={mockResults.timeTaken}
              subjectResults={mockResults.subjectResults}
              onReturnToDashboard={handleReturnToDashboard}
              onReviewAnswers={handleReviewAnswers}
            />
          )}
        </main>

        <SubmitModal
          isOpen={showSubmitModal}
          onClose={() => setShowSubmitModal(false)}
          onConfirm={handleConfirmSubmit}
          answeredCount={answeredCount}
          totalQuestions={mockTest.questions}
          timeLeft={timeLeft}
        />
      </div>
    </>
  );
};

export default NeetMocktests;
