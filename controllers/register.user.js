import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";
import ModelUser from "../models/users.model.js";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads")); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({ storage }).single("image");

const CreateUser = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                msg: "Error uploading file",
                error: err.message,
            });
        }

        const { nombre, apellido , edad, email, password} = req.body;
        if (!nombre || !apellido || !email ||  !password || !edad) {
            return res.status(400).json({
                msg: "todos los campos son requeridos",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                msg: "la contraseña debe tener mas de 8 caracteres",
            });
        }

        let user = await ModelUser.findOne({ $or: [ { email }] });
        if (user) {
            return res.status(400).json({
                msg: "ese usuario ya existe en la base de datos",
            });
        }

        try {
            const hashPass = await bcrypt.hash(password, 10);
            const userImage = req.file ? req.file.filename : null;

            const newUser = new ModelUser({
                nombre,
                apellido,
                edad,
                email,
                password: hashPass,
                image: userImage,
            });

            await newUser.save();

            res.status(201).json({
                msg: "usuario creado exitosamente",
                user: newUser,
            });
        } catch (error) {
            res.status(500).json({
                msg: "hubo un problema al intentar crear el usuario",
                error: error.message,
            });
        }
    });
};

export default CreateUser;