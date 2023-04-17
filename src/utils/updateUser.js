import { GET_USERS } from "./API";
import axios from "axios";

async function updateUser(id, token, body) {
  return fetch(`${GET_USERS}${id}/update`, {
    method: "PUT",
    headers: { 'token': `Bearer ${token}`, 'Content-type': 'application/json'},
    body: JSON.stringify(body)
  })
    .then(response => {return response;})
    .catch(error => {
      console.error(error);
      throw error;
    });
}

// async function updateUser(id, token, body) {
//   return axios.put(`${GET_USERS}${id}/update`, body, {
//     headers: { 'token': `Bearer ${token}`, 'Content-type': 'application/json'}
//   })
//     .then(response => {console.log("axios put", response); return response;})
//     .catch(error => {
//       console.error(error);
//       throw error;
//     });
// }

export default updateUser;