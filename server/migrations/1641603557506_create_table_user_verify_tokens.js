module.exports = {
    "up": `CREATE TABLE user_verify_tokens (
        id int(11) NOT NULL,
        user_id int(11) NOT NULL,
        token varchar(36) NOT NULL,
        used timestamp NULL DEFAULT NULL
      )`,
    "down": "DROP TABLE user_verify_tokens"
}