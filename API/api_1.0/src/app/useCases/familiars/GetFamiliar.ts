import { Request, Response } from "express";
import { Familiar } from "../../models/Familiar";

export async function GetFamiliar(req:Request, res:Response) {
    const { id } = req.params;
    try {
        const familiar = await Familiar.findById(id);
        res.json(familiar);
    } catch (error) {
        res.json(({error: "Error getting familiar info"}));
    }
}