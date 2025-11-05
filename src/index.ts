import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerSpec from './config/swagger';
import swaggerUi from 'swagger-ui-express';
// import './types/express.types'; 
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
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showRequestHeaders: true,
    tryItOutEnabled: true
  }
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Swagger Docs at https://aquafund.koyeb.app/api-docs");
});
