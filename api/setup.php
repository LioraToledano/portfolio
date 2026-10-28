<?php
// Création du compte administratrice — utilisable UNE SEULE FOIS :
// dès qu'un compte existe dans la table admins, cette page refuse toute création.
// Ouvrir /api/setup.php?token=<setup_token de config.php> dans le navigateur.
// Le jeton empêche quelqu'un d'autre de créer un compte avant vous sur un site fraîchement mis en ligne.

declare(strict_types=1);

$config = require __DIR__ . '/config.php';

header('X-Frame-Options: DENY');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

$token = (string) ($_GET['token'] ?? '');
$expected = (string) ($config['setup_token'] ?? '');
if ($expected === '' || !hash_equals($expected, $token)) {
    http_response_code(404);
    exit('Page introuvable.');
}
$pdo = new PDO(
    sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $config['db_host'], $config['db_port'], $config['db_name']),
    $config['db_user'],
    $config['db_pass'],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

$hasAdmin = (int) $pdo->query('SELECT COUNT(*) FROM admins')->fetchColumn() > 0;
$error = '';
$done = false;

if (!$hasAdmin && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim((string) ($_POST['email'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');
    $confirm = (string) ($_POST['confirm'] ?? '');

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "L'adresse email n'est pas valide.";
    } elseif (strlen($password) < 10) {
        $error = 'Le mot de passe doit contenir au moins 10 caractères.';
    } elseif ($password !== $confirm) {
        $error = 'Les deux mots de passe ne correspondent pas.';
    } else {
        $insert = $pdo->prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)');
        $insert->execute([$email, password_hash($password, PASSWORD_DEFAULT)]);
        $done = true;
        $hasAdmin = true;
    }
}

$e = static fn(string $s): string => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Création du compte admin</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #fffaf7; color: #302b35;
           font-family: Inter, -apple-system, 'Segoe UI', sans-serif; padding: 16px; }
    .card { width: 100%; max-width: 400px; background: #fff; border: 1px solid #eadfe1; border-radius: 28px; padding: 32px;
            box-shadow: 0 18px 55px rgba(68,55,68,.06); }
    h1 { margin: 0 0 8px; font-size: 24px; color: #443744; }
    p { color: #7d737d; font-size: 14px; line-height: 1.5; }
    label { display: block; margin: 16px 0 6px; font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: #7d737d; }
    input { width: 100%; box-sizing: border-box; padding: 12px 14px; border: 1px solid #eadfe1; border-radius: 14px; background: #fffaf7; font-size: 14px; }
    button { margin-top: 20px; width: 100%; padding: 14px; border: 0; border-radius: 14px; background: #443744; color: #fff; font-weight: 700; font-size: 14px; cursor: pointer; }
    .error { color: #d33; font-weight: 600; }
    .ok { color: #299b68; font-weight: 700; }
  </style>
</head>
<body>
  <div class="card">
    <?php if ($done): ?>
      <h1>Compte créé</h1>
      <p class="ok">Votre compte admin est prêt.</p>
      <p>Vous pouvez maintenant vous connecter sur la page <strong>/#/admin</strong> du portfolio.
         Par sécurité, vous pouvez supprimer le fichier <code>api/setup.php</code> du serveur.</p>
    <?php elseif ($hasAdmin): ?>
      <h1>Déjà configuré</h1>
      <p>Un compte admin existe déjà. Cette page est désactivée.</p>
    <?php else: ?>
      <h1>Créer le compte admin</h1>
      <p>Ce compte servira à lire les messages du formulaire de contact. Cette page ne fonctionne qu'une fois.</p>
      <?php if ($error): ?><p class="error"><?= $e($error) ?></p><?php endif; ?>
      <form method="post" action="?token=<?= $e($token) ?>" autocomplete="off">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" required value="<?= $e((string) ($_POST['email'] ?? '')) ?>">
        <label for="password">Mot de passe (10 caractères minimum)</label>
        <input id="password" name="password" type="password" required minlength="10" autocomplete="new-password">
        <label for="confirm">Confirmer le mot de passe</label>
        <input id="confirm" name="confirm" type="password" required minlength="10" autocomplete="new-password">
        <button type="submit">Créer le compte</button>
      </form>
    <?php endif; ?>
  </div>
</body>
</html>
