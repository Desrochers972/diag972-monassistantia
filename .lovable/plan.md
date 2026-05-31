## Objectif

Quand l'utilisateur répond « Non concerné » (score 0) à **toutes** les questions d'une thématique, exclure entièrement cette thématique de l'analyse finale (radar, graphique en barres, cartes détaillées, zones d'urgence, score global, et données sauvegardées en base).

## Comportement actuel

Dans `src/components/ResultsDashboard.tsx`, `categoryScores` calcule la moyenne en incluant les réponses à 0 (« Non concerné »). Une thématique entièrement « Non concerné » apparaît donc avec un score de 0/10 et est comptée comme « zone d'urgence », ce qui fausse à la fois l'affichage et le score global.

## Modifications (un seul fichier : `src/components/ResultsDashboard.tsx`)

1. **Filtrage des réponses non concernées dans la moyenne par catégorie**
   - Dans le `useMemo` (ligne 67), calculer `relevantAnswers = catAnswers.filter(a => a.score > 0)`.
   - Si `relevantAnswers.length === 0` → marquer la catégorie comme `isNotApplicable: true` (moyenne non calculée).
   - Sinon, moyenne sur `relevantAnswers` uniquement.

2. **Exclusion des catégories non applicables de tous les agrégats**
   - Créer `applicableCategoryScores = categoryScores.filter(c => !c.isNotApplicable)`.
   - `urgentZones`, `globalAvg`, `radarData`, le graphique en barres et la liste des cartes détaillées utilisent désormais `applicableCategoryScores`.

3. **Sauvegarde en base**
   - `category_scores` (envoyé dans l'`insert` Supabase) ne contient que les catégories applicables.
   - `global_score` est la moyenne de ces seules catégories.
   - Aucune migration n'est nécessaire (le champ `category_scores` est déjà un JSON libre).

4. **Cas limite : toutes les thématiques « Non concerné »**
   - `globalAvg` deviendrait `NaN`. Forcer à `0` dans ce cas et afficher un message neutre dans le dashboard (« Aucune thématique applicable »). Le diagnostic est tout de même enregistré.

## Hors périmètre

- Pas de changement dans `QuestionCard.tsx` (le label « Non concerné » et le score 0 restent inchangés côté saisie).
- Pas de changement dans `Admin.tsx` (lit déjà les champs sauvegardés tels quels).
- Pas de changement dans `questions.ts`.