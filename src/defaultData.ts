import { Author } from './entities/Author.entity';
import { Book } from './entities/Book.entity';

export async function createDefaultData() {
  // Verificar si el autor por defecto ya existe
  let defaultAuthor = await Author.findOne({ where: { name: 'Default Author' } });

  // Si no existe, crearlo
  if (!defaultAuthor) {
    defaultAuthor = new Author();
    defaultAuthor.name = 'Default Author';
    await defaultAuthor.save();
    console.log('Default author created');
  }

  // Verificar si el libro por defecto ya existe
  let defaultBook = await Book.findOne({ where: { title: 'Default Book' } });

  // Si no existe, crearlo
  if (!defaultBook) {
    defaultBook = new Book();
    defaultBook.title = 'Default Book';
    defaultBook.chapters = 11;
    defaultBook.pages = 225;
    defaultBook.authors = [defaultAuthor];
    await defaultBook.save();
    console.log('Default book created');
  }
}
