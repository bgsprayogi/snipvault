import express from 'express';
import { createSnippet, getSnippetById } from '../controllers/snippetController.js';

const router = express.Router();

router.post('/', createSnippet);
router.get('/:id', getSnippetById); // Ambil spesifik ID

export default router;