const URLbs = 'http://127.0.0.1:8000/api/'

export const environment ={
  production : false,
  queueGameURL: '${baseURL}/game/queue',
  joinRandomGameURL: '${baseURL}/game/join/random',
  endGameURL: '${baseURL}/game/end',
  dequeueGameURL:' ${baseURL}/game/dequeue',
  cancelRandomQueueURL: '${baseURL}/game/cancel/random',
  loginURL: '${baseURL}/user/login',
  logoutURL: '${baseURL}/user/logout',
  
pusher: {
    key: `2489eced27769e3a01d1`,
    cluster: `us3`
  }
}
