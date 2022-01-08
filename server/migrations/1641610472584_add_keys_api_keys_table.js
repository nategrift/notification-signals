module.exports = {
    "up": "ALTER TABLE api_keys ADD PRIMARY KEY (id), ADD KEY project_api_key (project_id), ADD KEY user_api_key (created_by_id);",
    "down": "ALTER TABLE api_keys DROP PRIMARY KEY, DROP KEY project_api_key, DROP KEY user_api_key;"
}