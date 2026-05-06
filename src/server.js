import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { logger } from './middleware/logger.js';

const app = express();

app.use(logger);
app.use(
  cors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: '*',
  }),
);
app.use(helmet());
app.use(express.json());

app.use(notesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on localhost:${process.env.PORT}`);
});
