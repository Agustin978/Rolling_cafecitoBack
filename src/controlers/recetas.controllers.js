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