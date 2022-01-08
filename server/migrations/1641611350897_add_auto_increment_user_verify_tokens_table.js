module.exports = {
    "up": "ALTER TABLE user_verify_tokens MODIFY id int(11) NOT NULL AUTO_INCREMENT;",
    "down": "ALTER TABLE user_verify_tokens MODIFY id int(11) NOT NULL;"
}