-- ibrsgdb-pg-v1

-- Crear esquemas
CREATE SCHEMA IF NOT EXISTS congregation;
CREATE SCHEMA IF NOT EXISTS ccore;
CREATE SCHEMA IF NOT EXISTS demographics;

CREATE TABLE congregation.document_types (
    document_type_id SERIAL PRIMARY KEY,
    document_type_name VARCHAR(100) NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NULL,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NULL,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE
);

-- Crear tablas en el esquema congregation
CREATE TABLE congregation.members (
    member_id SERIAL PRIMARY KEY,
    document_type_id INT NULL,
    document_number VARCHAR(40) NOT NULL,
    member_password VARCHAR(256) NULL,
    password_recovery_token VARCHAR(255) NULL,
    first_name VARCHAR(100) NULL,
    middle_name VARCHAR(100) NULL,
    last_name VARCHAR(100) NULL,
    second_last_name VARCHAR(100) NULL,
    email VARCHAR(50) NULL,
    landline VARCHAR(20) NULL,
    mobile_phone VARCHAR(20) NULL,
    birth_date DATE NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_document_types FOREIGN KEY (document_type_id) REFERENCES congregation.document_types(document_type_id)
);

CREATE TABLE congregation.preachers (
    preacher_id SERIAL PRIMARY KEY,
    member_id INT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_creation_user INT NOT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE NOT NULL,
    CONSTRAINT fk_member
        FOREIGN KEY (member_id)
        REFERENCES congregation.members(member_id)
);



CREATE TABLE congregation.tokens_members (
    token_member_id SERIAL PRIMARY KEY,
    member_id INT NULL,
    token_member VARCHAR(255) NULL,
    creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NULL,
    expiration_date TIMESTAMPTZ NULL,
    token_type VARCHAR(255) NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NULL,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NULL,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_tokens_member FOREIGN KEY (member_id) REFERENCES congregation.members(member_id)
);


CREATE TABLE congregation.topics (
    topic_id SERIAL PRIMARY KEY,
    topic_name VARCHAR(256) NOT NULL,
    topic_description VARCHAR(256) NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_creation_user INT NOT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE congregation.categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(256) NOT NULL,
    category_description VARCHAR(256) NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_creation_user INT NOT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE congregation.groups (
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NULL,
    description TEXT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE
);

CREATE TABLE congregation.roles (
    role_id SERIAL PRIMARY KEY,
    role_description VARCHAR(255) NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE
);

CREATE TABLE congregation.permissions (
    permission_id SERIAL PRIMARY KEY,
    permission_name VARCHAR(100) NOT NULL,
    description TEXT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE
);

CREATE TABLE congregation.screens (
    screen_id SERIAL PRIMARY KEY,
    screen_name VARCHAR(255) NULL,
    screen_path VARCHAR(100) NULL,
    screen_icon VARCHAR(100) NULL,
    screen_menu_element BOOLEAN DEFAULT FALSE,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NOT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE
);

CREATE TABLE congregation.sermons (
    sermon_id SERIAL PRIMARY KEY,
    sermon_name VARCHAR(100) NOT NULL,
    preacher_id INT NULL,
    category_id INT NULL,
    sermon_date DATE NULL,
    summary TEXT NULL,
    duration INTERVAL NULL, -- Se usa INTERVAL para manejar duración en minutos-horas
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_preacher
        FOREIGN KEY (preacher_id)
        REFERENCES congregation.preachers(preacher_id),
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES congregation.categories(category_id)
);

CREATE TABLE congregation.sermon_series (
    sermon_serie_id SERIAL PRIMARY KEY,
    serie_title VARCHAR(100) NOT NULL,
    preacher_id INT NULL,
    category_id INT NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_preacher_series
        FOREIGN KEY (preacher_id)
        REFERENCES congregation.preachers(preacher_id),
    CONSTRAINT fk_category_series
        FOREIGN KEY (category_id)
        REFERENCES congregation.categories(category_id)
);

CREATE TABLE congregation.sermon_series_association (
    id SERIAL PRIMARY KEY,
    sermon_id INT NOT NULL,
    sermon_series_id INT NOT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_sermon
        FOREIGN KEY (sermon_id)
        REFERENCES congregation.sermons(sermon_id),
    CONSTRAINT fk_sermon_series
        FOREIGN KEY (sermon_series_id) 
        REFERENCES congregation.sermon_series(sermon_serie_id)
);

CREATE TABLE congregation.sermon_comments (
    sermon_comment_id SERIAL PRIMARY KEY,
    sermon_id INT NULL,
    member_id INT NULL,
    comment VARCHAR(256) NOT NULL,
    comment_date DATE NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_sermon
        FOREIGN KEY (sermon_id)
        REFERENCES congregation.sermons(sermon_id),
    CONSTRAINT fk_member_comment
        FOREIGN KEY (member_id)
        REFERENCES congregation.members(member_id)
);

CREATE TABLE congregation.assignments (
    assignment_id SERIAL PRIMARY KEY,
    start_date DATE NULL,
    end_date DATE NULL,
    sermon_id INT NOT NULL,
    member_id INT NOT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (sermon_id) REFERENCES congregation.sermons(sermon_id),
    FOREIGN KEY (member_id) REFERENCES congregation.members(member_id)
);

CREATE TABLE congregation.events (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    date DATE NULL,
    description TEXT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE
);

CREATE TABLE congregation.attendances (
    attendance_id SERIAL PRIMARY KEY,
    member_id INT NULL,
    event_id INT NULL,
    date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (member_id) REFERENCES congregation.members(member_id),
    FOREIGN KEY (event_id) REFERENCES congregation.events(event_id)
);

CREATE TABLE congregation.donation_types (
    donation_type_id SERIAL PRIMARY KEY,
    donation_type VARCHAR(100) NOT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE
);

CREATE TABLE congregation.donations (
    donation_id SERIAL PRIMARY KEY,
    member_id INT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    donation_type_id INT NOT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (member_id) REFERENCES congregation.members(member_id),
    FOREIGN KEY (donation_type_id) REFERENCES congregation.donation_types(donation_type_id)
);

CREATE TABLE congregation.members_groups (
    member_id INT NOT NULL,
    group_id INT NOT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (member_id, group_id),
    FOREIGN KEY (member_id) REFERENCES congregation.members(member_id),
    FOREIGN KEY (group_id) REFERENCES congregation.groups(group_id)
);

CREATE TABLE congregation.roles_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    screen_id INT NOT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (role_id, permission_id, screen_id),
    FOREIGN KEY (role_id) REFERENCES congregation.roles(role_id),
    FOREIGN KEY (permission_id) REFERENCES congregation.permissions(permission_id),
    FOREIGN KEY (screen_id) REFERENCES congregation.screens(screen_id)
);

CREATE TABLE congregation.members_roles (
    member_id INT NOT NULL,
    role_id INT NOT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (member_id, role_id),
    FOREIGN KEY (member_id) REFERENCES congregation.members(member_id),
    FOREIGN KEY (role_id) REFERENCES congregation.roles(role_id)
);

-- Crear tablas en el esquema demographics
CREATE TABLE demographics.departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_creation_user INT NOT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE demographics.municipalities (
    municipality_id SERIAL PRIMARY KEY,
    municipality_name VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_creation_user INT NOT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE NOT NULL,
    FOREIGN KEY (department_id) REFERENCES demographics.departments(department_id)
);

CREATE TABLE demographics.marital_statuses (
    marital_status_id SERIAL PRIMARY KEY,
    marital_status_name VARCHAR(25) NOT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_creation_user INT NOT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE demographics.professions (
    profession_id SERIAL PRIMARY KEY,
    profession_name VARCHAR(30) NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NULL,
    audit_creation_user INT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NULL,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE NULL
);

CREATE TABLE demographics.blood_types (
    blood_type_id SERIAL PRIMARY KEY,
    blood_type_name VARCHAR(25) NOT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_creation_user INT NOT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE NOT NULL
);

-- Crear tablas en el esquema ccore
CREATE TABLE ccore.logs (
    log_id SERIAL PRIMARY KEY,
    user_token VARCHAR,
    crud_type VARCHAR,
    table_name VARCHAR,
    original_value VARCHAR,
    new_value VARCHAR,
    ip VARCHAR,
    hostname VARCHAR,
    record_id INT NULL,
    audit_creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_creation_user INT NOT NULL,
    audit_update_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    audit_update_user INT NULL,
    audit_deletion_date TIMESTAMPTZ NULL,
    audit_deletion_user INT NULL,
    active_record BOOLEAN DEFAULT TRUE
);

