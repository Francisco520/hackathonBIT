const database = require('../services/database');

const managerQuery = 
    `SELECT * 
    FROM baseclientes
    WHERE 1 = 1`;

const restrictedQuery = 
    `SELECT idCliente, nombre, sexo, segmento, numeroID 
    FROM baseclientes
    WHERE 1 = 1`;

const profileQuery = 
    `SELECT perfil
    FROM baseusuarios
    WHERE 1 = 1
    `;

async function findID (context) {
    let query;

    if (context.profile) {
        if (context.profile == 'Manager' || context.profile == 'Validador') {
            query = managerQuery;
        } else if (context.profile == 'Restringido') {
            query = restrictedQuery;
        }
        const binds = {};
    
        if (context.id) {
            binds.idCliente = context.id;
            query += `\nAND idCliente = :idCliente`;
        }
    
        const result = await database.executeQuery(query, binds);
        return result.rows;
    } else {
        console.log('Profile not valid. Did not execute query.');
    }

}

async function findProfile (context) {
    let query = profileQuery;
    const binds = {};

    if (context.usuario) {
        binds.usuario = context.usuario;
        query += `\nAND idusuario = :usuario`;
    }

    if (context.auth) {
        binds.auth = context.auth;
        query += `\nAND auth = :auth`;
    }

    const result = await database.executeQuery(query, binds);
    console.log(`Result from findProfile = ${Object.values(result.rows[0])}`);
    return Object.values(result.rows[0]);
}

module.exports.findProfile = findProfile;
module.exports.findID = findID;