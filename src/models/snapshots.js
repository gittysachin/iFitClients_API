const Model = require('./model').default;
export default class Snapshots extends Model {
    static get tableName() {
        return 'snapshots';
    }

    static get idColumn() {
        return 'id';
    }
}