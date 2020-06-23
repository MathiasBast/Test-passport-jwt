const fs = require('fs')
const path = require('path')

module.exports = {
  getData,
  addUser,
  findUser
}

function getData (file, callback) {
  const fileName = path.join(__dirname, file + '.json')

  fs.readFile(fileName, 'UTF-8', (err, contents) => {
    if (err) return callback(new Error('Unable to load data file'))
    try {
      const json = JSON.parse(contents)
      callback(null, json)
    } catch (err) {
      // eslint-disable-next-line no-console
      callback(console.error('Theres a problem here'))
    }
  })
}

function addUser (data, callback) {
  const { username, password } = data
  const fileName = path.join(__dirname, 'data.json')
  fs.readFile(fileName, (err, contents) => {
    if (err) return new Error('cant load')
    var json = JSON.parse(contents)
    const id = json.users.length + 1
    const newData = {
      id,
      name: username,
      password
    }
    json.users.push(newData)
    const string = JSON.stringify(json, null, 2)
    fs.writeFile(fileName, string, 'utf-8', callback)
  })
}

function findUser (username, callback) {
  const fileName = path.join(__dirname, 'data.json')
  fs.readFile(fileName, 'UTF-8', (err, contents) => {
    if (err) return callback(new Error('Unable to load data file'))
    try {
      const json = JSON.parse(contents)
      var user = json.users.filter(user => user.name === username)
      if (user.length === 0) { // If there is no user
        callback(null, { res: true })
      } else {
        callback(null, { res: false, user: user[0] })
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      callback(console.error('Theres a problem here'))
    }
  })
}
