const connect = require('connect')
const logger = require('./logger')
const router = require('./router')

let app = connect()
app.use(logger(' :method :url'))
app.use(router(require('./routes/user')))
app.use(router(require('./routes/admin')))
app.use(errorHandler())
app.listen(3000)

function errorHandler() {
    let env = process.env.NODE_ENV || 'development'
    return (err, req, res, next) => {
        res.statusCode = 500
        switch (env) {
            case 'development':
                {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(err))
                    break
                }
            default:
                {
                    res.end('Server error')
                }
        }
    }
}