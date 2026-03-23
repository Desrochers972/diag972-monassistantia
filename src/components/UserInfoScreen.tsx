import { useState } from 'react';
import { ArrowRight, Mail, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface UserInfoScreenProps {
  onContinue: (email: string, companyName: string) => void;
  existingEmail?: string;
  existingCompanyName?: string;
}

const UserInfoScreen = ({ onContinue, existingEmail = '', existingCompanyName = '' }: UserInfoScreenProps) => {
  const [email, setEmail] = useState(existingEmail);
  const [companyName, setCompanyName] = useState(existingCompanyName);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: 'var(--gradient-hero)' }}>
      <div className="max-w-xl w-full animate-fade-in">
        <div className="glass-card p-10">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-center">
            Avant de commencer
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Quelques informations pour personnaliser votre diagnostic
          </p>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Nom de votre entreprise
              </label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Ex: Ma Société SAS"
                className="bg-background/50 border-border/50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Indiquez votre adresse mail si vous souhaitez recevoir votre diagnostic
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="bg-background/50 border-border/50"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={() => onContinue(email, companyName)}
              className="gradient-primary text-primary-foreground font-semibold px-8 py-3 rounded-xl inline-flex items-center gap-3 hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Commencer
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoScreen;
