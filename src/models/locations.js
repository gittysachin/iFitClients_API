const Model = require('./model').default;
export default class Locations extends Model {
    static get tableName() {
        return 'locations';
    }

    static get idColumn() {
        return 'id';
    }
}