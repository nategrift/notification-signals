module.exports = {
    "up": "INSERT INTO service_types (id, value) VALUES (1, 'discord')",
    "down": "DELETE FROM service_types WHERE id = 1"
}