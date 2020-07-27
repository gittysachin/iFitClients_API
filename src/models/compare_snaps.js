const Model = require('./model').default;
export default class CompareSnaps extends Model {
    static get tableName() {
        return 'compare_snaps';
    }

    static get idColumn() {
        return 'id';
    }
}