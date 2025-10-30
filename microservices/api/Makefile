exec_in_container=docker compose exec test_hh_127062965_api

.PHONY: build start
all: build start
build:
	docker compose build
build_no_cache:
	docker compose build --no-cache
stop:
	docker compose down
down:
	docker compose down
run:
	docker compose up -d
up:
	docker compose up -d
start:
	docker compose up -d
build_start:
	docker compose build
rebuild: down build_no_cache up
	echo "rebuild"


current_date := $(shell date +%Y%m%d%H%M%S)

m := $(or $(m), create-migration)
MIGRATION_NAME = $(m)

s := $(or $(s), create-seeder)
SEEDER_NAME = $(s)

m_make:
	$(exec_in_container) npx sequelize-cli migration:generate --name $(MIGRATION_NAME)

m_migrate:
	$(exec_in_container) npx sequelize-cli db:migrate

m_undo:
	$(exec_in_container) npx sequelize-cli db:migrate:undo

m_undo_all:
	$(exec_in_container) npx sequelize-cli db:migrate:undo:all

s_create:
	$(exec_in_container) npx sequelize-cli seed:generate --name $(SEEDER_NAME)

s_all:
	$(exec_in_container) npx sequelize-cli db:seed:all

s_seed:
	$(exec_in_container) npx sequelize-cli db:seed --seed $(name)

s_undo:
	$(exec_in_container) npx sequelize-cli db:seed:undo

t_do:
	$(exec_in_container) npm test

d_check_db_connection:
	@set -e; \
    echo "Checking MySQL connection...";\
    COUNTER=0; \
    while [ "$$COUNTER" -lt 10 ]; do \
        HEALTH_STATUS=$$(docker inspect -f '{{.State.Health.Status}}' mysql_backend_template_db); \
        if [ "$$HEALTH_STATUS" = "healthy" ]; then \
            echo "Container is healthy!"; \
            exit 0; \
        else \
            echo "Container is not healthy (status: $$HEALTH_STATUS). Retrying in 5 seconds..."; \
            sleep 5; \
            COUNTER=$$((COUNTER + 1)); \
        fi; \
    done; \
    echo "Container is not healthy after 10 retries."; \
    exit 1
