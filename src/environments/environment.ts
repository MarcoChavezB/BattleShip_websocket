const baseURL = 'http://localhost:8000/api';

export const environment = {
  production: false,
  queueGameURL: `${baseURL}/game/queue`,
  joinRandomGameURL: `${baseURL}/game/join/random`,
  endGameURL: `${baseURL}/game/end`,
  dequeueGameURL: `${baseURL}/game/dequeue`,
  cancelRandomQueueURL: `${baseURL}/game/cancel/random`,
  loginURL: `${baseURL}/user/login`,
  logoutURL: `${baseURL}/user/logout`,
  authenticateURL: `${baseURL}/authenticatetoken`,
  registerURL: `${baseURL}/user/register`,
  historyGames: `${baseURL}/game/history`,
  sendBoard: `${baseURL}/game/send/board`,
  notify: `${baseURL}/game/notify`,
  pusher: {
    key: `2489eced27769e3a01d1`,
    cluster: `us3`
  }
}
