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



const AgregarProducto = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                msg: "Error uploading file",
                error: err.message,
            });
        }

        const { nombre, descripcion, precio, disponibilidad } = req.body;

        
        if (!nombre || !descripcion || !precio || typeof disponibilidad === "undefined") {
            return res.status(400).json({
                msg: "Todos los campos del producto son requeridos",
            });
        }

        try {
            const productImage = req.file ? req.file.filename : null;
            const disponibilidadBoolean = disponibilidad === "true" || disponibilidad === true;
            const data = {
                nombre: String(nombre),
                descripcion: String(descripcion),
                precio: Number(precio),
                disponibilidad: disponibilidadBoolean,
                imagen: productImage,
            };

            const nuevoProducto = new ProductModel(data);
            await nuevoProducto.save();

            res.status(201).json({
                msg: "Producto creado exitosamente",
                producto: nuevoProducto,
            });
        } catch (error) {
            res.status(500).json({
                msg: "Hubo un problema al intentar crear el producto",
                error: error.message,
            });
        }
    });
};

export default AgregarProducto;
