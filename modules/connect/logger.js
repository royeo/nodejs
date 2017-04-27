module.exports = (format) => {
    return (req, res, next) => {
        let regexp = /:(\w+)/g
        let str = format.replace(regexp, (match, property) => {
            return req[property]
        })
        console.log(str)
        next()
    }
}