import jwt from "jsonwebtoken";
import ModelUser from "../models/users.model.js";

const verifyToken = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "No token proveedor" });
    }

    const decoded = jwt.verify(token, process.env.secret);
    const user = await ModelUser.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ msg: "Usuario no encontrado" });
    }

    res.json({
      id: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      edad: user.edad,
      email: user.email,
      image: user.image,
    });
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};

export default verifyToken;
