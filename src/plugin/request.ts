/**
 * @Author: forguo
 * @Date: 2023/2/18 23:18
 * @Description: request.ts
 */
import axios from 'axios'

const request = axios.create({
    baseURL: '/api'
})

request.interceptors.request.use(config => {
    console.log(config)
    return config
})

request.interceptors.response.use(res => {
    console.log('res --->', res)
    if (res.status === 200) {
        return Promise.resolve(res.data)
    }
    return Promise.reject(res)
})

export default request
