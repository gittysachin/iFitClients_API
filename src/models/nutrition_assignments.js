const Model = require('./model').default;
export default class NutritionAssignments extends Model {
    static get tableName() {
        return 'nutrition_assignments';
    }

    static get idColumn() {
        return 'id';
    }
}