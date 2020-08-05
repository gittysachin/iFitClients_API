const express = require('express');
const NutritionRoute = express.Router();
const nutritions = require('../models/nutritions').default;
const validateToken = require('../middleware').default;
const users = require('../models/users').default;
const NutritionAssignments = require('../models/nutrition_assignments').default;
const UserTypes = require('../enums/user-types').default;
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/nutrition');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    onFileUploadComplete: function (file) {
        console.log(file.originalname + ' uploaded to  ' + file.path);
    }
}).single('url');

NutritionRoute.use(async (req, res, next) => {
    next();
})

const isColumnValueUndefined = (columnName, dataType) => {
    let _columnValue;
    if (columnName === undefined || columnName === 'undefined' || columnName === null || columnName === 'null' || columnName === '') {
        if (dataType.toLowerCase() === 'string') {
            _columnValue = '';
        } else if (dataType.toLowerCase() === 'number') {
            _columnValue = 0;
        } else if (dataType.toLowerCase() === 'boolean') {
            _columnValue = false;
        } else {
            _columnValue = '';
        }
    } else {
        _columnValue = columnName;
    }
    return _columnValue;
}

NutritionRoute.post('/', validateToken, async (req, res, next) => {
    if (!req.headers.authorization) {
        next();
    }
    try {
        let requestParams = {
            pageNo: req.body.pageNo,
            pageSize: req.body.pageSize,
            category_id: req.body.category_id
        }
        console.log(`Getting request params for get all nutritions is ${JSON.stringify(requestParams, null, 2)}`);
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
            w = await nutritions.query()
                .andWhere('is_active', true)
                .orderBy('created_at', 'desc')
                .page(requestParams.pageNo - 1, requestParams.pageSize);
            console.log(`Getting nutritions details like ${JSON.stringify(w, null, 2)}`);
        } else if (u && u.user_type_id === UserTypes.ADMIN) {
            w = await nutritions.query()
                .where('business_owner_id', u.bownerid)
                .andWhere('is_active', true)
                .orderBy('created_at', 'desc')
                .page(requestParams.pageNo - 1, requestParams.pageSize);
            console.log(`Getting nutritions details like ${JSON.stringify(w, null, 2)}`);
        } else if (u && u.user_type_id === UserTypes.CLIENT) {
            w = await nutritions.query()
                .where('business_owner_id', u.bownerid)
                .andWhere('category_id', requestParams.category_id)
                .andWhere('is_active', true)
                .orderBy('created_at', 'desc')
                .page(requestParams.pageNo - 1, requestParams.pageSize);
            console.log(`Getting nutritions details like ${JSON.stringify(w, null, 2)}`);
        }
        res.send({
            res: w
        });
    } catch (error) {
        console.log(`Nutritions: Error while getting all nutritions with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})


NutritionRoute.post('/get-nutritions/by/business-owner-id', validateToken, async (req, res, next) => {
    try {
        let requestParams = {
            pageNo: req.body.pageNo,
            pageSize: req.body.pageSize,
            business_owner_id: req.body.business_owner_id
        }
        const w = await nutritions.query()
            .where('business_owner_id', requestParams.business_owner_id)
            .andWhere('is_active', true)
            .orderBy('created_at', 'desc')
            .page(requestParams.pageNo - 1, requestParams.pageSize);
        console.log(`Getting nutritions by business owner id like ${JSON.stringify(w, null, 2)}`);
        res.send({
            res: w
        });
    } catch (error) {
        console.log(`Nutritions: Error while getting nutritions by business owner with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

NutritionRoute.get('/:id', validateToken, async (req, res, next) => {
    let nutritions_id = req.params.id;
    try {
        const w = await nutritions.query().where('id', nutritions_id).first();
        console.log(`Getting nutritions by id details like ${JSON.stringify(w, null, 2)}`);
        res.send({
            res: w
        });
    } catch (error) {
        console.log(`Nutritions: Error while getting nutritions by id with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

NutritionRoute.post('/save', upload, validateToken, async (req, res, next) => {
    let imagePath = "";
    if (req.file && req.file.path) {
        imagePath = `${process.env.BASE_IMG_URL}${req.file.path}`
    } else {
        imagePath = req.body.url;
    }
    try {
        let obj = {
            business_owner_id: isColumnValueUndefined(req.body.business_owner_id, 'string'),
            category_id: isColumnValueUndefined(req.body.category_id, 'string'),
            url: imagePath,
            name: isColumnValueUndefined(req.body.name, 'string'),
            description: isColumnValueUndefined(req.body.description, 'string'),
        }
        const w = await nutritions.query().insertGraphAndFetch(obj);
        res.send({
            res: w
        });
    } catch (error) {
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

NutritionRoute.get('/assigned/:id', validateToken, async (req, res, next) => {
    try {
        let nutrition_id = req.params.id;
        const w = await NutritionAssignments.query().skipUndefined().where('nutrition_id', nutrition_id);
        console.log(`Getting workout by id details like ${JSON.stringify(w, null, 2)}`);
        res.send({
            res: w
        });
    } catch (error) {
        console.log(`Workouts: Error while getting workout assignments with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

NutritionRoute.post('/editAssignment', validateToken, async (req, res, next) => {

    try {
        // console.log(req.body)
        let result = [];
        req.body.changed.forEach(async u => {
            let obj = {
                business_owner_id: isColumnValueUndefined(req.body.business_owner_id, 'string'),
                user_id: isColumnValueUndefined(u.userId, 'string'),
                nutrition_id: isColumnValueUndefined(req.body.nutrition_id, 'string'),
            }
            let w;
            if(u.assign){
                const found = await NutritionAssignments.query().where('user_id', u.userId).andWhere('nutrition_id', req.body.nutrition_id);
                if(!found.length){
                    w = await NutritionAssignments.query().insertGraphAndFetch(obj);
                }
            }
            else {
                w = await NutritionAssignments.query().delete().where('user_id', u.userId).andWhere('nutrition_id', req.body.nutrition_id);
            }
            result.push({response: w});
        })
        res.send({
            res: result
        });
    } catch (error) {
        console.log(`Workouts: Error while updating assignments : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

NutritionRoute.put('/', upload, validateToken, async (req, res, next) => {
    let imagePath = "";
    if (req.file && req.file.path) {
        imagePath = `${process.env.BASE_IMG_URL}${req.file.path}`
    } else {
        imagePath = req.body.url;
    }
    try {
        let obj = {
            id: isColumnValueUndefined(req.body.id, "string"),
            business_owner_id: isColumnValueUndefined(req.body.business_owner_id, 'string'),
            category_id: isColumnValueUndefined(req.body.category_id, 'string'),
            url: imagePath,
            name: isColumnValueUndefined(req.body.name, 'string'),
            description: isColumnValueUndefined(req.body.description, 'string')
        }
        console.log(`Getting nutritions params for update with  details like ${JSON.stringify(obj, null, 2)}`);
        const w = await nutritions.query().upsertGraphAndFetch(obj, { relate: true, unrelate: true });
        console.log(`nutritions after update is ${JSON.stringify(w, null, 2)}`);
        res.send({
            res: w
        });
    } catch (error) {
        console.log(`Ntritions: Error while updating nutritions with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

export default NutritionRoute;