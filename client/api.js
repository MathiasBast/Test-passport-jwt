import request from 'superagent'

export function getData () {
  return request.get(`/api/v1/user`)
    .then(res => res.body)
}

export function addData (username, password) {
  return request.post(`/api/v1/user/register`)
    .send({ username, password })
    .then(res => res.body)
}
