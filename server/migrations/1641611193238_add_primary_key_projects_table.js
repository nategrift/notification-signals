module.exports = {
    "up": "ALTER TABLE projects ADD PRIMARY KEY (id), ADD KEY created_by_id (created_by_id);",
    "down": "ALTER TABLE projects DROP PRIMARY KEY, DROP KEY created_by_id;"
}