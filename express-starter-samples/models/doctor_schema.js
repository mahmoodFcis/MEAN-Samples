// relations as array of objects inside the collection

const mongoose = require("mongoose");


// opening connection

mongoose.connect("mongodb://localhost/vezeeto")
    .then(() => {
        console.log("connected to mongo")
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

var doctorSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    speciality: {
        type: String,
        enum: ['optical', 'surgery', 'dental']
    },
    phone: String,
    clinics: [clinicSchema]

});

var Doctor = mongoose.model("Doctor", doctorSchema);


// new doctor to be saved
async function createNewDoctor(name, last, _clinics) {
    try {
        var doctor = new Doctor({
            firstName: name,
            lastName: last,
            clinics: _clinics
        });
        var result = await doctor.save();
        console.log(result);
    } catch (e) {
        console.error(e);
    }
}

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
                console.log(result);
            }
        }
    } catch (e) {
        console.error(e);
    }
}

//adding new doctor
var lstClinics = [{
    name: "clnic1"
}, {
    name: "clnic2"
}];
createNewDoctor("Mahmoud", "Tolba", lstClinics);


// updating doctor 
updateDoctorInfo('5c100c9b68a885ba71772569','5c100c9b68a885ba7177256b',"my clinic","cairo");

module.exports = doctorSchema;
