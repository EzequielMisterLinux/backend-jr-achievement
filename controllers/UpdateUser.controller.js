import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";
import ModelUser from "../models/users.model.js";
import bcrypt from "bcrypt";
import fs from "fs/promises";

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

const UpdateUser = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                msg: "Error uploading file",
                error: err.message,
            });
        }

        const userId = req.params.id; 
        const { nombre, apellido, edad, email, password, currentImage } = req.body;

        if (!nombre || !apellido || !email || !edad) {
            return res.status(400).json({
                msg: "Todos los campos son requeridos",
            });
        }

        try {
            const user = await ModelUser.findById(userId);
            if (!user) {
                return res.status(404).json({
                    msg: "Usuario no encontrado",
                });
            }


            const existingUser = await ModelUser.findOne({ 
                email, 
                _id: { $ne: userId } 
            });
            if (existingUser) {
                return res.status(400).json({
                    msg: "Este correo electrónico ya está en uso",
                });
            }


            let hashPass = user.password;
            if (password) {
                if (password.length < 8) {
                    return res.status(400).json({
                        msg: "La contraseña debe tener más de 8 caracteres",
                    });
                }
                hashPass = await bcrypt.hash(password, 10);
            }

            let userImage = currentImage;
            if (req.file) {

                if (currentImage) {
                    try {
                        await fs.unlink(path.join(__dirname, "../uploads", currentImage));
                    } catch (unlinkError) {
                        console.warn("Could not delete old image:", unlinkError);
                    }
                }
                userImage = req.file.filename;
            }


            const updatedUser = await ModelUser.findByIdAndUpdate(
                userId, 
                {
                    nombre,
                    apellido,
                    edad,
                    email,
                    password: hashPass,
                    image: userImage
                }, 
                { new: true }
            );

            res.status(200).json({
                msg: "Usuario actualizado exitosamente",
                user: {
                    id: updatedUser._id,
                    nombre: updatedUser.nombre,
                    apellido: updatedUser.apellido,
                    email: updatedUser.email,
                    image: updatedUser.image
                }
            });

        } catch (error) {
            res.status(500).json({
                msg: "Hubo un problema al intentar actualizar el usuario",
                error: error.message,
            });
        }
    });
};

export default UpdateUser;