require('dotenv').config();

const Server = require('./common/server');
const server = new Server();

server.listen();