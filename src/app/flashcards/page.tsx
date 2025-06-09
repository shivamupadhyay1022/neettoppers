// app/flashcards/page.tsx (or /pages/flashcards.tsx if using Pages Router)
'use client';

import Head from 'next/head';
import { useState, useMemo } from 'react';
import NavBar from '../components/NavBar';
import DropdownSelector from '../components/DropdownSelector';
import { SwipeableFlashcard } from '../components/SwipeableFlashcard';
import { FlashcardFilterBar } from '../components/FlashcardFilterBar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Flashcards = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [filter, setFilter] = useState<'all' | 'bookmarked' | 'difficult' | 'important'>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const mockFlashcards = useMemo(() => [
    {
      id: 1,
      question: "What is Newton's First Law of Motion?",
      answer: "An object at rest stays at rest...",
      isBookmarked: false,
      isDifficult: false,
      isImportant: true
    },
    {
      id: 2,
      question: "Define Force",
      answer: "Force is a push or pull upon an object...",
      isBookmarked: true,
      isDifficult: true,
      isImportant: false
    },
    // ...more cards
  ], []);

  const filteredCards = useMemo(() => {
    return mockFlashcards.filter(card => {
      if (filter === 'bookmarked') return card.isBookmarked;
      if (filter === 'difficult') return card.isDifficult;
      if (filter === 'important') return card.isImportant;
      return true;
    });
  }, [filter, mockFlashcards]);

  const handleNextCard = () => {
    setCurrentCardIndex(prev => Math.min(prev + 1, filteredCards.length - 1));
  };

  const handlePrevCard = () => {
    setCurrentCardIndex(prev => Math.max(prev - 1, 0));
  };

  const currentCard = filteredCards[currentCardIndex];

  return (
    <>
      <Head>
        <title>Smart Flashcards | NEET Prep</title>
        <meta name="description" content="AI-powered NEET flashcards to help you master Physics, Chemistry, and Biology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <NavBar />

        <main className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Smart Flashcards</h1>
            <p className="text-purple-200 mt-2 text-sm md:text-base max-w-2xl mx-auto">
              Master concepts with AI-powered flashcards. Study smarter, not harder.
            </p>
          </header>

          {/* Dropdowns - Mobile then Desktop */}
          <section className="grid md:grid-cols-3 gap-6 mb-8">
            <DropdownSelector
              label="Class"
              value={selectedClass}
              onChange={setSelectedClass}
              options={[{ value: '11', label: 'Class 11' }, { value: '12', label: 'Class 12' }]}
            />
            <DropdownSelector
              label="Subject"
              value={selectedSubject}
              onChange={setSelectedSubject}
              options={[
                { value: 'physics', label: 'Physics' },
                { value: 'chemistry', label: 'Chemistry' },
                { value: 'biology', label: 'Biology' }
              ]}
            />
            <DropdownSelector
              label="Chapter"
              value={selectedChapter}
              onChange={setSelectedChapter}
              options={[
                { value: 'mechanics', label: 'Mechanics' },
                { value: 'thermodynamics', label: 'Thermodynamics' }
              ]}
            />
          </section>

          <FlashcardFilterBar filter={filter} onFilterChange={setFilter} />

          {filteredCards.length === 0 ? (
            <p className="text-center text-purple-300 py-12 text-lg">No flashcards found for the selected filter.</p>
          ) : (
            <>
              {/* Mobile View - Swipeable */}
              <div className="md:hidden mb-8">
                <p className="text-center text-purple-300 mb-4 text-sm">
                  {currentCardIndex + 1} of {filteredCards.length}
                </p>

                <SwipeableFlashcard
                  key={currentCard.id}
                  {...currentCard}
                  onSwipeNext={handleNextCard}
                  onSwipePrev={handlePrevCard}
                />

                <div className="flex justify-between items-center mt-6">
                  <button
                    aria-label="Previous card"
                    onClick={handlePrevCard}
                    disabled={currentCardIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-purple-500/20 rounded-lg text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                  </button>
                  <button
                    aria-label="Next card"
                    onClick={handleNextCard}
                    disabled={currentCardIndex === filteredCards.length - 1}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-purple-500/20 rounded-lg text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Desktop View - Grid */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.map((card) => (
                  <SwipeableFlashcard key={card.id} {...card} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Flashcards;
