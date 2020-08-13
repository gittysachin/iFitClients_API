const express = require('express');
const AuthRoute = express.Router();
let jwt = require('jsonwebtoken');
const users = require('../models/users').default;
const businessOwners = require('../models/business_owners').default;

AuthRoute.use(async (req, res, next) => {
    next();
})

AuthRoute.post('/login', async (req, res, next) => {
    let response = {};
    let username = req.body.Username;
    let password = req.body.Password;
    let u = await users.query().skipUndefined().where('email', username).where('credentials', password).eager('[usersType]').first();
    if (u) {
        if (username === u.email && password === u.credentials) {
            let token = jwt.sign({ username: u.username, userid: u.id },
                process.env.SECRET,
                {
                    expiresIn: '24h'
                }
            );
            u.last_login_date = new Date();
            let us = await users.query().upsertGraphAndFetch(u, { relate: true, unrelate: true });
            let businessOwner = await businessOwners.query().where('id', us.bownerid).first();
            us.businessOwner = businessOwner;
            response.success = true;
            response.message = 'Authentication successful!';
            response.token = token;
            response.user = us;
        } else {
            response.success = false;
            response.message = 'Incorrect username or password';
        }
    } else {
        response.success = false;
        response.message = 'Authentication failed! Please check the request';
    }
    res.send(response);
})

export default AuthRoute;