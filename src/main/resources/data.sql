INSERT INTO pantry (id, name)
VALUES (1, 'My Pantry');

INSERT INTO app_user (id, first_name, last_name, email, password, role,  locked, enabled, pantry_id)
VALUES (1, 'Pantry', 'User', 'user@pantry.hu', '$2a$10$GJdvpvhsDn/GOCkZbJJ6luqlKor0o1haAk87mxQk9qYBzhZgkGNvG', 'FREE', false, true, 1);

INSERT INTO list_item (id, expiration_date, important, ingredient_name, checked, pantry_id) VALUES (1, '2020.12.02', true, 'apple', false, 1);