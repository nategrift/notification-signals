module.exports = {
    "up": "ALTER TABLE projects MODIFY id int(11) NOT NULL AUTO_INCREMENT;",
    "down": "ALTER TABLE projects MODIFY id int(11) NOT NULL;"
}