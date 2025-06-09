"use client"
import Head from 'next/head';
import Link from 'next/link';
import NavBar from '../components/NavBar';

const mockReviewData = {
  title: 'NEET Full Length Mock Test #1',
  questions: [
    {
      id: 1,
      question: 'A particle moves in a circle of radius R with constant angular velocity ω. What is the average acceleration over a quarter circle?',
      options: ['ω²R/√2', 'ω²R√2', 'ω²R', 'ω²R/2'],
      correctIndex: 0,
      userAnswerIndex: 2,
      subject: 'Physics',
    },
    {
      id: 2,
      question: 'What is the chemical formula of glucose?',
      options: ['C6H12O6', 'H2O', 'NaCl', 'CH3COOH'],
      correctIndex: 0,
      userAnswerIndex: 0,
      subject: 'Chemistry',
    },
    // Add more questions as needed
  ]
};

const ReviewAnswers = () => {
  return (
    <>
      <Head>
        <title>Review Answers | NEET Mock Test</title>
        <meta name="description" content="Review your submitted answers, view correct options, and learn from mistakes. Perfect for NEET exam practice." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <NavBar />

        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            Review Answers
          </h1>
          <h2 className="text-xl text-center text-purple-300 mb-10">
            {mockReviewData.title}
          </h2>

          <div className="space-y-10">
            {mockReviewData.questions.map((q, index) => (
              <div
                key={q.id}
                className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 shadow-xl"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold text-purple-300">
                    Q{index + 1}. {q.subject}
                  </span>
                  {q.userAnswerIndex === q.correctIndex ? (
                    <span className="text-green-400 font-bold">✔ Correct</span>
                  ) : (
                    <span className="text-red-400 font-bold">✘ Incorrect</span>
                  )}
                </div>

                <p className="text-white text-lg mb-4">{q.question}</p>

                <div className="grid gap-3">
                  {q.options.map((opt, i) => {
                    const isCorrect = i === q.correctIndex;
                    const isUser = i === q.userAnswerIndex;

                    let baseStyle = 'p-3 rounded-md transition-colors';
                    if (isCorrect && isUser) {
                      baseStyle += ' bg-green-700 border border-green-500';
                    } else if (isCorrect) {
                      baseStyle += ' bg-green-800 border border-green-600';
                    } else if (isUser) {
                      baseStyle += ' bg-red-800 border border-red-500';
                    } else {
                      baseStyle += ' bg-slate-700/40';
                    }

                    return (
                      <div key={i} className={baseStyle}>
                        <span className="text-white">
                          ({String.fromCharCode(65 + i)}) {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
            href={"/dashboard"}
              className="bg-purple-700 hover:bg-purple-800 transition px-6 py-2 text-white rounded-lg text-lg"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewAnswers;
