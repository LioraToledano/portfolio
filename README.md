# Portfolio Liora Toledano

Portfolio React + TypeScript + Vite + Tailwind, déployé sur GitHub Pages.

## Contenu

- Accueil / présentation, CV téléchargeable
- À propos, expériences, compétences et formation
- Formulaire de contact enregistré dans une base MySQL (API PHP)
- Espace admin pour lire les messages : adresse privée définie dans `.env` (`VITE_ADMIN_PATH`)

## Installation

```bash
npm install
npm run dev
```

Pour vérifier le build de production :

```bash
npm run build
```

## Formulaire de contact et espace messages (PHP + MySQL)

Les messages du formulaire sont enregistrés dans une base **MySQL** par une petite
API PHP (dossier `api/`). Ils se lisent sur la page privée du site (adresse dans `.env`, `VITE_ADMIN_PATH`),
ou directement dans phpMyAdmin (base `portfolio`, table `messages`).

```
api/
  bootstrap.php       connexion MySQL, session, sécurité (commun)
  contact.php         POST : enregistre un message du formulaire
  auth.php            connexion / déconnexion de l'admin
  messages.php        liste, marquer comme lu, supprimer (admin connectée)
  setup.php           création du compte admin (une seule fois)
  config.example.php  modèle de configuration → copier en config.php
database/schema.sql   tables messages, admins, login_attempts
```

### En local avec MAMP

1. Démarrer MAMP (MySQL). Le port MySQL est indiqué dans MAMP → Préférences → Ports.
2. phpMyAdmin → **Importer** → `database/schema.sql` → Exécuter
   (crée la base `portfolio`).
3. Copier `api/config.example.php` en `api/config.php` et vérifier le port et
   les identifiants MySQL (MAMP : `root` / `root`).
4. Lancer `npm run dev` : cette commande démarre le site (`http://localhost:5180`)
   et l'API PHP (`localhost:8000`, PHP de MAMP, ou `PHP_BIN` s'il est défini).
   Ctrl+C arrête les deux.
5. Ouvrir `http://localhost:5180/api/setup.php` une fois pour créer le compte admin
   (email + mot de passe), puis se connecter sur `http://localhost:5180/#/<VITE_ADMIN_PATH>`.

### En ligne

GitHub Pages n'exécute pas PHP : l'API doit être chez un hébergeur PHP + MySQL
(o2switch, Hostinger, OVH, IONOS…).

- **Le plus simple** : tout mettre chez cet hébergeur. Envoyer le contenu de `dist/`
  (après `npm run build`) et le dossier `api/` à la racine du site, importer
  `database/schema.sql` dans son phpMyAdmin, créer `api/config.php` avec les
  identifiants MySQL fournis par l'hébergeur, puis ouvrir `/api/setup.php`.
- **Site sur GitHub Pages + API ailleurs** : mettre l'API chez l'hébergeur, puis
  dans `api/config.php` : `allowed_origins => ['https://votre-pseudo.github.io']`
  et `cross_site => true` ; dans GitHub, ajouter les secrets `VITE_API_URL` et `VITE_ADMIN_PATH`
  (ex. `https://votre-domaine.fr/api`).

Sécurité : mots de passe chiffrés (`password_hash`), requêtes préparées (PDO),
5 tentatives de connexion max par 15 min, 5 messages max par 10 min et par IP,
champ piège anti-robots, `config.php` exclu de git et bloqué par `.htaccess`.
Après avoir créé le compte, `setup.php` se désactive tout seul (il peut aussi être supprimé).

## CV

- `public/CV_Liora_Toledano_Full-Stack.pdf` : CV téléchargeable sur le site.
- Le CV se modifie sur Canva, puis s'exporte en PDF sous ce même nom.
