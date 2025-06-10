"use client";

import { useState, useEffect } from "react";
import { BookmarkButton } from "../components/BookmarkButton";

export interface Flashcard {
  id: number;
  difficulty: string;
  question: string;
  answer: string;
  class: string;
  subject: string;
  chapter: string;
  isBookmarked: boolean;
  isImportant: boolean;
}

interface SwipeableFlashcardProps extends Flashcard {
  onSwipeNext?: () => void;
  onSwipePrev?: () => void;
}

export const SwipeableFlashcard: React.FC<SwipeableFlashcardProps> = ({
  id,
  difficulty,
  question,
  answer,
  subject,
  chapter,
  isBookmarked,
  isImportant,
  onSwipeNext,
  onSwipePrev,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diffX = e.touches[0].clientX - startX;
    setDragX(diffX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const threshold = 100;
    if (dragX > threshold && onSwipePrev) onSwipePrev();
    else if (dragX < -threshold && onSwipeNext) onSwipeNext();
    setDragX(0);
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setDragX(e.clientX - startX);
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      const threshold = 100;
      if (dragX > threshold && onSwipePrev) onSwipePrev();
      else if (dragX < -threshold && onSwipeNext) onSwipeNext();
      setDragX(0);
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragX, startX, onSwipeNext, onSwipePrev]);

  const cardTransform = `translateX(${dragX}px) rotateY(${
    isFlipped ? 180 : 0
  }deg)`;

  const difficultyClass = (() => {
    const level = difficulty?.toLowerCase();
    if (level === "hard") return "bg-red-500/20 text-red-400";
    if (level === "medium") return "bg-yellow-500/20 text-yellow-400";
    if (level === "easy") return "bg-green-500/20 text-green-400";
    return "bg-slate-500/20 text-slate-300"; // fallback
  })();

  return (
    <div className="relative w-full h-64 md:h-80 cursor-pointer [perspective:1000px]">
      <div
        className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: cardTransform }}
        onClick={() => {
          if (!isDragging && Math.abs(dragX) < 10) setIsFlipped(!isFlipped);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 md:p-6 flex flex-col [backface-visibility:hidden] z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-2 flex-wrap">
              {isImportant && (
                <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-full">
                  Important
                </span>
              )}
              <span
                className={`px-2 py-1 rounded-full text-xs ${difficultyClass}`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </div>
            <BookmarkButton
              isBookmarked={bookmarked}
              onToggle={() => setBookmarked(!bookmarked)}
            />
          </div>

          <div className="flex-1 flex items-center justify-center p-2">
            <p className="text-white text-base md:text-lg font-medium text-center leading-relaxed">
              {question}
            </p>
          </div>

          {/* 🔽 New Tags Row (Bottom) */}
          <div className="flex flex-wrap justify-center gap-2 text-xs mt-4">
            {/* <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
              Difficulty: {className}
            </span> */}
            <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">
              Subject: {subject}
            </span>
            <span className="bg-green-600/20 text-green-300 px-2 py-1 rounded-full">
              Chapter: {chapter}
            </span>
          </div>

          <div className="text-center text-purple-300 text-sm mt-2">
            <div className="md:hidden mb-1">Swipe left/right to navigate</div>
            <div>Tap to reveal answer</div>
          </div>
        </div>
        {/* Back Side */}
        <div className="absolute w-full h-full [transform:rotateY(180deg)] bg-gradient-to-br from-purple-600/20 to-amber-500/20 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 md:p-6 flex flex-col [backface-visibility:hidden] z-10">
          <div className="flex-1 flex items-center justify-center p-2">
            <p className="text-white text-sm md:text-base leading-relaxed text-center">
              {answer}
            </p>
          </div>
          <div className="text-center text-purple-300 text-sm mt-4">
            <div className="md:hidden mb-2">Swipe left/right to navigate</div>
            <div>Tap to see question</div>
          </div>
        </div>
      </div>

      {/* Swipe Indicators */}
      {isDragging && (
        <>
          {dragX > 50 && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400 text-sm font-medium">
              ← Previous
            </div>
          )}
          {dragX < -50 && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 text-sm font-medium">
              Next →
            </div>
          )}
        </>
      )}
    </div>
  );
};
