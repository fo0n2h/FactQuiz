import Link from "next/link";
import questionsData from "../../data/questions.json";

export default function HomePage() {
  const total = questionsData.length;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-indigo-300 text-sm font-semibold uppercase tracking-widest">
              Nothing2Hide
            </p>
            <h2 className="text-2xl font-bold text-white">
              Decentralized Festival
            </h2>
          </div>

          <div className="border-t border-slate-700 pt-4 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium">
              <span>🔍</span>
              <span>Fact-checking interactif</span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight">
              Fact<span className="text-indigo-400">Quiz</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Vrai ou Faux ? Testez votre sens critique face aux idées reçues et
              aux fake news.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-indigo-400">{total}</div>
            <div className="text-slate-400 text-sm mt-1">Questions</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-indigo-400">~3 min</div>
            <div className="text-slate-400 text-sm mt-1">Durée</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-indigo-400">Libre</div>
            <div className="text-slate-400 text-sm mt-1">Rythme</div>
          </div>
        </div>

        <Link
          href="/quiz"
          className="inline-block w-full py-4 px-8 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-2xl font-bold text-lg transition-colors duration-150 shadow-lg shadow-indigo-900/40"
        >
          Commencer le quiz
        </Link>

        <p className="text-slate-500 text-sm">
          Aucune inscription requise · Résultats détaillés à la fin
        </p>
      </div>
    </main>
  );
}
