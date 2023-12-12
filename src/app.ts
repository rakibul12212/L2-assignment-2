import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/users/users.routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.send(`server is running...`);
};
app.get('/', getAController);

export default app;
