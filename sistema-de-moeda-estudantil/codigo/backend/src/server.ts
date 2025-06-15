// jpsantanam/laboratorio-de-desenvolvimento-de-software/laboratorio-de-desenvolvimento-de-software-main/sistema-de-moeda-estudantil-1/codigo/backend/src/server.ts
import express from 'express';
import cors from 'cors';
import database from './database/db';

import studentRouter from './routes/student-routes';
import companyRouter from './routes/company-routes';
import professorRouter from './routes/professor-routes';
import instituicaoRouter from './routes/instituicaoEnsino-routes';
import redemptionRouter from './routes/redemption-routes';
import vantagemRouter from './routes/vantagem-routes';

import createDefaultStudents from './seeds/student-seeds';
import createDefaultCompanies from './seeds/company-seeds';
import createDefaultInstituicoes from './seeds/instituicao-seeds';
import createDefaultProfessors from './seeds/professor-seeds';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/students', studentRouter);
app.use('/companies', companyRouter);
app.use('/professors', professorRouter);
app.use('/instituicoes', instituicaoRouter);
app.use('/vantagens', vantagemRouter);
 app.use('/redemptions', redemptionRouter);

const syncDatabase = async (): Promise<void> => {
    try {
        await database.sync({ alter: true });
        console.log('Database successfully synced.');

        await createDefaultInstituicoes();
        await createDefaultStudents();
        await createDefaultCompanies();
        await createDefaultProfessors();

        console.log('Default data seeding process completed.');

    } catch (err) {
        console.error('Error syncing database or seeding data:', err);
    }
}

function onStart(): void {
    syncDatabase();
    console.log(`Server running on port ${PORT}`);
}

app.listen(PORT, onStart);

export default app;