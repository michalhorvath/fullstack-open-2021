import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  newObject = { ...newObject }
  newObject.user = newObject.user.id
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const newObject = {
    comment
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject, config)
  return response.data
}

export default { getAll, create, update, remove, addComment, setToken }
