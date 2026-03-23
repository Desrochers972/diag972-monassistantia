export interface Question {
  id: number;
  text: string;
  type: 'key' | 'revealing';
}

export interface Category {
  id: string;
  name: string;
  icon: string; // lucide icon name
  emoji: string;
  questions: Question[];
}

export const categories: Category[] = [
  {
    id: 'strategy',
    name: 'Stratégie',
    icon: 'Target',
    emoji: '🧭',
    questions: [
      { id: 1, text: "Quelle est votre vision à 3 ans ? Est-elle formalisée ?", type: 'key' },
      { id: 2, text: "Quels sont vos 3 objectifs prioritaires actuellement ?", type: 'key' },
      { id: 3, text: "Comment sont-ils suivis (indicateurs, fréquence) ?", type: 'key' },
      { id: 4, text: "Qu'est-ce qui vous empêche aujourd'hui de croître plus vite ?", type: 'key' },
      { id: 5, text: "Qui sont vos concurrents directs et indirects ?", type: 'key' },
      { id: 6, text: "Quelle est votre proposition de valeur unique ?", type: 'key' },
      { id: 7, text: "Si vous deviez arrêter 30% de votre activité, que supprimeriez-vous ?", type: 'revealing' },
      { id: 8, text: "Quelle décision stratégique repoussez-vous depuis 6 mois ?", type: 'revealing' },
    ],
  },
  {
    id: 'management',
    name: 'Management',
    icon: 'Briefcase',
    emoji: '💼',
    questions: [
      { id: 9, text: "Combien de personnes managez-vous directement ?", type: 'key' },
      { id: 10, text: "Avez-vous des managers intermédiaires ?", type: 'key' },
      { id: 11, text: "Comment fixez-vous les objectifs ?", type: 'key' },
      { id: 12, text: "Comment gérez-vous les conflits ?", type: 'key' },
      { id: 13, text: "À quelle fréquence faites-vous des entretiens individuels ?", type: 'key' },
      { id: 14, text: "Quel collaborateur poserait problème si vous partiez 1 mois ?", type: 'revealing' },
      { id: 15, text: "Avez-vous déjà gardé quelqu'un trop longtemps ?", type: 'revealing' },
    ],
  },
  {
    id: 'hr-crisis',
    name: 'Crises RH',
    icon: 'ShieldAlert',
    emoji: '🚨',
    questions: [
      { id: 16, text: "Avez-vous des tensions internes actuellement ?", type: 'key' },
      { id: 17, text: "Quel est votre taux d'absentéisme / turnover ?", type: 'key' },
      { id: 18, text: "Avez-vous déjà eu des arrêts liés au stress ou burn-out ?", type: 'key' },
      { id: 19, text: "Comment gérez-vous les situations disciplinaires ?", type: 'key' },
      { id: 20, text: "Quelle est la situation humaine la plus difficile que vous avez gérée ?", type: 'revealing' },
      { id: 21, text: "Y a-t-il un salarié « intouchable » dans l'entreprise ?", type: 'revealing' },
    ],
  },
  {
    id: 'finance',
    name: 'Finance & Trésorerie',
    icon: 'Landmark',
    emoji: '📊',
    questions: [
      { id: 22, text: "Quelle est votre trésorerie disponible aujourd'hui ?", type: 'key' },
      { id: 23, text: "À combien de mois de charges correspond-elle ?", type: 'key' },
      { id: 24, text: "Avez-vous un prévisionnel de trésorerie ?", type: 'key' },
      { id: 25, text: "Quels sont vos principaux postes de coûts ?", type: 'key' },
      { id: 26, text: "Quel est votre seuil de rentabilité ?", type: 'key' },
      { id: 27, text: "Avez-vous déjà été en tension de trésorerie ?", type: 'revealing' },
      { id: 28, text: "Quelle dépense vous semble « incompressible » mais ne l'est peut-être pas ?", type: 'revealing' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: 'Megaphone',
    emoji: '📢',
    questions: [
      { id: 29, text: "Comment trouvez-vous vos clients aujourd'hui ?", type: 'key' },
      { id: 30, text: "Quel est votre coût d'acquisition client ?", type: 'key' },
      { id: 31, text: "Avez-vous une stratégie claire ou opportuniste ?", type: 'key' },
      { id: 32, text: "Quelle est votre cible principale ?", type: 'key' },
      { id: 33, text: "Si vous perdez 50% de vos clients demain, pourquoi ?", type: 'revealing' },
      { id: 34, text: "Savez-vous pourquoi vos clients vous choisissent vraiment ?", type: 'revealing' },
    ],
  },
  {
    id: 'digital-marketing',
    name: 'Marketing Digital',
    icon: 'Globe',
    emoji: '🌐',
    questions: [
      { id: 35, text: "Avez-vous un site internet performant ?", type: 'key' },
      { id: 36, text: "Êtes-vous présent sur les réseaux sociaux ?", type: 'key' },
      { id: 37, text: "Utilisez-vous des outils (CRM, emailing, automatisation) ?", type: 'key' },
      { id: 38, text: "Suivez-vous des indicateurs (trafic, conversion) ?", type: 'key' },
      { id: 39, text: "Combien de leads générez-vous sans effort chaque mois ?", type: 'revealing' },
      { id: 40, text: "Votre business dépend-il trop d'un seul canal ?", type: 'revealing' },
    ],
  },
  {
    id: 'secretariat',
    name: 'Secrétariat / Organisation',
    icon: 'FolderOpen',
    emoji: '🧑‍💼',
    questions: [
      { id: 41, text: "Avez-vous des procédures écrites ?", type: 'key' },
      { id: 42, text: "Comment sont gérées les tâches administratives ?", type: 'key' },
      { id: 43, text: "Combien de temps perdez-vous en tâches non productives ?", type: 'key' },
      { id: 44, text: "Utilisez-vous des outils digitaux (ERP, CRM, GED) ?", type: 'key' },
      { id: 45, text: "Qu'est-ce qui vous fait perdre le plus de temps chaque semaine ?", type: 'revealing' },
      { id: 46, text: "Quelles tâches pourriez-vous déléguer immédiatement ?", type: 'revealing' },
    ],
  },
  {
    id: 'rse',
    name: 'RSE & Durabilité',
    icon: 'Leaf',
    emoji: '🌱',
    questions: [
      { id: 47, text: "Avez-vous une démarche RSE formalisée ?", type: 'key' },
      { id: 48, text: "Vos clients sont-ils sensibles à ces sujets ?", type: 'key' },
      { id: 49, text: "Avez-vous des obligations réglementaires spécifiques ?", type: 'key' },
      { id: 50, text: "Mesurez-vous votre impact (social, environnemental) ?", type: 'key' },
      { id: 51, text: "Cette thématique est-elle un levier business ou une contrainte ?", type: 'revealing' },
      { id: 52, text: "Que pourriez-vous améliorer rapidement sans coût ?", type: 'revealing' },
    ],
  },
];

export const finalQuestion = {
  id: 99,
  text: "Si je devais vous aider à résoudre UN seul problème dans votre entreprise, lequel aurait le plus d'impact ?",
};

export interface Answer {
  questionId: number;
  text: string;
  score: number;
}
