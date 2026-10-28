<?php
// POST /api/contact.php — enregistre un message du formulaire de contact.

declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['error' => 'Méthode non autorisée.']);
}
require_ajax();

$data = read_json_body();
$name = trim((string) ($data['name'] ?? ''));
$company = trim((string) ($data['company'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

// Champ piège invisible : un robot le remplit, un humain non
if (!empty($data['website'])) {
    json_response(201, ['ok' => true]);
}

if ($name === '' || $company === '' || $email === '' || $message === '') {
    json_response(422, ['error' => 'Merci de remplir tous les champs.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(422, ['error' => "L'adresse email ne semble pas valide."]);
}
if (mb_strlen($name) > 120 || mb_strlen($company) > 150 || mb_strlen($email) > 200 || mb_strlen($message) > 5000) {
    json_response(422, ['error' => 'Un des champs est trop long.']);
}

// Anti-spam : 5 messages maximum par adresse IP sur 10 minutes
$ip = ip_hash();
$recent = db()->prepare('SELECT COUNT(*) FROM messages WHERE ip_hash = ? AND created_at > NOW() - INTERVAL 10 MINUTE');
$recent->execute([$ip]);
if ((int) $recent->fetchColumn() >= 5) {
    json_response(429, ['error' => 'Trop de messages envoyés. Réessayez dans quelques minutes.']);
}

$insert = db()->prepare('INSERT INTO messages (name, company, email, message, ip_hash) VALUES (?, ?, ?, ?, ?)');
$insert->execute([$name, $company, $email, $message, $ip]);

json_response(201, ['ok' => true]);
