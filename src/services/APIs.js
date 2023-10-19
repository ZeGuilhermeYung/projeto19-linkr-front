import axios from "axios";

const urlAPI = process.env.REACT_APP_API_URL;
const CORS_PROXY = "https://corsproxy.io/?";

function userHeaders () {
  const authToken = JSON.parse(localStorage.getItem("userData"));
  const config = {
    headers: {
      Authorization: `Bearer ${authToken.token}`
    }
  };
  return config;
}

function signUpUser (body) {
  const promise = axios.post(`${urlAPI}/sign-up`, body);
  return promise;
}

function signInUser (body) {
  const promise = axios.post(`${urlAPI}/`, body);
  return promise;
}

function publishPost (body) {
  const config = userHeaders();
  const promise = axios.post(`${urlAPI}/timeline`, body, config);
  return promise;
}

function getPosts () {
  const config = userHeaders();
  const promise = axios.get(`${urlAPI}/timeline`, config);
  return promise;
}

function getCorsProxyUrl (url) {
  const promise = axios.get(`${CORS_PROXY}${url}`);
  return promise;
}

function deleteHabit(habitId) {
  const config = userHeaders();
  const promise = axios.delete(`${urlAPI}/habits/${habitId}`, config);
  return promise;
}

function checkHabit (habitId) {
  const config = userHeaders();
  const body = {};
  const promise = axios.post(`${urlAPI}/habits/${habitId}/check`, body, config);
  return promise;
}

function uncheckHabit (habitId) {
  const config = userHeaders();
  const body = {};
  const promise = axios.post(`${urlAPI}/habits/${habitId}/uncheck`, body, config);
  return promise;
}

function getHistory() {
  const config = userHeaders();
  const promise = axios.get(`${urlAPI}/habits/history/daily`, config);
  return promise;
}

export { userHeaders, signInUser, signUpUser, publishPost, getPosts, getCorsProxyUrl }