module.exports = {
    "up": "ALTER TABLE users ADD PRIMARY KEY (id);",
    "down": "ALTER TABLE users DROP PRIMARY KEY;"
}