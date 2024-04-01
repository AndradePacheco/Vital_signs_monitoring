import { Request, Response } from "express";
import { Patient } from "../../models/Patient";
import { isCorrectPassword } from "../../middlewares/functions";
import jwt  from "jsonwebtoken";
import { Familiar } from "../../models/Familiar";
import { Doctor } from "../../models/Doctor";
import { privilegeOptions } from "../../interfaces/interfaces";

require('dotenv').config();

const Secret = process.env.JWT_TOKEN as string;

export async function Login(req: Request, res: Response) {
    const {email, password} = req.body;
    const {privilege}: privilegeOptions = req.body;
    let user = await Patient.findOne({email});
    try {
        switch (privilege) {
            case "Patient":
                user = await Patient.findOne({email});
                break;
            case "Doctor":
                user = await Doctor.findOne({email});
                break;
            case "Familiar":
                user = await Familiar.findOne({email});
                break;
            default:
                throw new Error("Privilege undefined, please select your privilege");
                break;
        }
        if(!user) res.status(401).json({error: "Incorret email or Privilege dont match the account, please select your account's privilege!"});
        else{
            const encrypted = user.password;
            isCorrectPassword(password, encrypted, function(err, same){
                if(!same) res.status(401).json({error: 'Incorrect password'});
                else{
                    const token = jwt.sign({email, privilege}, Secret, {expiresIn: '1d'});
                    res.json({
                        user: user,
                        email: email,
                        privilege: privilege,
                        token:token
                    })
                }
            })
        }
    } catch (error: any) {
        res.status(400).json({
            message: error.message.toString(),
        })
    }
}