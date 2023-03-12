#!/bin/bash
set -e

# Core elements of the database are configured here.
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER $ROLE_NAME WITH PASSWORD '$ROLE_PASSWORD';
	CREATE DATABASE $DB_NAME WITH OWNER = $ROLE_NAME;
	GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $ROLE_NAME;
	GRANT USAGE ON SCHEMA PUBLIC TO $ROLE_NAME;

        -- Create new tables in the database as the created user.
        \connect $DB_NAME
        SET ROLE $ROLE_NAME;

        CREATE TABLE study_programs (
            dbid BIGSERIAL UNIQUE NOT NULL,
            name TEXT NOT NULL

        );

        CREATE TABLE respondents (
            dbid BIGSERIAL UNIQUE NOT NULL,
            consent_given BOOL NOT NULL DEFAULT FALSE,
            email BYTEA,
            survey_time INT,
            answers JSON,
            result INT REFERENCES study_programs(dbid)
        );
EOSQL

