module.exports = {
    "up": `CREATE TABLE notification_services (
        id int(11) NOT NULL,
        service_type_id int(11) NOT NULL,
        project_id int(11) NOT NULL,
        config json DEFAULT NULL,
        notes text,
        enabled tinyint(1) NOT NULL DEFAULT '1',
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    "down": "DROP TABLE notification_services"
}