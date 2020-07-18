const Model = require('./model').default;
const users = require('./users').default;

export default class BusinessOwner extends Model {
    static get tableName() {
        return 'client_measurements';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: 'client_measurements.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}