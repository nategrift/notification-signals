module.exports = {
    "up": `CREATE TABLE service_types (
        id int(11) NOT NULL,
        value varchar(180) NOT NULL
      )`,
    "down": "DROP TABLE service_types"
}