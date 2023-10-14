import axios from "axios";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const urlAPI = process.env.REACT_APP_API_URL;

function UserHeaders () {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return config;
  }, []);
}

function signUpUser (body) {
  const promise = axios.post(`${urlAPI}/sign-up`, body);
  return promise;
}

function signInUser (body) {
  const promise = axios.post(`${urlAPI}/`, body);
  return promise;
}

function getTodayHabits () {
  const config = UserHeaders();
  const promise = axios.get(`${urlAPI}/habits/today`, config);
  return promise;
}

function getHabits () {
  const config = UserHeaders();
  const promise = axios.get(`${urlAPI}/habits`, config);
  return promise;
}

function postNewHabit (body) {
  const config = UserHeaders();
  const promise = axios.post(`${urlAPI}/habits`, body, config);
  return promise;
}

function deleteHabit(habitId) {
  const config = UserHeaders();
  const promise = axios.delete(`${urlAPI}/habits/${habitId}`, config);
  return promise;
}

function checkHabit (habitId) {
  const config = UserHeaders();
  const body = {};
  const promise = axios.post(`${urlAPI}/habits/${habitId}/check`, body, config);
  return promise;
}

function uncheckHabit (habitId) {
  const config = UserHeaders();
  const body = {};
  const promise = axios.post(`${urlAPI}/habits/${habitId}/uncheck`, body, config);
  return promise;
}

function getHistory() {
  const config = UserHeaders();
  const promise = axios.get(`${urlAPI}/habits/history/daily`, config);
  return promise;
}

export { UserHeaders, signInUser, signUpUser, getTodayHabits, getHabits, postNewHabit, deleteHabit, checkHabit, uncheckHabit, getHistory }