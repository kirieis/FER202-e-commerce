import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { POLICIES } from '@/data/policies';
import { ArrowLeft, ShieldCheck, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = POLICIES[slug];

  if (!policy) {
    return { title: 'Không tìm thấy chính sách' };
  }

  const canonicalUrl = `https://unigear.vn/chinh-sach/${policy.slug}`;

  return {
    title: `${policy.title} – UniGear`,
    description: policy.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${policy.title} | UniGear Sinh Viên`,
      description: policy.summary,
      url: canonicalUrl,
      type: 'article',
      images: ['/logo.svg'],
    },
  };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = POLICIES[slug];

  if (!policy) {
    notFound();
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
        name: 'Chính sách',
        item: 'https://unigear.vn/chinh-sach/bao-hanh-doi-tra',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: policy.title,
        item: `https://unigear.vn/chinh-sach/${policy.slug}`,
      },
    ],
  };

  const otherPolicies = Object.values(POLICIES).filter((p) => p.slug !== policy.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-8 py-10">
        {/* Top Back Nav */}
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--ln)] hover:border-[var(--pri)] hover:text-[var(--pri)] text-[var(--tx)] text-xs font-bold transition-all cursor-pointer shadow-sm group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[var(--mu)] group-hover:text-[var(--pri)] transition-colors" />
            <span>Về trang chủ UniGear</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--mu)]">
            <span>/</span>
            <span>Chính sách pháp lý</span>
            <span>/</span>
            <span className="text-[var(--tx)] truncate max-w-[200px] sm:max-w-none">{policy.title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Article */}
          <article className="lg:col-span-8 bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--pri)]/15 text-[var(--pri-h)] border border-[var(--pri)]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{policy.badge}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-[var(--mu)] font-mono-code bg-[var(--surface)] border border-[var(--ln)]">
                <Clock className="w-3.5 h-3.5" />
                <span>Cập nhật: {policy.lastUpdated}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--tx)] tracking-tight mb-4">
              {policy.title}
            </h1>

            <p className="text-sm sm:text-base text-[var(--tx)] font-medium bg-[var(--surface)] border border-[var(--ln)] rounded-2xl p-4 sm:p-5 leading-relaxed mb-8">
              {policy.summary}
            </p>

            <div className="space-y-8">
              {policy.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--tx)] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--pri)]" />
                    <span>{section.heading}</span>
                  </h2>
                  <div className="space-y-2.5 text-sm text-[var(--mu)] leading-relaxed pl-4 border-l-2 border-[var(--ln)]">
                    {section.content.map((p, pIdx) => (
                      <p key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--ok)] flex-shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Support Hotline Footer Inside Policy */}
            <div className="mt-12 pt-6 border-t border-[var(--ln)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[var(--mu)]">
              <div>
                Cần giải đáp chi tiết? Liên hệ Hotline miễn phí:{' '}
                <a href="tel:18006868" className="font-bold text-[var(--pri-h)] hover:underline">
                  1800 6868
                </a>
              </div>
              <div>
                Email hỗ trợ sinh viên:{' '}
                <a href="mailto:hotro@unigear.vn" className="font-bold text-[var(--tx)] hover:underline">
                  hotro@unigear.vn
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar: All Other Policies */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--ln)]">
                <FileText className="w-4 h-4 text-[var(--pri)]" />
                <h3 className="font-bold text-sm text-[var(--tx)]">Văn bản &amp; Chính sách khác</h3>
              </div>
              <nav className="space-y-2">
                {otherPolicies.map((op) => (
                  <Link
                    key={op.slug}
                    href={`/chinh-sach/${op.slug}`}
                    className="block p-3 rounded-2xl bg-[var(--surface)] hover:bg-[var(--pri)]/10 border border-[var(--ln)] hover:border-[var(--pri)] text-xs text-[var(--tx)] transition-all font-semibold"
                  >
                    <div className="text-xs text-[var(--mu)] font-mono-code mb-0.5">{op.badge}</div>
                    <div>{op.title}</div>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
