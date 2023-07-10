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

//Controlador para obtener todos los usuarios
export const obtenerUsuarios = async (req, res) =>
{
    try
    {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al buscar los usuarios en la base de datos.'
        });
    }
}

export const creaUsuario = async (req, res) => 
{
    try
    {
        //debo controlar que el usuario no este ya ingresado.
        const { email } = req.body;
        let usuario = await Usuario.findOne({email: email});
        if(usuario)
        {
            return res.status(400).json({
                mensaje: 'El mail ingresado ya esta registrado.'
            })
        }

        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({
                error: errors.array()
            });
        }
        const usuarioNuevo = new Usuario(req.body);
        await usuarioNuevo.save();
        res.status(201).json({
            mensaje: 'El nuevo usuario fue almacenado exitosamente.',
            nombre: usuarioNuevo.nombreUsuario,
            uid: usuarioNuevo._id
        })
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al intentar ingresar el nuevo usuario en la base de datos.'
        });
    }
}