const categoryRouter=require("./categoryRoutes");
const publisherRouter=require("./publisherRoutes");
const authorRouter=require("./authorRoutes");
const bookRouter=require("./bookRoutes");

module.exports=function(app){
    app.use("/api/v1/category",categoryRouter);
    app.use("/api/v1/publisher",publisherRouter);
    app.use("/api/v1/author",authorRouter);
    app.use("/api/v1/book",bookRouter);
    app.use("/",(req,res)=>{
        return res.status(200).send("Welcome To Book API");
    });
}