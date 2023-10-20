import { Router } from 'express';
import { createBook, getBooks, getPagesPerChapter } from '../controllers/book.controllers';

const router = Router();

router.get('/books', getBooks);
router.get('/books/:id',getPagesPerChapter);
router.post('/books', createBook);

export default router;
