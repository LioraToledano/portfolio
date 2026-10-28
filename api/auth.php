<?php
// Connexion de l'administratrice.
//   GET  /api/auth.php                    → session en cours (ou 401)
//   POST /api/auth.php {action: "login"}  → connexion (email, password)
//   POST /api/auth.php {action: "logout"} → déconnexion

declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

require_ajax();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $admin = require_admin();
    json_response(200, ['email' => $admin['email']]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['error' => 'Méthode non autorisée.']);
}

$data = read_json_body();
$action = $data['action'] ?? '';

if ($action === 'logout') {
    end_session();
    json_response(200, ['ok' => true]);
}

if ($action !== 'login') {
    json_response(400, ['error' => 'Action inconnue.']);
}

// Protection contre les essais de mots de passe : 5 échecs max par IP sur 15 minutes
$ip = ip_hash();
$attempts = db()->prepare('SELECT COUNT(*) FROM login_attempts WHERE ip_hash = ? AND created_at > NOW() - INTERVAL 15 MINUTE');
$attempts->execute([$ip]);
if ((int) $attempts->fetchColumn() >= 5) {
    json_response(429, ['error' => 'Trop de tentatives. Réessayez dans 15 minutes.']);
}

$email = trim((string) ($data['email'] ?? ''));
$password = (string) ($data['password'] ?? '');

$find = db()->prepare('SELECT id, email, password_hash FROM admins WHERE email = ?');
$find->execute([$email]);
$admin = $find->fetch();

if (!$admin || !password_verify($password, $admin['password_hash'])) {
    db()->prepare('INSERT INTO login_attempts (ip_hash) VALUES (?)')->execute([$ip]);
    usleep(500000);
    json_response(401, ['error' => 'Email ou mot de passe incorrect.']);
}

db()->prepare('DELETE FROM login_attempts WHERE ip_hash = ?')->execute([$ip]);
session_regenerate_id(true);
$_SESSION['admin_id'] = (int) $admin['id'];
$_SESSION['admin_email'] = $admin['email'];
$_SESSION['login_at'] = time();
$_SESSION['last_seen'] = time();

json_response(200, ['email' => $admin['email']]);
