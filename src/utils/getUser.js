import { GET_USERS } from "./API";

async function getAllUser(token) {
    return fetch(GET_USERS, {
      headers: { 'token': `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

async function getUserById(id, token) {
  return fetch(`${GET_USERS}${id}`, {
    headers: { 'token': `Bearer ${token}` },
  })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
}

export {getAllUser, getUserById};