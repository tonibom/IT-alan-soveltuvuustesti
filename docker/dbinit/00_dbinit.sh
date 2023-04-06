#!/bin/bash
set -e

# The database schema is defined here.
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER $ROLE_NAME WITH PASSWORD '$ROLE_PASSWORD';
	CREATE DATABASE $DB_NAME WITH OWNER = $ROLE_NAME;
	GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $ROLE_NAME;
	GRANT USAGE ON SCHEMA PUBLIC TO $ROLE_NAME;

        -- Create new tables in the created database as the created user.
        \connect $DB_NAME
        SET ROLE $ROLE_NAME;

        CREATE TABLE study_programs (
            dbid BIGSERIAL UNIQUE NOT NULL,
            id INT UNIQUE NOT NULL,
            name TEXT NOT NULL
        );

        CREATE TABLE survey_answers (
            dbid BIGSERIAL UNIQUE NOT NULL,
            consent_given BOOL NOT NULL DEFAULT FALSE,
            page_loaded TIMESTAMP WITH TIME ZONE NOT NULL,
            started TIMESTAMP WITH TIME ZONE,
            completed TIMESTAMP WITH TIME ZONE,
            locale TEXT,
            email BYTEA,
            answers JSON,
            result INT REFERENCES study_programs(id)
        );
EOSQL

