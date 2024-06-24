import { Request, Response } from "express";
import { VitalSigns } from "../../models/VitalSings";
import { Patient } from "../../models/Patient";
import {io} from "../../..";
export async function GetVitalSigns(req: any, res: Response) {
    const { id } = req.params;
    try {
        if(req.privilege === 'Doctor' || req.privilege === 'Familiar' || req.privilege === 'Administrator'){
            const patient = await Patient.findById(id);
            if(patient?.doctor == req.user.id || patient?.familiar == req.user.id || req.privilege === 'Administrator'){
                const vital_signs = await VitalSigns.findOne({'patient': id})
                io.emit('dados', vital_signs);
                res.json({vital_signs, 'user': req.user});
            }
            else {
                res.status(403).json({error: 'Permission denied'});
            }
        }
        else{
            if(id != req.user.id ) 
                return res.status(403).json({error: 'Permission denied!'});

            const vital_signs = await VitalSigns.findOne({'patient': req.user.id});
            io.emit('dados', vital_signs);
            res.json({vital_signs,'user': req.user});
        }
    } catch (error) {
        res.status(500).json({error: "Problem getting vital signs"})
    }
}