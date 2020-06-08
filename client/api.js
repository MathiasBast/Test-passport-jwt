import request from 'superagent'

export function logIn (username, password) {
  return request.post('/api/v1/user')
    .send({ password, username })
    .then(res => {
      console.log(res)
    })
}
