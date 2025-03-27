import express from 'express';
import cors from 'cors';

import userRouter from './routes/user-routes';
import customerRouter from './routes/customer-routes';
import createDefaultUsers from './seeds/user-seeds';
import database from './database/db';

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/customers', customerRouter);

const syncDatabase = async (): Promise<void> => {
    try {
        await database.sync();
        await createDefaultUsers();

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