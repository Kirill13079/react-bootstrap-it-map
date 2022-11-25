const fs = require('fs')

module.exports = (app) => {
  const isFolder = (path) => {
    return fs.lstatSync(path).isDirectory() && fs.existsSync(path)
  }
  app.get('/', (req, res) => {
    if (isFolder('./data')) {
      let data = fs.readFileSync('./data/vacancies.json')
      res.json(JSON.parse(data))
    }
  })
}
