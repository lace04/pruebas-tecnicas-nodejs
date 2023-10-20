import { Request, Response } from 'express';
import { Book } from '../entities/Book.entity';
import { Author } from '../entities/Author.entity';

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, chapters, pages, authorIds } = req.body;

    const book = new Book();
    book.title = title;
    book.chapters = chapters;
    book.pages = pages;

    // Comprobar si authorIds no está vacío
    if (authorIds && authorIds.length > 0) {
      // Buscar los autores en la base de datos
      const authors = await Author.find({
        where: authorIds.map((id: number) => ({ id })),
      });

      // Comprobar si se encontraron autores
      if (authors.length === 0) {
        return res
          .status(400)
          .json({ message: 'No authors found with the provided IDs' });
      }

      // Añadir los autores al libro
      book.authors = authors;
    } else {
      return res.status(400).json({ message: 'No author IDs provided' });
    }

    await book.save();

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.createQueryBuilder('book')
      .leftJoinAndSelect('book.authors', 'author')
      .select(['book.id', 'book.title', 'book.chapters', 'book.pages', 'author.name'])
      .getMany();

    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getPagesPerChapter = async (req: Request, res: Response) => {
  try {
    const book = await Book.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['authors'],
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Mostrar el valor de pages solo con 2 decimales
    const Promedio = [book].map((item) => {
      const promedio = (item.pages / item.chapters).toFixed(2);
      return `Libro id: ${item.id} Promedio de Páginas por Capítulo: ${promedio}`;
    });
    res.json({ Promedio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
