# L'expert NRBC
Jeu de révision. Le fichier `index.html` est chiffré (AES-GCM, PBKDF2-SHA256 600 000 itérations) : il faut le mot de passe pour l'ouvrir.

Mise à jour : déchiffrer `index.html` avec `outils/dechiffrer.mjs`, modifier le jeu, rechiffrer avec `outils/chiffrer.mjs`, puis pousser sur `main`.
Ne jamais committer le jeu en clair ni le mot de passe.
