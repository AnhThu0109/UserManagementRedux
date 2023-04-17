import { GET_USERS } from "./API";
import axios from "axios";

// async function getAllUser(token) {
//     return fetch(GET_USERS, {
//       headers: { 'token': `Bearer ${token}` },
//     })
//       .then(response => response.json())
//       .then(data => {
//         return data;
//       })
//       .catch(error => {
//         console.error(error);
//         throw error;
//       });
//   }

  async function getAllUser(token) {
    return axios.get(GET_USERS, {
      headers: { 'token': `Bearer ${token}` },
    })
      .then(response => {
        console.log("axios", response);
        console.log("res data", response.data);
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

// async function getUserById(id, token) {
//   return fetch(`${GET_USERS}${id}`, {
//     headers: { 'token': `Bearer ${token}` },
//   })
//       .then(response => response.json())
//       .then(data => {
//         return data;
//       })
//       .catch(error => {
//         console.error(error);
//         throw error;
//       });
// }

async function getUserById(id, token) {
  return axios.get(`${GET_USERS}${id}`, {
    headers: { 'token': `Bearer ${token}` },
  })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
}

export {getAllUser, getUserById};