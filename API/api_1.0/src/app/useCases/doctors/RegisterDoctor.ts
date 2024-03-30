import { Request, Response } from "express";
import { Doctor } from "../../models/Doctor";

export async function RegisterDoctor(req:Request, res:Response){
    const {name, phone_number, email, password } = req.body;
    const doctor = new Doctor({name, phone_number, email, password});

    try {
        await doctor.save();
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json(({error: "Error on registering doctor"}));
    }
}