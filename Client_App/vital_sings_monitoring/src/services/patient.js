import API from "./api";

const PatientsService = {
    register: (params) => API.post('/patient', params),
    login: async (params) => {
        const response = await API.post('/login', params);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('privilege', JSON.stringify(response.data.privilege));
        localStorage.setItem('token', response.data.token)
    },
    logout: () => {
        localStorage.removeItem('user', null);
        localStorage.removeItem('token', null);
    }
}

export default PatientsService;