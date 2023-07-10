import { Router } from "express";
import { creaUsuario, login, obtenerUsuarios, obtieneUsuario } from "../controlers/ususarios.controller";
import { check } from "express-validator";

const router = Router();

router.route('/usuarios')
    .get(obtenerUsuarios)
    .post([
        check("email")
            .isEmpty()
            .withMessage('El campo del email es obligatorio')
            .isLength({min: 8, max: 40})
            .withMessage('El campo de email debe contener como minimo 8 caracteres y como maximo 40 caracteres'),
        check("password")
            .notEmpty()
            .withMessage('El campo de contraseña es obligatorio.')
            .isLength({min: 6, max: 100})
            .withMessage('El campo de contraseña debe tener como minimo 6 caracteres y como maximo 15 caracteres.')
            .matches(/^(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-z]).{6,}$/)
            .withMessage('La contraseña ingresada no es valida.')
    ],login);  //Para obtener todos los usuarios
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
router.route('/usuariosnuevo')
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
            .isLength({min: 6, max: 100})
            .withMessage('El campo de contraseña debe tener como minimo 6 caracteres y como maximo 15 caracteres.')
    ],creaUsuario); //Para crear un nuevo usuario  

router.route('/usuarios/:id').get(obtieneUsuario);

export default router;