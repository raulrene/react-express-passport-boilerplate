const app = require('../index')
const apiRoutes = require('./api')

app.use('/api', apiRoutes)
