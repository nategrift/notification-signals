module.exports = {
    "up": "ALTER TABLE users MODIFY id int(11) NOT NULL AUTO_INCREMENT;",
    "down": "ALTER TABLE users MODIFY id int(11);"
}