module.exports = {
    "up": "ALTER TABLE notification_services ADD PRIMARY KEY (id);",
    "down": "ALTER TABLE notification_services DROP PRIMARY KEY;"
}