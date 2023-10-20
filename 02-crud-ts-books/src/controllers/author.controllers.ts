import { Request, Response } from 'express';
import { Author } from '../entities/Author.entity';
import { Book } from '../entities/Book.entity';

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, bookIds } = req.body;

    const author = new Author();
    author.name = name;

    // Comprobar si bookIds no está vacío
    if (bookIds && bookIds.length > 0) {
      // Buscar los libros en la base de datos
      const books = await Book.find({
        where: bookIds.map((id: string) => ({ id }))
      });

      if (books.length === 0) {
        return res.status(400).json({ message: 'No books found with the provided IDs' });
      }

      // Añadir los libros al autor
      author.books = books;
    }

    await author.save();

    res.json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAuthors = async (req: Request, res: Response) => {
  try {
    // const authors = await Author.find({ relations: ['books'] });
    const authors = await Author.createQueryBuilder('author')
    .leftJoinAndSelect('author.books', 'book')
    .select(['author.id', 'author.name', 'book.title'])
    .getMany();

    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
