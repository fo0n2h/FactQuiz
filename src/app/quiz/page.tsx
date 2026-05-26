"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import questionsData from "../../../data/questions.json";
import type { Question, ReponseUtilisateur } from "@/types/question";
import BrandFooter from "@/components/BrandFooter";

const questions = questionsData as Question[];

type EtatQuestion = "en-attente" | "correct" | "incorrect";

export default function QuizPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [etat, setEtat] = useState<EtatQuestion>("en-attente");
  const [reponses, setReponses] = useState<ReponseUtilisateur[]>([]);

  const question = questions[index];
  const progression = ((index + 1) / questions.length) * 100;

  function repondre(reponse: boolean) {
    if (etat !== "en-attente") return;

    const correct = reponse === question.reponse;
    setEtat(correct ? "correct" : "incorrect");
    setReponses((prev) => [
      ...prev,
      { questionId: question.id, reponse, correct },
    ]);
  }

  function suivant() {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setEtat("en-attente");
    } else {
      const score = reponses.filter((r) => r.correct).length + (etat === "correct" ? 1 : 0);
      const total = questions.length;
      // Encode les réponses dans localStorage pour la page résultats
      const toutesReponses: ReponseUtilisateur[] = [
        ...reponses,
        {
          questionId: question.id,
          reponse: etat === "correct" ? question.reponse : !question.reponse,
          correct: etat === "correct",
        },
      ];
      localStorage.setItem("factquiz_reponses", JSON.stringify(toutesReponses));
      router.push(`/resultats?score=${score}&total=${total}`);
    }
  }

  const isLastQuestion = index === questions.length - 1;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-400">
            <span>Question {index + 1} / {questions.length}</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs">
              {question.categorie}
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progression}%` }}
            />
          </div>
        </div>

        {/* Carte question */}
        <div className="bg-slate-800 rounded-2xl p-8 shadow-xl min-h-[180px] flex items-center justify-center">
          <p className="text-xl font-semibold text-center leading-relaxed">
            {question.affirmation}
          </p>
        </div>

        {/* Boutons réponse */}
        {etat === "en-attente" && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => repondre(true)}
              className="py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 font-bold text-xl transition-colors duration-150 shadow-lg"
            >
              ✅ VRAI
            </button>
            <button
              onClick={() => repondre(false)}
              className="py-5 rounded-2xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 font-bold text-xl transition-colors duration-150 shadow-lg"
            >
              ❌ FAUX
            </button>
          </div>
        )}

        {/* Feedback */}
        {etat !== "en-attente" && (
          <div className="space-y-4">
            <div
              className={`rounded-2xl p-6 border ${
                etat === "correct"
                  ? "bg-emerald-900/40 border-emerald-500/40 text-emerald-200"
                  : "bg-rose-900/40 border-rose-500/40 text-rose-200"
              }`}
            >
              <div className="font-bold text-lg mb-2">
                {etat === "correct" ? "✅ Bonne réponse !" : "❌ Mauvaise réponse"}
              </div>
              <p className="text-sm leading-relaxed opacity-90">
                {question.explication}
              </p>
            </div>

            <button
              onClick={suivant}
              className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 font-bold text-lg transition-colors duration-150"
            >
              {isLastQuestion ? "Voir mes résultats →" : "Question suivante →"}
            </button>
          </div>
        )}
        <BrandFooter />
      </div>
    </main>
  );
}
