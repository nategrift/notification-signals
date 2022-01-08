const db = require('../util/database');
const { v4: uuidv4 } = require('uuid');


class ApiKey {

    constructor(id, project_id, api_key, locked, created_by_id, update_at, created_at, deleted_at) {
        this.id = id;
        this.project_id = project_id;
        this.api_key = api_key;
        this.locked = locked;
        this.created_by_id = created_by_id;
        this.update_at = update_at;
        this.created_at = created_at;
        this.deleted_at = deleted_at;
    }

    static async createAndSave(projectId, userId) {

        const [stats] = await db.execute(`INSERT INTO api_keys (project_id, api_key, created_by_id) VALUES (?, ?, ?); `,
            [projectId, uuidv4(), userId]
        );

        const [rows] = await db.execute(`
            SELECT * from api_keys
            WHERE id = ?;
        `, [stats.insertId]);

        if (rows <= 0) {
            return null;
        }

        return init(rows[0]);
    };

    static async findAllForProject(projectId) {
        const [rows] = await db.execute(`
            SELECT * from api_keys
            WHERE project_id = ?
            AND deleted_at IS NULL;
        `, [projectId]);

        if (rows <= 0) {
            return null;
        }

        return rows;
    };

    static async findById(apiKeyId) {
        const [rows] = await db.execute(`
            SELECT * from api_keys
            WHERE id = ?
            AND deleted_at IS NULL
            LIMIT 1;
        `, [apiKeyId]);

        if (rows <= 0) {
            return null;
        }

        return init(rows[0]);
    };

    static async findByApiKey(apiKey) {
        const [rows] = await db.execute(`
            SELECT * from api_keys
            WHERE api_key = ?
            AND deleted_at IS NULL
            LIMIT 1;
        `, [apiKey]);

        if (rows <= 0) {
            return null;
        }

        return init(rows[0]);
    };

    async delete() {
        const [rows] = await db.execute('UPDATE api_keys SET deleted_at = Now() WHERE id = ?;',
        [this.id]);

      if (rows.affectedRows !== 1) {
        throw new Error('Error deleting api key')
      } else {
        return true
      }
    };
}

function init(apiKey) {
    return new ApiKey(apiKey.id, apiKey.project_id, apiKey.api_key, apiKey.locked, apiKey.created_by_id, apiKey.update_at, apiKey.created_at, apiKey.deleted_at);
}

module.exports = ApiKey;