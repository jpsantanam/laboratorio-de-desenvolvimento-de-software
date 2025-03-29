import express from 'express';
import cors from 'cors';

import customerRouter from './routes/customer-routes';
import vehicleRouter from './routes/vehicle-routes';
import rentRouter from './routes/rent-routes';
import database from './database/db';

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/customers', customerRouter);
app.use('/vehicles', vehicleRouter);
app.use('/rents', rentRouter);

const syncDatabase = async (): Promise<void> => {
    try {
        await database.sync();
        // await createDefaultUsers();

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