import axios from 'axios'

/* const api = axios.create({
    baseURL: 'http://localhost:3000'
}) */

const api = axios.create({
    baseURL: 'https://desafio-everymind-nxfp.vercel.app'
})

export default api