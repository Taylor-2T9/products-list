import axios from "axios"

const baseApi = process.env.BASE_API as string
export default {
    products: {
        get: () => axios.get(`${baseApi}/products`),
        post: (body) => axios.post(`${baseApi}/products`, body)
    }
}