-- ALTER TABLE users ADD PRIMARY KEY (id);
-- - ALTER TABLE users DROP PRIMARY KEY
-- ALTER TABLE users MODIFY id int(11) NOT NULL AUTO_INCREMENT;
-- - ALTER TABLE users MODIFY id int(11);

-- ALTER TABLE api_keys ADD PRIMARY KEY (id), ADD KEY project_api_key (project_id), ADD KEY user_api_key (created_by_id);
-- - ALTER TABLE api_keys DROP PRIMARY KEY, DROP KEY project_api_key, DROP KEY user_api_key;
-- ALTER TABLE api_keys MODIFY id int(11) NOT NULL AUTO_INCREMENT;
-- - ALTER TABLE api_keys MODIFY id int(11) NOT NULL;
ALTER TABLE api_keys ADD CONSTRAINT project_api_key FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT user_api_key FOREIGN KEY (created_by_id) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE;
- ALTER TABLE api_keys DROP FOREIGN KEY project_api_key, DROP CONSTRAINT user_api_key;


-- ALTER TABLE notifications ADD PRIMARY KEY (id);
-- - ALTER TABLE notifications DROP PRIMARY KEY;
-- ALTER TABLE notifications MODIFY id int(11) NOT NULL AUTO_INCREMENT;
-- - ALTER TABLE notifications MODIFY id int(11) NOT NULL;

-- ALTER TABLE notification_services ADD PRIMARY KEY (id);
-- - ALTER TABLE notification_services DROP PRIMARY KEY;

-- ALTER TABLE notification_services MODIFY id int(11) NOT NULL AUTO_INCREMENT;
-- - ALTER TABLE notification_services MODIFY id int(11) NOT NULL;

-- ALTER TABLE projects ADD PRIMARY KEY (id), ADD KEY created_by_id (created_by_id);
-- - ALTER TABLE projects DROP PRIMARY KEY, DROP KEY created_by_id;
-- ALTER TABLE projects MODIFY id int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE projects ADD CONSTRAINT created_by_id FOREIGN KEY (created_by_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE service_types ADD PRIMARY KEY (id);
-- ALTER TABLE service_types MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

-- ALTER TABLE user_verify_tokens ADD PRIMARY KEY (id), ADD KEY user_tokens (user_id);
-- ALTER TABLE user_verify_tokens MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
ALTER TABLE user_verify_tokens ADD CONSTRAINT user_tokens FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
