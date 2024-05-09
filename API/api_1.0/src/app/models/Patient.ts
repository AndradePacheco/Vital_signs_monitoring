import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const patientSchema = new Schema({
    'privilege': {
        type: String,
        default: 'Patient'
    },
    'name': {
        type: String,
        required: true,
    },
    'birthday': {
        type: String,
        required: true,
    },
    'diseases': [String],

    'address': {
        type: String,
        required: true,
    },

    'phone_number': {
        type: Number,
        required: true,
    },

    'email': {
        type: String,
        required: true,
    },

    'password': {
        type: String,
        required: true
    },

    'doctor': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor',
    },

    'familiar':{
        type: Schema.Types.ObjectId,
        ref: 'Familiar'
    },
    'vital_signs':{
        type: Schema.Types.ObjectId,
        ref: 'VitalSigns'
    }
});

//Encriptação da "password" antes da criação de qualquer "familiar"

patientSchema.pre('save', function(next){

    //A password será encriptada antes da criação do familiar ou atualização da password

    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(this.password, 10, function(err, hashedPassword){
            if(err) next(err);

            else{
                document.password = hashedPassword;
                next();
            }
        })
    }
});

export const Patient = model('Patient', patientSchema);