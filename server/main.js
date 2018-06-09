import express from 'express';
import apiHandler from './handlers/api';

const server = express();
server.use('/api', apiHandler);

export default server;
