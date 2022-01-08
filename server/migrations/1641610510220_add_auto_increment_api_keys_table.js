module.exports = {
    "up": "ALTER TABLE api_keys MODIFY id int(11) NOT NULL AUTO_INCREMENT;",
    "down": "ALTER TABLE api_keys MODIFY id int(11) NOT NULL;"
}