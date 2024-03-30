import { Request, Response } from "express";
import { Familiar } from "../../models/Familiar";

export async function RegisterFamiliar(req:Request, res:Response){
    const {name, phone_number, email, password, relative } = req.body;
    const familiar = new Familiar({name, phone_number, email, password, relative});

    try {
        await familiar.save();
        res.status(200).json(familiar);
    } catch (error) {
        res.status(500).json(({error: "Error on registering familiar"}));
    }
}