const Model = require('./model').default;
export default class Workouts extends Model {
    static get tableName() {
        return 'workouts';
    }

    static get idColumn() {
        return 'id';
    }
}