const express = require('express');
const clientMeasurementRoute = express.Router();
const measurements = require('../models/client_measurements').default;
const validateToken = require('../middleware').default;

clientMeasurementRoute.use(async (req, res, next) => {
    next();
})

clientMeasurementRoute.get('/', validateToken, async (req, res, next) => {
    try {
        const cm = await measurements.query().where('is_deleted', false).eager('[user]');
        res.send({
            res: cm
        });
    } catch (error) {
        console.log(`Client Measurement: Error while getting all measurements of client with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

clientMeasurementRoute.get('/:id', validateToken, async (req, res, next) => {
    try {
        const b = await measurements.query().where('id', req.params.id).andWhere('is_deleted', false).eager('[user]');
        res.send({
            res: b
        });
    } catch (error) {
        console.log(`Client Measurement: Error while getting measurements by id of client with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

clientMeasurementRoute.put('/', validateToken, async (req, res, next) => {
    try {
        let obj = {
            id: req.body.id,
            user_id: req.body.user_id,
            measurement_date: req.body.measurement_date,
            weight: req.body.weight,
            height: req.body.height,
            body_fat_percentage: req.body.body_fat_percentage,
            waist: req.body.waist,
            hips: req.body.hips,
            thighs: req.body.thighs,
            chest: req.body.chest,
            neck: req.body.neck,
            upper_arms: req.body.upper_arms,
            fore_arms: req.body.fore_arms,
            calves: req.body.calves,
            dob: req.body.dob,
        }
        let m = await measurements.query().upsertGraphAndFetch(obj, { relate: true, unrelate: true });
        res.send({
            res: m
        });
    } catch (error) {
        console.log(`Business Owners: Error while updating owners with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

clientMeasurementRoute.post('/', validateToken, async (req, res, next) => {
    let obj = {
        user_id: req.body.user_id,
        measurement_date: req.body.measurement_date,
        weight: req.body.weight,
        height: req.body.height,
        body_fat_percentage: req.body.body_fat_percentage,
        waist: req.body.waist,
        hips: req.body.hips,
        thighs: req.body.thighs,
        chest: req.body.chest,
        neck: req.body.neck,
        upper_arms: req.body.upper_arms,
        fore_arms: req.body.fore_arms,
        calves: req.body.calves,
        dob: req.body.dob,
    }
    try {
        const m = await measurements.query().insertGraphAndFetch(obj);
        res.send({
            res: m
        });
    } catch (error) {
        console.log(`Client Measurement: Error while saving measurement with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});
export default clientMeasurementRoute;