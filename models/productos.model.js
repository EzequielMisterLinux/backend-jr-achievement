import mongoose from "mongoose";

const productosSchema = new mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    descripcion: {
        type:String,
        require:true
    },
    precio:{
        type:Number,
        require:true
    },
    disponibilidad:{
        type:Boolean,
        require:true
    },
    imagen: {
        type: String,
        required : true
    }
})

const ProductModel = mongoose.model("productos", productosSchema)

export default ProductModel