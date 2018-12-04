module.exports=function(app){

const userRoute=require("../routes/user");
const productsRoute=require("../routes/products");

//users
app.use("/api/users/",userRoute);

// products
app.use("/api/products",productsRoute);

//clinics

//bookings
}
