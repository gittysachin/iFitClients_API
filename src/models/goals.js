const Model = require('./model').default;
export default class Goals extends Model {
    static get tableName() {
        return 'goals';
    }

    static get idColumn() {
        return 'id';
    }
}