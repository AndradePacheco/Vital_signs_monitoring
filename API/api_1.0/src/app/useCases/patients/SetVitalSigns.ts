import { Request, Response } from "express";
import { Patient } from "../../models/Patient";
import { VitalSigns } from "../../models/VitalSings";
import io from "../../..";

export async function SetVitalSigns(req: Request, res: Response){
    const { id } = req.params;
    const { heart_rate, oxygenation, temperature } = req.body;

    try {
        const patient = await Patient.findById(id);
        const vitalsigns = await VitalSigns.findOneAndUpdate(
            {'patient': patient?.id},
            {
                $push: {
                    'vital_signs': {
                        $each: [{
                            heart_rate: heart_rate, oxygenation: oxygenation, temperature: temperature
                        }], 
                        $position: 0 
                    } 
                } 
            },
            {new: true}
        );
        io.sockets.in(id).emit('dados', {'heart-rate': heart_rate, 'oxygenation': oxygenation, 'temperature': temperature});
        res.json({vitalsigns, patient})

    } catch (error) {
        res.status(500).send({
            message: "Error updating vital signs",
            error: error
        })
    }
}