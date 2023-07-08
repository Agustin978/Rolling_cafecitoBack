import express from "express";
//Debo configurar un puerto
const app = express();
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), ()=>{
    console.log("Estoy en el puerto: "+app.get("port"));
});