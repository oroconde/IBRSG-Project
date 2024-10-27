-- Reiniciar la secuencia para auth.document_types
ALTER SEQUENCE auth.document_types_document_type_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para auth.permissions
ALTER SEQUENCE auth.permissions_permission_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para auth.roles
ALTER SEQUENCE auth.roles_role_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para auth.members
ALTER SEQUENCE auth.members_member_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para auth.members_roles
ALTER SEQUENCE auth.members_roles_member_role_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para auth.restricted_member_statuses
ALTER SEQUENCE auth.restricted_member_statuses_restricted_member_status_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para auth.restricted_members
ALTER SEQUENCE auth.restricted_members_restricted_member_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para auth.roles_permissions
ALTER SEQUENCE auth.roles_permissions_role_permission_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para auth.sessions
ALTER SEQUENCE auth.sessions_session_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para auth.tokens_members
ALTER SEQUENCE auth.tokens_members_token_member_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.screens
ALTER SEQUENCE congregation.screens_screen_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.groups
ALTER SEQUENCE congregation.groups_group_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.categories
ALTER SEQUENCE congregation.categories_category_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.donation_types
ALTER SEQUENCE congregation.donation_types_donation_type_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.events
ALTER SEQUENCE congregation.events_event_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.assignments
ALTER SEQUENCE congregation.assignments_assignment_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.attendances
ALTER SEQUENCE congregation.attendances_attendance_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.donations
ALTER SEQUENCE congregation.donations_donation_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.preachers
ALTER SEQUENCE congregation.preachers_preacher_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.sermons
ALTER SEQUENCE congregation.sermons_sermon_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.sermon_comments
ALTER SEQUENCE congregation.sermon_comments_sermon_comment_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.sermon_series
ALTER SEQUENCE congregation.sermon_series_sermon_serie_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.sermon_series_association
ALTER SEQUENCE congregation.sermon_series_association_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para congregation.topics
ALTER SEQUENCE congregation.topics_topic_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para ccore.logs
ALTER SEQUENCE ccore.logs_log_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para demographics.blood_types
ALTER SEQUENCE demographics.blood_types_blood_type_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para demographics.departments
ALTER SEQUENCE demographics.departments_department_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para demographics.marital_statuses
ALTER SEQUENCE demographics.marital_statuses_marital_status_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para demographics.professions
ALTER SEQUENCE demographics.professions_profession_id_seq
RESTART WITH 1;

-- Reiniciar la secuencia para demographics.municipalities
ALTER SEQUENCE demographics.municipalities_municipality_id_seq
RESTART WITH 1;

-- Insertar datos en auth.document_types
INSERT INTO
    auth.document_types (document_type_name, audit_creation_user)
VALUES
    ('Passport', 101),
    ('ID Card', 102),
    ('Driver License', 103),
    ('Birth Certificate', 104),
    ('Voter ID', 105);

-- Insertar datos en auth.permissions
INSERT INTO
    auth.permissions (permission_name, description, audit_creation_user)
VALUES
    ('View Dashboard', 'Permission to view dashboard', 101),
    ('Manage Users', 'Permission to manage users', 102),
    ('Edit Content', 'Permission to edit content', 103),
    ('Manage Roles', 'Permission to manage roles', 104),
    ('Access Reports', 'Permission to access reports', 105);

-- Insertar datos en auth.roles
INSERT INTO
    auth.roles (role_description, audit_creation_user)
VALUES
    ('Administrator', 101),
    ('Editor', 102),
    ('Viewer', 103),
    ('Moderator', 104),
    ('Manager', 105);

-- Insertar datos en auth.members
INSERT INTO
    auth.members (document_type_id, document_number, member_password, first_name, last_name, email, mobile_phone, birth_date, audit_creation_user)
VALUES
    (1, 'P12345678', 'password123', 'John', 'Doe', 'john.doe@example.com', '555-1234', '1990-01-01', 101),
    (2, 'ID9876543', 'password456', 'Jane', 'Smith', 'jane.smith@example.com', '555-5678', '1985-05-05', 102),
    (3, 'DL2345678', 'password789', 'Mike', 'Johnson', 'mike.johnson@example.com', '555-8765', '1992-07-11', 103),
    (4, 'BC3456789', 'password101', 'Emily', 'Brown', 'emily.brown@example.com', '555-4321', '1995-10-20', 104),
    (5, 'VI4567890', 'password102', 'Chris', 'Miller', 'chris.miller@example.com', '555-9876', '1998-12-12', 105);

-- Insertar datos en auth.members_roles
INSERT INTO
    auth.members_roles (member_id, role_id, audit_creation_user)
VALUES
    (1, 1, 101), -- John Doe es un Administrator
    (2, 2, 102), -- Jane Smith es una Editor
    (3, 3, 103), -- Mike Johnson es un Viewer
    (4, 4, 104), -- Emily Brown es una Moderator
    (5, 5, 105);

-- Chris Miller es un Manager
-- Insertar datos en auth.restricted_member_statuses
INSERT INTO
    auth.restricted_member_statuses (restricted_member_status_name, audit_creation_user)
VALUES
    ('Active', 101),
    ('Restricted', 102),
    ('Suspended', 103),
    ('Pending Review', 104),
    ('Banned', 105);

-- Insertar datos en auth.restricted_members
INSERT INTO
    auth.restricted_members (member_id, restricted_member_status_id, restriction_reason, start_date, audit_creation_user)
VALUES
    (1, 2, 'Violation of community guidelines', '2023-01-01', 101), -- John Doe está restringido
    (2, 3, 'Multiple warnings issued', '2023-02-01', 102), -- Jane Smith está suspendida
    (3, 4, 'Pending further investigation', '2023-03-01', 103);

-- Mike Johnson está pendiente de revisión
-- Insertar datos en congregation.screens
INSERT INTO
    congregation.screens (screen_name, screen_path, screen_icon, screen_menu_element, audit_creation_user)
VALUES
    ('Dashboard', '/dashboard', 'dashboard-icon.png', true, 101),
    ('Members Management', '/members', 'members-icon.png', true, 102),
    ('Reports', '/reports', 'reports-icon.png', true, 103),
    ('Settings', '/settings', 'settings-icon.png', true, 104),
    ('Notifications', '/notifications', 'notifications-icon.png', true, 105);

-- Insertar datos en auth.roles_permissions
INSERT INTO
    auth.roles_permissions (role_id, permission_id, screen_id, audit_creation_user)
VALUES
    (1, 1, 1, 101), -- Administrator puede ver el dashboard
    (2, 3, 2, 102), -- Editor puede editar contenido
    (3, 5, 3, 103), -- Viewer puede acceder a reportes
    (4, 2, 4, 104), -- Moderator puede gestionar usuarios
    (5, 4, 5, 105);

-- Manager puede gestionar roles
-- Insertar datos en auth.sessions
INSERT INTO
    auth.sessions (member_id, token, fecha_inicio, fecha_expiracion, ip_address, audit_creation_user)
VALUES
    (1, 'token123abc', '2024-01-01 10:00:00', '2024-01-01 12:00:00', '192.168.1.1', 101),
    (2, 'token456def', '2024-01-02 11:00:00', '2024-01-02 13:00:00', '192.168.1.2', 102),
    (3, 'token789ghi', '2024-01-03 09:00:00', '2024-01-03 11:00:00', '192.168.1.3', 103);

-- Insertar datos en congregation.categories
INSERT INTO
    congregation.categories (category_name, category_description, audit_creation_user)
VALUES
    ('Christian Education', 'Educational resources for Christian growth', 101),
    ('Youth Ministry', 'Programs for youth development', 102),
    ('Music Ministry', 'Choir and music services', 103),
    ('Community Service', 'Volunteering and outreach programs', 104),
    ('Family Ministry', 'Support for families', 105);

-- Insertar datos en congregation.preachers
INSERT INTO
    congregation.preachers (member_id, audit_creation_user)
VALUES
    (1, 101), -- John Doe es un preacher
    (2, 102), -- Jane Smith es un preacher
    (3, 103), -- Mike Johnson es un preacher
    (4, 104), -- Emily Brown es un preacher
    (5, 105);

-- Chris Miller es un preacher
-- Insertar datos en congregation.sermons
INSERT INTO
    congregation.sermons (sermon_name, preacher_id, category_id, sermon_date, summary, duration, audit_creation_user)
VALUES
    ('The Power of Faith', 1, 1, '2024-01-12', 'A sermon about faith and trust in God', INTERVAL '1 hour', 101),
    ('Gods Love for Humanity', 2, 2, '2024-02-14', 'A message about Gods eternal love', INTERVAL '1 hour 30 minutes', 102),
    ('Serving the Community', 3, 3, '2024-03-20', 'Encouraging service to the community', INTERVAL '45 minutes', 103),
    ('The Role of Family', 4, 4, '2024-04-22', 'The importance of family in Christian life', INTERVAL '1 hour 15 minutes', 104),
    ('Hope in Difficult Times', 5, 5, '2024-05-10', 'A sermon on maintaining hope through struggles', INTERVAL '50 minutes', 105);

-- Insertar datos en congregation.groups
INSERT INTO
    congregation."groups" (group_name, address, description, audit_creation_user)
VALUES
    ('Youth Group', '123 Main St', 'Youth gatherings every week', 101),
    ('Choir Group', '456 Music Hall', 'Choir rehearsals and performances', 102),
    ('Bible Study', '789 Community Hall', 'Weekly bible study', 103),
    ('Volunteers', '123 Main St', 'Community service projects', 104),
    ('Sunday School', '101 Sunday St', 'Classes for children on Sundays', 105);

-- Insertar datos en congregation.members_groups
INSERT INTO
    congregation.members_groups (member_id, group_id, audit_creation_user)
VALUES
    (1, 1, 101), -- John Doe en el Youth Group
    (2, 2, 102), -- Jane Smith en el Choir Group
    (3, 3, 103), -- Mike Johnson en el Bible Study
    (4, 4, 104), -- Emily Brown en el Volunteers Group
    (5, 5, 105);

-- Chris Miller en el Sunday School
-- Insertar datos en congregation.donation_types
INSERT INTO
    congregation.donation_types (donation_type, audit_creation_user)
VALUES
    ('Tithes', 101),
    ('Offerings', 102),
    ('Building Fund', 103),
    ('Charity', 104),
    ('Special Projects', 105);

-- Insertar datos en congregation.assignments
INSERT INTO
    congregation.assignments (start_date, end_date, sermon_id, member_id, audit_creation_user)
VALUES
    ('2024-01-01', '2024-01-31', 1, 1, 101),
    ('2024-02-01', '2024-02-28', 2, 2, 102),
    ('2024-03-01', '2024-03-31', 3, 3, 103);

-- Insertar datos en congregation.events
INSERT INTO
    congregation.events (event_name, "date", description, audit_creation_user)
VALUES
    ('Christmas Concert', '2024-12-25', 'Annual Christmas choir concert', 101),
    ('Youth Camp', '2024-06-15', 'Summer camp for youth', 102),
    ('Community Outreach', '2024-03-20', 'Helping local families', 103),
    ('Bible Study Marathon', '2024-09-10', 'Intensive bible study session', 104),
    ('Family Day', '2024-07-25', 'Family gathering event', 105);

-- Insertar datos en congregation.topics
INSERT INTO
    congregation.topics (topic_name, topic_description, audit_creation_user)
VALUES
    ('Faith and Works', 'Exploring the relationship between faith and good works', 101),
    ('Biblical Leadership', 'Principles of leadership from the Bible', 102),
    ('Christian Discipleship', 'How to be a disciple of Christ', 103),
    ('Youth and Faith', 'Challenges of youth in their spiritual journey', 104),
    ('Family Values', 'Building strong Christian families', 105);

-- Insertar datos en congregation.attendances
INSERT INTO
    congregation.attendances (member_id, event_id, "date", audit_creation_user)
VALUES
    (1, 1, '2024-12-25 18:00:00', 101), -- John Doe asiste al Christmas Concert
    (2, 2, '2024-06-15 09:00:00', 102), -- Jane Smith asiste al Youth Camp
    (3, 3, '2024-03-20 10:00:00', 103), -- Mike Johnson asiste al Community Outreach
    (4, 4, '2024-09-10 12:00:00', 104), -- Emily Brown asiste al Bible Study Marathon
    (5, 5, '2024-07-25 11:00:00', 105);

-- Chris Miller asiste al Family Day
-- Insertar datos en congregation.donations
INSERT INTO
    congregation.donations (member_id, amount, "date", donation_type_id, audit_creation_user)
VALUES
    (1, 100.00, '2024-01-10 11:00:00', 1, 101), -- John Doe dona $100 como Tithes
    (2, 50.00, '2024-02-05 12:00:00', 2, 102), -- Jane Smith dona $50 como Offerings
    (3, 200.00, '2024-03-20 13:00:00', 3, 103), -- Mike Johnson dona $200 al Building Fund
    (4, 75.00, '2024-04-15 14:00:00', 4, 104), -- Emily Brown dona $75 para Charity
    (5, 150.00, '2024-05-25 15:00:00', 5, 105);

-- Chris Miller dona $150 a Special Projects
-- Insertar datos en congregation.sermon_comments
INSERT INTO
    congregation.sermon_comments (sermon_id, member_id, "comment", comment_date, audit_creation_user)
VALUES
    (1, 1, 'This message was very uplifting!', '2024-01-13', 101),
    (2, 2, 'Amazing sermon on love!', '2024-02-15', 102),
    (3, 3, 'Encouraging words about serving others.', '2024-03-21', 103),
    (4, 4, 'Really made me think about my family values.', '2024-04-23', 104),
    (5, 5, 'Gave me hope during tough times.', '2024-05-11', 105);

-- Insertar datos en congregation.sermon_series
INSERT INTO
    congregation.sermon_series (serie_title, preacher_id, category_id, start_date, end_date, audit_creation_user)
VALUES
    ('Faith Series', 1, 1, '2024-01-01', '2024-01-31', 101),
    ('Love Series', 2, 2, '2024-02-01', '2024-02-28', 102),
    ('Service Series', 3, 3, '2024-03-01', '2024-03-31', 103),
    ('Family Series', 4, 4, '2024-04-01', '2024-04-30', 104),
    ('Hope Series', 5, 5, '2024-05-01', '2024-05-31', 105);

-- Insertar datos en congregation.sermon_series_association
INSERT INTO
    congregation.sermon_series_association (sermon_id, sermon_series_id, audit_creation_user)
VALUES
    (1, 1, 101), -- "The Power of Faith" pertenece a la Faith Series
    (2, 2, 102), -- "God's Love for Humanity" pertenece a la Love Series
    (3, 3, 103), -- "Serving the Community" pertenece a la Service Series
    (4, 4, 104), -- "The Role of Family" pertenece a la Family Series
    (5, 5, 105);

-- "Hope in Difficult Times" pertenece a la Hope Series
-- Insertar datos en ccore.logs
INSERT INTO
    ccore.logs (user_token, crud_type, table_name, original_value, new_value, ip, hostname, audit_creation_user)
VALUES
    ('token123abc', 'INSERT', 'auth.members', NULL, 'John Doe', '192.168.1.1', 'localhost', 101),
    ('token456def', 'UPDATE', 'auth.members', 'Jane Doe', 'Jane Smith', '192.168.1.2', 'localhost', 102),
    ('token789ghi', 'DELETE', 'auth.members_roles', 'Mike Johnson', NULL, '192.168.1.3', 'localhost', 103);

-- Insertar datos en demographics.blood_types
INSERT INTO
    demographics.blood_types (blood_type_name, audit_creation_user)
VALUES
    ('O+', 101),
    ('A+', 102),
    ('B+', 103),
    ('AB+', 104),
    ('O-', 105);

-- Insertar datos en demographics.departments
INSERT INTO
    demographics.departments (department_name, audit_creation_user)
VALUES
    ('Finance', 101),
    ('HR', 102),
    ('IT', 103),
    ('Marketing', 104),
    ('Operations', 105);

-- Insertar datos en demographics.marital_statuses
INSERT INTO
    demographics.marital_statuses (marital_status_name, audit_creation_user)
VALUES
    ('Single', 101),
    ('Married', 102),
    ('Divorced', 103),
    ('Widowed', 104),
    ('Separated', 105);

-- Insertar datos en demographics.professions
INSERT INTO
    demographics.professions (profession_name, audit_creation_user)
VALUES
    ('Engineer', 101),
    ('Teacher', 102),
    ('Doctor', 103),
    ('Lawyer', 104),
    ('Artist', 105);

-- Insertar datos en demographics.municipalities
INSERT INTO
    demographics.municipalities (municipality_name, department_id, audit_creation_user)
VALUES
    ('City A', 1, 101),
    ('City B', 2, 102),
    ('City C', 3, 103),
    ('City D', 4, 104),
    ('City E', 5, 105);

-- Insertar datos en congregation.donation_types
INSERT INTO
    congregation.donation_types (donation_type, audit_creation_user)
VALUES
    ('Tithes', 101),
    ('Offerings', 102),
    ('Building Fund', 103),
    ('Charity', 104),
    ('Special Projects', 105);

-- Insertar datos en congregation.assignments
INSERT INTO
    congregation.assignments (start_date, end_date, sermon_id, member_id, audit_creation_user)
VALUES
    ('2024-01-01', '2024-01-31', 1, 1, 101), -- John Doe asignado a "The Power of Faith"
    ('2024-02-01', '2024-02-28', 2, 2, 102), -- Jane Smith asignada a "God\'s Love for Humanity"
    ('2024-03-01', '2024-03-31', 3, 3, 103), -- Mike Johnson asignado a "Serving the Community"
    ('2024-04-01', '2024-04-30', 4, 4, 104), -- Emily Brown asignada a "The Role of Family"
    ('2024-05-01', '2024-05-31', 5, 5, 105);

-- Chris Miller asignado a "Hope in Difficult Times"
-- Insertar datos en congregation.groups
INSERT INTO
    congregation."groups" (group_name, address, description, audit_creation_user)
VALUES
    ('Youth Group', '123 Main St', 'Youth gatherings every week', 101),
    ('Choir Group', '456 Music Hall', 'Choir rehearsals and performances', 102),
    ('Bible Study', '789 Community Hall', 'Weekly bible study', 103),
    ('Volunteers', '123 Main St', 'Community service projects', 104),
    ('Sunday School', '101 Sunday St', 'Classes for children on Sundays', 105);

-- Insertar datos en congregation.members_groups
INSERT INTO
    congregation.members_groups (member_id, group_id, audit_creation_user)
VALUES
    (1, 1, 101), -- John Doe en el Youth Group
    (2, 2, 102), -- Jane Smith en el Choir Group
    (3, 3, 103), -- Mike Johnson en el Bible Study
    (4, 4, 104), -- Emily Brown en el Volunteers Group
    (5, 5, 105);

-- Chris Miller en el Sunday School
-- Insertar datos en auth.tokens_members
INSERT INTO
    auth.tokens_members (member_id, token_member, creation_date, expiration_date, token_type, audit_creation_user)
VALUES
    (1, 'token1abc', '2024-01-01 10:00:00', '2024-01-10 10:00:00', 'password_reset', 101), -- Token para John Doe
    (2, 'token2def', '2024-02-01 11:00:00', '2024-02-10 11:00:00', 'password_reset', 102), -- Token para Jane Smith
    (3, 'token3ghi', '2024-03-01 12:00:00', '2024-03-10 12:00:00', 'password_reset', 103), -- Token para Mike Johnson
    (4, 'token4jkl', '2024-04-01 13:00:00', '2024-04-10 13:00:00', 'password_reset', 104), -- Token para Emily Brown
    (5, 'token5mno', '2024-05-01 14:00:00', '2024-05-10 14:00:00', 'password_reset', 105);

-- Token para Chris Miller