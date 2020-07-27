const express = require('express');
const SnapshotRoute = express.Router();
const Snapshots = require('../models/snapshots').default;
const validateToken = require('../middleware').default;
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/snapshots');
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

SnapshotRoute.use(async (req, res, next) => {
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

SnapshotRoute.post('/', validateToken, async (req, res, next) => {
    try {
        let requestParams = {
            pageNo: req.body.pageNo,
            pageSize: req.body.pageSize,
            user_id: req.body.user_id
        }
        console.log(`Getting request params for get all snapsots is ${JSON.stringify(requestParams, null, 2)}`);
        const s = await Snapshots.query()            
            .andWhere('user_id', requestParams.user_id)
            .andWhere('is_active', true)
            .orderBy('created_at', 'desc')
            .page(requestParams.pageNo - 1, requestParams.pageSize);
        console.log(`Getting Snapshots details like ${JSON.stringify(s, null, 2)}`);
        res.send({
            res: s
        });
    } catch (error) {
        console.log(`Snapshots: Error while getting all Snapshots with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

SnapshotRoute.get('/:id', validateToken, async (req, res, next) => {
    let snapshot_id = req.params.id;
    try {
        const w = await Snapshots.query().where('id', snapshot_id).first();
        console.log(`Getting Snapshots by id details like ${JSON.stringify(w, null, 2)}`);
        res.send({
            res: w
        });
    } catch (error) {
        console.log(`Snapshots: Error while getting Snapshots by id with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

SnapshotRoute.post('/save', upload, validateToken, async (req, res, next) => {
    let imagePath = "";
    if (req.file && req.file.path) {
        imagePath = `${process.env.BASE_IMG_URL}${req.file.path}`
    } else {
        imagePath = req.body.url;
    }
    try {
        let obj = {
            user_id: isColumnValueUndefined(req.body.user_id, 'string'),
            snapshot_date: req.body.snapshot_date ? req.body.snapshot_date : new Date(),
            url: imagePath,
            pose: isColumnValueUndefined(req.body.pose, 'string')
        }
        console.log(`Getting snapshot params for save with  details like ${JSON.stringify(obj, null, 2)}`);
        const s = await Snapshots.query().insertGraphAndFetch(obj);
        console.log(`Snapshots after save is ${JSON.stringify(s, null, 2)}`);
        res.send({
            res: s
        });
    } catch (error) {
        console.log(`Snapshots: Error while saving snapshots with details : ${JSON.stringify(error.stack, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});


SnapshotRoute.put('/', upload, validateToken, async (req, res, next) => {
    let imagePath = "";
    if (req.file && req.file.path) {
        imagePath = `${process.env.BASE_IMG_URL}${req.file.path}`
    } else {
        imagePath = req.body.url;
    }
    try {
        let obj = {
            id: isColumnValueUndefined(req.body.id, 'string'),
            user_id: isColumnValueUndefined(req.body.user_id, 'string'),
            snapshot_date: req.body.snapshot_date ? req.body.snapshot_date : new Date(),
            url: imagePath,
            pose: isColumnValueUndefined(req.body.pose, 'string')
        }
        console.log(`Getting Snapshots params for update with  details like ${JSON.stringify(obj, null, 2)}`);
        const s = await Snapshots.query().upsertGraphAndFetch(obj, { relate: true, unrelate: true });
        console.log(`Snapshots after update is ${JSON.stringify(s, null, 2)}`);
        res.send({
            res: s
        });
    } catch (error) {
        console.log(`Snapshots: Error while updating Snapshots with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

export default SnapshotRoute;