import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { StorageService } from '@services/monday-code/storage.service';
import authRouter from '@routes/auth.route';
import errorHandler from '@middlewares/error.middleware';
import cookieParser from 'cookie-parser';
import { QueueService } from '@services/monday-code';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

// Routes
app.use('/auth', authRouter);

app.get('/', async (req: Request, res: Response) => {
  res.send('Express + TypeScript Server ');
});

// This middleware should always be the last middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
