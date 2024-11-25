import jwt from "jsonwebtoken"
import userModel from "../models/users.model.js"
import { configDotenv } from "dotenv";

configDotenv();

const Protected = async (req, res , next) => {
    
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            msj: "no tienes un token no puedes pasar"
        })
    }
    try {
        
        const decodedToken = jwt.verify(token, process.env.secret)

        const userLogeado = await userModel.findById(decodedToken.id).select('-password')

        if (!userLogeado) {
            return res.status(404).json({msj: "usuario no encontrado"})
        }

        req.userLogeado = userLogeado

        next();

    } catch (error) {
        console.error(error);
        
    }


}

export default Protected