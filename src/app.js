//** TP FINAL */
// alumno : JAVIER LEZCANO 
// comision: 50045

const express = require("express");
const app = express();
const productsRouter = require("./routes/product.router.js");
const cartsRouter = require ("./routes/carts.router.js");
const userRouter = require("./routes/user.router.js");
const viewsRouter = require("./routes/views.router");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cookieParser = require("cookie-parser");

//dotenv.config();

const PUERTO = process.env.PORT||8080;
//const connection = mongoose.connect(process.env.MONGO_URL)


require("./database.js");



const socket = require("socket.io");

//const PUERTO = 8080;
 const exphbs = require ("express-handlebars");

 //configurar handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//passport
app.use(passport.initialize());
initializePassport();
app.use(cookieParser());

 //AuthMiddleware
const authMiddleware = require("./middleware/authmiddleware.js");
app.use(authMiddleware); 


//middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

//routing


app.use("/api/products/", productsRouter )
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/", viewsRouter);


//guardar una referencia de express 
const httpServer = app.listen(PUERTO, () => {
    console.log(`escuchando en el puerto : ${PUERTO}` );
})



const SocketManager = require("./websocket/socketmanager.js");
new SocketManager(httpServer);
