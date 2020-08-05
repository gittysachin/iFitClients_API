const express = require('express');
const CategoriesRoute = express.Router();
const Category = require('../models/categories').default;
const users = require('../models/users').default;
const validateToken = require('../middleware').default;
const UserTypes = require('../enums/user-types').default;
const jwt = require('jsonwebtoken');

CategoriesRoute.use(async (req, res, next) => {
    next();
})

CategoriesRoute.get('/', validateToken, async (req, res, next) => {
    let type = req.query.type; // E.G. Workout, Nutrition
    if (!req.headers.authorization) {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const u = await users.query()
            .leftJoin('user_type', 'user_type.id', 'users.user_type_id')
            .where('users.is_deleted', false)
            .andWhere('users.id', decodedToken.userid).first();
        let c;
        if (u && u.user_type_id === UserTypes.SUPERADMIN) {
            c = await Category.query().where('is_active', true).andWhere('type', type);
        } else if (u && u.user_type_id === UserTypes.ADMIN) {
            c = await Category.query().where('is_active', true).andWhere('type', type).andWhere('business_owner_id', u.bownerid);
        } else if (u && u.user_type_id === UserTypes.CLIENT) {
            if (type.toLowerCase() === 'workout') {
                c = await Category.query()
                    .innerJoin('workouts', 'workouts.category_id', 'categories.id')
                    .innerJoin('workout_assignments', 'workout_assignments.workout_id', 'workouts.id')
                    .where('categories.type', type)
                    .andWhere('categories.is_active', true)
                    .select(
                        'categories.id',
                        'categories.name',
                        'categories.type'
                    ).groupBy(
                        'categories.id',
                        'categories.name',
                        'categories.type'
                    );
            } else if (type.toLowerCase() === 'nutrition') {
                c = await Category.query()
                    .innerJoin('nutritions', 'nutritions.category_id', 'categories.id')
                    .innerJoin('nutrition_assignments', 'nutrition_assignments.nutrition_id', 'nutritions.id')
                    .where('categories.type', type)
                    .andWhere('categories.is_active', true)
                    .select(
                        'categories.id',
                        'categories.name',
                        'categories.type'
                    ).groupBy(
                        'categories.id',
                        'categories.name',
                        'categories.type'
                    );
            }
        }
        res.send({
            res: c
        });
    } catch (error) {
        console.log(`Category: Error while getting all categories with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})


CategoriesRoute.get('/:id', validateToken, async (req, res, next) => {
    try {
        const c = await Category.query().where('id', req.params.id).andWhere('is_active', true).first();
        res.send({
            res: c
        });
    } catch (error) {
        console.log(`Category: Error while getting category by ID with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

CategoriesRoute.put('/', validateToken, async (req, res, next) => {
    try {
        let obj = {
            id: req.body.id,
            name: req.body.name,
            type: req.body.type,
            is_active: req.body.is_active,
            business_owner_id: req.body.business_owner_id
        }
        const c = await Category.query().upsertGraphAndFetch(obj, { relate: true, unrelate: true });
        res.send({
            res: obj
        });
    } catch (error) {
        console.log(`Category: Error while updating category with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

CategoriesRoute.post('/', validateToken, async (req, res, next) => {
    let obj = {
        name: req.body.name,
        type: req.body.type,
        business_owner_id: req.body.business_owner_id
    }
    try {
        const c = await Category.query().insertGraphAndFetch(obj);
        res.send({
            res: c
        });
    } catch (error) {
        console.log(`Category: Error while saving category with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});
export default CategoriesRoute;