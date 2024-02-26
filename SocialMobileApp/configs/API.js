import axios from "axios";

export const endpoints = {
    'posts': '/posts/',
    'pages': '/pages/',
    'lessons': (pagId) => `/pages/${pagId}/lessons/`,
    'lesson-details': (lessonId) => `/lessons/${lessonId}/`,
    'comments': (lessonId) => `/lessons/${lessonId}/comments/`,
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',
    'add-comment': (lessonId) => `/lessons/${lessonId}/comments/`
}

export const authApi = (accessToken) => axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        "Authorization": `bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})