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
    },
    getPatient: (id) => API.get(`/patient/${id}`, {
        headers: {'acess-token': localStorage.getItem('token')}
    }),
    getPatients: () => API.get('/patient', {
            headers: {'acess-token': localStorage.getItem('token')}
        }),
    update: (id, params) => API.put(`/patient/${id}`, params, {
        headers: {'acess-token': localStorage.getItem('token')}
    }),
    delete: (id) => API.delete(`/patient/${id}`, {
        headers: {'acess-token': localStorage.getItem('token')}       
    }),
    getVitals: (id) => API.get(`/patient/vitalsigns/${id}`, {
        headers: {'acess-token': localStorage.getItem('token')}
    })
}

export default PatientsService;