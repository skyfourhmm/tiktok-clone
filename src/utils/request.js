import axios from "axios";

const request = axios.create( {
    baseURL:'https://tiktok.fullstack.edu.vn/api/'
} )

export const get = async (path, option = {}) => {
    const response = await request.get(path, option)
    return response.data
}

export const post = async (path, option = {}) => {
    const req = await request.post(path, option)
    return req.data
}

export default request