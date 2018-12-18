// relations as array of objects inside the collection

const mongoose = require("mongoose");


// opening connection

mongoose.connect("mongodb://localhost/vezeeto")
    .then(() => {
        console.log("connected to mongo");
    })
    .catch(e => console.error(e));

var clinicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        enum: ['cairo', 'Alex', 'Giza', 'Assiut']
    }

});

var Clinic = mongoose.model("Clinic", clinicSchema);


var doctorSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    speciality: {
        type: String,
        enum: ['optical', 'surgery', 'dental']
    },
    phone: String,
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic"

    }

});

var Doctor = mongoose.model("Doctor", doctorSchema);

async function createNewClinic(name, address) {
    try {
        var clinic = new Clinic({
            name: name,
            address: address

        });
        var result = await clinic.save();
        //console.log(result);
        return result;

    } catch (e) {
        console.error(e);
    }
}


// new doctor to be saved
async function createNewDoctor(name, last, clinicId) {
    try {
        var doctor = new Doctor({
            firstName: name,
            lastName: last,
            clinicId: clinicId
        });
        var result = await doctor.save();
        //console.log(result);
    } catch (e) {
        console.error(e);
    }
}
//createNewDoctor("Mahmoud", "Tolba", '');
var createRecords = async () => {
    var clinic = await createNewClinic("Cairo Clinic", "cairo");
    await createNewDoctor("Mahmoud", "Tolba", clinic._id);
}
//createRecords();
async function updateDoctorInfo(doctorId, clinicId, name, address) {
    try {
        var doctor = await Doctor.findOne({
            _id: doctorId
        });
        if (doctor) {

            var clinic = doctor.clinics.id(clinicId);
            if (clinic) {
                clinic.name = name;
                clinic.address = address;

                var result = await doctor.save();
                //console.log(result);
            }
        }
    } catch (e) {
        console.error(e);
    }
}

async function getDcotors() {
    var doctors = await Doctor.find().populate("clinicId","name");

    console.log(doctors);
}
console.log("finding here");
getDcotors();


// updating doctor 
//updateDoctorInfo('5c100c9b68a885ba71772569','5c100c9b68a885ba7177256b',"my clinic","cairo");

module.exports = doctorSchema;
