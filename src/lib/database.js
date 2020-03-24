const { Client } = require('pg')

const connectionData = {
    user: 'postgres',
    host: '172.17.0.2',
    database:'postgres',
    password:'developer2020',
    port:5432
}

module.exports = {
    connectionData,
    Client
}
