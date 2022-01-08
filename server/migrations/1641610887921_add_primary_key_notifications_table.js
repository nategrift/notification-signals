module.exports = {
    "up": "ALTER TABLE notifications ADD PRIMARY KEY (id);",
    "down": "ALTER TABLE notifications DROP PRIMARY KEY;"
}