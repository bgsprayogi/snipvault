import db from '../db/database.js';
import { nanoid } from 'nanoid'; // Import generator ID

// GET ONE (Untuk fitur Share Link)
export const getSnippetById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM snippets WHERE id = ?";
    db.get(sql, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Snippet not found" });
        res.json({ data: row });
    });
};

// CREATE (Simpan konfigurasi tampilan juga)
export const createSnippet = (req, res) => {
    const { code, language, theme, padding, window_type } = req.body;

    // Generate ID acak 6 karakter
    const id = nanoid(6);

    const sql = `INSERT INTO snippets (id, code, language, theme, padding, window_type) 
                VALUES (?, ?, ?, ?, ?, ?)`;

    const params = [id, code, language, theme || 'blue', padding || 'normal', window_type || 'mac'];

    db.run(sql, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            message: "Snippet saved!",
            id: id // Balikin ID unik ke frontend
        });
    });
};

// DISABLE GET ALL (Biar database gak bisa discrape orang iseng)
// Hapus atau komen fungsi getSnippets lama