module.exports = {
    "up": `CREATE TABLE users (
        id int(11) NOT NULL,
        username varchar(30) NOT NULL,
        email text NOT NULL,
        password text NOT NULL,
        verified timestamp NULL DEFAULT NULL,
        updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    "down": "DROP TABLE users"
}