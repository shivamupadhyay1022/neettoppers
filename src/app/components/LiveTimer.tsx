'use client'
import  { useState, useEffect } from 'react';

interface LiveTimerProps {
  totalMinutes: number;
  onTimeUp: () => void;
  isActive: boolean;
}

const LiveTimer: React.FC<LiveTimerProps> = ({ totalMinutes, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(totalMinutes * 60);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    const percentage = (timeLeft / (totalMinutes * 60)) * 100;
    if (percentage <= 10) return 'text-red-400';
    if (percentage <= 25) return 'text-amber-400';
    return 'text-green-400';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <span className="text-purple-200">Time Remaining:</span>
        <span className={`text-xl font-bold ${getTimerColor()}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <div className="mt-2 w-full bg-slate-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${(timeLeft / (totalMinutes * 60)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LiveTimer;
