import { Request, Response } from "express";
import { Doctor } from "../../models/Doctor";
import bcrypt from "bcrypt";
export async function UpdateDoctor(req:Request, res:Response){
    const {id} = req.params;
    const {name, phone_number, email, password} = req.body;
    const hashed = await bcrypt.hash(password, 10);
    
    try {
        let doctor = await Doctor.findById(id);
        const newDoctor = await Doctor.findOneAndUpdate({_id: id},
            {
                $set: {
                    name: name,
                    phone_number: phone_number,
                    email: email,
                    password: hashed,
                }
            },
            {
                upsert: true, "new": true
            }
        );
        res.status(200).json({'doctor':doctor, 'updatedDoctor': newDoctor});
    } catch (error) {
        res.status(500).json(({error: "Error updating Doctor"}));
    }
};