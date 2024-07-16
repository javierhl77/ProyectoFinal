

const ProductModel = require("../models/product.model.js");

const CartRepository = require ("../repositories/cart.repository.js");
const cartRepository = new CartRepository();

const productRepository = require("../repositories/product.repository.js");
const ProductRepository = new productRepository();

const userRepository = require("../repositories/user.repository.js");
const UserRepository = new userRepository();

class ViewsController {

    async renderProductos (req,res) {
          
        try {
            const { limit = 2 ,page = 1 } = req.query;
            const productos = await ProductRepository.getAll({
               page: parseInt(page),
               limit: parseInt(limit)
            });
         
            const nuevoArray = productos.docs.map(producto => {
               const { _id, ...rest } = producto.toObject();
               return { id: _id, ...rest };
            });
      
           const cartId = req.user.cart.toString();
            
            res.render("products", {
               productos: nuevoArray,
               hasPrevPage: productos.hasPrevPage,
               hasNextPage: productos.hasNextPage,
               prevPage: productos.prevPage,
               nextPage: productos.nextPage,
               currentPage: productos.page,
               totalPages: productos.totalPages,
               cartId
            });
      
         } catch (error) {
            console.error("Error al obtener productos", error);
            res.status(500).json({
               status: 'error',
               error: "Error interno del servidor"
            });
         }
        
    }
    async renderUsuarios (req,res)  {
        try {
            const { limit = 2 ,page = 1 } = req.query;
            const usuarios = await UserRepository.getUsers({
               page: parseInt(page),
               limit: parseInt(limit)
            });
         
            const nuevoArray = usuarios.docs.map(usuario => {
               const { _id, ...rest } = usuario.toObject();
               return { id: _id, ...rest };
            });
      
           res.render("verUsuarios", {
               usuarios: nuevoArray,
               hasPrevPage: usuarios.hasPrevPage,
               hasNextPage: usuarios.hasNextPage,
               prevPage: usuarios.prevPage,
               nextPage: usuarios.nextPage,
               currentPage: usuarios.page,
               totalPages: usuarios.totalPages,
               
            });
      
         } catch (error) {
            console.error("Error al obtener los usuarios", error);
            res.status(500).json({
               status: 'error',
               error: "Error interno del servidor"
            });
         }

    }

   async renderCarts(req,res) {
      const cartId = req.params.cid;
   
    try {
      const carrito = await cartRepository.GetProductsCart(cartId)//.populate("products");
      console.log(JSON.stringify(carrito, null, 2));
      if (!carrito) {
         console.log("No existe ese carrito con el id");
         return res.status(404).json({ error: "Carrito no encontrado" });
      }
      let totalCompra = 0;
      const productosEnCarrito = carrito.products.map(item => {
        const product = item.product.toObject();
        const quantity = item.quantity;
        const totalPrice = product.price * quantity;
        totalCompra += totalPrice;
        return {
         product: { ...product, totalPrice},
         quantity,
         cartId
        };
         
      }
   );



      res.render("carts", { productos : productosEnCarrito, totalCompra, cartId });
   } catch (error) {
      console.error("Error al obtener el carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
   }
    
      
    }

}

module.exports = ViewsController;