import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Lightbulb } from "lucide-react";
import type { Question, Answer } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  categoryName: string;
  categoryEmoji: string;
  questionIndex: number;
  totalQuestions: number;
  globalIndex: number;
  globalTotal: number;
  existingAnswer?: Answer;
  onAnswer: (answer: Answer) => void;
  onBack: () => void;
  isFirst: boolean;
}

const scoreLabels: Record<number, string> = {
  0: "Non concerné",
  1: "Critique",
  2: "Très faible",
  3: "Faible",
  4: "Insuffisant",
  5: "Moyen",
  6: "Correct",
  7: "Bon",
  8: "Très bon",
  9: "Excellent",
  10: "Solution en place",
};

const getScoreColor = (score: number) => {
  if (score <= 3) return "text-score-critical";
  if (score <= 7) return "text-score-warning";
  return "text-score-good";
};

const QuestionCard = ({
  question,
  categoryName,
  categoryEmoji,
  questionIndex,
  totalQuestions,
  globalIndex,
  globalTotal,
  existingAnswer,
  onAnswer,
  onBack,
  isFirst,
}: QuestionCardProps) => {
  const [text, setText] = useState(existingAnswer?.text || "");
  const [score, setScore] = useState(existingAnswer?.score ?? 5);

  useEffect(() => {
    setText(existingAnswer?.text || "");
    setScore(existingAnswer?.score ?? 5);
  }, [question.id, existingAnswer]);

  const handleNext = () => {
    onAnswer({ questionId: question.id, text, score });
  };

  const progress = ((globalIndex + 1) / globalTotal) * 100;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--gradient-hero)" }}>
      {/* Progress bar */}
      <div className="w-full h-1 bg-secondary">
        <div
          className="h-full gradient-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <p className="max-w-2xl w-full text-center font-bold italic text-yellow-400 mb-6">
          Pour chaque question répondez librement et donnez une évaluation sur 10 de la situation de votre entreprise
          par rapport à la question.
        </p>
        <div className="max-w-2xl w-full animate-fade-in flex-1 flex flex-col justify-center">
          {/* Category badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border">
              <span>{categoryEmoji}</span>
              <span className="text-sm font-medium text-foreground">{categoryName}</span>
              <span className="text-xs text-muted-foreground">
                ({questionIndex + 1}/{totalQuestions})
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Question {globalIndex + 1} / {globalTotal}
            </span>
          </div>

          {/* Question */}
          <div className="glass-card p-8 mb-6">
            <div className="flex items-start gap-3 mb-6">
              {question.type === "revealing" && (
                <Lightbulb className="w-5 h-5 text-score-warning mt-0.5 flex-shrink-0" />
              )}
              <h2 className="text-xl md:text-2xl font-heading font-semibold leading-relaxed">{question.text}</h2>
            </div>

            {/* Text response */}
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Votre réponse..."
              className="bg-card border-border min-h-[100px] text-foreground placeholder:text-muted-foreground resize-none mb-8"
            />

            {/* Score slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Évaluez votre situation</span>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-heading font-bold ${getScoreColor(score)}`}>{score}</span>
                  <span className="text-xs text-muted-foreground">/10</span>
                </div>
              </div>

              <Slider
                value={[score]}
                onValueChange={(v) => setScore(v[0])}
                min={0}
                max={10}
                step={1}
                className="py-2"
              />

              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Non concerné</span>
                <span>Critique</span>
                <span>Moyen</span>
                <span>Bon</span>
                <span>Solution en place</span>
              </div>

              <p className={`text-sm font-medium text-center ${getScoreColor(score)}`}>{scoreLabels[score]}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={onBack}
              disabled={isFirst}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Précédent
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Suivant
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
