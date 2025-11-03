import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './types/express.types'; 
import router from './routes/index.route';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api', router);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
