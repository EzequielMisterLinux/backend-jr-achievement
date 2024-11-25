import { configDotenv } from "dotenv";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

configDotenv()

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Productos",
      version: "1.0.0",
      description: "API para la gestión de productos",
    },
    servers: [
      {
        url: `${process.env.BACKENDURL}:` + process.env.PORT + "/api",
      },
    ],
  },
  apis: ["./routers/product.routers.js", "./controllers/*.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
