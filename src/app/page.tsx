import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Free NEET Mock Tests & AI Flashcards | Crack NEET 2025</title>
        <meta
          name="description"
          content="NEET 2025 preparation made smarter. Free NEET mock tests, AI-powered flashcards, past year papers, expert tips and more."
        />
        <meta name="keywords" content="NEET, NEET 2025, NEET preparation, NEET mock tests, NEET biology, NEET flashcards, NEET India, free NEET practice" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Master NEET 2025 with Free Mock Tests & AI Flashcards" />
        <meta property="og:description" content="NEET prep made powerful — Free mock tests, flashcards & expert sessions. Prepare for NEET 2025 now." />
        <meta property="og:image" content="/cover.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "NEET Mastery",
              "url": "https://neettoppers.in",
              "sameAs": ["https://www.instagram.com/yourpage", "https://www.youtube.com/@yourchannel"],
              "description": "Prepare for NEET 2025 with smart AI tools like flashcards, mock tests and expert mentoring.",
            }),
          }}
        />
      </Head>

      <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="w-full h-full bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: "pulse 4s ease-in-out infinite",
            }}
          />
        </div>

        {/* Visual effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

        <section className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-amber-500 rounded-full mb-8 shadow-2xl">
            <span className="text-3xl font-bold text-white">N</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Crack <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">NEET 2025</span>
            <br />
            <span className="text-3xl md:text-5xl">Transcend Limits</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your ultimate portal for <strong>free NEET mock tests</strong>, <strong>smart flashcards</strong>, expert mentoring, and past year NEET questions. Ace NEET 2025 with precision.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/auth"
              className="bg-gradient-to-r from-purple-600 to-amber-500 text-white font-semibold py-4 px-8 rounded-full hover:from-purple-700 hover:to-amber-600 transition-all transform hover:scale-105 shadow-xl"
            >
              Start Your NEET Journey
            </Link>
            <Link
              href="/dashboard"
              className="border-2 border-purple-400 text-purple-400 font-semibold py-4 px-8 rounded-full hover:bg-purple-400 hover:text-white transition-all transform hover:scale-105"
            >
              Try Free Demo Test
            </Link>
          </div>

          {/* Features */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto" aria-label="NEET Preparation Features">
            <article className="bg-slate-800/30 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
              <div className="text-3xl mb-3">⏱️</div>
              <h2 className="text-lg font-semibold text-white mb-2">Timed NEET Practice</h2>
              <p className="text-purple-300 text-sm">Simulate NEET exam conditions with free mock tests, chapter-wise MCQs and full syllabus revisions.</p>
            </article>

            <article className="bg-slate-800/30 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
              <div className="text-3xl mb-3">🧠</div>
              <h2 className="text-lg font-semibold text-white mb-2">AI Smart Flashcards</h2>
              <p className="text-purple-300 text-sm">Revise NEET topics efficiently using intelligent flashcards tailored for your weak areas.</p>
            </article>

            <article className="bg-slate-800/30 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h2 className="text-lg font-semibold text-white mb-2">Live Expert Mentoring</h2>
              <p className="text-purple-300 text-sm">Get guidance from NEET toppers and subject experts. Weekly live sessions, strategy breakdowns, and doubt-clearing.</p>
            </article>
          </section>
        </section>
      </main>
    </>
  );
}
