import { Request, Response } from "express";
import { Doctor } from "../../models/Doctor";

export async function DeleteDoctor(req: Request, res: Response) {
    try {
        const { id } = req.params;
        let doctor = await Doctor.findById(id);
        await doctor?.deleteOne();
        res.json({'message': "success"}).status(204);
    } catch (error) {
        res.json(({error: "Error deleting doctor"}));
    }
};