const fs = require('fs')
const path = require('path')

module.exports = {
  getData
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
