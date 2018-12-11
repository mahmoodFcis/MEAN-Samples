// relations as array of objects inside the collection

const mongoose=require("mongoose");


// opening connection

mongoose.connect("mongodb://localhost/vezeeto")
.then(()=>{console.log("connected to mongo")})
.catch(e=>console.error(e));

var Clinic={
address:"",phone:"",name:""
}

var doctorSchema=new mongoose.Schema({

    firstName:String,
    lastName:String,
    speciality:{type:String,enum:['optical','surgery','dental']},
    phone:String,
    clinics:[Clinic]

});

var Doctor=mongoose.model("Doctor",doctorSchema);


// new doctor to be saved
async function createNewDoctor(name,last,_clinics)
{
   
    var doctor=new Doctor({firstName:name,lastName:last,clinics:_clinics});
    var result=await doctor.save();
    console.log(result);
}

var lstClinics=[{name:"clnic1"},{name:"clnic2"}];
createNewDoctor("Mahmoud","Tolba",lstClinics);

module.exports=Doctor;

