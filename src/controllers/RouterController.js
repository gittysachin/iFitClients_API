const express = require('express');
const index = express.Router();
const Users = require('./UsersController').default;
const Auth = require('./AuthController').default;
const BusinessOwners = require('./BusinessController').default;
const Measurements = require('./clientMeasurementController').default;
const Categories = require('./CategoriesController').default;
const Workout = require('./workoutController').default;
const Nutrition = require('./NutritionController').default;
const Goals = require('./GoalsController').default;
const Snapshots = require('./SnapshotController').default;

index.use(async (req, res, next) => {
  next();
})

index.get('/', async (req, res, next) => {
  res.send("Welcome to iFitClients API.")
})

const router = (app => {
  app.use('/img/uploads', express.static('./uploads'));
  app.use('/', index);
  app.use('/users', Users);
  app.use('/auth', Auth);
  app.use('/business-owners', BusinessOwners);
  app.use('/measurements', Measurements);
  app.use('/category', Categories);
  app.use('/workout', Workout);
  app.use('/nutrition', Nutrition);
  app.use('/goals', Goals);
  app.use('/snapshots', Snapshots);
})

export default router;