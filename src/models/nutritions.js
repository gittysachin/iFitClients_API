const Model = require('./model').default;
export default class Nutritions extends Model {
    static get tableName() {
        return 'nutritions';
    }

    static get idColumn() {
        return 'id';
    }
}