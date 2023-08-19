import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/mangxahoituthien";
const SERVER = "http://localhost:8080";

export const endpoints = {  
    "register": `${SERVER_CONTEXT}/api/user/add/`,
  "create-post": `${SERVER_CONTEXT}/api/post/add/`,
    "posts": `${SERVER_CONTEXT}/api/post/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
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