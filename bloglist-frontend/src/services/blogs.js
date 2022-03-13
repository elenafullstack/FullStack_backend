import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data

}

const update = async (blog, newBlog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers : { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${blog.id}`, config)
}



const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const exportedObjects = {
  getAll,
  setToken,
  create,
  update,
  deleteBlog
}

export default exportedObjects;