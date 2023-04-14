import { GET_USERS } from "./API";

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

export default deleteUser;