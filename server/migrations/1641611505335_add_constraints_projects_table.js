module.exports = {
    "up": "ALTER TABLE projects ADD CONSTRAINT created_by_id FOREIGN KEY (created_by_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;",
    "down": "ALTER TABLE projects DROP FOREIGN KEY created_by_id"
}