"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import questionsData from "../../../data/questions.json";
import type { Question, ReponseUtilisateur } from "@/types/question";
import BrandFooter from "@/components/BrandFooter";

const questions = questionsData as Question[];

function getMessage(score: number, total: number) {
  const pct = score / total;
  if (pct === 1) return { emoji: "🏆", texte: "Parfait ! Vous êtes imbattable !" };
  if (pct >= 0.75) return { emoji: "🎉", texte: "Excellent ! Vous avez l'œil critique !" };
  if (pct >= 0.5) return { emoji: "👍", texte: "Pas mal ! Encore un peu d'entraînement." };
  if (pct >= 0.25) return { emoji: "🤔", texte: "Les fake news vous ont eu quelques fois..." };
  return { emoji: "📚", texte: "Il est temps de développer votre sens critique !" };
}

function ResultatsContenu() {
  const params = useSearchParams();
  const score = parseInt(params.get("score") ?? "0");
  const total = parseInt(params.get("total") ?? String(questions.length));
  const [reponses, setReponses] = useState<ReponseUtilisateur[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("factquiz_reponses");
    if (raw) {
      try {
        setReponses(JSON.parse(raw));
      } catch {}
    }
  }, []);

  const { emoji, texte } = getMessage(score, total);
  const pourcentage = Math.round((score / total) * 100);

  return (
    <div className="max-w-xl w-full space-y-8">
      {/* Score */}
      <div className="text-center space-y-4">
        <div className="text-6xl">{emoji}</div>
        <h1 className="text-3xl font-extrabold">Vos résultats</h1>
        <div className="bg-slate-800 rounded-2xl p-6 space-y-3">
          <div className="text-5xl font-extrabold text-indigo-400">
            {score}{" "}
            <span className="text-slate-500 text-3xl font-normal">/ {total}</span>
          </div>
          <div className="text-slate-300 font-medium">{pourcentage}% de bonnes réponses</div>
          <p className="text-slate-400 text-sm">{texte}</p>
        </div>
      </div>

      {/* Récapitulatif */}
      {reponses.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-bold text-slate-300 text-sm uppercase tracking-wider">
            Récapitulatif
          </h2>
          <div className="space-y-3">
            {questions.map((q) => {
              const r = reponses.find((rep) => rep.questionId === q.id);
              if (!r) return null;
              return (
                <div
                  key={q.id}
                  className={`rounded-xl p-4 border text-sm ${
                    r.correct
                      ? "bg-emerald-900/30 border-emerald-700/40"
                      : "bg-rose-900/30 border-rose-700/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-base shrink-0 mt-0.5">
                      {r.correct ? "✅" : "❌"}
                    </span>
                    <div className="space-y-1">
                      <p className="font-medium text-slate-200">{q.affirmation}</p>
                      <p className="text-slate-400 text-xs">
                        <span className="font-semibold">
                          {q.reponse ? "VRAI" : "FAUX"}
                        </span>{" "}
                        — {q.explication}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link
          href="/quiz"
          className="w-full text-center py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-lg transition-colors"
        >
          Rejouer
        </Link>
        <Link
          href="/"
          className="w-full text-center py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default function ResultatsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12">
      <Suspense fallback={<div className="text-slate-400">Chargement…</div>}>
        <ResultatsContenu />
      </Suspense>
      <BrandFooter />
    </main>
  );
}
