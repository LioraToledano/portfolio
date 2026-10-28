<?php
// Copier ce fichier en config.php et renseigner les valeurs.
// config.php contient le mot de passe MySQL : il ne doit jamais être publié (voir .gitignore).

return [
    // Connexion MySQL
    // MAMP en local : hôte 127.0.0.1, port 3306 ou 8889 (voir MAMP → Préférences → Ports), utilisateur root, mot de passe root
    'db_host' => '127.0.0.1',
    'db_port' => 8889,
    'db_name' => 'portfolio',
    'db_user' => 'root',
    'db_pass' => 'root',

    // Origines autorisées à appeler l'API (le site React).
    // Laisser vide si le site et l'API sont sur le même domaine.
    // Exemple si le site reste sur GitHub Pages : ['https://votre-pseudo.github.io']
    'allowed_origins' => [],

    // Mettre true uniquement si le site et l'API sont sur deux domaines différents
    // (ex. site sur GitHub Pages, API chez un hébergeur PHP). Nécessite HTTPS.
    'cross_site' => false,

    // Jeton secret pour ouvrir /api/setup.php?token=... (création du compte admin).
    // Mettre une longue chaîne aléatoire ; laisser vide pour désactiver complètement setup.php.
    'setup_token' => 'changez-moi-jeton-de-creation',

    // Sel secret pour anonymiser les adresses IP (mettre une longue chaîne aléatoire)
    'ip_salt' => 'changez-moi-par-une-longue-chaine-aleatoire',
];
