#!/bin/bash
# Uruchomienie SQL Server i skryptu inicjalizacyjnego
/opt/mssql/bin/sqlservr &

# Czekanie, aż SQL Server się uruchomi
sleep 30s

# Uruchomienie skryptu tworzącego bazę
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "password123!" -d master -i /usr/src/app/create-database.sql

# Nie zamykaj kontenera
wait
