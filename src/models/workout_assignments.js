const Model = require('./model').default;
export default class WorkoutAssignments extends Model {
    static get tableName() {
        return 'workout_assignments';
    }

    static get idColumn() {
        return 'id';
    }
}