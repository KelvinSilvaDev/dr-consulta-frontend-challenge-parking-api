import axios from 'axios';

const api = axios.create({
  baseURL: 'https://drconsulta-parking-api-412201.rj.r.appspot.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('@token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
)

export default api;
