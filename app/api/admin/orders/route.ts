import { NextResponse } from "next/server";
import orders from "@/data/mock-orders.json";

type OrderStatus = "PAID" | "PENDING" | "CANCELLED";

const allowedStatuses: ReadonlySet<OrderStatus> = new Set([
  "PAID",
  "PENDING",
  "CANCELLED",
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  if (status && !allowedStatuses.has(status as OrderStatus)) {
    return NextResponse.json(
      { error: "Invalid status" },
      {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }

  const filtered = status
    ? orders.filter((order) => order.status === status)
    : orders;

  return NextResponse.json(
    {
      data: filtered,
      total: filtered.length,
    },
    {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}
