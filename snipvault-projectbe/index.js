import express from 'express';
import cors from 'cors';
import snippetRoutes from './routes/snippetRoutes.js'; // Import Route

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Main Route
app.get('/', (req, res) => {
    res.send('Server SnipVault Jalan (Clean Architecture)! 🚀');
});

// Gunakan Routes
// Artinya: Semua URL yang berawalan '/snippets' akan diurus oleh snippetRoutes
app.use('/snippets', snippetRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});