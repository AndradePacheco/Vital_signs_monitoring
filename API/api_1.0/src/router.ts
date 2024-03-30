import { Router } from "express";
import { RegisterFamiliar } from "./app/useCases/familiars/RegisterFamiliar";
import { RegisterPatient } from "./app/useCases/patients/RegisterPatient";
import { RegisterDoctor } from "./app/useCases/doctors/RegisterDoctor";
import { GetDoctors } from "./app/useCases/doctors/GetDoctors";
import { GetDoctor } from "./app/useCases/doctors/getDoctor";
import { GetFamiliar } from "./app/useCases/familiars/GetFamiliar";
import { GetPatients } from "./app/useCases/patients/GetPatients";
import { GetPatient } from "./app/useCases/patients/GetPatient";
import { GetFamiliars } from "./app/useCases/familiars/GetFamiliars";

export const router = Router();
//Get familiar
router.get("/familiar/:id", GetFamiliar);
//Get familiars
router.get('/familiar',GetFamiliars);
//Register familiar
router.post('/familiar', RegisterFamiliar);

//Get Patient
router.get('/patient/:id', GetPatient);
//Get Patients
router.get('/patient', GetPatients);
//Register patient
router.post('/patient', RegisterPatient);


//Get Doctor
router.get('/doctor/:id', GetDoctor);
//Get Doctors
router.get('/doctor', GetDoctors);
//Register Doctor
router.post('/doctor', RegisterDoctor);

