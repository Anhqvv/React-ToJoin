import axios from "./axios"


const fetchAllUser = (pageData) => {
    return  axios.get(`/api/users?page=${pageData}`)
}

const postCreateNewUser = (name, job) => {
    return axios.post('/api/users', {name, job})
}

export {fetchAllUser, postCreateNewUser}