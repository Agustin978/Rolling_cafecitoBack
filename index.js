import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import './src/dataBase/DBconnection';

dotenv.config(); //Para poder leer variables de entorno
//Debo configurar un puerto
const app = express();
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), ()=>{
    console.log("Estoy en el puerto: "+app.get("port"));
});

//Middlewares: funciones que ejecutan alguna tarea antes de llegar a las rutas
app.use(cors()); //Permite conexiones remotas.
app.use(express.json()); //Permite interpretar el formato json 
app.use(express.urlencoded({extended: true})); //permite en el objeto request los strings y los arrays 
app.use(morgan()); //Nos da info extra en la terminal

//Rutas (siempre van al final, luego de los middlewares y de todas las configuraciones previas que se deban hacer).
app.get('/prueba',(req, res)=>{
    res.send('Esto es una prueba de la solicitud get a mi backend');
});