docker build -t crustacean_db ./db
docker run --name pg_db --rm -p 5444:5432 -e POSTGRES_PASSWORD=password -d crustacean_db

#Local testing.
# docker exec -it pg_db psql -h localhost -p 5432 -U postgres -d crustacean