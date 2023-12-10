import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

const getAController = (req: Request, res: Response) => {
  res.status(200).send(`server is running`);
}

app.get("/", getAController);


export default app;
