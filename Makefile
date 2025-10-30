
.PHONY: create_network start_all migrate
all: create_network start_all

NETWORK_NAME := test_hh_net_127062965

create_network:
	@docker network inspect $(NETWORK_NAME) > /dev/null 2>&1 || (echo "Создаю сеть $(NETWORK_NAME)" && docker network create $(NETWORK_NAME))

start_all:
	@echo "Запуск всех микросервисов..."
	@docker compose -f microservices/db/docker-compose.yml up -d
	@docker compose -f microservices/kafka/docker-compose.yml up -d
	@docker compose -f microservices/api/docker-compose.yml up -d
	@docker compose -f microservices/booking/docker-compose.yml up -d


start:create_network start_all


migrate:
	@echo "Применяю миграции..."
	docker compose -f microservices/api/docker-compose.yml exec test_hh_127062965_api npx sequelize-cli db:migrate

stop_all:
	@echo "Остановка всех микросервисов..."
	@docker compose -f microservices/db/docker-compose.yml down
	@docker compose -f microservices/kafka/docker-compose.yml down
	@docker compose -f microservices/api/docker-compose.yml down
	@docker compose -f microservices/booking/docker-compose.yml down
down:stop_all
stop:stop_all


test:
	@echo "Запуск интеграционных тестов..."
	docker compose -f microservices/api/docker-compose.yml exec test_hh_127062965_api npm test -- --detectOpenHandles

