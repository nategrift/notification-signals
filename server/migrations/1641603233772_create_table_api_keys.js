module.exports = {
    "up": `CREATE TABLE api_keys (
        id int(11) NOT NULL,
        project_id int(11) NOT NULL,
        api_key varchar(36) NOT NULL,
        name varchar(180) DEFAULT NULL,
        locked tinyint(4) NOT NULL DEFAULT '0',
        created_by_id int(11) DEFAULT NULL,
        updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp NULL DEFAULT NULL
      )`,
    "down": "DROP TABLE api_keys"
}