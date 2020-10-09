const oracledb = require('oracledb');
const config = {
    hrPool: {
        user: process.env.NODE_ORACLEDB_USER || "c##fgt",
        password: process.env.NODE_ORACLEDB_PASSWORD || "password",
        connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost:1521/orcl",
        poolMin: 10,
        poolMax: 10,
        poolIncrement: 0
      }
};

async function init() {
    const pool = await oracledb.createPool(config.hrPool);
}

async function close() {
    await oracledb.getPool().close();
}

function executeQuery(statement, binds = [], opts = []) {
    return new Promise(async (resolve, reject) => {
        let connection;

        opts.outFormat = oracledb.OBJECT;
        opts.autoCommit = true;

        try {
            
            connection = await oracledb.getConnection();
            const result = await connection.execute(statement, binds, opts);
            resolve(result);

        } catch (error) {
            reject(error);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.log(err);
                }
            }
        }
    });
}

module.exports.executeQuery = executeQuery;
module.exports.close = close;
module.exports.init = init;