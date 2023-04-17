import { GET_USERS } from "./API";
import axios from "axios";

async function deleteUser(id, token) {
  return fetch(`${GET_USERS}${id}/delete`, {
    method: "DELETE",
    headers: { 'token': `Bearer ${token}`, 'Content-type': 'application/json'},
  })
    .then(response => {return response;})
    .catch(error => {
      console.error(error);
      throw error;
    });
}

// async function deleteUser(id, token) {
//   return axios.delete(`${GET_USERS}${id}/delete`, {
//     headers: { 'token': `Bearer ${token}`, 'Content-type': 'application/json'},
//   })
//     .then(response => {
//       console.log("delete axios",response); 
//       return response;
//     })
//     .catch(error => {
//       console.error(error);
//       throw error;
//     });
// }

export default deleteUser;