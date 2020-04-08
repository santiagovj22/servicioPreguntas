const { Client } = require('pg')

const connectionData = {
    user: '',
    host: '',
    database:'',
    password:'',
    port: ''
}

module.exports = {
    connectionData,
    Client
}
