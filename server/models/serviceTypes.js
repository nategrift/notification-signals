const db = require('../util/database');

class ServiceTypes {

    static async fetchAll() {
        const [serviceTypes] = await db.execute('SELECT * FROM service_types;');

        if (!serviceTypes || serviceTypes.length <= 0) {
            return null;
        }
        return serviceTypes;
    };
}

module.exports = ServiceTypes;