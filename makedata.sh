docker cp ./raw_data.sql server-db-1:/docker-entrypoint-initdb.d/dump.sql
docker exec -u postgres server-db-1 psql ecommerce postgres -f docker-entrypoint-initdb.d/dump.sql