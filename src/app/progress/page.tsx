"use client";
import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const Progress = () => {
  const [loading, setLoading] = useState(true);

  const performanceData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 72 },
    { month: "Mar", score: 78 },
    { month: "Apr", score: 85 },
    { month: "May", score: 82 },
    { month: "Jun", score: 88 },
  ];

  const subjectData = [
    { subject: "Physics", attempted: 450, correct: 380, accuracy: 84 },
    { subject: "Chemistry", attempted: 420, correct: 350, accuracy: 83 },
    { subject: "Biology", attempted: 380, correct: 340, accuracy: 89 },
  ];

  const weaknessData = [
    { chapter: "Thermodynamics", accuracy: 65, questions: 45 },
    { chapter: "Organic Chemistry", accuracy: 70, questions: 38 },
    { chapter: "Genetics", accuracy: 75, questions: 42 },
    { chapter: "Electricity", accuracy: 78, questions: 35 },
  ];

  const lineChartData = {
    labels: performanceData.map((entry) => entry.month),
    datasets: [
      {
        label: "Score",
        data: performanceData.map((entry) => entry.score),
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124, 58, 237, 0.2)",
        borderWidth: 2,
        pointRadius: 5,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#F3F4F6",
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F3F4F6",
        bodyColor: "#F3F4F6",
      },
    },
    scales: {
      x: {
        ticks: { color: "#9CA3AF" },
        grid: { color: "#374151" },
      },
      y: {
        ticks: { color: "#9CA3AF" },
        grid: { color: "#374151" },
      },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1s delay for demonstration, tweak if needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-solid mx-auto mb-4"></div>
        <p className="text-purple-300 mt-4 text-sm tracking-wide">Analyzing your performance...</p>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <NavBar />
      <style jsx global>{`
        canvas {
          width: auto !important;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Performance Analytics
          </h1>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Track your progress and identify areas for improvement
          </p>
        </div>

        {/* Performance Trend */}
        <div className="bg-slate-800/50 w-full h-auto backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Performance Trend
          </h2>
          <div className="h-auto md:h-72">
            <Line
              className="w-[800px]"
              data={lineChartData}
              options={lineChartOptions}
            />
          </div>
        </div>

        {/* Subject Performance + Weakness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Subject-wise Performance */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Subject Performance
            </h2>
            <div className="space-y-4">
              {subjectData.map((subject) => (
                <div
                  key={subject.subject}
                  className="bg-slate-700/30 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-semibold">
                      {subject.subject}
                    </h3>
                    <span className="text-purple-300">{subject.accuracy}%</span>
                  </div>
                  <div className="flex justify-between text-sm text-purple-200 mb-2">
                    <span>Attempted: {subject.attempted}</span>
                    <span>Correct: {subject.correct}</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-amber-500 h-2 rounded-full"
                      style={{ width: `${subject.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Areas of Improvement */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Areas to Improve
            </h2>
            <div className="space-y-4">
              {weaknessData.map((weakness) => (
                <div
                  key={weakness.chapter}
                  className="bg-slate-700/30 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-medium">
                      {weakness.chapter}
                    </h3>
                    <span className="text-amber-400">{weakness.accuracy}%</span>
                  </div>
                  <div className="text-sm text-purple-200 mb-2">
                    {weakness.questions} questions attempted
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${weakness.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">1,250</div>
            <div className="text-purple-200 text-sm">Total Questions</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">1,070</div>
            <div className="text-purple-200 text-sm">Correct Answers</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">85.6%</div>
            <div className="text-purple-200 text-sm">Overall Accuracy</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">45</div>
            <div className="text-purple-200 text-sm">Study Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
