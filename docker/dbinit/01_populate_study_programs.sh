#!/bin/bash
set -e

# The contents of the database are initialized here.
psql -v ON_ERROR_STOP=1 --username "$ROLE_NAME" --dbname "$DB_NAME" <<-EOSQL
        INSERT INTO study_programs (id, name) VALUES (1, 'Elektroniikka- ja tietoliikennetekniikka');
        INSERT INTO study_programs (id, name) VALUES (2, 'Tietotekniikka');
        INSERT INTO study_programs (id, name) VALUES (3, 'Tietojenkäsittelytiede');
EOSQL

