const jwt = require('jsonwebtoken')

const generateToken = (id) =>
{
    return jwt.sign({ id } , process.env.JWT_SECRET , { expiresIn: '30d'}) // payload is ID , JWT_SECRET from .env , Token expiresin 30 days
}

module.exports = generateToken