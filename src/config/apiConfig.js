import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/mangxahoituthien-1.0-SNAPSHOT";
const SERVER = "http://52.62.205.228:8080";

export const endpoints = {  
    "register": `${SERVER_CONTEXT}/api/user/add/`,
    "posts": `${SERVER_CONTEXT}/api/post/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "like-post": `${SERVER_CONTEXT}/api/post/like/`,
    "get-count-pages": `${SERVER_CONTEXT}/api/post/count-pages/`,
    "auction": `${SERVER_CONTEXT}/api/auction/`,
    "comment": `${SERVER_CONTEXT}/api/post/comment/`,
    "user": `${SERVER_CONTEXT}/api/user/`,
}

export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Content-Type": "application/json",
            "Authorization":  cookie.load("token")
        }
    })
}

export default axios.create({
    baseURL: SERVER
})