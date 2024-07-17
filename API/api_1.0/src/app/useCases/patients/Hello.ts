import { Request, Response } from "express";

export function Hello(req: Request, res: Response) {
    try {
        res.json({"message": "Hello World"});
    } catch (error) {
        res.json(({error: "Error getting doctor info"}));
    }
};