const express = require('express')
const router = express.Router()
const { authentication } = require("../MiddleWare/auth")

const { createUser, updateUser, loginUser, getById } = require('../Controllers/userController')
const { createProduct, getProducts, getProductById, updateProduct, deleteProductById } = require('../Controllers/productController')
const { addToCart,cartUpdate, getCartDetails,deletecart } = require('../Controllers/cartController')

router.get("/test", function (req, res) {
    return res.send({ data: "This to test" })
})

// for users route=============================>

router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/user/:userId/profile", authentication, getById)
router.put("/user/:userId/profile", authentication, updateUser)

// for products route=============================>

router.post("/products", createProduct)
router.get("/products", getProducts)
router.get('/products/:productId', getProductById)
router.put('/products/:productId', updateProduct)
router.delete("/products/:productId", deleteProductById)

// for cart route=================================>

router.post("/users/:userId/cart", authentication, addToCart)
router.put("/users/:userId/cart",authentication,cartUpdate)
router.get("/users/:userId/cart",authentication,getCartDetails)
router.delete("/users/:userId/cart",authentication,deletecart)


// for worng route=============================>

router.all('/*/', async function (req, res) {
    return res.status(404).send({ status: false, message: "Page Not Found" })
})


module.exports = router