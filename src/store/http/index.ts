import axios from 'axios'

const axiosInstance = axios.create({
    withCredentials: true,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    baseURL: window.AJAX_URL
})

export default axiosInstance
