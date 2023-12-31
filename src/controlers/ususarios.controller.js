import { validationResult } from "express-validator";
import Usuario from "../models/usuario";
import bcrypt from 'bcrypt';

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
        const { email, password } = req.body;
        const { nombreUsuario } = req.body;
        let usuario = await Usuario.findOne({email: email});
        let usuarioName = await Usuario.findOne({nombreUsuario: nombreUsuario});
        if(usuario)
        {
            return res.status(400).json({
                mensaje: 'El mail ingresado ya esta registrado.'
            })
        }else if(usuarioName)
        {
            return res.status(400).json({
                mensaje: 'El nombre de usuario ingresado ya esta registrado.'
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
        //Aqui puedo modificar el usuario que se creara.
        const salt = bcrypt.genSaltSync(10); //Numero de saltos del algoritmo para encriptar la contraseña. 10 es el estandar
        usuarioNuevo.password = bcrypt.hashSync(password, salt);
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

//Funcion para loguear un usuario
export const login = async (req, res) => 
{
    try
    {
        const {email, password} = req.body;
        console.log(email);
        console.log(password);
        let usuario = await Usuario.findOne({email:email});
        //Si el usuario no existe
        if(!usuario)
        {
            return res.status(400).json({
                mensaje: 'Correo o password invalidos.'
            });
        }

        const passwordEncriptada = bcrypt.compareSync(password, usuario.password); //Devolvera un booleano, si es valido devuelve true
        //Si no es valido el password
        if(!passwordEncriptada)
        {
            return res.status(400).json({
                mensaje: 'Correo o password invalidos.'
            });
        }
        res.status(200).json({
            mensaje: 'El usuario existe.',
            uid: usuario._id,
            nombre: usuario.nombreUsuario,
            type: usuario.type
        })
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al intentar loguearse.'
        });
    }
}