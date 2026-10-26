import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/supabase/products';
import { ProductDetail } from '@/views/ProductDetail';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm | UniGear',
    };
  }

  const formatPrice = product.studentPrice.toLocaleString('vi-VN') + 'đ';
  const canonicalUrl = `https://unigear.vn/san-pham/${product.id}`;

  return {
    title: `${product.name} – Giá sinh viên ${formatPrice}`,
    description: `${product.subTitle || product.name}. ${product.desc} Tặng kèm ưu đãi sinh viên -5%, trả góp 0% và giao tận KTX.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} · UniGear`,
      description: product.desc,
      url: canonicalUrl,
      type: 'article',
      images: product.imageUrl ? [{ url: product.imageUrl, alt: product.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} · UniGear`,
      description: product.desc,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Build schema.org Product JSON-LD
  const productJsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.imageUrl ? [`https://unigear.vn${product.imageUrl}`] : undefined,
    description: product.desc,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'UniGear',
    },
    offers: {
      '@type': 'Offer',
      url: `https://unigear.vn/san-pham/${product.id}`,
      priceCurrency: 'VND',
      price: product.studentPrice,
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'UniGear',
      },
    },
  };

  // Only include aggregateRating when genuine reviews exist (avoid misleading data per guidelines)
  if (product.rating && product.reviewsCount && product.reviewsCount > 0) {
    productJsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
      bestRating: '5',
      worstRating: '1',
    };
  }

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang chủ',
        item: 'https://unigear.vn',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name:
          product.category === 'laptop'
            ? 'Laptop'
            : product.category === 'tablet'
            ? 'Tablet'
            : product.category === 'audio'
            ? 'Tai nghe & Loa'
            : 'Phụ kiện',
        item: `https://unigear.vn/${product.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://unigear.vn/san-pham/${product.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  );
}
