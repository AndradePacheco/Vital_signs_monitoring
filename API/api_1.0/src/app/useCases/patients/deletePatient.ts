import { Request, Response } from "express";
import { Patient } from "../../models/Patient";

export async function DeletePatient(req: Request, res: Response) {
    try {
        const { id } = req.params;
        let patient = await Patient.findById(id);
        console.log(patient);
        await patient?.deleteOne();
        res.json({'message': "success"}).status(204);
    } catch (error) {
        res.json(({error: "Error deleting patient"}));
    }
};