import { validationResult } from "express-validator";
import Usuario from "../models/usuario";

//Controlador para buscar un usuario por su id
export const obtieneUsuario = async (req, res) => 
{
    try
    {
        const usuario = await Usuario.findById(req.params.id);
        res.status(200).json(usuario);
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al buscar el usuario con id: '+req.params.id+' en la base de datos.'
        });
    }
}

//Controlador para 
