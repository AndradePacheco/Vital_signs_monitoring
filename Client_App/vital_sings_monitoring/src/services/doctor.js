import API from "./api";

const DoctorService = {
    register: (params) => API.post('/doctor', params)
}

export default DoctorService;