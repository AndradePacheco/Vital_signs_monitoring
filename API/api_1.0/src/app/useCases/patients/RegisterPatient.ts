import { Request, Response } from "express";
import { Patient } from "../../models/Patient";

export async function RegisterPatient(req:Request, res:Response){
    const {name, birthday, diseases, adress, phone_number, email, password, doctor} = req.body;
    const patient = new Patient({name, birthday, diseases, adress, phone_number, email, password, doctor});

    try {
        await patient.save();
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json(({error: "Error on registering familiar"}));
    }
};