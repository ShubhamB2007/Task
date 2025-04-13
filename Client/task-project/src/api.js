import axios from 'axios'

const api = axios.create({
    baseURL: 'https://task-backend-ekpr.onrender.com/api/login'
}) 

export const googleAuth = (code) => api.post("/google", { code });

