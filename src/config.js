import 'dotenv/config';
export const MOGODB_URI = process.env.MOGODB_URI || 'mongodb://localhost:27017/recetasDB'; //Creo la base de datos de manera local