import ProductModel from "../models/productos.model.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage }).single("imagen");

const ActualizarProducto = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                msg: "Error al subir el archivo",
                error: err.message,
            });
        }

        try {
            const { id } = req.params;
            const { nombre, descripcion, precio, disponibilidad } = req.body;


            if (!nombre || !descripcion || !precio || typeof disponibilidad === "undefined") {
                return res.status(400).json({
                    msg: "Todos los campos del producto son requeridos",
                });
            }


            const productoExistente = await ProductModel.findById(id);
            if (!productoExistente) {
                return res.status(404).json({
                    msg: "Producto no encontrado"
                });
            }

            const updateData = {
                nombre: String(nombre),
                descripcion: String(descripcion),
                precio: Number(precio),
                disponibilidad: disponibilidad === "true" || disponibilidad === true
            };

            if (req.file) {
                updateData.imagen = req.file.filename;
            }

            const productoActualizado = await ProductModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );

            res.status(200).json({
                msg: "Producto actualizado exitosamente",
                producto: productoActualizado
            });

        } catch (error) {
            console.error("Error en la actualización:", error);
            res.status(500).json({
                msg: "Error al actualizar el producto",
                error: error.message
            });
        }
    });
};

export default ActualizarProducto;