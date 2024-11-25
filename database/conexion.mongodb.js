import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()

let URLDB = process.env.MONGO


const MongoConexion = async () => {
    
    try {
        
        await mongoose.connect(URLDB)
        console.log("conexion exitosa a la base de datos");
        

    } catch (error) {
        console.error(error);
        
    }

}

export default MongoConexion