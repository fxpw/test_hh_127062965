# 🧩 Система бронирования столиков

Микросервисная система для асинхронного бронирования столиков через **Node.js + Kafka + MySQL**.

## 🏗️ Архитектура

| Сервис | Назначение |
|--------|-------------|
| **API** | Принимает HTTP-запросы, сохраняет бронь (stage=CREATED), публикует событие `booking.created` в Kafka |
| **Booking** | Подписан на Kafka, проверяет дубликаты, обновляет бронь в БД до `CONFIRMED` или `REJECTED` |
| **DB** | Хранилище MySQL 8.0 |
| **Kafka** | Брокер событий + UI на порту `8085` |

---

## ⚙️ Установка и запуск

### 1. Клонирование репозитория

```bash
git clone https://github.com/your-repo/test_hh_127062965.git
cd test_hh_127062965
```

### 2. Создание docker-сети

```bash
make create_network
```

или вручную:

```bash
docker network create test_hh_net_127062965
```

### 3. Запуск всех микросервисов

```bash
make start
```

или вручную:

```bash
docker compose -f microservices/db/docker-compose.yml up -d
docker compose -f microservices/kafka/docker-compose.yml up -d
docker compose -f microservices/api/docker-compose.yml up -d
docker compose -f microservices/booking/docker-compose.yml up -d
```

### 4. Проверка статуса

```bash
docker ps
```

Должны быть запущены:
```
db_127062965
kafka_127062965
test_hh_127062965_api
test_hh_127062965_booking
kafka_ui_127062965
```

### 5. Просмотр Kafka UI

Открой в браузере:  
👉 [http://localhost:8085](http://localhost:8085)

---

## 🧪 Тестирование E2E

Тесты находятся в `microservices/api/tests/integration/booking.e2e.test.js`.

### 1. Убедись, что все контейнеры запущены:

```bash
make ps
```

### 2. Запуск тестов:

```bash
make test
```

test_hh_127062965

Задание: смотреть в Pdf
