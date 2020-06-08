import request from 'superagent'

export function getData (username, password) {
  return request.get(`/api/v1/user`)
    .then(res => res.body)
}
