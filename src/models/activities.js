const Model = require('./model').default;
export default class Activities extends Model {
    static get tableName() {
        return 'activities';
    }

    static get idColumn() {
        return 'id';
    }
}