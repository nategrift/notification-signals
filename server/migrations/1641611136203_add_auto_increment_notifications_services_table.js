module.exports = {
    "up": "ALTER TABLE notification_services MODIFY id int(11) NOT NULL AUTO_INCREMENT;",
    "down": "ALTER TABLE notification_services MODIFY id int(11) NOT NULL;"
}