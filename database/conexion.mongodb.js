import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()

let URLDB = "mongodb+srv://ezequielcampos:fhjRsiUgIYx2ZH8g@cluster0.06meydb.mongodb.net/myProducts?retryWrites=true&w=majority&appName=Cluster0"


const MongoConexion = async () => {
    
    try {
        
        await mongoose.connect(URLDB)
        console.log("conexion exitosa a la base de datos");
        

    } catch (error) {
        console.error(error);
        
    }
    
}

export default MongoConexion