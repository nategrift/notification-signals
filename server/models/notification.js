const db = require('../util/database');

class Notification {

    constructor(id, api_key_id, project_id, title, message, created_at) {
        this.id = id;
        this.api_key_id = api_key_id;
        this.project_id = project_id;
        this.title = title;
        this.message = message;
        this.created_at = created_at;
    }

    static async createAndSave(api_key_id, project_id, title, message) {

        const [stats] = await db.execute(`INSERT INTO notifications (api_key_id, project_id, title, message) VALUES (?, ?, ?, ?); `,
            [api_key_id, project_id, title, message]
        );

        const [rows] = await db.execute(`
            SELECT * from notifications
            WHERE id = ?
            LIMIT 1;
        `, [stats.insertId]);

        if (rows <= 0) {
            return null;
        }

        return init(rows[0]);
    };
}

function init(notification) {
    return new Notification(notification.id, notification.api_key_id, notification.project_id, notification.title, notification.message, notification.created_at);
}

module.exports = Notification;