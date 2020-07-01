import request from 'superagent'

export function getData () {
  return request.get(`/api/v1/user`)
    .then(res => res.body)
}

export function addData (password, username) {
  return request.post(`/api/v1/user/register`)
    .send({ username, password })
    .then(res => {
      return res.statusText
    })
}

export function LogIn (password, username) {
  return request.post(`/api/v1/user/login`)
    .send({ username, password })
    .then(res => {
      if (res.body.auth) {
        localStorage.setItem('token', res.body.token)
        return res.body.auth
      } else {
        return false
      }
    })
}
