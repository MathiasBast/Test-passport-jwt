import request from 'superagent'

export function getData (username, password) {
  return request.get(`/api/v1/user/${username}/${password}`)
    .then(res => res.body)
}
