const express = require('express');
const UsersRoute = express.Router();
const users = require('../models/users').default;
const bOwners = require('../models/business_owners').default;
const userTypes = require('../models/user_type').default;
const validateToken = require('../middleware').default;
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    onFileUploadComplete: function (file) {
        console.log(file.originalname + ' uploaded to  ' + file.path);
        //here I should save the destination filename to db
    }
}).single('avatar_uri');
const jwt = require('jsonwebtoken');

UsersRoute.use(async (req, res, next) => {
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

UsersRoute.get('/', validateToken, async (req, res, next) => {
    if (!req.headers.authorization) {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const u = await users.query()
            .leftJoin('user_type', 'user_type.id', 'users.user_type_id')
            .leftJoin('locations', 'locations.id', 'users.location_id')
            .where('users.is_deleted', false)
            .andWhere('users.id', '!=', decodedToken.userid)
            .select(
                'users.about',
                'users.avatar_uri',
                'users.bownerid',
                'users.created_at',
                'users.dob',
                'users.email',
                'users.facility_code',
                'users.first_name',
                'users.last_name',
                'users.id',
                'users.is_deleted',
                'users.last_login_date',
                'locations.address1',
                'locations.address2',
                'locations.city',
                'locations.lat',
                'locations.long',
                'locations.state',
                'locations.zipcode',
                'users.location_id',
                'users.phone',
                'users.salutation',
                'users.sex',
                'users.user_type_id',
                'user_type.type',
                'users.credentials'
            );
        res.send({
            res: u
        });
    } catch (error) {
        console.log(`Users: Error while getting all users with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

UsersRoute.get('/:id', validateToken, async (req, res, next) => {
    try {
        const u = await users.query()
            .leftJoin('user_type', 'user_type.id', 'users.user_type_id')
            .leftJoin('locations', 'locations.id', 'users.location_id')
            .where('users.is_deleted', false)
            .andWhere('users.id', req.params.id)
            .select(
                'users.about',
                'users.avatar_uri',
                'users.bownerid',
                'users.created_at',
                'users.dob',
                'users.email',
                'users.facility_code',
                'users.first_name',
                'users.last_name',
                'users.id',
                'users.is_deleted',
                'users.last_login_date',
                'locations.address1',
                'locations.address2',
                'locations.city',
                'locations.lat',
                'locations.long',
                'locations.state',
                'locations.zipcode',
                'users.location_id',
                'users.phone',
                'users.salutation',
                'users.sex',
                'users.user_type_id',
                'user_type.type',
                'users.credentials'
            ).first();
        res.send({
            res: u
        });
    } catch (error) {
        console.log(`Users: Error while getting user by ID with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

UsersRoute.put('/', upload, validateToken, async (req, res, next) => {
    let imagePath = "";
    if (req.file && req.file.path) {
        imagePath = `${process.env.BASE_IMG_URL}${req.file.path}`
    } else {
        imagePath = req.body.avatar_uri;
    }
    let userObj = {
        id: isColumnValueUndefined(req.body.UserId, "string"),
        user_type_id: isColumnValueUndefined(req.body.user_type_id, "string"),
        first_name: isColumnValueUndefined(req.body.first_name, "string"),
            last_name: isColumnValueUndefined(req.body.last_name, "string"),
            avatar_uri: imagePath,
            phone: isColumnValueUndefined(req.body.phone, "string"),
            email: isColumnValueUndefined(req.body.email, "string"),
            salutation: isColumnValueUndefined(req.body.salutation, "string"),
            credentials: isColumnValueUndefined(req.body.credentials, "string"),
            dob: isColumnValueUndefined(req.body.dob, "string"),
            about: isColumnValueUndefined(req.body.about, "string"),
            sex: isColumnValueUndefined(req.body.sex, "string"),
            location: {
                name: 'User Address',
                type: 'Home',
                address1: isColumnValueUndefined(req.body.address1, "string"),
                address2: isColumnValueUndefined(req.body.address2, "string"),
                city: isColumnValueUndefined(req.body.city, "string"),
                state: isColumnValueUndefined(req.body.state, "string"),
                zipcode: isColumnValueUndefined(req.body.zipcode, "string"),
            },
            facility_code: isColumnValueUndefined(req.body.facility_code, "string"),
        }
    try {
        // let userUpdateRes = await users.query().upsertGraphAndFetch(userObj, { relate: true, unrelate: true });
        // res.send({
        //     res: userUpdateRes
        // });
        console.log(userObj)
        if (!req.body.UserId) {
            const isUserExits = await users
              .query()
              .where('email', req.body.email)
              .first();
            if (!isUserExits) {
              const response = await users
                .query()
                .insertGraphAndFetch(userObj, { relate: true, unrelate: true });
              res.send({
                res: response
              });
            } else {
              res.send({
                message: 'This user is already exist!'
              });
            }
          } else {
            const isUserExits = await users
              .query()
              .where('email', req.body.email)
              .first();
            if (isUserExits) {
              const response = await users
                .query()
                .upsertGraphAndFetch(userObj, { relate: true, unrelate: true });
              res.send({
                res: response
              });
            } else {
              res.send({
                message: 'User does not exist with the provided UserId'
              });
            }
          }
    } catch (error) {
        console.log(`Users: Error while updating user with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

UsersRoute.post('/', upload, validateToken, async (req, res, next) => {
    let imagePath = "";
    if (req.file && req.file.path) {
        imagePath = `${process.env.BASE_IMG_URL}${req.file.path}`
    }
    let userObj = {
        user_type_id: isColumnValueUndefined(req.body.user_type_id, "string"),
        first_name: isColumnValueUndefined(req.body.first_name, "string"),
        last_name: isColumnValueUndefined(req.body.last_name, "string"),
        avatar_uri: imagePath,
        phone: isColumnValueUndefined(req.body.phone, "string"),
        email: isColumnValueUndefined(req.body.email, "string"),
        salutation: isColumnValueUndefined(req.body.salutation, "string"),
        credentials: isColumnValueUndefined(req.body.credentials, "string"),
        dob: isColumnValueUndefined(req.body.dob, "string"),
        about: isColumnValueUndefined(req.body.about, "string"),
        sex: isColumnValueUndefined(req.body.sex, "string"),
        location: {
            name: 'User Address',
            type: 'Home',
            address1: isColumnValueUndefined(req.body.address1, "string"),
            address2: isColumnValueUndefined(req.body.address2, "string"),
            city: isColumnValueUndefined(req.body.city, "string"),
            state: isColumnValueUndefined(req.body.state, "string"),
            zipcode: isColumnValueUndefined(req.body.zipcode, "string"),
        },
        facility_code: isColumnValueUndefined(req.body.facility_code, "string"),
    }
    try {
        const isUserExits = await users.query().skipUndefined().where('email', req.body.email).first();
        if (!isUserExits) {
            const bo = await bOwners.query().skipUndefined().where('facility_code', req.body.facility_code).first();
            if (bo) {
                userObj.bownerid = bo.id;
            }
            const userResponse = await users.query().insertGraphAndFetch(userObj);
            res.send({
                res: userResponse
            });
        } else {
            res.send({
                message: 'This user is already exist!'
            });
        }

    } catch (error) {
        console.log(`Users: Error while saving user with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

UsersRoute.get('/user/by-type', validateToken, async (req, res, next) => {
    let userTypeId = req.query.typeId;
    let response = {};
    try {
        if (userTypeId) {
            const userResponse = await users.query()
            .leftJoin('user_type', 'user_type.id', 'users.user_type_id')
            .leftJoin('locations', 'locations.id', 'users.location_id')
            .where('user_type_id', userTypeId).andWhere('is_deleted', false)
            .select(
                'users.about',
                'users.avatar_uri',
                'users.bownerid',
                'users.created_at',
                'users.dob',
                'users.email',
                'users.facility_code',
                'users.first_name',
                'users.last_name',
                'users.id',
                'users.is_deleted',
                'users.last_login_date',
                'locations.address1',
                'locations.address2',
                'locations.city',
                'locations.lat',
                'locations.long',
                'locations.state',
                'locations.zipcode',
                'users.location_id',
                'users.phone',
                'users.salutation',
                'users.sex',
                'users.user_type_id',
                'user_type.type',
                'users.credentials'
            );
            response = userResponse;
        }
        res.send({
            res: response
        })
    } catch (error) {
        console.log(`Users: Error while getting user by types with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

UsersRoute.get('/user/types', validateToken, async (req, res, next) => {
    let userTypeId = req.query.typeId;
    let response = {};
    try {
        if (userTypeId) {
            const ut = await userTypes.query().where('id', userTypeId).first();
            response = ut;
        } else {
            const ut = await userTypes.query();
            response = ut;
        }
        res.send({
            res: response
        })
    } catch (error) {
        console.log(`Users: Error while getting user types with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

UsersRoute.post('/user/registration', async (req, res, next) => {
    if (!req.body.facility_code) {
        res.send(
            JSON.stringify({
                message: 'Please provide facility code.'
            })
        );
    }
    let objToRegister = {
        user_type_id: req.body.userTypeId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        credentials: req.body.password,
        facility_code: req.body.facility_code
    }
    try {
        const isUserExits = await users.query().where('email', req.body.email).first();
        if (!isUserExits) {
            const bo = await bOwners.query().where('facility_code', req.body.facility_code).first();
            if (bo) {
                objToRegister.bownerid = bo.id;
                const response = await users.query().insertGraphAndFetch(objToRegister);
                res.send({
                    res: response
                });
            } else {
                res.send({
                    message: 'Invalid facility code or contact administrator.'
                });
            }
        } else {
            res.send({
                message: 'This user is already exist!'
            });
        }
    } catch (error) {
        console.log(`Users: Error while user registration with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

export default UsersRoute;