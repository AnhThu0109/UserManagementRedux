import { REGISTER } from './API';

async function registerUser(userData) {
    console.log(userData);
  return fetch(REGISTER, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  .then(response => {
    return response;
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
}

export default registerUser;