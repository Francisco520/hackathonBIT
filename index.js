const webServer = require('./services/web-server.js');
const database = require('./services/database.js');

async function start() {
    console.log('Starting app.');

    try {
        
        console.log('Starting database connection');
        await database.init();

    } catch (error) {
        console.log(error);
        process.exit(-1);
    }

    try {
        console.log('Starting webserver connection');
        await webServer.init();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function shutdown(e) {
    let err = e;
    console.log('Shutting down.');

    try {
        console.log('Closing web server module.');
        await webServer.close();
    } catch (e) {
        console.log(`Encountered error ${e}`);
        err = err || e;
    }

    try {
        console.log('Closing database module');
        
        await database.close();

    } catch (e) {
        console.log(`Encountered error ${e}`);

        err = err || e;
    }

    console.log('Exiting process.');

    if (err) {
        process.exit(1);
    } else {
        process.exit(0);
    }
}

process.on('SIGTERM', () => {
    console.log('Received SIGTERM');

    shutdown();
});

process.on('SIGINT', () => {
    console.log('Received SIGINT');

    shutdown();
});

process.on('uncaughtException', err => {
    console.log('Uncaught exception');
    console.error(err);

    shutdown(err);
});


start();