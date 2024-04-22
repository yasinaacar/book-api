require("express-async-errors");
const express=require("express");
require("dotenv").config();
const app=express();

app.use(express.json());

//routes
require("./src/routes/routes")(app);

//error handler
app.use(require("./src/middlewares/errorHandler"));

//database transaction
(async ()=>{
    await require("./src/db/connectDb")();
})();


const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Listening port ${port}`);
});