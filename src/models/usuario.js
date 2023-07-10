import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
    nombreUsuario: {
        type: String,
        minLength: 4,
        maxLength: 14,
        required: true
    },
    email: {
        type: String,
        minLength: 8,
        maxLength: 40,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        maxLength: 15,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Usuario = model('usuario',usuarioSchema);
export default Usuario;