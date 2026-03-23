import { useMemo } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { Target, Briefcase, ShieldAlert, Landmark, Megaphone, Globe, FolderOpen, Leaf, AlertTriangle, Download, Calendar } from 'lucide-react';
import { categories, type Answer } from '@/data/questions';

const iconMap: Record<string, React.ElementType> = {
  Target, Briefcase, ShieldAlert, Landmark, Megaphone, Globe, FolderOpen, Leaf,
};

interface ResultsDashboardProps {
  answers: Answer[];
  finalAnswer: string;
  onRestart: () => void;
}

const getScoreColor = (score: number) => {
  if (score < 4) return '#ef4444';
  if (score <= 7) return '#f59e0b';
  return '#22c55e';
};

const getScoreLabel = (score: number) => {
  if (score < 4) return 'Zone d\'urgence';
  if (score <= 7) return 'À améliorer';
  return 'Maîtrisé';
};

const ResultsDashboard = ({ answers, finalAnswer, onRestart }: ResultsDashboardProps) => {
  const categoryScores = useMemo(() => {
    return categories.map((cat) => {
      const catAnswers = answers.filter((a) =>
        cat.questions.some((q) => q.id === a.questionId)
      );
      const avg = catAnswers.length > 0
        ? catAnswers.reduce((sum, a) => sum + a.score, 0) / catAnswers.length
        : 0;
      return {
        category: cat.name,
        categoryId: cat.id,
        icon: cat.icon,
        emoji: cat.emoji,
        score: Math.round(avg * 10) / 10,
        fullMark: 10,
        answers: catAnswers,
        questions: cat.questions,
      };
    });
  }, [answers]);

  const urgentZones = categoryScores.filter((c) => c.score < 4);
  const globalAvg = categoryScores.reduce((s, c) => s + c.score, 0) / categoryScores.length;

  const radarData = categoryScores.map((c) => ({
    subject: c.emoji + ' ' + c.category,
    score: c.score,
    fullMark: 10,
  }));

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Résultats du diagnostic
          </h1>
          <p className="text-muted-foreground text-lg">
            Score global :{' '}
            <span className="font-bold text-2xl" style={{ color: getScoreColor(globalAvg) }}>
              {globalAvg.toFixed(1)}
            </span>
            <span className="text-muted-foreground">/10</span>
          </p>
        </div>

        {/* Urgent zones alert */}
        {urgentZones.length > 0 && (
          <div className="glass-card p-6 mb-8 border-score-critical/30 animate-fade-in" style={{ borderColor: 'hsl(0, 72%, 51%, 0.3)' }}>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-score-critical" />
              <h2 className="text-lg font-heading font-semibold text-score-critical">
                Zones d'urgence identifiées ({urgentZones.length})
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {urgentZones.map((z) => (
                <span key={z.categoryId} className="px-3 py-1.5 rounded-full bg-score-critical/10 text-score-critical text-sm font-medium border border-score-critical/20">
                  {z.emoji} {z.category} — {z.score}/10
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Radar */}
          <div className="glass-card p-6 animate-fade-in">
            <h3 className="text-lg font-heading font-semibold mb-4">Vue d'ensemble</h3>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(222, 30%, 18%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(210, 40%, 70%)', fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="hsl(217, 91%, 60%)"
                  fill="hsl(217, 91%, 60%)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar chart */}
          <div className="glass-card p-6 animate-fade-in">
            <h3 className="text-lg font-heading font-semibold mb-4">Scores par catégorie</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={categoryScores} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis type="number" domain={[0, 10]} tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }} />
                <YAxis type="category" dataKey="emoji" tick={{ fontSize: 16 }} width={30} />
                <Tooltip
                  contentStyle={{ background: 'hsl(222, 47%, 9%)', border: '1px solid hsl(222, 30%, 18%)', borderRadius: 8, color: 'hsl(210, 40%, 96%)' }}
                  formatter={(value: number) => [value.toFixed(1) + '/10', 'Score']}
                  labelFormatter={(label) => {
                    const cat = categoryScores.find(c => c.emoji === label);
                    return cat ? cat.category : label;
                  }}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {categoryScores.map((entry) => (
                    <Cell key={entry.categoryId} fill={getScoreColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category details */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {categoryScores.map((cat) => {
            const Icon = iconMap[cat.icon];
            return (
              <div key={cat.categoryId} className="glass-card p-5 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: getScoreColor(cat.score) + '20' }}>
                      <Icon className="w-5 h-5" style={{ color: getScoreColor(cat.score) }} />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold">{cat.category}</h4>
                      <span className="text-xs" style={{ color: getScoreColor(cat.score) }}>
                        {getScoreLabel(cat.score)}
                      </span>
                    </div>
                  </div>
                  <span className="text-2xl font-heading font-bold" style={{ color: getScoreColor(cat.score) }}>
                    {cat.score}
                  </span>
                </div>

                {/* Text answers summary */}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {cat.answers.filter(a => a.text.trim()).map((a) => {
                    const q = cat.questions.find(q => q.id === a.questionId);
                    return (
                      <div key={a.questionId} className="text-xs">
                        <p className="text-muted-foreground">{q?.text}</p>
                        <p className="text-foreground/80 mt-0.5 pl-2 border-l-2" style={{ borderColor: getScoreColor(a.score) }}>
                          {a.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Final answer */}
        {finalAnswer && (
          <div className="glass-card p-6 mb-8 border-primary/30 animate-fade-in">
            <h3 className="text-lg font-heading font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Problème prioritaire identifié
            </h3>
            <p className="text-foreground/90 leading-relaxed">{finalAnswer}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors"
          >
            <Download className="w-5 h-5" />
            Exporter en PDF
          </button>
          <button
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
          >
            <Calendar className="w-5 h-5" />
            Prendre RDV avec un consultant
          </button>
        </div>

        <div className="text-center mt-8">
          <button onClick={onRestart} className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
            Recommencer le diagnostic
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
