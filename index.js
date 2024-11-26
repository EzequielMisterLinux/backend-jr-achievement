import express from "express";
import { configDotenv } from "dotenv";
import MongoConexion from "./database/conexion.mongodb.js";
import rutasDeLosProductos from "./routers/product.routers.js";
import cors from "cors";
import { swaggerDocs, swaggerUi } from "./swagger.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import Protected from "./middleware/protected.js";

configDotenv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json());

MongoConexion();

app.use("/api", rutasDeLosProductos);
app.use("/api-docs", Protected, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/uploads", Protected, express.static(path.join(__dirname, "uploads")));

app.get('/', (req, res) => res.send('Hello World!'));

const puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
  console.log(`Servidor corriendo en ${process.env.BACKENDURL}:${puerto}`);
  console.log(`Documentación disponible en ${process.env.BACKENDURL}:${puerto}/api-docs`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});