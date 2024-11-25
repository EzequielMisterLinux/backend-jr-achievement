import ModelUser from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const userLogged = await ModelUser.findOne({ email });
    
    if (!userLogged) {
      return res.status(401).json({ msg: "User no encontrado" });
    }

    const AuthPassword = await bcrypt.compare(password, userLogged.password);
    
    if (!AuthPassword) {
      return res.status(401).json({ msg: "la contraseña es incorrecta" });
    }

    const token = jwt.sign(
      { id: userLogged._id }, 
      process.env.secret, 
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.secret, 
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
        id: userLogged._id,
        nombre: userLogged.nombre,
        apellido: userLogged.apellido,
        edad: userLogged.edad,
        email: userLogged.email,
        image: userLogged.image,
      
    });
  } catch (error) {
    res.status(500).json({ msg: "hubo un problema al iniciar sesion" });
  }
};

export default LoginUser;