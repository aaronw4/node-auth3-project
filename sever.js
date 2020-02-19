const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const usersRouter = require('');

const server = express();

server.use(express.json());
server.use(cors);
server.use(helmet);
server.use(jwt);

server.use('/users', usersRouter);

module.exports = server;