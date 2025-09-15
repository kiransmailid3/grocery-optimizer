import stores from "../../data/stores.json";

export default function handler(req, res) {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "No items provided" });
  }

  let plan = [];
  let totalCost = 0;

  items.forEach((item) => {
    let bestShop = null;
    let bestPrice = Infinity;

    stores.forEach((shop) => {
      if (shop.items[item] && shop.items[item] < bestPrice) {
        bestPrice = shop.items[item];
        bestShop = shop.name;
      }
    });

    if (bestShop) {
      plan.push({ item, shop: bestShop, price: bestPrice });
      totalCost += bestPrice;
    } else {
      plan.push({ item, shop: "Not available", price: 0 });
    }
  });

  // group items by shop
  let grouped = {};
  plan.forEach(({ item, shop, price }) => {
    if (!grouped[shop]) grouped[shop] = [];
    grouped[shop].push({ item, price });
  });

  res.status(200).json({ plan: grouped, totalCost });
}
