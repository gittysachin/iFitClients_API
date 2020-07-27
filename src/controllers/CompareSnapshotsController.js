const express = require('express');
const CompareSnapsRoute = express.Router();
const CompareSnaps = require('../models/compare_snaps').default;
const validateToken = require('../middleware').default;

CompareSnapsRoute.use(async (req, res, next) => {
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

// CompareSnapsRoute.post('/', validateToken, async (req, res, next) => {
//     try {
//         let requestParams = {
//             pageNo: req.body.pageNo,
//             pageSize: req.body.pageSize,
//             user_id: req.body.user_id
//         }
//         console.log(`Getting request params for get all snapsots is ${JSON.stringify(requestParams, null, 2)}`);
//         const s = await Snapshots.query()            
//             .andWhere('user_id', requestParams.user_id)
//             .andWhere('is_active', true)
//             .orderBy('created_at', 'desc')
//             .page(requestParams.pageNo - 1, requestParams.pageSize);
//         console.log(`Getting Snapshots details like ${JSON.stringify(s, null, 2)}`);
//         res.send({
//             res: s
//         });
//     } catch (error) {
//         console.log(`Snapshots: Error while getting all Snapshots with details : ${JSON.stringify(error, null, 2)}`);
//         res.send(
//             JSON.stringify({
//                 message: error.message,
//                 stack: error.stack
//             })
//         );
//     }
// })

// CompareSnapsRoute.get('/:id', validateToken, async (req, res, next) => {
//     let snapshot_id = req.params.id;
//     try {
//         const w = await Snapshots.query().where('id', snapshot_id).first();
//         console.log(`Getting Snapshots by id details like ${JSON.stringify(w, null, 2)}`);
//         res.send({
//             res: w
//         });
//     } catch (error) {
//         console.log(`Snapshots: Error while getting Snapshots by id with details : ${JSON.stringify(error, null, 2)}`);
//         res.send(
//             JSON.stringify({
//                 message: error.message,
//                 stack: error.stack
//             })
//         );
//     }
// });

CompareSnapsRoute.post('/save', validateToken, async (req, res, next) => {   
    try {
        let obj = {
            user_id: isColumnValueUndefined(req.body.user_id, 'string'),
            before_snapid: isColumnValueUndefined(req.body.before_snapid, 'string'),
            after_snapid: isColumnValueUndefined(req.body.after_snapid, 'string')
        }
        console.log(`Getting compare snapshot params for save with  details like ${JSON.stringify(obj, null, 2)}`);
        const cs = await CompareSnaps.query().insertGraphAndFetch(obj);
        console.log(`Compare Snapshots after save is ${JSON.stringify(cs, null, 2)}`);
        res.send({
            res: cs
        });
    } catch (error) {
        console.log(`Compare Snapshots: Error while saving snapshots with details : ${JSON.stringify(error.stack, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});


CompareSnapsRoute.put('/', validateToken, async (req, res, next) => {
    try {
        let obj = {
            id: isColumnValueUndefined(req.body.id, 'string'),
            user_id: isColumnValueUndefined(req.body.user_id, 'string'),
            before_snapid: isColumnValueUndefined(req.body.before_snapid, 'string'),
            after_snapid: isColumnValueUndefined(req.body.after_snapid, 'string'),
            updated_at: new Date()
        }
        console.log(`Getting Compare Snapshots params for update with  details like ${JSON.stringify(obj, null, 2)}`);
        const cs = await CompareSnaps.query().upsertGraphAndFetch(obj, { relate: true, unrelate: true });
        console.log(`Compare Snapshots after update is ${JSON.stringify(cs, null, 2)}`);
        res.send({
            res: cs
        });
    } catch (error) {
        console.log(`Compare Snapshots: Error while updating Snapshots with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});

export default CompareSnapsRoute;