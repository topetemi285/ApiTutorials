const express = require("express")
const app =express();
const mongoose =require("mongoose")
const {MONGO_DB_CONFIG} = require("./config/app.config")
const errors = require("./middleware/error")

mongoose.Promise = global.Promise
    mongoose.connect(MONGO_DB_CONFIG.DB, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }).then(
        ()=>{
            console.log('Database Connected')
        },
        (error)=>{
            console.log("Database not connected" + error)
        }
        );

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./route/app.route"));
app.use(errors.errorHandler);

app.listen(process.env.port || 4000, function(){
    console.log('APP is ready to be used')
})