import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface FinalQuestionProps {
  existingAnswer?: string;
  onSubmit: (answer: string) => void;
  onBack: () => void;
}

const FinalQuestion = ({ existingAnswer, onSubmit, onBack }: FinalQuestionProps) => {
  const [text, setText] = useState(existingAnswer || '');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--gradient-hero)' }}>
      <div className="w-full h-1 bg-secondary">
        <div className="h-full gradient-primary w-[95%] transition-all duration-500" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full animate-fade-in">
          <div className="glass-card p-10 text-center">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              La question essentielle
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Si je devais vous aider à résoudre <strong className="text-foreground">UN seul problème</strong> dans votre entreprise, lequel aurait le plus d'impact ?
            </p>

            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Décrivez le problème qui, une fois résolu, changerait tout..."
              className="bg-[hsl(var(--textarea))] border-border min-h-[150px] text-[hsl(var(--textarea-foreground))] placeholder:text-muted-foreground resize-none mb-8 text-left"
            />

            <div className="flex justify-between">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </button>
              <button
                onClick={() => onSubmit(text)}
                className="gradient-primary text-primary-foreground font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              >
                Voir mes résultats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalQuestion;
