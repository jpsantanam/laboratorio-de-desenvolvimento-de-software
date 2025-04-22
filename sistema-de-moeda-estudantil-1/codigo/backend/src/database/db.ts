import { Sequelize } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';
import Student from '../models/student';
import Company from '../models/company';

const database = new Sequelize({
    dialect: SqliteDialect,
    storage: './src/database/database.sqlite',
    models: [Student, Company]
});

export default database;