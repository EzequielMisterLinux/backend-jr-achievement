import ProductModel from "../models/productos.model.js";

const ObteniendoTodosLosProductos = async (req, res) => {
    try {
        
        const { page = 1, limit = 7 } = req.query; 

        
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        
        const skip = (pageNumber - 1) * limitNumber;

        
        const obteniendoProductos = await ProductModel.find()
            .skip(skip)
            .limit(limitNumber);

       
        const totalProductos = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalProductos / limitNumber);

        res.status(200).json({
            msj: "Productos obtenidos exitosamente",
            productos: obteniendoProductos,
            totalProductos,
            totalPages,
            currentPage: pageNumber,
        });
    } catch (error) {
        res.status(500).json({
            msj: "Hubo un problema al obtener los productos",
            error: error.message,
        });
    }
};

export default ObteniendoTodosLosProductos;

