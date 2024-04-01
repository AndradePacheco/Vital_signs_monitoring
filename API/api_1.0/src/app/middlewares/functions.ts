import { NextFunction } from 'express';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { Doctor } from '../models/Doctor';
import { Patient } from '../models/Patient';
import { Familiar } from '../models/Familiar';

dotenv.config();
const Secret = process.env.JWT_TOKEN as string;

//Middleware de autorização para doutores

export function doctorAuthorization(req: any, res: any, next: NextFunction) {
    const token = req.headers['acess-token'] as string;
    if (!token) res.status(401).json({
        error: 'Unauthorized: no token provided'
    })
    else {
        jwt.verify(token, Secret, (err, decode) => {
            if (err) res.status(401).json({
                error: 'Unauthorized: invalid token'
            })
            else {
                if (typeof decode === 'object' && 'email' in decode) {
                    if (decode.privilege !== "Doctor") return res.status(401).json({
                        error: "Unauthorized: acess denied"
                    })
                    req.email = decode.email;
                    Doctor.findOne({ email: decode.email })
                        .then(user => {
                            req.user = user;
                            next();
                        })
                        .catch(err => { res.status(401).json({ error: err }) })
                }

            }
        })
    }
}

//Middleware de autorização de login

export async function loginAuthorization(req: any, res: any, next: NextFunction) {
    const token = req.headers['acess-token'] as string;
    if (!token) res.status(401).json({
        error: 'Unauthorized: no token provided'
    })
    else {
        jwt.verify(token, Secret, (err, decode) => {
            if (err) res.status(401).json({
                error: 'Unauthorized: invalid token'
            })
            else {
                if (typeof decode === 'object' && 'email' in decode) {
                    req.privilege = decode.privilige;
                    req.email = decode.email;
                    switch (decode.privilege) {
                        case "Patient":
                            Patient.findOne({ email: decode.email })
                                .then(user => {
                                    req.user = user;
                                    next();
                                })
                                .catch(err => { res.status(401).json({ error: err }) });
                            break;
                        case "Doctor":
                            Doctor.findOne({ email: decode.email })
                                .then(user => {
                                    req.user = user;
                                    next();
                                })
                                .catch(err => { res.status(401).json({ error: err }) });
                            break;
                        case "Familiar":
                            Familiar.findOne({ email: decode.email })
                                .then(user => {
                                    req.user = user;
                                    next();
                                })
                                .catch(err => { res.status(401).json({ error: err }) });
                            break;
                        default:
                            break;
                    }
                }

            }
        })
    }
}


//Função para validar a password durante o login

export function isCorrectPassword(password: string | Buffer, encrypted: string, callback: (err: Error | undefined, same?: Boolean) => void) {
    bcrypt.compare(password, encrypted, function (err, same) {
        if (err) callback(err)
        else callback(err, same)
    })
};