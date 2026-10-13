# Migration des données depuis la version actuelle (safe refactor)

Suivez ces étapes pour migrer *réellement* les données (la grande variable `state` présente dans l'index original) vers la version refactorisée sans toucher à la version de production.

Principe
- La branche `refactor/safe` charge le state depuis localStorage sous la clé `edt_state_v1`.
- Nous allons sauvegarder l'état actuel (défini par la variable `state` dans `index.html`) dans localStorage depuis la page originale, puis ouvrir `index.refactor.html` qui lira ces données.

Étapes (très simples)

1) Ouvrir la version actuelle (originale) de ton application dans le navigateur
   - si tu utilises GitHub Pages : https://mamborodrigue1-gif.github.io/gestion-emplois-temps-3-ecoles/
   - ou si tu as un serveur local, ouvre `index.html` localement via `http://localhost:8000/` (ou chemin équivalent)

2) Ouvrir la console du navigateur (F12 → Console)

3) Dans la console, coller et exécuter exactement ce script :

```javascript
try {
  if (typeof state === 'undefined') throw new Error('variable `state` introuvable sur la page.');
  localStorage.setItem('edt_state_v1', JSON.stringify(state));
  console.log('✔️ État sauvegardé dans localStorage sous la clé edt_state_v1 (taille:', (localStorage.getItem('edt_state_v1')||'').length + ')');
} catch (e) {
  console.error('Échec de l export de l état :', e);
}
```

- Ce script prend la variable `state` existante (la structure lourde avec `profs`, `salles`, etc.) et l'enregistre dans le localStorage sous la clé attendue par la nouvelle version.
- Si la variable `state` n'est pas visible globalement (peu probable), tu me transmettras un message et je te fournirai une alternative plus ciblée.

4) Ouvrir la version refactorisée de test :
   - si tu sers localement (depuis la racine du repo) : http://localhost:8000/index.refactor.html
   - si tu ouvres localement le fichier avec un serveur, la page lira automatiquement la clé `edt_state_v1` et affichera les données sauvegardées.

5) Vérifier :
   - console du navigateur doit afficher : `App bootstrapped (refactor safe)`
   - dans la carte, tu dois voir les valeurs (Écoles, Créneaux, Profs) correspondant à ton état réel
   - tu peux cliquer sur "Télécharger l'état (JSON)" pour récupérer le fichier et vérifier le contenu

Problèmes fréquents et solutions rapides
- Si la console dit que `state` est introuvable :
  - assure-toi d'avoir ouvert la **version originale** (index.html) et non `index.refactor.html`.
  - si la variable est encapsulée dans une fonction (non globale) je peux te fournir un script plus avancé pour retrouver et sérialiser les données.

- Si `index.refactor.html` affiche des champs vides :
  - vérifie que la clé `edt_state_v1` existe dans les DevTools → Application → Local Storage
  - si elle existe mais contient une structure différente, télécharge le JSON (bouton "Télécharger l'état") et colle-le ici pour que je le corrige.

Après la validation
- Quand tu as confirmé que `index.refactor.html` lit correctement tes données et que tout est OK, nous pourrons :
  1) déplacer progressivement les gros tableaux (profs, filières) dans `src/defaultData.js` si tu veux que les valeurs par défaut soient versionnées dans le code,
  2) ou prévoir un import JSON géré par un script `tools/import-state.js` pour insérer les données dans le repo proprement (si tu veux garder l'historique).

Souhaites-tu que je produise aussi :
- A) un fichier `src/defaultData.js` contenant la copie complète versionnée des données (gros fichier) à committer dans la branche, ou
- B) un script d'import qui lit `edt-state.json` (exporté depuis la page) et le place dans `src/defaultData.js` automatiquement ?

Dis-moi A ou B ou si tu veux d'abord faire l'export depuis la page (je peux te corriger en direct si ça coince).