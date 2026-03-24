import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Lock, ArrowLeft, CheckCircle, XCircle, Calendar, Building2, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'diag972admin';

interface DiagnosticRow {
  id: string;
  company_name: string | null;
  user_email: string | null;
  global_score: number;
  wants_consultant_rdv: boolean;
  created_at: string;
  category_scores: any;
  answers: any;
  final_answer: string | null;
}

const getScoreColor = (score: number) => {
  if (score < 4) return 'text-score-critical';
  if (score <= 7) return 'text-score-warning';
  return 'text-score-good';
};

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [diagnostics, setDiagnostics] = useState<DiagnosticRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDiag, setSelectedDiag] = useState<DiagnosticRow | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    supabase
      .from('diagnostics')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setDiagnostics((data as DiagnosticRow[]) || []);
        setLoading(false);
      });
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--gradient-hero)' }}>
        <div className="glass-card p-8 max-w-sm w-full animate-fade-in">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-xl font-heading font-bold">Accès Administrateur</h1>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="bg-background/50 border-border/50"
            />
            {error && <p className="text-score-critical text-sm">{error}</p>}
            <Button type="submit" className="w-full gradient-primary">
              Connexion
            </Button>
          </form>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center"
          >
            ← Retour au diagnostic
          </button>
        </div>
      </div>
    );
  }

  if (selectedDiag) {
    const scores = Array.isArray(selectedDiag.category_scores) ? selectedDiag.category_scores : [];
    const answers = Array.isArray(selectedDiag.answers) ? selectedDiag.answers : [];
    return (
      <div className="min-h-screen px-4 py-8" style={{ background: 'var(--gradient-hero)' }}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedDiag(null)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à la liste
          </button>

          <div className="glass-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-heading font-bold">{selectedDiag.company_name || 'Sans nom'}</h2>
                <p className="text-sm text-muted-foreground">{selectedDiag.user_email || 'Pas d\'email'}</p>
              </div>
              <div className="text-right">
                <span className={`text-3xl font-heading font-bold ${getScoreColor(selectedDiag.global_score)}`}>
                  {selectedDiag.global_score}
                </span>
                <span className="text-muted-foreground">/10</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(selectedDiag.created_at).toLocaleString('fr-FR')}
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              {selectedDiag.wants_consultant_rdv ? (
                <span className="text-score-good flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Souhaite un RDV consultant</span>
              ) : (
                <span className="text-muted-foreground flex items-center gap-1"><XCircle className="w-4 h-4" /> Pas de RDV souhaité</span>
              )}
            </div>
          </div>

          {/* Scores par catégorie */}
          <div className="glass-card p-6 mb-6">
            <h3 className="font-heading font-semibold mb-4">Scores par catégorie</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {scores.map((s: any) => (
                <div key={s.categoryId} className="bg-secondary/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{s.category}</p>
                  <p className={`text-xl font-heading font-bold ${getScoreColor(s.score)}`}>{s.score}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Réponses */}
          <div className="glass-card p-6 mb-6">
            <h3 className="font-heading font-semibold mb-4">Réponses détaillées</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {answers.map((a: any) => (
                <div key={a.questionId} className="text-sm border-l-2 pl-3" style={{ borderColor: a.score < 4 ? '#ef4444' : a.score <= 7 ? '#f59e0b' : '#22c55e' }}>
                  <p className="text-muted-foreground">Q{a.questionId} — Score: <span className={getScoreColor(a.score)}>{a.score}/10</span></p>
                  {a.text && <p className="text-foreground/80 mt-0.5">{a.text}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Question finale */}
          {selectedDiag.final_answer && (
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold mb-2">🎯 Problème prioritaire</h3>
              <p className="text-foreground/90">{selectedDiag.final_answer}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--gradient-hero)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-heading font-bold">Diagnostics enregistrés</h1>
          <span className="text-sm text-muted-foreground">{diagnostics.length} résultat(s)</span>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-center py-12">Chargement...</p>
        ) : diagnostics.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-muted-foreground">Aucun diagnostic enregistré</p>
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead><Calendar className="w-4 h-4 inline mr-1" />Date</TableHead>
                  <TableHead><Building2 className="w-4 h-4 inline mr-1" />Entreprise</TableHead>
                  <TableHead><Mail className="w-4 h-4 inline mr-1" />Email</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>RDV</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {diagnostics.map((d) => (
                  <TableRow
                    key={d.id}
                    className="border-border/30 cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={() => setSelectedDiag(d)}
                  >
                    <TableCell className="text-sm">
                      {new Date(d.created_at).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell className="font-medium">{d.company_name || '—'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{d.user_email || '—'}</TableCell>
                    <TableCell>
                      <span className={`font-heading font-bold ${getScoreColor(d.global_score)}`}>
                        {d.global_score}
                      </span>
                    </TableCell>
                    <TableCell>
                      {d.wants_consultant_rdv ? (
                        <CheckCircle className="w-4 h-4 text-score-good" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground/40" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
