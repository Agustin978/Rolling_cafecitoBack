import { connect } from "mongoose";
import { MOGODB_URI } from '../config';

//OPCION 1
(async ()=>{
    try
    {
        const db = await connect(MOGODB_URI);
        console.log('Base de Datos conectada en '+db.connection.name); //connection tiene los datos de conexion al uri
    }catch(error)
    {
        console.log('A ocurrido un error al intentar conectarse a la base de datos. Informacion del error: '+error);
    }
    
})() //Funcion autoinvocada. Cuando se ejecuta el archivo, se ejecutara esta funcion.

/*
//OPCION 2:
connect(MOGODB_URI)
    .then((resp) => console.log('Base de Datos conectada en '+db.connection.name))
    .catch((error) => console.log('A ocurrido un error al intentar conectarse a la base de datos. Informacion del error: '+error));
*/