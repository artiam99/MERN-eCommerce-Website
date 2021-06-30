const bcrypt = require('bcryptjs')

const users =
[
    {
        name: 'Debarshi Maitra',
        email: 'tuhin.dm1999@gmail.com',
        password: bcrypt.hashSync('123456' , 10),
        isAdmin: true
    },
    {
        name: 'John Mayer',
        email: 'skywalker.luke.dm@gmail.com',
        password: bcrypt.hashSync('123456' , 10),
    },
    {
        name: 'Jimi Hendrix',
        email: 'mayer.debarshi@gmail.com',
        password: bcrypt.hashSync('123456' , 10),
    },
    {
        name: 'Eric Clapton',
        email: 'yoda99.dm@gmail.com',
        password: bcrypt.hashSync('123456' , 10),
    }
]

module.exports = users