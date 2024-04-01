import { Request, Response } from "express";
import { Patient } from "../../models/Patient";

export async function GetPatients(req: Request, res: Response) {
    
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.json(({error: "Error getting patients list"}));
    }
}