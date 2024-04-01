
export interface userInterface{
    email: string,
    password: string,
    privilege: "Patient" | "Doctor" | "Familiar" 
}

export interface privilegeOptions {
    privilege: "Patient" | "Doctor" | "Familiar"
};