import { Request, Response } from "express";
import { Patient } from "../../models/Patient";
import bcrypt from "bcrypt";
export async function UpdatePatient(req:Request, res:Response){
    const {id} = req.params;
    const {name, birthday, address, phone_number, email, password, doctor} = req.body;
    const hashed = await bcrypt.hash(password, 10);
    
    try {
        let patient = await Patient.findById(id);
        const newPatient = await Patient.findOneAndUpdate({_id: id},
            {
                $set: {
                    name: name,
                    birthday: birthday,
                    address: address,
                    phone_number: phone_number,
                    email: email,
                    password: hashed,
                    doctor: doctor
                }
            },
            {
                upsert: true, "new": true
            }
        );
        res.status(200).json({'patient':patient, 'updatedPatient': newPatient});
    } catch (error) {
        res.status(500).json(({error: "Error updating Patient"}));
    }
};