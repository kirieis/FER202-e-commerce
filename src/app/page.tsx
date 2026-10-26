import { getProducts } from '@/lib/supabase/products';
import { Storefront } from '@/views/Storefront';

export const revalidate = 60; // ISR cache 60 seconds

export default async function HomePage() {
  const products = await getProducts();

  return <Storefront products={products} />;
}
