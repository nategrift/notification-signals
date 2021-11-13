const db = require('../util/database');
const { v4: uuidv4 } = require('uuid');

class User {

    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    async saveWithPassword(password) {

        if (! this.username) {
            throw new Error('Missing Username in User class while calling saveWithPassword()')
        }

        if (! this.email) {
            throw new Error('Missing Email in User class while calling saveWithPassword()')
        }

        if (! password) {
            throw new Error('Missing Password in User class while calling saveWithPassword()')
        }

        await db.execute(`INSERT INTO users (username, password, email) VALUES (?, ?, ?); `,
            [this.username, password, this.email]
        );

        const [rows] = await db.execute(`
            SELECT id from users
            WHERE username = ?;
        `, [this.username]);

        if (rows <= 0) {
            throw new Error('An Error Occured when creating verify token.');
        }

        this.token = uuidv4();

        await db.execute(`INSERT INTO user_verify_tokens (user_id, token) VALUES (?, ?); `,
            [rows[0].id, this.token]
        );

        return this
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

        return initUser(rows[0]);
    };

    static async findByEmail(email) {
        const [rows] = await db.execute(`
            SELECT * from users
            WHERE UPPER(email) = UPPER(?);
        `, [email]);

        if (rows <= 0) {
            return null;
        }

        return initUser(rows[0]);
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

        return initUser(rows[0]);
    };
}

function initUser(user) {
    return new User(user.username, user.email);
}

module.exports = User;