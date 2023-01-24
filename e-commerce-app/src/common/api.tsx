export async function fetchRequest<T>(endpoint: string) {
  const url = new URL(endpoint, import.meta.env.VITE_BASE_API);
  const response = await fetch(url);
  return response.json() as Promise<T>;
}

export async function fetchCardData<T>(endpoint: string, id: number) {
  const url = new URL(`${endpoint}/${id}`, import.meta.env.VITE_BASE_API);
  const response = await fetch(url);
  return response.json() as Promise<T>;
}
