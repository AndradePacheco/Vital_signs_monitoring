import { Request, Response } from "express";
import { Doctor } from "../../models/Doctor";

export async function GetDoctor(req: Request, res: Response) {
    try {
        const { id } = req.params;
        let doctor = await Doctor.findById(id);
        res.json(doctor);
    } catch (error) {
        console.log(error)
        res.json(({error: "Error getting doctor info"}));
    }
};