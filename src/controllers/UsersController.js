const express = require('express');
const UsersRoute = express.Router();
const users = require('../models/users').default;
const bOwners = require('../models/business_owners').default;
const userTypes = require('../models/user_type').default;
const validateToken = require('../middleware').default;
const measurement = require('../models/client_measurements').default;
const UserTypes = require('../enums/user-types').default;
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
            .leftJoin('business_owners', 'business_owners.id', 'users.bownerid')
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
                'users.credentials',
                'business_owners.business_name'
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
            .leftJoin('business_owners', 'business_owners.id', 'users.bownerid')
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
                'users.credentials',
                'business_owners.business_name'
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
        bownerid: isColumnValueUndefined(req.body.bownerid, "string"),
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
        let userUpdateRes = await users.query().upsertGraphAndFetch(userObj, { relate: true, unrelate: true });
        res.send({
            res: userUpdateRes
        });
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
        bownerid: isColumnValueUndefined(req.body.bownerid, "string"),
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
    if (!req.headers.authorization) {
        next();
    }
    let userTypeId = req.query.typeId;
    let response = {};
    try {
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
        if (userTypeId) {
            let userResponse;
            if (userTypeId === UserTypes.CLIENT) {
                userResponse = await calculateClientStatistics(u, userTypeId);
            } else {
                userResponse = await users.query()
                    .leftJoin('user_type', 'user_type.id', 'users.user_type_id')
                    .leftJoin('locations', 'locations.id', 'users.location_id')
                    .where('users.user_type_id', userTypeId)
                    .andWhere('users.is_deleted', false)
                    .andWhere('users.bownerid', u.bownerid)
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
            }
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

UsersRoute.get('/search/business-owners', validateToken, async (req, res, next) => {
    let searchParams = req.query.SearchText;
    try {
        const businessOwners = await bOwners.query()
            .where('is_active', true)
            .andWhere('business_name', 'like', '%' + searchParams + '%')
            .select(
                'id as bownerid',
                'business_name as title'
            );
        res.send(businessOwners);
    } catch (error) {
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

async function calculateClientStatistics(u, userTypeId) {    
    let clientResponse = [];
    const clients = await users.query()
        .leftJoin('user_type', 'user_type.id', 'users.user_type_id')
        .leftJoin('locations', 'locations.id', 'users.location_id')
        .where('users.user_type_id', userTypeId)
        .andWhere('users.is_deleted', false)
        .andWhere('users.bownerid', u.bownerid)
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
        ).orderBy('created_at', 'ASC');
    if (clients && clients.length > 0) {
        for (let i = 0; i < clients.length; i++) {
            let clientJson = {};
            let clientMeasurement = await getMeasurements(clients[i].id);
            clientJson.about = clients[i].about;
            clientJson.avatar_uri = clients[i].avatar_uri;
            clientJson.bownerid = clients[i].bownerid;
            clientJson.created_at = clients[i].created_at;
            clientJson.dob = clients[i].dob;
            clientJson.email = clients[i].email;
            clientJson.facility_code = clients[i].facility_code;
            clientJson.first_name = clients[i].first_name;
            clientJson.last_name = clients[i].last_name;
            clientJson.id = clients[i].id;
            clientJson.is_deleted = clients[i].is_deleted;
            clientJson.last_login_date = clients[i].last_login_date;
            clientJson.address1 = clients[i].address1;
            clientJson.address = clients[i].address2;
            clientJson.city = clients[i].city;
            clientJson.lat = clients[i].lat;
            clientJson.long = clients[i].long;
            clientJson.state = clients[i].state;
            clientJson.zipcode = clients[i].zipcode;
            clientJson.location_id = clients[i].location_id;
            clientJson.phone = clients[i].phone;
            clientJson.salutation = clients[i].salutation;
            clientJson.sex = clients[i].sex;
            clientJson.user_type_id = clients[i].user_type_id;
            clientJson.type = clients[i].type;
            clientJson.credentials = clients[i].credentials;
            if(clientMeasurement) {
                clientJson.weight = clientMeasurement.weight;
                clientJson.height = clientMeasurement.height;
                clientJson.body_fat_percentage = clientMeasurement.body_fat_percentage;
                clientJson.waist = clientMeasurement.waist;
                clientJson.hips = clientMeasurement.hips;
                clientJson.thighs = clientMeasurement.thighs;
                clientJson.chest = clientMeasurement.chest;
                clientJson.neck = clientMeasurement.neck;
                clientJson.upper_arms = clientMeasurement.upper_arms;
                clientJson.fore_arms = clientMeasurement.fore_arms;
                clientJson.calves = clientMeasurement.calves;
            } else {
                clientJson.weight = 0;
                clientJson.height = 0;
                clientJson.body_fat_percentage = 0;
                clientJson.waist = 0;
                clientJson.hips = 0;
                clientJson.thighs = 0;
                clientJson.chest = 0;
                clientJson.neck = 0;
                clientJson.upper_arms = 0;
                clientJson.fore_arms = 0;
                clientJson.calves = 0;
            }
            
            clientResponse.push(clientJson);
        }
    }
    return clientResponse;
}

async function getMeasurements(clientId) {
    let _diff = {};
    let _diffJson = {};
    try {
        const clientMeasurement = await measurement.query().where('user_id', clientId).orderBy('created_at', 'ASC');
        if (clientMeasurement.length > 0) {
            _diff.initialStage = clientMeasurement[0];
            _diff.latestStage = clientMeasurement[(clientMeasurement.length) - 1];
        }
        _diffJson.weight = _diff.initialStage.weight - _diff.latestStage.weight;
        _diffJson.height = _diff.initialStage.height - _diff.latestStage.height;
        _diffJson.body_fat_percentage = _diff.initialStage.body_fat_percentage - _diff.latestStage.body_fat_percentage;
        _diffJson.waist = _diff.initialStage.waist - _diff.latestStage.waist;
        _diffJson.hips = _diff.initialStage.hips - _diff.latestStage.hips;
        _diffJson.thighs = _diff.initialStage.thighs - _diff.latestStage.thighs;
        _diffJson.chest = _diff.initialStage.chest - _diff.latestStage.chest;
        _diffJson.neck = _diff.initialStage.neck - _diff.latestStage.neck;
        _diffJson.upper_arms = _diff.initialStage.upper_arms - _diff.latestStage.upper_arms;
        _diffJson.fore_arms = _diff.initialStage.fore_arms - _diff.latestStage.fore_arms;
        _diffJson.calves = _diff.initialStage.calves - _diff.latestStage.calves;
        return _diffJson;
    } catch (error) {
        console.log(error);
    }
}

export default UsersRoute;