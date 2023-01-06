const prodcutService = require("../services/product.services");
const upload         = require("../middleware/upload");

exports.create = (req,res,next) =>{
    upload(req,res,function(error){
        if(error){
            next(error);
        }
        else{
            const url = req.protocol + "://" + req.get("host");
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
            
            var model = {
                productName : req.body.productName,
                productDescription : req.body.productDescription,
                productPrice : req.body.productPrice,
                productImage : path != ""? url + "/" + path:""
            };

            prodcutService.createProduct(model,(error,results)=>{
                if(error){
                    return next(error)
                }
                else{
                    return res.status(200).send({
                        message:"success",
                        data:results
                    })
                }
            })
        }
    })
}

exports.findAll = (req,res,next) =>{        
            var model = {
                productName : req.query.productName,
            };

            prodcutService.getProduct(model,(error,results)=>{
                if(error){
                    return next(error)
                }
                else{
                    return res.status(200).send({
                        message:"success",
                        data:results
                    })
                }
            })
        }

exports.findOne = (req,res,next) =>{        
    var model = {
        productId : req.params.id,
    };

    prodcutService.getProductById(model,(error,results)=>{
        if(error){
            return next(error)
        }
        else{
            return res.status(200).send({
                message:"success",
                data:results
            })
        }
    })
}

exports.update = (req,res,next) =>{
    upload(req,res,function(error){
        if(error){
            next(error);
        }
        else{
            const url = req.protocol + "://" + req.get("host");
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
            
            var model = {
                productId   :req.params.id,
                productName : req.body.productName,
                productDescription : req.body.productDescription,
                productPrice : req.body.productPrice,
                productImage : path != ""? url + "/" + path:""
            };

            prodcutService.updateProduct(model,(error,results)=>{
                if(error){
                    return next(error)
                }
                else{
                    return res.status(200).send({
                        message:"success",
                        data:results
                    })
                }
            })
        }
    })
}

exports.delete = (req,res,next) =>{        
    var model = {
        productId : req.params.id,
    };

    prodcutService.deleteProduct(model,(error,results)=>{
        if(error){
            return next(error)
        }
        else{
            return res.status(200).send({
                message:"success",
                data:results
            })
        }
    })
}


