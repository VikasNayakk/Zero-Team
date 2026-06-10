-- Task: Migration Scripts - Part 3
-- Phase: Database

-- Local SQLite implementation snippet
CREATE TABLE IF NOT EXISTS AI_0120 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
