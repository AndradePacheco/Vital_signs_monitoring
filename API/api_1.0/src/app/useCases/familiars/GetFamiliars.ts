import { Request, Response } from "express";
import { Familiar } from "../../models/Familiar";

export async function GetFamiliars(req: Request, res: Response) {
    
    try {
        const familiars = await Familiar.find();
        res.json(familiars);
    } catch (error) {
        console.log(error)
        res.json(({error: "Error getting familiars list"}));
    }
}