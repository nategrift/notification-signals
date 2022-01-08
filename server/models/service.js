const db = require('../util/database');

class Service {

    constructor(id, service_type_id, project_id, config, notes, enabled, created_at) {
        this.id = id;
        this.service_type_id = service_type_id;
        this.project_id = project_id;
        this.config = config;
        this.notes = notes;
        this.enabled = enabled;
        this.created_at = created_at;
    }


    static async findAllForProjectId(projectId) {
        const [services] = await db.execute(`
            SELECT ns.*, service_types.value as service_type from notification_services as ns
            LEFT JOIN service_types ON ns.service_type_id = service_types.id
            WHERE project_id = ?
            AND enabled = 1
        `, [projectId]);

        if (!services || services <= 0) {
            return null;
        }
        return services;
    };

    static async createAndSave(service_type_id, project_id, config, notes) {

        const [stats] = await db.execute(`INSERT INTO notification_services (service_type_id, project_id, config, notes) VALUES (?, ?, ?, ?); `,
            [service_type_id, project_id, config, notes]
        );

        const [rows] = await db.execute(`
            SELECT * from notification_services
            WHERE id = ?
            LIMIT 1;
        `, [stats.insertId]);

        if (rows <= 0) {
            return null;
        }

        return init(rows[0]);
    };

    static async findById(serviceId) {
        const [rows] = await db.execute(`
            SELECT * from notification_services
            WHERE id = ?;
        `, [serviceId]);

        if (rows <= 0) {
            return null;
        }

        return init(rows[0]);
    };

    async delete() {
        const [rows] = await db.execute('DELETE FROM notification_services WHERE id = ?',
        [this.id]);

      if (rows.affectedRows !== 1) {
        throw new Error('Error deleting service')
      } else {
        return true
      }
    };
}

function init(service) {
    return new Service(service.id, service.service_type_id, service.project_id, service.config, service.notes, service.enabled, service.created_at);
}


module.exports = Service;