import { useState } from "react";
import ItemInput from "../components/ItemInput";

export default function Home() {
  const [plan, setPlan] = useState(null);
  const [total, setTotal] = useState(0);

  const handleItems = async (items) => {
    const res = await fetch("/api/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });
    const data = await res.json();
    setPlan(data.plan);
    setTotal(data.totalCost);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Grocery Optimizer</h1>
      <ItemInput onSubmit={handleItems} />

      {plan && (
        <div className="mt-4">
          <h2 className="font-bold">Shopping Plan</h2>
          <ul>
            {Object.entries(plan).map(([shop, items]) => (
              <li key={shop} className="mt-2">
                <strong>{shop}</strong>
                <ul>
                  {items.map((i, idx) => (
                    <li key={idx}>
                      {i.item} - ${i.price}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total: ${total.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
