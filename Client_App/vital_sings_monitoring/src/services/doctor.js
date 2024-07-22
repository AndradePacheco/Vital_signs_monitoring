import API from "./api";

const DoctorService = {
    register: (params) => API.post('/doctor', params),
    login: async (params) => {
        const response = await API.post('/login', params);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('privilege', JSON.stringify(response.data.privilege))
        localStorage.setItem('token', response.data.token);
    },
    getDoctors: () => API.get('/doctor', {
        headers: {'acess-token': localStorage.getItem('token')}
    }),
    getDoctor: (id) => API.get(`/doctor/${id}`, {
        headers: {'acess-token': localStorage.getItem('token')}
    }),
    updateDoctor: (id, params) => API.put(`/doctor/${id}`, params, {
        headers: {'acess-token': localStorage.getItem('token')}
    } ),
    deleteDoctor: (id) => API.delete(`/doctor/${id}`, {
        headers: {'acess-token': localStorage.getItem('token')}
    })
}

export default DoctorService;