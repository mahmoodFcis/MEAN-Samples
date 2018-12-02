var express=require("express");
var app=express();
const productsRouter=require("./routes/products");
app.use(express.json());
app.get("",(req,res)=>{


    res.send("this is a response from node server");
})

app.get("/users/:userId",(req,res)=>{

    res.send(req.params.userId);
})

app.get("/api/clinics",(req,res)=>{
res.send(req.headers);

})
app.use("/api/products",productsRouter)
app.listen(3000,()=>{console.log("is listening to port 4444")});