module.exports = {
    "up": "ALTER TABLE user_verify_tokens ADD CONSTRAINT user_tokens FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;",
    "down": "ALTER TABLE user_verify_tokens DROP FOREIGN KEY user_tokens;"
}