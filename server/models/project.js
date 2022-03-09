const db = require('../util/database');

class Project {

    constructor(id, name, locked, created_by_id, updated_at, created_at, deleted_at) {
        this.id = id;
        this.name = name;
        this.locked = locked;
        this.created_by_id = created_by_id;
        this.updated_at = updated_at;
        this.created_at = created_at;
        this.deleted_at = deleted_at;
    }

    static async createAndSave(name, userId) {

        const [stats] = await db.execute(`INSERT INTO projects (name, created_by_id) VALUES (?, ?); `,
            [name, userId]
        );

        const [rows] = await db.execute(`
            SELECT * from projects
            WHERE id = ?;
        `, [stats.insertId]);

        if (rows <= 0) {
            return null;
        }

        return init(rows[0]);
    };

    static async findByNameAndUser(name, userId) {
        const [rows] = await db.execute(`
            SELECT * from projects
            WHERE UPPER(name) = UPPER(?)
            AND created_by_id = ?
            AND deleted_at IS NULL;
        `, [name, userId]);

        if (rows <= 0) {
            return null;
        }

        return init(rows[0]);
    };

    static async findAllForUser(userId) {
        const [rows] = await db.execute(`
            SELECT * from projects
            WHERE created_by_id = ?
            AND deleted_at IS NULL;
        `, [userId]);

        if (rows <= 0) {
            return null;
        }

        return rows;
    };

    static async findAllForUserWithStatistics(userId) {
        const [rows] = await db.execute(`
            SELECT projects.*, COUNT(DISTINCT notifications.id) as notification_count from projects
            LEFT JOIN notifications
            ON notifications.project_id = projects.id
            WHERE created_by_id = ?
            AND deleted_at IS NULL
            GROUP BY projects.id;
        `, [userId]);

        if (rows <= 0) {
            return null;
        }

        return rows;
    };

    static async findById(projectId) {
        const [rows] = await db.execute(`
            SELECT * from projects
            WHERE id = ?
            AND deleted_at IS NULL;
        `, [projectId]);

        if (rows <= 0) {
            return null;
        }

        return init(rows[0]);
    };

    static async getById(projectId) {
        const [rows] = await db.execute(`
            SELECT projects.*, users.username as created_by_username from projects
            LEFT JOIN users
            ON users.id = projects.created_by_id
            WHERE projects.id = ?
            AND projects.deleted_at IS NULL;
        `, [projectId]);

        if (rows <= 0) {
            return null;
        }

        return rows[0];
    };

    async delete() {
        const [rows] = await db.execute('UPDATE projects SET deleted_at = Now() WHERE id = ?;',
        [this.id]);

      if (rows.affectedRows !== 1) {
        throw new Error('Error deleting project')
      } else {
        return true
      }
    };
}

function init(project) {
    return new Project(project.id, project.name, project.locked, project.created_by_id, project.update_at, project.created_at, project.deleted_at);
}

module.exports = Project;