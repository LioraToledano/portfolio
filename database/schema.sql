-- Base de données du formulaire de contact (MySQL / MariaDB)
-- phpMyAdmin : onglet « Importer » → choisir ce fichier → Exécuter.

CREATE DATABASE IF NOT EXISTS portfolio
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio;

-- Messages envoyés depuis le formulaire de contact
CREATE TABLE IF NOT EXISTS messages (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120)  NOT NULL,
  company     VARCHAR(150)  NOT NULL DEFAULT '',
  email       VARCHAR(200)  NOT NULL,
  message     TEXT          NOT NULL,
  is_read     TINYINT(1)    NOT NULL DEFAULT 0,
  ip_hash     CHAR(64)      NULL,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at),
  INDEX idx_ip_created (ip_hash, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Compte(s) autorisé(s) à lire les messages.
-- Le mot de passe n'est jamais stocké en clair : password_hash() de PHP.
CREATE TABLE IF NOT EXISTS admins (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          VARCHAR(200) NOT NULL UNIQUE,
  password_hash  VARCHAR(255) NOT NULL,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tentatives de connexion échouées (protection contre les essais de mots de passe)
CREATE TABLE IF NOT EXISTS login_attempts (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ip_hash     CHAR(64) NOT NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ip_created (ip_hash, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
