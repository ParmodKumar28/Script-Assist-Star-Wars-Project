import axios from "axios"

const BASE_URL = "https://swapi.dev/api"

export const fetchPeople = async (page: number = 1) => {
  const response = await axios.get(`${BASE_URL}/people/?page=${page}`)
  return response.data
}

export const fetchPerson = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/people/${id}/`)
  return response.data
}

export const fetchHomeworld = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}
