const Model = require('./model').default;
const UserType = require('./user_type').default;
const locations = require('./locations').default;

export default class Users extends Model {
    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        return {
            usersType: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserType,
                join: {
                    from: 'user_type.id',
                    to: 'users.user_type_id'
                }
            },
            location: {
                relation: Model.BelongsToOneRelation,
                modelClass: locations,
                join: {
                    from: 'locations.id',
                    to: 'users.location_id'
                }
            }
        }
    }
}