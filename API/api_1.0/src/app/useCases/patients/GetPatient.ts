import { Request, Response } from "express";
import { Patient } from "../../models/Patient";

export async function GetPatient(req: Request, res: Response) {
    try {
        const { id } = req.params;
        let patient = await Patient.findById(id);
        res.json(patient);
    } catch (error) {
        console.log(error)
        res.json(({error: "Error getting doctor info"}));
    }
};