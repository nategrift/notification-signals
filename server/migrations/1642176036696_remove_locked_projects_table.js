module.exports = {
    "up": "ALTER TABLE projects DROP locked",
    "down": "ALTER TABLE projects ADD COLUMN locked tinyint(4) NOT NULL DEFAULT '0' AFTER name"
}