import { Request, Response } from "express";
import { Doctor } from "../../models/Doctor";

export async function GetDoctors(req: Request, res: Response) {
    
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.json(({error: "Error getting doctors list"}));
    }
}