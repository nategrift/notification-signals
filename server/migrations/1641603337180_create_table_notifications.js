module.exports = {
    "up": `CREATE TABLE notifications (
        id int(11) NOT NULL,
        api_key_id int(11) NOT NULL,
        project_id int(11) NOT NULL,
        title text NOT NULL,
        message text NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    "down": "DROP TABLE notifications"
}