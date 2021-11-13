const db = require('../util/database');

class Project {

    constructor(id, name, locked, created_by_id, update_at, created_at, deleted_at) {
        this.id = id;
        this.name = name;
        this.locked = locked;
        this.created_by_id = created_by_id;
        this.update_at = update_at;
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
            AND created_by_id = ?;
        `, [name, userId]);

        if (rows <= 0) {
            return null;
        }

        return init(rows[0]);
    };

    static async findAllForUser(userId) {
        const [rows] = await db.execute(`
            SELECT * from projects
            WHERE created_by_id = ?;
        `, [userId]);

        if (rows <= 0) {
            return null;
        }

        return rows;
    };
}

function init(project) {
    return new Project(project.id, project.name, project.locked, project.update_at, project.created_at, project.deleted_at);
}

module.exports = Project;