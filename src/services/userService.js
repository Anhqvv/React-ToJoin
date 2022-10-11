import axios from "./axios"


const fetchAllUser = (pageData) => {
    console.log('data page...', pageData)
    return  axios.get(`/api/users?page=${pageData}`)
}

export {fetchAllUser}