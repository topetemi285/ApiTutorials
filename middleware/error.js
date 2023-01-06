function errorHandler(err,req,res,next){
    if(typeof err === "string"){
        return res.status(400).json({message:err.message})
    }
    
    if(err.name === "ValidationError"){
        return res.status(400).json({message:err.message})
    }
    return res.status(500).json({message:err.message})
}

module.exports={errorHandler}