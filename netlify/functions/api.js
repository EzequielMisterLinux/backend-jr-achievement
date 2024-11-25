// netlify/functions/api.js
import express from "express";
import { handler } from "@netlify/functions";  // Importar handler de Netlify Functions
import { configDotenv } from "dotenv";
import MongoConexion from "../../database/conexion.mongodb.js";  // Ajusta la ruta a tus archivos
import rutasDeLosProductos from "../../routers/product.routers.js";
import cors from "cors";
import { swaggerDocs, swaggerUi } from "../../swagger.js";
import path from "path";
import cookieParser from 'cookie-parser';

configDotenv();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json());

// Conexión a MongoDB
MongoConexion();

// Rutas
app.use("/api", rutasDeLosProductos);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas estáticas para los uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ruta principal
app.get('/', (req, res) => res.send('Hello World!'));

// Handler para la función serverless
export const handler = handler(app);
