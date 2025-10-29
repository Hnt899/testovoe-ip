# Filters + Orders API Demo

## Запуск проекта

```bash
npm install
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

## Проверка API заказов

Эндпоинт доступен по адресу `/api/admin/orders`.

Примеры запросов:

```bash
# Все заказы
curl http://localhost:3000/api/admin/orders

# Только оплаченные
curl "http://localhost:3000/api/admin/orders?status=PAID"

# Неверный статус (получим 400)
curl -i "http://localhost:3000/api/admin/orders?status=UNKNOWN"
```
