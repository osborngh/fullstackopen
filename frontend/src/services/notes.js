import axios from "axios";
const baseUrl = '/api/notes'

const getAll = () => {
    return axios.get(baseUrl).then(res => res.data);
}

const create = newObj => {
    return axios.post(baseUrl, newObj).then(res => res.data);
}

const update = (id, newObj) => {
    return axios.put(`${baseUrl}/${id}`, newObj).then(res => res.data);
}

export default { getAll, create, update }