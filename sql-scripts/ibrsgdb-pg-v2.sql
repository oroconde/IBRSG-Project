CREATE SCHEMA auth AUTHORIZATION ibrsg;
CREATE SCHEMA congregation AUTHORIZATION ibrsg;
CREATE SCHEMA ccore AUTHORIZATION ibrsg;
CREATE SCHEMA demographics AUTHORIZATION ibrsg;

-- Secuencias para el esquema auth
CREATE SEQUENCE auth.document_types_document_type_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE auth.members_member_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE auth.members_roles_member_role_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE auth.permissions_permission_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE auth.restricted_member_statuses_restricted_member_status_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE auth.restricted_members_restricted_member_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE auth.roles_permissions_role_permission_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE auth.roles_role_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE auth.sessions_session_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE auth.tokens_members_token_member_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;

-- Secuencias para el esquema congregation
CREATE SEQUENCE congregation.assignments_assignment_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE congregation.attendances_attendance_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE congregation.categories_category_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE congregation.donation_types_donation_type_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE congregation.donations_donation_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE congregation.events_event_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE congregation.groups_group_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE congregation.preachers_preacher_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE congregation.screens_screen_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE congregation.sermon_comments_sermon_comment_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE congregation.sermon_series_association_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE congregation.sermon_series_sermon_serie_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE congregation.sermons_sermon_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE congregation.topics_topic_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;

-- Secuencias para el esquema ccore
CREATE SEQUENCE ccore.logs_log_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;

-- Secuencias para el esquema demographics
CREATE SEQUENCE demographics.blood_types_blood_type_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE demographics.departments_department_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE demographics.marital_statuses_marital_status_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE demographics.municipalities_municipality_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;
CREATE SEQUENCE demographics.professions_profession_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;

CREATE TABLE auth.document_types (
    document_type_id serial4 NOT NULL,
    document_type_name varchar(100) NULL,
    audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_creation_user int4 NULL,
    audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_update_user int4 NULL,
    audit_deletion_date timestamptz NULL,
    audit_deletion_user int4 NULL,
    is_active bool DEFAULT true NULL,
    CONSTRAINT document_types_pkey PRIMARY KEY (document_type_id)
);

CREATE TABLE auth.permissions (
    permission_id serial4 NOT NULL,
    permission_name varchar(100) NOT NULL,
    description text NULL,
    audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_creation_user int4 NULL,
    audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_update_user int4 NULL,
    audit_deletion_date timestamptz NULL,
    audit_deletion_user int4 NULL,
    is_active bool DEFAULT true NULL,
    CONSTRAINT permissions_pkey PRIMARY KEY (permission_id)
);

CREATE TABLE auth.roles (
    role_id serial4 NOT NULL,
    role_name varchar(50) NULL,
    role_description varchar(255) NULL,
    audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_creation_user int4 NULL,
    audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_update_user int4 NULL,
    audit_deletion_date timestamptz NULL,
    audit_deletion_user int4 NULL,
    is_active bool DEFAULT true NULL,
    CONSTRAINT roles_pkey PRIMARY KEY (role_id)
);

-- Crear tablas dependientes
CREATE TABLE auth.members (
	member_id serial4 NOT NULL,
	document_type_id int4 NULL,
	document_number varchar(40) NULL,
	member_password varchar(256) NULL,
	password_recovery_token varchar(255) NULL,
	first_name varchar(100) NULL,
	middle_name varchar(100) NULL,
	last_name varchar(100) NULL,
	second_last_name varchar(100) NULL,
	email varchar(50) NULL,
	landline varchar(20) NULL,
	mobile_phone varchar(20) NULL,
	birth_date date NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_creation_user int4 NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	password_expiration_date timestamptz NULL, -- Campo para la fecha de expiración de la contraseña
	temporary_password bool NULL,             -- Campo para indicar si la contraseña es temporal
	failed_attempts int4 DEFAULT 0 NULL, 
	is_active bool DEFAULT true NULL,
	CONSTRAINT document_unique UNIQUE (document_number),
	CONSTRAINT members_pkey PRIMARY KEY (member_id),
	CONSTRAINT fk_document_types FOREIGN KEY (document_type_id) REFERENCES auth.document_types(document_type_id)
);

CREATE TABLE auth.members_roles (
    member_role_id serial4 NOT NULL,
    member_id int4 NULL,
    role_id int4 NULL,
    audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_creation_user int4 NULL,
    audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_update_user int4 NULL,
    audit_deletion_date timestamptz NULL,
    audit_deletion_user int4 NULL,
    is_active bool DEFAULT true NULL,
    CONSTRAINT members_roles_pkey PRIMARY KEY (member_role_id),
    CONSTRAINT members_roles_unique UNIQUE (member_id, role_id),
    CONSTRAINT members_roles_member_id_fkey FOREIGN KEY (member_id) REFERENCES auth.members(member_id),
    CONSTRAINT members_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES auth.roles(role_id)
);

CREATE TABLE auth.restricted_member_statuses (
    restricted_member_status_id serial4 NOT NULL,
    restricted_member_status_name varchar(100) NULL,
    audit_creation_date timestamptz NULL,
    audit_creation_user int4 NULL,
    audit_update_date timestamptz NULL,
    audit_update_user int4 NULL,
    audit_deletion_date timestamptz NULL,
    audit_deletion_user int4 NULL,
    is_active bool DEFAULT true NULL,
    CONSTRAINT restricted_member_statuses_pkey PRIMARY KEY (restricted_member_status_id)
);

CREATE TABLE auth.restricted_members (
    restricted_member_id serial4 NOT NULL,
    member_id int4 NOT NULL,
    restricted_member_status_id int4 NOT NULL,
    restriction_reason varchar(255) NOT NULL,
    start_date timestamptz NOT NULL,
    end_date timestamptz NULL,
    audit_creation_date timestamptz NULL,
    audit_creation_user int4 NULL,
    audit_update_date timestamptz NULL,
    audit_update_user int4 NULL,
    audit_deletion_date timestamptz NULL,
    audit_deletion_user int4 NULL,
    is_active bool DEFAULT true NULL,
    CONSTRAINT restricted_members_pkey PRIMARY KEY (restricted_member_id),
    CONSTRAINT fk_restricted_member FOREIGN KEY (member_id) REFERENCES auth.members(member_id),
    CONSTRAINT fk_restricted_member_status FOREIGN KEY (restricted_member_status_id) REFERENCES auth.restricted_member_statuses(restricted_member_status_id)
);

CREATE TABLE auth.roles_permissions (
    role_permission_id serial4 NOT NULL,
    role_id int4 NOT NULL,
    permission_id int4 NOT NULL,
    screen_id int4 NOT NULL,
    audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_creation_user int4 NULL,
    audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_update_user int4 NULL,
    audit_deletion_date timestamptz NULL,
    audit_deletion_user int4 NULL,
    is_active bool DEFAULT true NULL,
    CONSTRAINT roles_permissions_pkey PRIMARY KEY (role_permission_id),
    CONSTRAINT roles_permissions_unique UNIQUE (role_id, permission_id, screen_id)
);

-- Crear tablas adicionales en auth
CREATE TABLE auth.sessions (
    session_id serial4 NOT NULL,
    member_id int4 NULL,
    token varchar(255) NULL,
    fecha_inicio timestamptz NULL,
    fecha_expiracion timestamptz NULL,
    ip_address varchar(255) NULL,
    audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_creation_user int4 NULL,
    audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_update_user int4 NULL,
    audit_deletion_date timestamptz NULL,
    audit_deletion_user int4 NULL,
    is_active bool DEFAULT true NULL,
    CONSTRAINT sessions_pkey PRIMARY KEY (session_id),
    CONSTRAINT fk_sessions_member FOREIGN KEY (member_id) REFERENCES auth.members(member_id)
);

CREATE TABLE auth.tokens_members (
    token_member_id serial4 NOT NULL,
    member_id int4 NULL,
    token_member varchar(255) NULL,
    creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    expiration_date timestamptz NULL,
    token_type varchar(255) NULL,
    audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_creation_user int4 NULL,
    audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_update_user int4 NULL,
    audit_deletion_date timestamptz NULL,
    audit_deletion_user int4 NULL,
    is_active bool DEFAULT true NULL,
    CONSTRAINT tokens_members_pkey PRIMARY KEY (token_member_id),
    CONSTRAINT fk_tokens_member FOREIGN KEY (member_id) REFERENCES auth.members(member_id)
);


-- congregation

CREATE TABLE congregation.screens (
    screen_id serial4 NOT NULL,
    screen_name varchar(255) NULL,
    screen_path varchar(100) NULL,
    screen_icon varchar(100) NULL,
    screen_menu_element bool DEFAULT false NULL,
    audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_creation_user int4 NOT NULL,
    audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
    audit_update_user int4 NULL,
    audit_deletion_date timestamptz NULL,
    audit_deletion_user int4 NULL,
    is_active bool DEFAULT true NULL,
    CONSTRAINT screens_pkey PRIMARY KEY (screen_id)
);


CREATE TABLE congregation.categories (
	category_id serial4 NOT NULL,
	category_name varchar(256) NOT NULL,
	category_description varchar(256) NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_creation_user int4 NOT NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NOT NULL,
	CONSTRAINT categories_pkey PRIMARY KEY (category_id)
);

CREATE TABLE congregation.donation_types (
	donation_type_id serial4 NOT NULL,
	donation_type varchar(100) NOT NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_creation_user int4 NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT donation_types_pkey PRIMARY KEY (donation_type_id)
);

CREATE TABLE congregation.events (
	event_id serial4 NOT NULL,
	event_name varchar(100) NOT NULL,
	"date" date NULL,
	description text NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_creation_user int4 NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT events_pkey PRIMARY KEY (event_id)
);

CREATE TABLE congregation."groups" (
	group_id serial4 NOT NULL,
	group_name varchar(100) NOT NULL,
	address varchar(255) NULL,
	description text NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_creation_user int4 NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT groups_pkey PRIMARY KEY (group_id)
);


CREATE TABLE congregation.members_groups (
    member_group_id serial4 NOT NULL, 
    member_id int4 NOT NULL,
    group_id int4 NOT NULL,
    audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user int4 NULL,
    audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP,
    audit_update_user int4 NULL,
    audit_deletion_date timestamptz NULL,
    audit_deletion_user int4 NULL,
    is_active bool DEFAULT true,
    PRIMARY KEY (member_group_id),
    CONSTRAINT fk_members_groups_member FOREIGN KEY (member_id) REFERENCES auth.members(member_id) ON DELETE CASCADE,
    CONSTRAINT fk_members_groups_group FOREIGN KEY (group_id) REFERENCES congregation.groups(group_id) ON DELETE CASCADE
);


CREATE TABLE congregation.topics (
	topic_id serial4 NOT NULL,
	topic_name varchar(256) NOT NULL,
	topic_description varchar(256) NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_creation_user int4 NOT NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NOT NULL,
	CONSTRAINT topics_pkey PRIMARY KEY (topic_id)
);

CREATE TABLE congregation.assignments (
	assignment_id serial4 NOT NULL,
	start_date date NULL,
	end_date date NULL,
	sermon_id int4 NOT NULL,
	member_id int4 NOT NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_creation_user int4 NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT assignments_pkey PRIMARY KEY (assignment_id)
);


CREATE TABLE congregation.attendances (
	attendance_id serial4 NOT NULL,
	member_id int4 NULL,
	event_id int4 NULL,
	"date" timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_creation_user int4 NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT attendances_pkey PRIMARY KEY (attendance_id)
);

CREATE TABLE congregation.donations (
	donation_id serial4 NOT NULL,
	member_id int4 NULL,
	amount numeric(10, 2) NOT NULL,
	"date" timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	donation_type_id int4 NOT NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_creation_user int4 NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT donations_pkey PRIMARY KEY (donation_id)
);

CREATE TABLE congregation.preachers (
	preacher_id serial4 NOT NULL,
	member_id int4 NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_creation_user int4 NOT NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NOT NULL,
	CONSTRAINT preachers_pkey PRIMARY KEY (preacher_id)
);


CREATE TABLE congregation.sermon_comments (
	sermon_comment_id serial4 NOT NULL,
	sermon_id int4 NULL,
	member_id int4 NULL,
	"comment" varchar(256) NOT NULL,
	comment_date date NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_creation_user int4 NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT sermon_comments_pkey PRIMARY KEY (sermon_comment_id)
);


CREATE TABLE congregation.sermon_series (
	sermon_serie_id serial4 NOT NULL,
	serie_title varchar(100) NOT NULL,
	preacher_id int4 NULL,
	category_id int4 NULL,
	start_date date NULL,
	end_date date NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_creation_user int4 NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT sermon_series_pkey PRIMARY KEY (sermon_serie_id)
);

CREATE TABLE congregation.sermon_series_association (
	id serial4 NOT NULL,
	sermon_id int4 NOT NULL,
	sermon_series_id int4 NOT NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_creation_user int4 NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT sermon_series_association_pkey PRIMARY KEY (id)
);

CREATE TABLE congregation.sermons (
	sermon_id serial4 NOT NULL,
	sermon_name varchar(100) NOT NULL,
	preacher_id int4 NULL,
	category_id int4 NULL,
	sermon_date date NULL,
	summary text NULL,
	duration interval NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_creation_user int4 NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT sermons_pkey PRIMARY KEY (sermon_id)
);


-- congregation.assignments foreign keys

ALTER TABLE congregation.assignments ADD CONSTRAINT assignments_member_id_fkey FOREIGN KEY (member_id) REFERENCES auth.members(member_id);
ALTER TABLE congregation.assignments ADD CONSTRAINT assignments_sermon_id_fkey FOREIGN KEY (sermon_id) REFERENCES congregation.sermons(sermon_id);


-- congregation.attendances foreign keys

ALTER TABLE congregation.attendances ADD CONSTRAINT attendances_event_id_fkey FOREIGN KEY (event_id) REFERENCES congregation.events(event_id);
ALTER TABLE congregation.attendances ADD CONSTRAINT attendances_member_id_fkey FOREIGN KEY (member_id) REFERENCES auth.members(member_id);


-- congregation.donations foreign keys

ALTER TABLE congregation.donations ADD CONSTRAINT donations_donation_type_id_fkey FOREIGN KEY (donation_type_id) REFERENCES congregation.donation_types(donation_type_id);
ALTER TABLE congregation.donations ADD CONSTRAINT donations_member_id_fkey FOREIGN KEY (member_id) REFERENCES auth.members(member_id);


-- congregation.preachers foreign keys

ALTER TABLE congregation.preachers ADD CONSTRAINT fk_member FOREIGN KEY (member_id) REFERENCES auth.members(member_id);


-- congregation.sermon_comments foreign keys

ALTER TABLE congregation.sermon_comments ADD CONSTRAINT fk_member_comment FOREIGN KEY (member_id) REFERENCES auth.members(member_id);
ALTER TABLE congregation.sermon_comments ADD CONSTRAINT fk_sermon FOREIGN KEY (sermon_id) REFERENCES congregation.sermons(sermon_id);


-- congregation.sermon_series foreign keys

ALTER TABLE congregation.sermon_series ADD CONSTRAINT fk_category_series FOREIGN KEY (category_id) REFERENCES congregation.categories(category_id);
ALTER TABLE congregation.sermon_series ADD CONSTRAINT fk_preacher_series FOREIGN KEY (preacher_id) REFERENCES congregation.preachers(preacher_id);


-- congregation.sermon_series_association foreign keys

ALTER TABLE congregation.sermon_series_association ADD CONSTRAINT fk_sermon FOREIGN KEY (sermon_id) REFERENCES congregation.sermons(sermon_id);
ALTER TABLE congregation.sermon_series_association ADD CONSTRAINT fk_sermon_series FOREIGN KEY (sermon_series_id) REFERENCES congregation.sermon_series(sermon_serie_id);


-- congregation.sermons foreign keys

ALTER TABLE congregation.sermons ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES congregation.categories(category_id);
ALTER TABLE congregation.sermons ADD CONSTRAINT fk_preacher FOREIGN KEY (preacher_id) REFERENCES congregation.preachers(preacher_id);

-- ccore

CREATE TABLE ccore.logs (
	log_id serial4 NOT NULL,
	user_token varchar NULL,
	crud_type varchar NULL,
	table_name varchar NULL,
	original_value varchar NULL,
	new_value varchar NULL,
	ip varchar NULL,
	hostname varchar NULL,
	record_id int4 NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_creation_user int4 NOT NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT logs_pkey PRIMARY KEY (log_id)
);

-- demographics

CREATE TABLE demographics.blood_types (
	blood_type_id serial4 NOT NULL,
	blood_type_name varchar(25) NOT NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_creation_user int4 NOT NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NOT NULL,
	CONSTRAINT blood_types_pkey PRIMARY KEY (blood_type_id)
);

CREATE TABLE demographics.departments (
	department_id serial4 NOT NULL,
	department_name varchar(30) NOT NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_creation_user int4 NOT NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NOT NULL,
	CONSTRAINT departments_pkey PRIMARY KEY (department_id)
);

CREATE TABLE demographics.marital_statuses (
	marital_status_id serial4 NOT NULL,
	marital_status_name varchar(25) NOT NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_creation_user int4 NOT NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NOT NULL,
	CONSTRAINT marital_statuses_pkey PRIMARY KEY (marital_status_id)
);

CREATE TABLE demographics.professions (
	profession_id serial4 NOT NULL,
	profession_name varchar(30) NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_creation_user int4 NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT professions_pkey PRIMARY KEY (profession_id)
);

CREATE TABLE demographics.municipalities (
	municipality_id serial4 NOT NULL,
	municipality_name varchar(30) NOT NULL,
	department_id int4 NOT NULL,
	audit_creation_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_creation_user int4 NOT NULL,
	audit_update_date timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	audit_update_user int4 NULL,
	audit_deletion_date timestamptz NULL,
	audit_deletion_user int4 NULL,
	is_active bool DEFAULT true NOT NULL,
	CONSTRAINT municipalities_pkey PRIMARY KEY (municipality_id),
	CONSTRAINT municipalities_department_id_fkey FOREIGN KEY (department_id) REFERENCES demographics.departments(department_id)
);

-- Agregar claves foráneas
ALTER TABLE auth.roles_permissions ADD CONSTRAINT roles_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES auth.permissions(permission_id);
ALTER TABLE auth.roles_permissions ADD CONSTRAINT roles_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES auth.roles(role_id);
ALTER TABLE auth.roles_permissions ADD CONSTRAINT roles_permissions_screen_id_fkey FOREIGN KEY (screen_id) REFERENCES congregation.screens(screen_id);

