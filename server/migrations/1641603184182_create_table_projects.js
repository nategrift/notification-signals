module.exports = {
    "up": `CREATE TABLE projects (
        id int(11) NOT NULL,
        name varchar(180) NOT NULL,
        locked tinyint(4) NOT NULL DEFAULT '0',
        created_by_id int(11) NOT NULL,
        updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp NULL DEFAULT NULL
      )`,
    "down": "DROP TABLE projects"
}