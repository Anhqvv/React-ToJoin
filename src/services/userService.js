import axios from "./axios"


const fetchAllUser = (pageData) => {
    return  axios.get(`/api/users?page=${pageData}`)
}

const postCreateNewUser = (name, job) => {
    return axios.post('/api/users', {name, job})
}

const putUpdateUser = (name, job) => {
    return axios.put('/api/users/2',{name, job})
}

export {fetchAllUser, postCreateNewUser, putUpdateUser}