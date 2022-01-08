module.exports = {
    "up": "ALTER TABLE service_types ADD PRIMARY KEY (id);",
    "down": "ALTER TABLE service_types DROP PRIMARY KEY;"
}