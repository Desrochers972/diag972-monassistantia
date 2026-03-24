export interface Question {
  id: number;
  text: string;
  type: "key" | "revealing";
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
    id: "strategy",
    name: "Stratégie",
    icon: "Target",
    emoji: "🧭",
    questions: [
      { id: 1, text: "Quelle est votre vision à 3 ans ? Est-elle formalisée ?", type: "key" },
      { id: 2, text: "Quels sont vos 3 objectifs prioritaires actuellement ?", type: "key" },
      { id: 3, text: "Comment sont-ils suivis (indicateurs, fréquence) ?", type: "key" },
      { id: 4, text: "Qu'est-ce qui vous empêche aujourd'hui de croître plus vite ?", type: "key" },
      { id: 5, text: "Qui sont vos concurrents directs et indirects ?", type: "key" },
    ],
  },
  {
    id: "management",
    name: "Management",
    icon: "Briefcase",
    emoji: "💼",
    questions: [
      { id: 6, text: "Comment fixez-vous les objectifs ?", type: "key" },
      { id: 7, text: "Comment gérez-vous les conflits ?", type: "key" },
      { id: 8, text: "À quelle fréquence faites-vous des entretiens individuels ?", type: "key" },
    ],
  },
  {
    id: "hr-crisis",
    name: "Crises RH",
    icon: "ShieldAlert",
    emoji: "🚨",
    questions: [
      { id: 9, text: "Avez-vous des tensions internes actuellement ?", type: "key" },
      { id: 10, text: "Avez-vous déjà eu des arrêts liés au stress ou burn-out ?", type: "key" },
      { id: 11, text: "Comment gérez-vous les situations disciplinaires ?", type: "key" },
    ],
  },
  {
    id: "finance",
    name: "Finance & Trésorerie",
    icon: "Landmark",
    emoji: "📊",
    questions: [
      { id: 12, text: "Combien de mois de charges avez-vous en trésorerie aujourd'hui ?", type: "key" },
      { id: 13, text: "Avez-vous un prévisionnel de trésorerie ?", type: "key" },
      { id: 14, text: "Quels sont vos principaux postes de coûts ?", type: "key" },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: "Megaphone",
    emoji: "📢",
    questions: [
      { id: 15, text: "Comment trouvez-vous vos clients aujourd'hui ?", type: "key" },
      { id: 16, text: "Quelle est votre cible principale ?", type: "key" },
      { id: 17, text: "Savez-vous pourquoi vos clients vous choisissent vraiment ?", type: "revealing" },
    ],
  },
  {
    id: "digital-marketing",
    name: "Marketing Digital",
    icon: "Globe",
    emoji: "🌐",
    questions: [
      { id: 18, text: "Avez-vous un site internet performant ?", type: "key" },
      { id: 19, text: "Êtes-vous présent sur les réseaux sociaux ?", type: "key" },
      { id: 20, text: "Suivez-vous des indicateurs (trafic, conversion) ?", type: "key" },
    ],
  },
  {
    id: "secretariat",
    name: "Secrétariat / Organisation",
    icon: "FolderOpen",
    emoji: "🧑‍💼",
    questions: [
      { id: 21, text: "Avez-vous des procédures écrites ?", type: "key" },
      { id: 22, text: "Comment sont gérées les tâches administratives ?", type: "key" },
      { id: 23, text: "Combien de temps perdez-vous en tâches non productives ?", type: "key" },
    ],
  },
  {
    id: "rse",
    name: "RSE & Durabilité",
    icon: "Leaf",
    emoji: "🌱",
    questions: [
      { id: 24, text: "Avez-vous une démarche RSE formalisée ?", type: "key" },
      { id: 25, text: "Vos clients sont-ils sensibles à ces sujets ?", type: "key" },
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
