

const express = require("express");
const router = express.Router();

const ViewsController = require("../controllers/views.controller.js");
const viewsController = new(ViewsController);

const checkUserRole = require("../middleware/checkrole.js");
const passport = require("passport");



router.get("/products",checkUserRole(['user','premium']), passport.authenticate('jwt', { session: false }), viewsController.renderProductos );

router.get("/realtimeproducts", checkUserRole(['admin', 'premium']), passport.authenticate('jwt', { session: false }), (req,res) => {
      const usuario = req.user;
      res.render("realtimeproducts", {role: usuario.role, email: usuario.email});
   })


router.get("/carts/:cid", viewsController.renderCarts);

router.get("/Usuarios", viewsController.renderUsuarios);



router.get("/reset-password", (req,res) => {
   res.render("password-reset")
})
router.get("/Password",(req,res) => {
   res.render("password-cambio")
})

router.get("/confirmacion", (req,res) => {
   res.render("ConfirmacionDeEnvio")
})



router.get("/", async(req,res) => {
    res.render("home");
})

router.get("/chat", async(req,res) => {
   res.render("chat");
})

router.get("/register", (req,res) => {
   res.render("register");
})

router.get("/login", (req,res) => {
   res.render("login");
})


module.exports = router;