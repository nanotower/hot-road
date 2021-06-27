import { apiEndpoint } from '../config'
import Axios from 'axios'


export async function getUser(idToken) {
  console.log('Fetching user')

  const response = await Axios.get(`${apiEndpoint}/hotroad/user/login`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })

  return response.data.userInDb
}

export async function getUploadUrl(idToken) {
  const response = await Axios.post(`${apiEndpoint}/hotroad/user/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl, file) {
  await Axios.put(uploadUrl, file)
}

export async function registerUser(idToken, userName) {
  const response = await Axios.post(`${apiEndpoint}/hotroad/user/sign-up`, JSON.stringify(userName), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data
}

export const getTopics = async (idToken) => {
  console.log('Fetching topics')

  const response = await Axios.get(`${apiEndpoint}/hotroad/topic/all`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Topics:', response.data)
  return response.data.topics
}

export const getComments = async (idToken, topicId) => {
  console.log('Fetching comments')

  const response = await Axios.get(`${apiEndpoint}/hotroad/topic/${topicId}/comments`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Topics:', response.data)
  return response.data.comments
}

export const createTopic = async (
  idToken,
  newTopic
) => {
  const response = await Axios.post(`${apiEndpoint}/hotroad/topic/create`,  JSON.stringify(newTopic), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.newItem
}
