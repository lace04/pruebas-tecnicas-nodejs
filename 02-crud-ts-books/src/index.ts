import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './db';
import { createDefaultData } from './defaultData';
import { config } from 'dotenv';

config();

async function main() {
  try {
    await AppDataSource.initialize();
    console.log('Database initialized');

    await createDefaultData();

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
