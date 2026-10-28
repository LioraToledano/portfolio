<?php
// Socle commun à tous les points d'entrée de l'API :
// configuration, CORS, session admin, connexion MySQL et réponses JSON.

declare(strict_types=1);

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'API non configurée : copiez api/config.example.php en api/config.php.']);
    exit;
}
$config = require $configFile;

// --- CORS -------------------------------------------------------------------
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && in_array($origin, $config['allowed_origins'], true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
    header('Vary: Origin');
}
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');
// Les réponses de l'API (dont les messages) ne doivent jamais rester en cache
header('Cache-Control: no-store, max-age=0');

// --- Session admin ------------------------------------------------------------
// Déconnexion automatique après 30 min d'inactivité, et au plus tard 8 h après la connexion
const SESSION_IDLE_SECONDS = 30 * 60;
const SESSION_MAX_SECONDS = 8 * 60 * 60;

ini_set('session.use_strict_mode', '1');
ini_set('session.use_only_cookies', '1');
$crossSite = (bool) $config['cross_site'];
session_name('portfolio_admin');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'httponly' => true,
    'secure' => $crossSite || (($_SERVER['HTTPS'] ?? '') === 'on'),
    'samesite' => $crossSite ? 'None' : 'Strict',
]);
session_start();

// --- Helpers ----------------------------------------------------------------
function json_response(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function read_json_body(): array
{
    $data = json_decode((string) file_get_contents('php://input'), true);
    return is_array($data) ? $data : [];
}

function db(): PDO
{
    static $pdo = null;
    global $config;
    if ($pdo === null) {
        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
            $config['db_host'],
            $config['db_port'],
            $config['db_name']
        );
        try {
            $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $e) {
            json_response(500, ['error' => 'Connexion à la base de données impossible.']);
        }
    }
    return $pdo;
}

function ip_hash(): string
{
    global $config;
    return hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . $config['ip_salt']);
}

// Les requêtes qui modifient des données doivent venir du site (fetch JSON),
// pas d'un formulaire d'un autre site : protection CSRF simple.
function require_ajax(): void
{
    if (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') !== 'fetch') {
        json_response(400, ['error' => 'Requête invalide.']);
    }
}

function end_session(): void
{
    $_SESSION = [];
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
    }
}

// Toute route réservée appelle cette fonction : sans session admin valide, réponse 401
// et aucune donnée n'est envoyée.
function require_admin(): array
{
    $now = time();
    if (empty($_SESSION['admin_id'])) {
        json_response(401, ['error' => 'Connexion requise.']);
    }
    if ($now - (int) ($_SESSION['last_seen'] ?? 0) > SESSION_IDLE_SECONDS
        || $now - (int) ($_SESSION['login_at'] ?? 0) > SESSION_MAX_SECONDS) {
        end_session();
        json_response(401, ['error' => 'Session expirée, reconnectez-vous.']);
    }

    // Le compte doit toujours exister (s'il est supprimé, la session tombe immédiatement)
    $check = db()->prepare('SELECT email FROM admins WHERE id = ?');
    $check->execute([(int) $_SESSION['admin_id']]);
    $email = $check->fetchColumn();
    if ($email === false) {
        end_session();
        json_response(401, ['error' => 'Connexion requise.']);
    }

    $_SESSION['last_seen'] = $now;
    return ['id' => (int) $_SESSION['admin_id'], 'email' => (string) $email];
}
