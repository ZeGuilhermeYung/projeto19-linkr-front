import axios from "axios";

const urlAPI = process.env.REACT_APP_API_URL;
const CORS_PROXY_LIST = [
  "https://cors-anywhere.herokuapp.com/",
  "https://proxy.cors.sh/",
  "https://corsproxy.io/?",
  "https://gobetween.oklabs.org/",
  "https://gobetween.oklabs.org/pipe/",
  "http://alloworigin.com/get?url=",
  "https://api.allorigins.win/get?url=",
  "https://thingproxy.freeboard.io/fetch/",
  "https://test.cors.workers.dev/?",
  "https://crossorigin.me/",
  "https://cors-proxy.htmldriven.com/?",
  "https://cors-proxy.taskcluster.net/",
  "https://cors-proxy.taskcluster.net/request"
];

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

function getCorsProxyUrl(url, proxyIndex = 0) {
  const proxyUrl = CORS_PROXY_LIST[proxyIndex] + url;
  return axios.get(proxyUrl)
    .catch(error => {
      console.log(error.message, `Falha em acessar ${CORS_PROXY_LIST[proxyIndex]}`)
      const nextProxyIndex = proxyIndex + 1;
      if (nextProxyIndex < CORS_PROXY_LIST.length) {
        return getCorsProxyUrl(url, nextProxyIndex);
      } else {
        // Se todos os proxies falharem, retorne um erro ou faça o tratamento apropriado
        throw new Error('Todos os proxies falharam');
      }
    });
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