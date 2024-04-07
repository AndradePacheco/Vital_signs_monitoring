import { Request, Response } from "express";
import { VitalSigns } from "../../models/VitalSings";
import { Patient } from "../../models/Patient";

export async function GetVitalSigns(req: any, res: Response) {
    const { id } = req.params;
    try {
        if(req.privilege === 'Doctor' || req.privilege === 'Familiar'){
            const patient = await Patient.findById(id);
            if(patient?.doctor == req.user.id || patient?.familiar == req.user.id){
                const vital_signs = await VitalSigns.findOne({'patient': id})
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
            res.json({vital_signs,'user': req.user});
        }
    } catch (error) {
        res.status(500).json({error: "Problem getting vital signs"})
    }
}