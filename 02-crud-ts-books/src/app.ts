import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import BookRoutes from './routes/book.routes';
import AuthorRoutes from './routes/author.routes';

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());

app.use(BookRoutes);
app.use(AuthorRoutes);

export default app;
