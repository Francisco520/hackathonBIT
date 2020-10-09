const express = require('express');
const http = require('http');
const router = require('./router.js');

let httpServer;

function init() {
    //Crear nueva Promise para verificar si se inicializo el servidor correctamente.
    return new Promise((resolve, reject) => {
        const app = express();
        httpServer = http.createServer(app);
        app.use('/api', router);

        httpServer.listen(process.env.HTTP_PORT || 3000)
        // Resolver:
        .on ('listening', () => {
            console.log(`Web Server funcionando en localhost:${process.env.HTTP_PORT || 3000}`);
            resolve();
        })
        // Rechazo:
        .on ('error', (error) => reject(error));
    });
}

function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}

module.exports.close = close;
module.exports.init = init;