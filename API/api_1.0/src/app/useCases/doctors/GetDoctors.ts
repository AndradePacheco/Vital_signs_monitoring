import { Request, Response } from "express";
import { Doctor } from "../../models/Doctor";

export async function GetDoctors(req: Request, res: Response) {
    
    try {
        const doctors = await Doctor.find();
        console.log(doctors);
        res.json(doctors);
    } catch (error) {
        console.log(error)
        res.json(({error: "Error getting doctors list"}));
    }
}