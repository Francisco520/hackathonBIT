const clients = require('../db_apis/clients.js');

async function get(req, res, next) {
    try {
        
        const context = [];

        context.id = req.params.id;
        context.usuario = req.params.usuario;
        context.auth = req.params.auth;

        const profile = await clients.findProfile(context);
        context.profile = profile[0];

        const rows = await clients.findID(context);

        if (req.params.id) {
            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            } else {
                res.status(404).end();
            }
        } else {
            res.status(200).json(rows);
        }

    } catch (error) {
        next(error);
    }
}

module.exports.get = get;