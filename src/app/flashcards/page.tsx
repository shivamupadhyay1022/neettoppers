"use client";

import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { supabase } from "../../supabase";
import NavBar from "../components/NavBar";
import DropdownSelector from "../components/DropdownSelector";
import { SwipeableFlashcard } from "./SwipeableFlashcard";
import { FlashcardFilterBar } from "./FlashcardFilterBar";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Flashcard = {
  id: number;
  difficulty: string;
  question: string;
  answer: string;
  class: string;
  subject: string;
  chapter: string;
  isBookmarked: boolean;
  isImportant: boolean;
};

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [filter, setFilter] = useState<
    "all" | "bookmarked" | "difficult" | "important"
  >("all");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const { data, error } = await supabase.from("flashcards").select("*");
      if (error) {
        console.error("Error fetching flashcards:", error);
      } else {
        setFlashcards(data as Flashcard[]);
      }
      setLoading(false); // ✅ Stop loading once data is fetched
    };
    fetchFlashcards();
  }, []);

  const filteredCards = useMemo(() => {
    return flashcards.filter((card) => {
      const matchesClass = !selectedClass || card.class === selectedClass;
      const matchesSubject =
        !selectedSubject || card.subject === selectedSubject;
      const matchesChapter =
        !selectedChapter || card.chapter === selectedChapter;
      const matchesDifficulty =
        !selectedDifficulty ||
        card.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase();

      let matchesTagFilter = true;
      if (filter === "bookmarked") matchesTagFilter = card.isBookmarked;
      if (filter === "difficult")
        matchesTagFilter = card.difficulty?.toLowerCase() === "hard";
      if (filter === "important") matchesTagFilter = card.isImportant;

      return (
        matchesClass &&
        matchesSubject &&
        matchesChapter &&
        matchesDifficulty &&
        matchesTagFilter
      );
    });
  }, [
    flashcards,
    selectedClass,
    selectedSubject,
    selectedChapter,
    selectedDifficulty,
    filter,
  ]);

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => Math.min(prev + 1, filteredCards.length - 1));
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => Math.max(prev - 1, 0));
  };

  const currentCard = filteredCards[currentCardIndex];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-solid mx-auto mb-4" />
          <p className="text-lg text-purple-300">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Smart Flashcards | NEET Prep</title>
        <meta
          name="description"
          content="AI-powered NEET flashcards to help you master Physics, Chemistry, and Biology."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <NavBar />

        <main className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Smart Flashcards</h1>
            <p className="text-purple-200 mt-2 text-sm md:text-base max-w-2xl mx-auto">
              Master concepts with AI-powered flashcards. Study smarter, not
              harder.
            </p>
          </header>

          {/* <section className="grid md:grid-cols-3 gap-6 mb-8">
            <DropdownSelector
              label="Class"
              value={selectedClass}
              onChange={setSelectedClass}
              options={[
                { value: "11", label: "Class 11" },
                { value: "12", label: "Class 12" },
              ]}
            />
            <DropdownSelector
              label="Subject"
              value={selectedSubject}
              onChange={setSelectedSubject}
              options={[
                { value: "physics", label: "Physics" },
                { value: "chemistry", label: "Chemistry" },
                { value: "biology", label: "Biology" },
              ]}
            />
            <DropdownSelector
              label="Chapter"
              value={selectedChapter}
              onChange={setSelectedChapter}
              options={[...new Set(flashcards.map((fc) => fc.chapter))].map(
                (ch) => ({ value: ch, label: ch })
              )}
            />
          </section> */}

          <FlashcardFilterBar
            difficulty={selectedDifficulty}
            subject={selectedSubject}
            chapter={selectedChapter}
            onDifficultyChange={setSelectedDifficulty}
            onSubjectChange={(value) => {
              setSelectedSubject(value);
              setSelectedChapter(""); // reset chapter on subject change
            }}
            onChapterChange={setSelectedChapter}
            chaptersBySubject={{
              physics: ["Laws of Motion", "Kinematics", "Thermodynamics"],
              chemistry: ["Organic", "Inorganic", "Physical"],
              biology: ["Cell Structure", "Genetics", "Ecology"],
            }}
          />

          {filteredCards.length === 0 ? (
            <p className="text-center text-purple-300 py-12 text-lg">
              No flashcards found for the selected filters.
            </p>
          ) : (
            <>
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
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-purple-500/20 rounded-lg text-purple-300 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button
                    aria-label="Next card"
                    onClick={handleNextCard}
                    disabled={currentCardIndex === filteredCards.length - 1}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-purple-500/20 rounded-lg text-purple-300 disabled:opacity-50"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

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
