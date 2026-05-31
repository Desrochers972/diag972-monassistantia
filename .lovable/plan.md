### Objectif
Ajouter en haut de la page de questions (QuestionCard) une instruction visible pour guider l'utilisateur.

### Modification
- **Fichier** : `src/components/QuestionCard.tsx`
- **Emplacement** : Sous la barre de progression, avant le badge de catégorie.
- **Contenu** : *"Pour chaque question répondez avec vos propres mots et donnez une évaluation sur 10 de la situation de votre entreprise par rapport à la question."*
- **Style** : gras (`font-bold`), italique (`italic`), jaune (`text-yellow-400` ou équivalent via les tokens de couleur du projet si disponible).