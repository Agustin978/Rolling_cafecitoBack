import { Router } from "express"; //MEtodo que contiene toda la logica necesaria para poder controlar las rutas.
import { creaReceta, obtenerRecetas } from "../controlers/recetas.controllers";
import { borraReceta } from "../controlers/recetas.controllers";
import { editaReceta } from "../controlers/recetas.controllers";
import { obtenerReceta } from "../controlers/recetas.controllers";
import { check } from 'express-validator';

const router = Router();

//Rutas (siempre van al final, luego de los middlewares y de todas las configuraciones previas que se deban hacer).
/*
app.get('/prueba',(req, res)=>{
    res.send('Esto es una prueba de la solicitud get a mi backend');
});*/

router.route('/recetas')
    .get(obtenerRecetas) //Para obrener las recetas de la bd
    .post([
        check("nombrePlatillo").
            notEmpty().
            withMessage('El nombre de la receta es un campo obligatorio'),
        check("nombrePlatillo")
            .isLength({min: 2, max:200})
            .withMessage('El titulo de la receta debe tener como minimo 2 caracteres y como maximo 2000 caracteres'),
        check("descripcion")
            .notEmpty()
            .withMessage('La descripcion de la receta es un campo obligatorio.'),
        check("descripcion")
            .isLength({min:10, max:2000})
            .withMessage('La descripcion de la receta debe tener como minimo 10 caracteres y como maximo 2000'),
        check("imagen")
            .notEmpty()
            .withMessage('La imagen de la receta es un campo obligatorio.'),
        check("imagen")
            .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)
            .withMessage('La URL proporcionada no es valida'),
        check("categoria").
            notEmpty().
            withMessage('La categoria de una receta es obligatoria.')
    ],creaReceta); //Para crear rec etas enla bd


router.route('/recetas/:id')
    .delete(borraReceta)  //Para borrar una receta usando el id de la misma.
    .put([
        check("nombrePlatillo").
            notEmpty().
            withMessage('El nombre de la receta es un campo obligatorio'),
        check("nombrePlatillo")
            .isLength({min: 2, max:200})
            .withMessage('El titulo de la receta debe tener como minimo 2 caracteres y como maximo 2000 caracteres'),
        check("descripcion")
            .notEmpty()
            .withMessage('La descripcion de la receta es un campo obligatorio.'),
        check("descripcion")
            .isLength({min:10, max:2000})
            .withMessage('La descripcion de la receta debe tener como minimo 10 caracteres y como maximo 2000'),
        check("imagen")
            .notEmpty()
            .withMessage('La imagen de la receta es un campo obligatorio.'),
        check("imagen")
            .isURL()
            .withMessage('La URL proporcionada no es valida'),
        check("categoria").
            notEmpty().
            withMessage('La categoria de una receta es obligatoria.')
    ],editaReceta) //Para editar una receta usando el id de la misma.
    .get(obtenerReceta); //Para obtener una receta en particular usando su id.

export default router;