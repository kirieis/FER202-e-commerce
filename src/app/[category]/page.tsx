import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/supabase/products';
import { CategoryCatalog } from '@/views/CategoryCatalog';

const CATEGORY_MAP: Record<string, { title: string; subtitle: string }> = {
  laptop: {
    title: 'Laptop Sinh Viên Đồ Án & IT',
    subtitle: 'Tuyển chọn laptop mỏng nhẹ, pin trâu và cấu hình đồ họa mạnh mẽ tối ưu cho đồ án kỹ thuật, lập trình và kinh tế với mức trợ giá đặc quyền cho sinh viên.',
  },
  tablet: {
    title: 'Tablet & Bút Vẽ Cảm Ứng',
    subtitle: 'Máy tính bảng phục vụ ghi chú bài giảng, đọc tài liệu PDF và phác thảo thiết kế mỹ thuật với màn hình sắc nét và thời lượng pin cả ngày.',
  },
  audio: {
    title: 'Tai Nghe Chống Ồn & Loa',
    subtitle: 'Giải pháp âm thanh chống ồn chủ động (ANC) giúp bạn tập trung học tập tại thư viện, quán cafe và không gian học chung KTX.',
  },
  accessory: {
    title: 'Phụ Kiện Công Nghệ Sinh Viên',
    subtitle: 'Củ sạc GaN siêu nhanh, bàn phím cơ, chuột công thái học và hub chuyển đổi bền bỉ phục vụ nhu cầu học tập và làm việc liên tục.',
  },
};

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const info = CATEGORY_MAP[category];

  if (!info) {
    return { title: 'Danh mục thiết bị' };
  }

  const canonicalUrl = `https://unigear.vn/${category}`;

  return {
    title: info.title,
    description: `${info.subtitle} Hỗ trợ trả góp 0%, đổi mới 30 ngày và giao tận KTX.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${info.title} · UniGear`,
      description: info.subtitle,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: '/logo.svg',
          width: 1200,
          height: 630,
          alt: `${info.title} · UniGear`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${info.title} · UniGear`,
      description: info.subtitle,
      images: ['/logo.svg'],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const info = CATEGORY_MAP[category];

  if (!info) {
    notFound();
  }

  const products = await getProducts();
  const categoryProducts = products.filter((p) => p.category === category);

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
        name: info.title,
        item: `https://unigear.vn/${category}`,
      },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: info.title,
    description: info.subtitle,
    numberOfItems: categoryProducts.length,
    itemListElement: categoryProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.desc,
        image: `https://unigear.vn${product.imageUrl}`,
        url: `https://unigear.vn/san-pham/${product.id}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'VND',
          price: product.price,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <CategoryCatalog
        category={category}
        categoryTitle={info.title}
        categorySubtitle={info.subtitle}
        products={products}
      />
    </>
  );
}
