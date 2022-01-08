module.exports = {
    "up": "ALTER TABLE notifications MODIFY id int(11) NOT NULL AUTO_INCREMENT;",
    "down": "ALTER TABLE notifications MODIFY id int(11) NOT NULL;"
}