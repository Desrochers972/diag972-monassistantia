import { Target, Briefcase, ShieldAlert, Landmark, Megaphone, Globe, FolderOpen, Leaf, ArrowRight } from "lucide-react";
import { categories } from "@/data/questions";

const iconMap: Record<string, React.ElementType> = {
  Target,
  Briefcase,
  ShieldAlert,
  Landmark,
  Megaphone,
  Globe,
  FolderOpen,
  Leaf,
};

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="max-w-3xl w-full text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-primary font-medium">Diagnostic Entreprise</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
          Identifiez vos zones de risques et d'opportunités
        </h1>

        <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
          Un diagnostic complet en 8 piliers pour évaluer la santé de votre TPE/PME et prioriser vos actions.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon];
            return (
              <div
                key={cat.id}
                className="glass-card p-4 flex flex-col items-center gap-2 hover:border-primary/40 transition-colors"
              >
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-foreground/80">{cat.name}</span>
                <span className="text-[10px] text-muted-foreground">{cat.questions.length} questions</span>
              </div>
            );
          })}
        </div>

        <button
          onClick={onStart}
          className="gradient-primary text-primary-foreground font-semibold px-8 py-4 rounded-xl text-lg inline-flex items-center gap-3 hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
        >
          Commencer le diagnostic
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-xs text-muted-foreground mt-6">⏱ Environ 20 minutes • Vos données restent confidentielles</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
