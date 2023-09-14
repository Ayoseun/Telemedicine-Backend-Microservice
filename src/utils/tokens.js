const jwt = require('jsonwebtoken')

const createToken = (artisan, secret) => {
    const token = jwt.sign({artisan}, secret, {expiresIn:'1h'})
    return token
}

const verifyToken = (token, secret) => {
    const result = jwt.verify(token, secret)
    return result
}

module.exports = {
    createToken,
    verifyToken
}