const { product } = require("../models/product.model");

async function createProduct(params,cb){
    if(!params.productName){
        return cb({
            message:"product name required"
        },
        ""
        )
    }

    const productModel = product(params);
    productModel.save()
    .then((response)=>{
        return cb(null,response);

    }).catch((error)=>{
        return cb(error); 
    })
}

async function getProduct(params,cb){
    const productName = params.productName;
    var condition = productName ? {productName:{ $regex:new RegExp(productName), $option:"i"}}
    :{};
    product.find(condition)
    .then((response)=>{
        return cb(null,response);

    }).catch((error)=>{
        return cb(error); 
    })
}

async function getProductById(params,cb){
    const productId = params.productId;
    
    product.findById(productId)
    .then((response)=>{
        if(!response) cb('product id not found')
        else
        return cb(null,response);

    }).catch((error)=>{
        return cb(error); 
    })
}

async function updateProduct(params,cb){
    const productId = params.productId;
    
    product.findByIdAndUpdate(productId, params, {useFindAndModify:false})
    .then((response)=>{
        if(!response) cb('product id not found')
        else
        return cb(null,response);
    }).catch((error)=>{
        return cb(error); 
    })
}

async function deleteProduct(params,cb){
    const productId = params.productId;
    
    product.findByIdAndRemove(productId)
    .then((response)=>{
        if(!response) cb('product id not found')
        else
        return cb(null,response);
    }).catch((error)=>{
        return cb(error); 
    })
}

module.exports = {
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
}

