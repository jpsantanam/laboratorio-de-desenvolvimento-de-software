import express from 'express';
import cors from 'cors';
import database from './database/db';

import studentRouter from './routes/student-routes';
import createDefaultStudents from './seeds/student-seeds';

import companyRouter from './routes/company-routes';
import createDefaultCompanies from './seeds/company-seeds';

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/students', studentRouter);
app.use('/companies', companyRouter);

const syncDatabase = async (): Promise<void> => {
    try {
        await database.sync();
        await createDefaultStudents();
        await createDefaultCompanies();

        console.log('Database successfully synced.');
    } catch (err) {
        console.error(err);
    }
}

function onStart(): void {
    syncDatabase();
    console.log(`Server running on port ${PORT}`);
}

app.listen(PORT, onStart);

export default app;