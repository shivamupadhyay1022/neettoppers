'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import NavBar from '../components/NavBar';

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
    explanation: "It describes the property of objects to resist changes in motion.",
    subject: "Physics",
    chapter: "Mechanics"
  },
  {
    id: 3,
    question: "The unit of force in SI system is:",
    options: ["Dyne", "Newton", "Pound", "Kilogram"],
    correct: 1,
    explanation: "SI unit of force is Newton (N), defined as kg⋅m/s².",
    subject: "Physics",
    chapter: "Mechanics"
  }
];

const PracticeResultsClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const rawScore = searchParams.get('score');
    if (rawScore) setScore(parseInt(rawScore));
    
    // Replace with actual saved values from context/state/localStorage
    const mockAnswers = {
      1: 1,
      2: 2,
      3: 1
    };
    setAnswers(mockAnswers);
    setTimeTaken(185);
  }, [searchParams]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} min`;
  };

  return (
    <>
      <Head>
        <title>Practice Results | Physics - Class 10</title>
        <meta name="description" content="Check your Physics MCQ practice test results, review answers and explanations to improve your understanding." />
        <meta name="keywords" content="Physics practice results, Class 10 quiz feedback, MCQ explanation" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <NavBar />
        <main className="container mx-auto px-4 py-10">
          <div className="bg-slate-800/60 border border-purple-600/20 rounded-xl p-6 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Practice Test Completed!</h1>
                <p className="text-purple-300">Subject: <span className="font-semibold">Physics</span> | Chapter: <span className="font-semibold">Mechanics</span></p>
              </div>
              <button
                onClick={() => router.push('/neet-practice')}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/70 border border-purple-400/30 rounded-lg hover:bg-purple-700/30 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Practice
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center">
              <div className="bg-purple-800/20 rounded-xl p-6 border border-purple-400/30">
                <h2 className="text-xl font-semibold text-white">Score</h2>
                <p className="text-3xl font-bold text-amber-400">{score} / {mockQuestions.length}</p>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-6 border border-purple-400/20">
                <h2 className="text-xl font-semibold text-white">Time Taken</h2>
                <p className="text-2xl font-mono text-purple-300">{formatTime(timeTaken)}</p>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-6 border border-purple-400/20">
                <h2 className="text-xl font-semibold text-white">Accuracy</h2>
                <p className="text-2xl font-bold text-green-400">
                  {((score ?? 0) / mockQuestions.length * 100).toFixed(0)}%
                </p>
              </div>
            </div>

            <section className="space-y-6">
              <h2 className="text-xl font-bold border-b border-purple-500 pb-2">Answer Review</h2>
              {mockQuestions.map((q, i) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correct;

                return (
                  <div key={q.id} className={`p-5 rounded-xl border ${isCorrect ? 'border-green-500/40 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        Q{i + 1}. {q.question}
                      </h3>
                      {isCorrect ? (
                        <CheckCircle className="text-green-400 w-6 h-6" />
                      ) : (
                        <XCircle className="text-red-400 w-6 h-6" />
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {q.options.map((option, idx) => {
                        const isUser = userAnswer === idx;
                        const isCorrectAns = q.correct === idx;

                        let style = "bg-slate-800/30 border border-slate-700";
                        if (isCorrectAns) {
                          style = "bg-green-600/20 border border-green-500 text-green-300";
                        } else if (isUser) {
                          style = "bg-red-600/20 border border-red-500 text-red-300";
                        }

                        return (
                          <div key={idx} className={`rounded-lg px-4 py-3 ${style}`}>
                            <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>
                            {option}
                          </div>
                        );
                      })}
                    </div>

                    <p className="mt-3 text-purple-300 italic">Explanation: {q.explanation}</p>
                  </div>
                );
              })}
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default PracticeResultsClient;
