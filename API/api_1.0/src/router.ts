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
import { Login } from "./app/useCases/generals/Login";
import { doctorAuthorization, loginAuthorization } from "./app/middlewares/functions";
import { SetVitalSigns } from "./app/useCases/patients/SetVitalSigns";
import { GetVitalSigns } from "./app/useCases/patients/GetVitalSigns";

export const router = Router();
//Login
router.post('/login', Login);

//Get familiar
router.get("/familiar/:id",loginAuthorization, GetFamiliar);
//Get familiars
router.get('/familiar',loginAuthorization ,GetFamiliars);
//Register familiar
router.post('/familiar', RegisterFamiliar);

//Get Patient
router.get('/patient/:id',loginAuthorization, doctorAuthorization, GetPatient);
//Get Patients
router.get('/patient',loginAuthorization, doctorAuthorization, GetPatients);
//Register patient
router.post('/patient', RegisterPatient);
//Set Vital Signs
router.put('/patient/vitalsigns/:id', SetVitalSigns)
//Get Vital Signs
router.get('/patient/vitalsigns/:id', loginAuthorization, GetVitalSigns)

//Get Doctor
router.get('/doctor/:id',loginAuthorization , GetDoctor);
//Get Doctors
router.get('/doctor',loginAuthorization , GetDoctors);
//Register Doctor
router.post('/doctor', RegisterDoctor);

