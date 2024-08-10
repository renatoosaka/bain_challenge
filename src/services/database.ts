import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

/**

CREATE TABLE history (
    id TEXT PRIMARY KEY, -- UUID armazenado como texto
    source TEXT NOT NULL, -- Local de origem
    destination TEXT NOT NULL, -- Local de destino
    distance REAL NOT NULL, -- Distância em número (pode ser FLOAT ou REAL)
    created_at TEXT NOT NULL DEFAULT (datetime('now')) -- Data de criação
);


 */
