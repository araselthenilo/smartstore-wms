import 'dotenv/config';

const requiredEnv = [
    'NODE_ENV',
    'API_PORT',
    'DB_HOST',
    'DB_PORT',
    'DB_DIALECT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'JWT_SECRET',
    'JWT_EXPIRATION'
];

for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
}

import db from './utils/db.util.js';
import express, { json } from 'express';
import cookieParser from 'cookie-parser';

const app = express();

import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import categoryRoute from './routes/category.route.js';
import supplierRoute from './routes/supplier.route.js';
// import inventoryLogRoute from './routes/inventoryLog.route.js';
// import purchaseOrderRoute from './routes/purchaseOrder.route.js';
// import productRoute from './routes/product.route.js';

app.use(json());
app.use(cookieParser());

/* Routes */
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/categories', categoryRoute);
app.use('/suppliers', supplierRoute);
// app.use('/inventory-logs', inventoryLogRoute);
// app.use('/purchase-orders', purchaseOrderRoute);
// app.use('/products', productRoute);
// app.use('/orders', orderRoute);
/* End Routes */

/* Root */
app.get('/', async (req, res) => {
    res.status(200).json({
        success: true,
        status: 'active',
        message: 'Hello World!'
    });
});
/* End Root */

try {
    db.authenticate();
    console.log('Connection to the database has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on:${process.env.API_PORT}...`);
});