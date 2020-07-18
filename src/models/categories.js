const Model = require('./model').default;
export default class Categories extends Model {
    static get tableName() {
        return 'categories';
    }

    static get idColumn() {
        return 'id';
    }
}