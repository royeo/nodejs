module.exports = {
    GET: {
        '/users': (req, res) => {
            res.end('a, b, c')
        },
        '/user/:id': (req, res, id) => {
            res.end('user id is ' + id)
        }
    }
}