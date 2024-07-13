import express from 'express';
import cors from 'cors';
import config from './config';
import userRoutes from './routes/user';

const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});