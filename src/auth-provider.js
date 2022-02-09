import base64 from "base-64";
const localStorageKey = "__auth_provider_token__";

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse(token) {
  window.localStorage.setItem(localStorageKey, token);
  return token;
}

function login({ username, password }) {
  return client("auth/", { username, password }).then(handleUserResponse);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

const authURL = "https://test-backend.i.datapred.com";

async function client(endpoint, data) {
  const config = {
    method: "GET",
    headers: {
      Authorization: `Basic ${base64.encode(
        `${data.username}:${data.password}`
      )}`,
    },
  };
  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        return Promise.reject({ message: " Authentication error" });
      }
      const data = await response.text();
      if (response.ok) {
        return data;
      } else {
        console.log(data);
        return Promise.reject(data);
      }
    });
}

export { getToken, login, logout, localStorageKey };
