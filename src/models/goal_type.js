const Model = require('./model').default;
export default class GoalTypes extends Model {
    static get tableName() {
        return 'goal_types';
    }

    static get idColumn() {
        return 'id';
    }
}