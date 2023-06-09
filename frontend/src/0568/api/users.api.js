import axios from "axios";
import { BASEURL } from "../utils";
const URL = `${BASEURL}/users`;

export const getUsers = async () => {
	try {
		const response = await axios.get(URL);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const createUser = async (user) => {
  try {
    const response = await axios.post(URL, user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const updateUser = async (id, user) => {
  try {
    const response = await axios.patch(`${URL}/update/${id}`, user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const searchByQuery = async (query) => {
  try {
    const response = await axios.get(`${URL}?q=${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


