# Wybór wersji Ubuntu z SQL Server
FROM mcr.microsoft.com/mssql/server:2019-CU13-ubuntu-20.04

# Utworzenie katalogu aplikacji
WORKDIR /usr/src/app

# Kopiowanie skryptów inicjalizacyjnych
COPY . /usr/src/app
             
# Expose port 1433 dla dostępu z innych kontenerów
EXPOSE 1433

# Uruchomienie SQL Server oraz skryptu inicjalizacyjnego
CMD /bin/bash /usr/src/app/entrypoint.sh
