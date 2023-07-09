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

//Controlador para crear recetas
export const creaReceta = async (req, res)=>
{
    try
    {
        console.log(req.body);
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