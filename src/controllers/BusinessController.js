const express = require('express');
const BusinessOwnerRoute = express.Router();
const Bowner = require('../models/business_owners').default;
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/bowner');
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
}).single('business_logo_url');

const validateToken = require('../middleware').default;

BusinessOwnerRoute.use(async (req, res, next) => {
    next();
})

BusinessOwnerRoute.get('/', validateToken, async (req, res, next) => {
    try {
        const b = await Bowner.query()
            .innerJoin('locations', 'locations.id', 'business_owners.location_id').where('is_active', true).select(
                'business_owners.id',
                'business_owners.business_name',
                'business_owners.business_logo_url',
                'business_owners.facility_code',
                'business_owners.created_at',
                'business_owners.location_id',
                'locations.name',
                'locations.type',
                'locations.address1',
                'locations.address2',
                'locations.city',
                'locations.state',
                'locations.zipcode',
                'locations.lat',
                'locations.long'
            )

        res.send({
            res: b
        });
    } catch (error) {
        console.log(`Business Owners: Error while getting all owners with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

BusinessOwnerRoute.get('/:id', validateToken, async (req, res, next) => {
    try {
        const b = await Bowner.query()
            .innerJoin('locations', 'locations.id', 'business_owners.location_id')
            .where('business_owners.id', req.params.id)
            .andWhere('is_active', true)
            .select(
                'business_owners.id',
                'business_owners.business_name',
                'business_owners.business_logo_url',
                'business_owners.facility_code',
                'business_owners.created_at',
                'business_owners.location_id',
                'locations.name',
                'locations.type',
                'locations.address1',
                'locations.address2',
                'locations.city',
                'locations.state',
                'locations.zipcode',
                'locations.lat',
                'locations.long'
            ).first();
        res.send({
            res: b
        });
    } catch (error) {
        console.log(`Business Owners: Error while getting owner by ID with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
})

BusinessOwnerRoute.put('/', upload, validateToken, async (req, res, next) => {
    try {
        let ownerObj = {
            id: req.body.id,
            business_name: req.body.business_name,
            business_logo_url: `${process.env.BASE_IMG_URL}${req.file.path}`,
            facility_code: req.body.facility_code,
            location: {
                name: 'Business Owner Address',
                type: 'Home',
                address1: req.body.address1,
                address2: req.body.address2,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode,
            }
        }
        let bOwnerUpdateRes = await Bowner.query().upsertGraphAndFetch(ownerObj, { relate: true, unrelate: true });
        res.send({
            res: bOwnerUpdateRes
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

BusinessOwnerRoute.post('/', upload, validateToken, async (req, res, next) => {
    let ownerObj = {
        business_name: req.body.business_name,
        business_logo_url: `${process.env.BASE_IMG_URL}${req.file.path}`,
        facility_code: req.body.facility_code,
        location: {
            name: 'Business Owner Address',
            type: 'Home',
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
        }
    }
    try {
        const bOwnerResponse = await Bowner.query().insertGraphAndFetch(ownerObj);
        res.send({
            res: bOwnerResponse
        });
    } catch (error) {
        console.log(`Business Owners: Error while saving owners with details : ${JSON.stringify(error, null, 2)}`);
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
});
export default BusinessOwnerRoute;