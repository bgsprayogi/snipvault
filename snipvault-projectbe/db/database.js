import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./snipvault.db', (err) => {
    if (err) console.error('❌ Gagal konek DB:', err.message);
    else console.log('✅ Terkoneksi ke SQLite database.');
});

db.serialize(() => {
    // HAPUS TABEL LAMA BIAR BERSIH (Hanya saat dev)
    // db.run("DROP TABLE IF EXISTS snippets"); 
    
    // Buat tabel baru dengan kolom config
    db.run(`
        CREATE TABLE IF NOT EXISTS snippets (
            id TEXT PRIMARY KEY,   -- ID sekarang text (contoh: "x7Ha2")
            code TEXT,
            language TEXT,
            theme TEXT,            -- Warna tema (blue/pink/dll)
            padding TEXT,          -- Tight/Normal/Relaxed
            window_type TEXT,      -- macOS/Windows/None
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

export default db;