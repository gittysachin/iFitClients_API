const Model = require('./model').default;
export default class ActivityType extends Model {
    static get tableName() {
        return 'activity_type';
    }

    static get idColumn() {
        return 'id';
    }
}