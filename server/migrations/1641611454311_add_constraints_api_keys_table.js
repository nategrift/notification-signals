module.exports = {
    "up": "ALTER TABLE api_keys ADD CONSTRAINT project_api_key FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT user_api_key FOREIGN KEY (created_by_id) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE;",
    "down": "ALTER TABLE api_keys DROP FOREIGN KEY project_api_key, DROP FOREIGN KEY user_api_key;"
}