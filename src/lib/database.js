const { Client } = require('pg')

const connectionData = {
    user: 'postgres',
    host: '10.4.28.199',
    database:'postgres',
    password:'developer2020',
    port:5432
}

module.exports = {
    connectionData,
    Client
}
