
export interface userInterface{
    email: string,
    password: string,
    privilege: "Patient" | "Doctor" | "Familiar"  | "Administrator"
}

export interface privilegeOptions {
    privilege: "Patient" | "Doctor" | "Familiar" | "Administrator"
};