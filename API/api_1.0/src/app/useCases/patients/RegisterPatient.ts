import { Request, Response } from "express";
import { Patient } from "../../models/Patient";
import { VitalSigns } from "../../models/VitalSings";

export async function RegisterPatient(req:Request, res:Response){
    const {name, birthday, address, phone_number, email, password, doctor} = req.body;
    const patient = new Patient({name, birthday, address, phone_number, email, password, doctor});

    try {
        await patient.save();
        const vital_signs = new VitalSigns({'patient': patient.id});
        await vital_signs.save();
        res.status(200).json({'patient':patient,'vitalsigns': vital_signs});
    } catch (error) {
        res.status(500).json(({error: "Error on registering patient"}));
    }
};