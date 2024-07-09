




  const config = require("./config/config.js");
  const {mongo_url} = config;
  const mongoose = require("mongoose");

//conectar con base de datos
mongoose.connect(mongo_url)
  .then(() => console.log("coneccion exitosa"))
  .catch( () => console.log("error en la coneccion"));  

