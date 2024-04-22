const categoryRouter=require("./categoryRoutes");
const publisherRouter=require("./publisherRoutes");

module.exports=function(app){
    app.use("/api/v1/category",categoryRouter);
    app.use("/api/v1/publisher",publisherRouter);
    app.use("/",(req,res)=>{
        return res.status(200).send("Welcome To Book API");
    });
}