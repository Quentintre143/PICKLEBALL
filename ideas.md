# Pickleball aux 2 Alpes - Direction de Design

## Approche Choisie : "Mountain Energy"

### Design Movement
**Moderne Dynamique Alpin** - Fusion entre l'énergie sportive contemporaine et la majesté naturelle des Alpes. Inspiré par les stations de ski haut de gamme et les marques de sport lifestyle premium.

### Core Principles
1. **Énergie Visible** - Mouvement, couleurs vives, dynamisme constant
2. **Authenticité Montagne** - Intégration naturelle du contexte alpin (pics, lumière, altitude)
3. **Accessibilité Ludique** - Sport pour tous les âges, ambiance festive et conviviale
4. **Appel à l'Action Irrésistible** - Sondage et participation au cœur du message

### Color Philosophy
- **Primaire** : Bleu électrique vif (`#0066FF`) - énergie, sport, ciel alpin
- **Secondaire** : Orange chaud (`#FF6B35`) - dynamisme, soleil, action
- **Accent** : Vert montagne (`#2D9E4A`) - nature, santé, bien-être
- **Neutre** : Blanc pur et gris ardoise - clarté alpine, contraste
- **Gradient Hero** : Bleu électrique → Bleu ciel (référence au ciel alpin)

### Layout Paradigm
- **Hero Section** : Image plein écran avec gradient overlay, texte centré mais dynamique
- **Sections Alternées** : Contenu à gauche/droite avec images flottantes
- **Asymétrie Intentionnelle** : Pas de grille rigide, mais flux organique
- **Sondage Sticky** : Formulaire flottant ou section fixe pour maximiser les réponses

### Signature Elements
1. **Icône Paddle** - Symbole graphique stylisé (paddle + montagne)
2. **Gradient Diagonal** - Lignes diagonales qui traversent les sections
3. **Cercles Dynamiques** - Éléments circulaires en arrière-plan (balles, mouvement)

### Interaction Philosophy
- Hover effects subtils mais visibles (scale, shadow, color shift)
- Scroll triggers pour révéler le contenu progressivement
- Boutons avec micro-interactions (ripple, pulse)
- Sondage avec feedback immédiat (toast, animation)

### Animation
- **Entrée** : Éléments apparaissent avec scale(0.95) → scale(1) + opacity fade
- **Scroll** : Parallax léger sur les images (depth effect)
- **Hover** : Boutons scale(1.05) avec shadow boost
- **Sondage** : Transition fluide entre questions, feedback visuel sur sélection

### Typography System
- **Display** : "Poppins Bold" (700) - titres principaux, énergie
- **Heading** : "Poppins SemiBold" (600) - sous-titres
- **Body** : "Inter Regular" (400) - contenu, lisibilité
- **Accent** : "Poppins Medium" (500) - CTAs, labels

### Brand Essence
**Positionnement** : Le pickleball est le sport montagne qui unit tous les âges dans la joie et la convivialité.
**Personnalité** : Dynamique, Inclusif, Authentique.

### Brand Voice
- **Tone** : Enthousiaste mais pas agressif, accueillant, inspirant
- **Exemple 1** : "Jouer, rire, partager - le pickleball pour tous aux 2 Alpes"
- **Exemple 2** : "Votre avis compte - aidez-nous à amener le pickleball à la station"

### Signature Brand Color
**Bleu Électrique** (`#0066FF`) - Unmistakable, énergique, montagne moderne.

### Logo Concept
Paddle stylisé avec montagne intégrée (triangle dans la palette), couleur bleu électrique sur fond transparent.

---

## Sections de la Page

1. **Hero** - Image plein écran + CTA principal
2. **Qu'est-ce que le Pickleball ?** - Description + vidéo YouTube
3. **Pourquoi aux 2 Alpes ?** - Avantages + images
4. **Galerie** - Photos d'action + ambiance
5. **Sondage** - Formulaire interactif (sticky ou section)
6. **Footer** - Contact mairie + liens

---

## Directives de Codage

- Utiliser Tailwind 4 avec OKLCH colors
- Composants shadcn/ui pour cohérence
- Animations via Framer Motion (optionnel) ou CSS transitions
- Images générées IA pour hero + sections principales
- Responsive mobile-first
- Accessibilité : contraste WCAA AA minimum
