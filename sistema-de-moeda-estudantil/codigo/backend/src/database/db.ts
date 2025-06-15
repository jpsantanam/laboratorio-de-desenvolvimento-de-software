import { Sequelize } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';
import Student from '../models/student';
import Company from '../models/company';
import Professor from '../models/professor';
import InstituicaoEnsino from '../models/instituicaoEnsino';
import Transaction from '../models/transaction';
import Vantagem from '../models/vantagem';
import Redemption from '../models/redemption';

const database = new Sequelize({
    dialect: SqliteDialect,
    storage: './src/database/database.sqlite',
    models: [Student, Company, Professor, InstituicaoEnsino, Transaction, Vantagem, Redemption],
});

export default database;
