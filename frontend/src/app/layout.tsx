import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elite Technology | Nền Tảng E-Commerce Công Nghệ & Campus Lifestyle",
  description: "Khám phá các sản phẩm công nghệ cao cấp, laptop, tai nghe, smartwatch với ưu đãi độc quyền sinh viên. Giao siêu tốc trong khuôn viên trường.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${plusJakartaSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-surface text-on-surface">
        {children}
      </body>
    </html>
  );
}
