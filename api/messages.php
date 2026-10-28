<?php
// Messages reçus — réservé à l'administratrice connectée.
//   GET    /api/messages.php            → liste (plus récents d'abord)
//   PATCH  /api/messages.php?id=12      → {is_read: true|false}
//   DELETE /api/messages.php?id=12      → suppression

declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

require_ajax();
require_admin();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = db()->query('SELECT id, name, company, email, message, is_read, created_at FROM messages ORDER BY created_at DESC, id DESC')->fetchAll();
    foreach ($rows as &$row) {
        $row['id'] = (int) $row['id'];
        $row['is_read'] = (bool) $row['is_read'];
    }
    json_response(200, ['messages' => $rows]);
}

$id = (int) ($_GET['id'] ?? 0);
if ($id <= 0) {
    json_response(400, ['error' => 'Identifiant manquant.']);
}

if ($method === 'PATCH') {
    $data = read_json_body();
    $update = db()->prepare('UPDATE messages SET is_read = ? WHERE id = ?');
    $update->execute([!empty($data['is_read']) ? 1 : 0, $id]);
    json_response(200, ['ok' => true]);
}

if ($method === 'DELETE') {
    db()->prepare('DELETE FROM messages WHERE id = ?')->execute([$id]);
    json_response(200, ['ok' => true]);
}

json_response(405, ['error' => 'Méthode non autorisée.']);
