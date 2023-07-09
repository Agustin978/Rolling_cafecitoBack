import { Schema, model } from 'mongoose';

//Un esquema seria como un prototipo.
const recetaSchema = new Schema({ //En el objeto dentro de scheme debe tener las propiedades del objeto que quiero guardar en la base de datos
    nombrePlatillo: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true
    },
    descripcion: {
        type: String,
        minLength:10,
        maxLength:2000,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    }
}); //El id no se agrega al esquema porque mongus ya crea un id por defecto.

const Receta = model('receta', recetaSchema); //Se debe escribir la coleccion en singular ya que mongoDB luego lo guardara en plural
export default Receta;