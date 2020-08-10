const express = require('express');
const GoalsRoute = express.Router();
const Goals = require('../models/goals').default;
const GoalTypes = require('../models/goal_type').default;
const users = require('../models/users').default;
const validateToken = require('../middleware').default;
const UserTypes = require('../enums/user-types').default;
const jwt = require('jsonwebtoken');

GoalsRoute.use(async (req, res, next) => {
    next();
})

GoalsRoute.get('/', validateToken, async (req, res, next) => {
    if (!req.headers.authorization) {
        next();
    }
    try {
        let requestParams = {
            pageNo: req.body.pageNo,
            pageSize: req.body.pageSize
        }
        console.log(`Getting request params for get all goals is ${JSON.stringify(requestParams, null, 2)}`);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const u = await users.query()
            .leftJoin('user_type', 'user_type.id', 'users.user_type_id')
            .where('users.is_deleted', false)
            .andWhere('users.id', decodedToken.userid)
            .select(
                'users.id',
                'users.bownerid',
                'users.user_type_id'
            ).first();
        console.log(`Getting user details from token is ${JSON.stringify(u, null, 2)}`)
        let w;
        if (u && u.user_type_id === UserTypes.SUPERADMIN) {
            w = await Goals.query()
                .andWhere('is_active', true)
                .orderBy('created_at', 'desc')
                .page(requestParams.pageNo - 1, requestParams.pageSize);
            console.log(`Getting Goals details like ${JSON.stringify(w, null, 2)}`);
        } else if (u && u.user_type_id === UserTypes.ADMIN) {
            w = await Goals.query()
                .andWhere('is_active', true)
                .orderBy('created_at', 'desc')
                .page(requestParams.pageNo - 1, requestParams.pageSize);
            console.log(`Getting Goals details like ${JSON.stringify(w, null, 2)}`);
        } else if (u && u.user_type_id === UserTypes.CLIENT) {
            w = await Goals.query()
                .where('user_id', u.id)
                .andWhere('is_active', true)
                .orderBy('created_at', 'desc')
                .page(requestParams.pageNo - 1, requestParams.pageSize);
            console.log(`Getting Goals details like ${JSON.stringify(w, null, 2)}`);
        }
        res.send({
            res: w
        });
    } catch (error) {
        console.log(`Goals: Error while getting all Goals with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})


GoalsRoute.get('/:id', validateToken, async (req, res, next) => {
    try {
        const c = await Goals.query().where('id', req.params.id).andWhere('is_active', true).first();
        res.send({
            res: c
        });
    } catch (error) {
        console.log(`Goals: Error while getting Goals by ID with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

GoalsRoute.put('/', validateToken, async (req, res, next) => {
    if (!req.headers.authorization) {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const u = await users.query()
            .leftJoin('user_type', 'user_type.id', 'users.user_type_id')
            .where('users.is_deleted', false)
            .andWhere('users.id', decodedToken.userid)
            .select(
                'users.id',
                'users.user_type_id'
            ).first();
        console.log(`Getting user details from token is ${JSON.stringify(u, null, 2)}`)
        let obj = {
            id: req.body.id,
            user_id: u.id,
            goal_type_id: req.body.goal_type_id,
            goal_value: req.body.goal_value,
            rewards_on_completion: req.body.rewards_on_completion,
            punishment_on_failing: req.body.punishment_on_failing,
        }
        const c = await Goals.query().upsertGraphAndFetch(obj, { relate: true, unrelate: true });
        console.log(`Goals after update is ${JSON.stringify(c, null, 2)}`);
        res.send({
            res: c
        });
    } catch (error) {
        console.log(`Goals: Error while updating Goals with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

GoalsRoute.post('/', validateToken, async (req, res, next) => {
    if (!req.headers.authorization) {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const u = await users.query()
            .leftJoin('user_type', 'user_type.id', 'users.user_type_id')
            .where('users.is_deleted', false)
            .andWhere('users.id', decodedToken.userid)
            .select(
                'users.id',
                'users.user_type_id'
            ).first();
        console.log(`Getting user details from token is ${JSON.stringify(u, null, 2)}`)
        let obj = {
            user_id: u.id,
            goal_type_id: req.body.goal_type_id,
            goal_value: req.body.goal_value,
            rewards_on_completion: req.body.rewards_on_completion,
            punishment_on_failing: req.body.punishment_on_failing,
        }
        const c = await Goals.query().insertGraphAndFetch(obj);
        console.log(`Goals after save is ${JSON.stringify(c, null, 2)}`);
        res.send({
            res: c
        });
    } catch (error) {
        console.log(`Goals: Error while saving Goals with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

GoalsRoute.post('/getGoals', validateToken, async (req, res, next) => {
    try {
        const cm = await Goals.query().where('is_active', true).andWhere('user_id', req.body.id);
        res.send({
            res: cm
        });
    } catch (error) {
        console.log(`Goals: Error while getting all goals of client with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

GoalsRoute.get('/getall/goal-types', validateToken, async (req, res, next) => {
    try {
        const gt = await GoalTypes.query();
        console.log(`Goals: Getting all Goals Types with details : ${JSON.stringify(gt, null, 2)}`);

        res.send({
            res: gt
        });
    } catch (error) {
        console.log(`Goals: Error while getting all Goals Types with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

export default GoalsRoute;