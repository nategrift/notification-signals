const db = require('../util/database');
const { v4: uuidv4 } = require('uuid');

class User {

    constructor(id, username, email, verified, updated_at, created_at) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.verified = verified;
        this.updated_at = updated_at;
        this.created_at = created_at;
    }

    static async createAndSave(username, email, password) {

        await db.execute(`INSERT INTO users (username, password, email) VALUES (?, ?, ?); `,
            [username, password, email]
        );

        const [rows] = await db.execute(`
            SELECT * from users
            WHERE username = ?;
        `, [username]);

        if (rows <= 0) {
            throw new Error('An Error Occured when creating verify token.');
        }

        const token = uuidv4();

        await db.execute(`INSERT INTO user_verify_tokens (user_id, token) VALUES (?, ?); `,
            [rows[0].id, token]
        );

        return {user: init(rows[0]), token: token};
    };

    async verify(token) {

        const [rows] = await db.execute(`
            SELECT id from users
            WHERE username = ?;
        `, [this.username]);

        if (rows <= 0) {
            throw new Error('Unable to verify account.');
        }

        const [verify_rows] = await db.execute(`
            SELECT * from user_verify_tokens
            WHERE user_id = ?
            AND token = ?;
        `, [rows[0].id, token]);

        if (verify_rows <= 0) {
            throw new Error('Unable to verify account.');
        }

        await db.execute(`UPDATE user_verify_tokens SET used = NOW() WHERE user_verify_tokens.id = ?;`,
            [verify_rows[0].id]
        );

        await db.execute(`UPDATE users SET verified = NOW() WHERE users.id = ?;`,
            [rows[0].id]
        );

        return this
    };

    static async findByUsername(username) {
        const [rows] = await db.execute(`
            SELECT * from users
            WHERE UPPER(username) = UPPER(?);
        `, [username]);

        if (rows <= 0) {
            return null;
        }

        return init(rows[0]);
    };

    static async findByEmail(email) {
        const [rows] = await db.execute(`
            SELECT * from users
            WHERE UPPER(email) = UPPER(?);
        `, [email]);

        if (rows <= 0) {
            return null;
        }

        return init(rows[0]);
    };

    static async getByUsernameAndPassword(username, password) {
        const [rows] = await db.execute(`
            SELECT * from users
            WHERE username = ?
            AND password = ?;
        `, [username, password]);

        if (rows <= 0) {
            return null;
        }

        return init(rows[0]);
    };
}

function init(user) {
    return new User(user.id, user.username, user.email, user.verified, user.updated_at, user.created_at);
}

module.exports = User;