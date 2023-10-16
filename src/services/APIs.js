import axios from "axios";

const urlAPI = process.env.REACT_APP_API_URL;

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

function getTodayHabits () {
  const config = userHeaders();
  const promise = axios.get(`${urlAPI}/habits/today`, config);
  return promise;
}

function getHabits () {
  const config = userHeaders();
  const promise = axios.get(`${urlAPI}/habits`, config);
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

export { userHeaders, signInUser, signUpUser, publishPost, getTodayHabits, getHabits, deleteHabit, checkHabit, uncheckHabit, getHistory }