const Model = require('./model').default;
const locations = require('./locations').default;

export default class BusinessOwner extends Model {
    static get tableName() {
        return 'business_owners';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        return {
            location: {
                relation: Model.BelongsToOneRelation,
                modelClass: locations,
                join: {
                    from: 'locations.id',
                    to: 'business_owners.location_id'
                }
            }
        }
    }
}