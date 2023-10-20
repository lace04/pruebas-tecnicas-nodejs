import { Router } from 'express';
import { createAuthor, getAuthors } from '../controllers/author.controllers';

const router = Router();

router.get('/authors', getAuthors);
router.post('/authors', createAuthor);
export default router;
