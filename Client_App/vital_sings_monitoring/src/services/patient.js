import API from "./api";

const PatientsService = {
    register: (params) => API.post('/patient', params)
}

export default PatientsService;