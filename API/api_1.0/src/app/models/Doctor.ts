import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const doctorSchema = new Schema({
    'privilege': {
        type: String,
        default: 'Doctor'
    },
    'name': {
        type: String,
        required: true
    },
    
    'phone_number': {
        type: Number,
        required: true
    },
    'email':{
        type: String,
        required: true
    },
    'password': {
        type: String,
        required: true
    }
});

//Encriptação da "password" antes da criação de qualquer "familiar"

doctorSchema.pre('save', function(next){

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

export const Doctor = model('Doctor', doctorSchema);