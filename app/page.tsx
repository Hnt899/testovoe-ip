import Filters from "@/components/Filters/Filters";

export default function HomePage() {
  return (
    <main>
      <h1>Компонент фильтров</h1>
      <Filters />
      <section style={{ marginTop: "32px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>
          API заказов
        </h2>
        <pre>
{`GET /api/admin/orders
GET /api/admin/orders?status=PAID

Например:
fetch("/api/admin/orders?status=PAID")
  .then((res) => res.json())
  .then(console.log);`}
        </pre>
      </section>
    </main>
  );
}
