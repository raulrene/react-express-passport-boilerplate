const fs = require('fs')
const path = require('path')
const myArgs = process.argv.slice(2)
if (!myArgs || myArgs.length !== 1) {
  console.error('Invalid number of parameters')
  console.error('Try: node setup.js \'My app name\'')
  process.exit(-1)
}

const appName = myArgs[0]


const walk = function(dir, done) {
  let results = []
  fs.readdir(dir, function(err, list) {
    if (err) {
      return done(err)
    }
    let i = 0;
    (function next() {
      let file = list[i++]
      if (!file) {
        return done(null, results)
      }

      // Ignore everything starting with . (.git/, ./idea, etc)
      if (file.indexOf('.') === 0 || file.indexOf('setup') === 0) {
        return next()
      }

      file = path.resolve(dir, file)
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res)
            next()
          })
        } else {
          // If file, read it and replace <<APP_NAME>> string
          fs.readFile(file, 'utf8', function(err, data) {
            if (data.indexOf('APP_NAME') > -1) {
              let result = data.replace(/<<APP_NAME>>/g, appName)
              result = result.replace(/<<APP_NAME_CONCAT>>/g, appName.toLowerCase().split(' ').join('-'))
              fs.writeFile(file, result, 'utf8', (err) => {
                err && console.error(err)
              })
            }
          })

          results.push(file)
          next()
        }
      })
    })()
  })
}

walk('./', (err) => {
  if (err) {
    throw err
  }

  fs.unlinkSync('./README.md')
  fs.rename('./new_README.md', './README.md', function(err) {
    if (err) {
      console.error(err)
    }
    console.log('Finished setting up', appName)

  })
})
