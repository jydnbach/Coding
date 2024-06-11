export async function fetchMeals() {
  const res = await fetch('http://localhost:3000/meals');
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch meals');
  }
  return data;
}

export async function fetchOrders() {
  const res = await fetch('http://localhost:3000/orders');
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch orders');
  }

  return data;
}
