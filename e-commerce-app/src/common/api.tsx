export type productInfo = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}[];

export async function fetchRequest<T>(endpoint: string) {
  const url = new URL(endpoint, import.meta.env.VITE_BASE_API);
  const response = await fetch(url);
  return response.json() as Promise<T>;
}
