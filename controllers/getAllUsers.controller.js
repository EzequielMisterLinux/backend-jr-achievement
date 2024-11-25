import userModel from "../models/users.model.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        res.status(200).json({
            msj: "usuarios obtenidos exitosamente",
            users: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: "Error al obtener los usuarios",
            error: error.message 
        });
    }
};

export default getAllUsers;
