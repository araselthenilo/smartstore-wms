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

import express from 'express';
import cookieParser from 'cookie-parser';

import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import swaggerUI from 'swagger-ui-express';

const app = express();

import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import productRoute from './routes/product.route.js';
import categoryRoute from './routes/category.route.js';
import supplierRoute from './routes/supplier.route.js';
import inventoryLogRoute from './routes/inventoryLog.route.js';
import purchaseOrderRoute from './routes/purchaseOrder.route.js';

app.use(express.json());
app.use(cookieParser());

const specPath = path.join(process.cwd(), 'docs', 'openapi.yaml');
const file = fs.readFileSync(specPath, 'utf8');
const swaggerDocument = YAML.parse(file);

swaggerDocument.servers = [
    {
        url: `http://${process.env.DB_HOST}:${process.env.API_PORT}/`
    }
];

/* API Documention Route */
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
/* End API Documention Route */

/* Routes */
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/suppliers', supplierRoute);
app.use('/categories', categoryRoute);
app.use('/inventory-logs', inventoryLogRoute);
app.use('/purchase-orders', purchaseOrderRoute);
/* End Routes */

/* Root */
/**
 * @swagger
 * /:
 *  get:
 *      summary: This API is used to test if the backend is working
 *      description: This API is used to test if the backend is working
 *      responses:
 *          200:
 *              description: To test API backend
 */
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