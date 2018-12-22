module.exports=function(app){
const myMiddleware=require("../middleware/myMiddlware");
const userRoute=require("../routes/user");
const productsRoute=require("../routes/products");
const authRoute=require("../routes/auth");
//users
app.use("/api/users/",userRoute);

// products
app.use("/api/products",productsRoute);

//auth
app.use("/api/auth/",authRoute);
//clinics

//bookings
}
