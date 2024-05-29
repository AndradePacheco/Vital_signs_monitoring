import API from "./api";

const DoctorService = {
    register: (params) => API.post('/doctor', params),
    login: async (params) => {
        const response = await API.post('/login', params);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
    } 
}

export default DoctorService;