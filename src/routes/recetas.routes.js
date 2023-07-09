import { Router } from "express"; //MEtodo que contiene toda la logica necesaria para poder controlar las rutas.
import { creaReceta, obtenerRecetas } from "../controlers/recetas.controllers";
const router = Router();

//Rutas (siempre van al final, luego de los middlewares y de todas las configuraciones previas que se deban hacer).
/*
app.get('/prueba',(req, res)=>{
    res.send('Esto es una prueba de la solicitud get a mi backend');
});*/

router.route('/recetas')
    .get(obtenerRecetas) //Para obrener las recetas de la bd
    .post(creaReceta); //Para crear recetas en la bd

export default router;