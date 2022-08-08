import {Router} from "express";
import Cart from "../models/Cart"
import Product from "../models/Product"
const route:Router=Router();


route.get('/',async(req,res,next)=>{ //=> ver si está logueado, middleware JWT
    
    try {
        const allProductsInCart = await Cart.find(/*{ user : req.user}*/); //buscarlo por ID
        allProductsInCart.length > 0 ? res.send(allProductsInCart) :
        res.send('There are no products in the Cart');    
    } catch(err) {
        next(err);
    }
});



route.post('/:id', async(req,res,next)=>{
    try{
        const {name, image, price} = req.body
        const { id } = req.params
        //ambas búsquedas deberían ser por id
        const productInDb = await Product.findOne({name})
        const productInCart = await Cart.findOne({name})

        !productInDb && res.send('This product it´s not available');
        productInCart && res.send('This product it´s already in the Cart')

        if(productInDb && !productInCart){
            const newProductOnCart = new Cart({name, image, price, amount : 1});

            await Product.findByIdAndUpdate(
                productInDb?._id,
                { inCart: true, name, image, price},
                { new : true }
            ).then((product)=> {
                newProductOnCart.save();
                res.send(product)
            }).catch(err => console.log(err))
        }

    } catch(err){
        next(err)
    }
});


route.put("/:productId", async (req, res)=>{
  const { productId } = req.params;
  const { query } = req.query;
  const body = req.body;

  const productBuscado = await Cart.findById(productId);

  if (!query) {
    res.status(404).json({ mensaje: "Debes enviar una query" });

  } else if (productBuscado && query === "add") {
    body.amount = body.amount + 1;

    await Cart.findByIdAndUpdate(productId, body, {
      new: true,
    }).then((product : any) => {
      res.json({
        mensaje: `El producto: ${Cart.name} fue actualizado`,
        product,
      });
    });

  } else if (productBuscado && query === "del") {
    body.amount = body.amount - 1;

    await Cart.findByIdAndUpdate(productId, body, {
      new: true,
    }).then((product : any) =>
      res.json({
        mensaje: `El producto: ${Cart.name} fue actualizado`,
        product,
      })
    );
  } else {
    res.status(400).json({ mensaje: "Ocurrio un error" });
  }
});

route.delete("/:productId", async (req, res)=>{
    const {productId} = req.params;
    const productInCart = await Cart.findById(productId);
    const { name, img, price, _id } = await Product.findOne({
      "name": productInCart.name,
    });
    await Cart.findByIdAndDelete(productId);
    await Product.findByIdAndUpdate(
      _id,
      { inCart: false, name, img, price },
      { new: true }
    )
      .then((product:{}) => {
        res.json({
          mensaje: `El producto ${name} fue eliminado del carrito`,
        });
      })
      .catch((error:string) => res.json({ mensaje: "Hubo un error" }));
    });
export default route;