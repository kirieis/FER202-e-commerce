import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';
import { createClient as createServerClient } from './server';

export function mapDbProductToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand || undefined,
    subTitle: row.sub_title || '',
    desc: row.description || '',
    price: Number(row.price),
    oldPrice: Number(row.old_price || row.price),
    studentPrice: Number(row.student_price || row.price),
    category: row.category,
    discountBadge: row.discount_badge || '',
    imageUrl: row.image_url || undefined,
    galleryUrls: row.gallery_urls || [],
    imageType: row.image_type || undefined,
    rating: Number(row.rating || 5.0),
    reviewsCount: Number(row.reviews_count || 0),
    specs: row.specs || [],
    configurations: row.configurations || [],
    colors: row.colors || [],
    stockLocation: row.stock_location || 'Còn hàng tại kho KTX & Campus Hub',
    monthlyInstallment: Number(row.monthly_installment || 0),
  };
}

/**
 * Lấy danh sách sản phẩm (ưu tiên từ Supabase nếu có kết nối, fallback về PRODUCTS tĩnh)
 */
export async function getProducts(options?: {
  category?: string;
  brand?: string;
}): Promise<Product[]> {
  try {
    const supabase = await createServerClient();
    if (!supabase) {
      return fallbackFilter(PRODUCTS, options);
    }

    let query = supabase.from('products').select('*');
    if (options?.category && options.category !== 'all') {
      query = query.eq('category', options.category);
    }
    if (options?.brand && options.brand !== 'all') {
      query = query.eq('brand', options.brand);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return fallbackFilter(PRODUCTS, options);
    }

    return data.map(mapDbProductToProduct);
  } catch (err) {
    return fallbackFilter(PRODUCTS, options);
  }
}

/**
 * Lấy chi tiết 1 sản phẩm theo ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const supabase = await createServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!error && data) {
        return mapDbProductToProduct(data);
      }
    }
  } catch (err) {
    // Ignore and fallback
  }

  // Fallback
  const found = PRODUCTS.find((p) => p.id.toLowerCase() === id.toLowerCase());
  return found || null;
}

function fallbackFilter(
  items: Product[],
  options?: { category?: string; brand?: string }
): Product[] {
  let result = [...items];
  if (options?.category && options.category !== 'all') {
    result = result.filter((p) => p.category === options.category);
  }
  if (options?.brand && options.brand !== 'all') {
    result = result.filter((p) => p.brand === options.brand);
  }
  return result;
}
