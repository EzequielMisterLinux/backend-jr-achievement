import moongose from "mongoose"


const userSchema = new moongose.Schema({
    nombre : {
        type: String,
        required : true
    },

    apellido : {
        type : String,
        required : true
    },

    edad : {
        type : Number,
        required: true
    },

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required : true
    },
    image: {
        type: String,
        required : true
    }
})



const userModel = moongose.model("users", userSchema)


export default userModel