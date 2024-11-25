import express from "express";

const logoutUser = (req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.secret === "production", 
      sameSite: "strict",
    });

    return res.status(200).json({ msg: "Sesión cerrada correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Hubo un problema al cerrar sesión" });
  }
};

export default logoutUser;
