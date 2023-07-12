import 'dotenv/config';
export const MOGODB_URI = process.env.MOGODB_URI || 'mongodb://127.0.0.1:27017/recetasDB'; //Creo la base de datos de manera local