module.exports = {
    "up": "ALTER TABLE user_verify_tokens ADD PRIMARY KEY (id), ADD KEY user_tokens (user_id);",
    "down": "ALTER TABLE user_verify_tokens DROP PRIMARY KEY, DROP KEY user_tokens;"
}