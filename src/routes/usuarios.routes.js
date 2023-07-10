import { Router } from "express";
import { creaUsuario, obtenerUsuarios, obtieneUsuario } from "../controlers/ususarios.controller";
import { check } from "express-validator";

const router = Router();

router.route('/usuarios')
    .get(obtenerUsuarios);  //Para obtener todos los usuarios
/*
    .post([
        check("nombreUsuario")
            .notEmpty()
            .withMessage('El nombre de usuario es un campo obligatorio'),
        check("nombreUsuario")
            .isLength({min: 4, max: 14})
            .withMessage('El nombre de usuario debe contener entre 4 y 14 caracteres'),
        check("email")
            .notEmpty()
            .withMessage('El campo del email es obligatorio'),
        check("email")
            .isLength({min: 8, max: 40})
            .withMessage('El campo de email debe contener como minimo 8 caracteres y como maximo 40 caracteres'),
        check("email")
            .isEmail()
            .withMessage('El email proporcionado no es valido. Ingrese una direccion de email valida.'),
        check("password")
            .notEmpty()
            .withMessage('El campo de contraseña es obligatorio.'),
        check("password")
            .isLength({min: 6, max: 15})
            .withMessage('El campo de contraseña debe tener como minimo 6 caracteres y como maximo 15 caracteres.')
    ],creaUsuario); //Para crear un nuevo usuario  
*/
router.route('/usuarionuevo')
    .post([
        check("nombreUsuario")
            .notEmpty()
            .withMessage('El nombre de usuario es un campo obligatorio'),
        check("nombreUsuario")
            .isLength({min: 4, max: 14})
            .withMessage('El nombre de usuario debe contener entre 4 y 14 caracteres'),
        check("email")
            .notEmpty()
            .withMessage('El campo del email es obligatorio'),
        check("email")
            .isLength({min: 8, max: 40})
            .withMessage('El campo de email debe contener como minimo 8 caracteres y como maximo 40 caracteres'),
        check("email")
            .isEmail()
            .withMessage('El email proporcionado no es valido. Ingrese una direccion de email valida.'),
        check("password")
            .notEmpty()
            .withMessage('El campo de contraseña es obligatorio.'),
        check("password")
            .isLength({min: 6, max: 15})
            .withMessage('El campo de contraseña debe tener como minimo 6 caracteres y como maximo 15 caracteres.')
    ],creaUsuario); //Para crear un nuevo usuario  

router.route('/usuarios/:id').get(obtieneUsuario);

export default router;