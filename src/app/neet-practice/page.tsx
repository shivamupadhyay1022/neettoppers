'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';
import { ChevronLeft, ChevronRight, Clock, Flag } from 'lucide-react';
import Head from 'next/head';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  subject: string;
  chapter: string;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    question: "A body of mass 2 kg is moving with velocity 10 m/s. What is its kinetic energy?",
    options: ["50 J", "100 J", "200 J", "400 J"],
    correct: 1,
    explanation: "KE = ½mv² = ½ × 2 × 10² = 100 J",
    subject: "Physics",
    chapter: "Mechanics"
  },
  {
    id: 2,
    question: "Newton's first law of motion is also known as:",
    options: ["Law of momentum", "Law of inertia", "Law of acceleration", "Law of force"],
    correct: 1,
    explanation: "It's called the law of inertia as it describes the property of objects to resist changes in motion.",
    subject: "Physics",
    chapter: "Mechanics"
  },
  {
    id: 3,
    question: "The unit of force in SI system is:",
    options: ["Dyne", "Newton", "Pound", "Kilogram"],
    correct: 1,
    explanation: "Newton (N) is the SI unit of force, defined as kg⋅m⋅s⁻²",
    subject: "Physics",
    chapter: "Mechanics"
  }
];

const PracticeSession = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  const selectedClass = "10";
  const selectedSubject = "Physics";
  const selectedChapter = "Mechanics";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const toggleFlag = (questionId: number) => {
    setFlaggedQuestions((prev) => {
      const updated = new Set(prev);
      updated.has(questionId) ? updated.delete(questionId) : updated.add(questionId);
      return updated;
    });
  };

  const handleSubmit = () => {
    const results = {
      questions: mockQuestions,
      answers: selectedAnswers,
      timeElapsed,
      totalQuestions: mockQuestions.length,
      attempted: Object.keys(selectedAnswers).length,
      correct: mockQuestions.filter(q => selectedAnswers[q.id] === q.correct).length
    };

    router.push(`/practice-results?score=${results.correct}`);
  };

  const currentQ = mockQuestions[currentQuestion];

  return (
    <>
      <Head>
        <title>{`${selectedSubject} Practice | Class ${selectedClass}`}</title>
        <meta name="description" content={`Practice ${selectedSubject} - ${selectedChapter} for Class ${selectedClass}`} />
        <meta name="keywords" content="Physics practice, class 10, mechanics questions, MCQs, quiz" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <NavBar />

        <main className="container mx-auto px-4 py-8">
          <header className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  {selectedSubject} - {selectedChapter}
                </h1>
                <p className="text-purple-200">Class {selectedClass} Practice Session</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-purple-300">
                  <Clock className="w-5 h-5" />
                  <span className="font-mono">{formatTime(timeElapsed)}</span>
                </div>
                <div className="text-purple-300">
                  {currentQuestion + 1} / {mockQuestions.length}
                </div>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question Content */}
            <div className="lg:col-span-3">
              <article className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-lg font-semibold text-white">
                    Question {currentQuestion + 1}
                  </h2>
                  <button
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      flaggedQuestions.has(currentQ.id)
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-slate-700/50 text-purple-300 hover:bg-slate-600/50'
                    }`}
                  >
                    <Flag className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-white text-lg mb-6 leading-relaxed">{currentQ.question}</p>

                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(currentQ.id, index)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedAnswers[currentQ.id] === index
                          ? 'bg-purple-600/20 border-purple-500 text-white'
                          : 'bg-slate-700/30 border-slate-600 text-purple-200 hover:bg-slate-600/30'
                      }`}
                    >
                      <span className="font-medium mr-3">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              </article>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-purple-500/20 rounded-lg text-purple-300 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {currentQuestion === mockQuestions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-amber-600 transition-all"
                  >
                    Submit Test
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQuestion((prev) => Math.min(mockQuestions.length - 1, prev + 1))}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-purple-500/20 rounded-lg text-purple-300"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar: Navigator */}
            <aside className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-4">Questions</h3>
                <div className="grid grid-cols-5 lg:grid-cols-3 gap-2">
                  {mockQuestions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                        currentQuestion === index
                          ? 'bg-purple-600 text-white'
                          : selectedAnswers[mockQuestions[index].id] !== undefined
                          ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                          : flaggedQuestions.has(mockQuestions[index].id)
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-slate-700/50 text-purple-300 hover:bg-slate-600/50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600/20 border border-green-500/30 rounded" />
                    <span className="text-purple-200">Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-amber-500/20 border border-amber-500/30 rounded" />
                    <span className="text-purple-200">Flagged</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-700/50 rounded" />
                    <span className="text-purple-200">Not Visited</span>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </>
  );
};

export default PracticeSession;
