module.exports = {
    "up": "ALTER TABLE service_types MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;",
    "down": "ALTER TABLE service_types MODIFY id int(11) NOT NULL;"
}