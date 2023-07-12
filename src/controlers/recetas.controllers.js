import { validationResult } from "express-validator";
import Receta from "../models/producto"

//Controlador para obtener recetas
export const obtenerRecetas = async (req, res)=>{
    try
    {
        const recetas = await Receta.find(); //Con simplemente hacer un find obtengo los productos de mi base de datos.
        res.status(200).json(recetas);  
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al buscar las recetas en la base de datos.'
        });
    }
};

export const obtenerReceta = async (req, res) =>
{
    try
    {
        const receta = await Receta.findById(req.params.id);
        res.status(200).json(receta);
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al buscar la receta con id: '+req.params.id+' en la base de datos.'
        });
    }
}

//Controlador para crear recetas
export const creaReceta = async (req, res)=>
{
    try
    {
        //console.log(req.body);

        //Trabajar con el resultado de la validacion
        const errors = validationResult(req);
        //errors.isEmpty(); devuelve true si es que no hay errores. False si hay algun error
        if(!errors.isEmpty())
        {
            return res.status(400).json({
                error: errors.array()
            });
        }
        const recetaNueva = new Receta(req.body);
        await recetaNueva.save(); //Con save lo almaceno en la bd
        res.status(201).json({
            mensaje: 'La nueva receta fue creada correctamente.'
        });
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(400).json({
            mensaje: 'Error al crear la receta en la base de datos.'
        });
    }
}

//Controlador para borrar recetas
export const borraReceta = async (req, res) =>
{
    try
    {
        //Debo buscar el id y luego pedirle a mongoose eliminarlo.
        //console.log(req);
        console.log(req.params.id); //para obtener el parametro que yo necesito (obtendra de la url el id de la receta.
        await Receta.findByIdAndDelete(req.params.id);
        res.status(200).json({
            mensaje: 'El producto fue eliminado con exito.'
        })
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(404).json({
            mensaje: 'Error al eliminar la receta con id "'+req.params.id+'" en la base de datos.'
        });
    }
}

export const editaReceta = async (req, res) => 
{
    try
    {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({
                error: errors.array()
            });
        }
        //extraer el id del request y el body 
        await Receta.findByIdAndUpdate(req.params.id, req.body); //El primer parametro sirve para ubicarlo por el id
        //El segundo parametro como el req.body nos muestra el cuerpo como del objeto como lo debemos guardad en la bd
        //sirve para guardarlo de esa manera en la bd.
        res.status(200).json({
            mensaje: 'La receta fue editada correctamente.'
        });
    }catch(error)
    {
        console.log('A ocurrido un error al intentar comunicarse con la base de datos. Info de error: '+error);
        res.status(404).json({
            mensaje: 'Error, la receta no pudo ser editada.'
        });
    }
}