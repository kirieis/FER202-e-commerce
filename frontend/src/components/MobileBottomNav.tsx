import Link from "next/link";
import { Home, Grid, ShoppingBag, User } from "lucide-react";

interface MobileBottomNavProps {
  activeTab?: "home" | "products" | "cart" | "portal";
  cartCount?: number;
}

export default function MobileBottomNav({ activeTab = "home", cartCount = 3 }: MobileBottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-surface/95 backdrop-blur-lg border-t border-outline-variant/40 z-50 px-2 py-1 flex items-center justify-around shadow-lg">
      <Link
        href="/"
        className={`flex flex-col items-center py-1 ${activeTab === "home" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"}`}
      >
        <Home className="w-6 h-6" />
        <span className="text-[10px]">Trang chủ</span>
      </Link>
      <Link
        href="/products"
        className={`flex flex-col items-center py-1 ${activeTab === "products" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"}`}
      >
        <Grid className="w-6 h-6" />
        <span className="text-[10px]">Sản phẩm</span>
      </Link>
      <Link
        href="/cart"
        className={`relative flex flex-col items-center py-1 ${activeTab === "cart" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"}`}
      >
        <ShoppingBag className="w-6 h-6" />
        <span className="absolute top-0 right-3 bg-secondary-container text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
        <span className="text-[10px]">Giỏ hàng</span>
      </Link>
      <Link
        href="/portal"
        className={`flex flex-col items-center py-1 ${activeTab === "portal" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"}`}
      >
        <User className="w-6 h-6" />
        <span className="text-[10px]">Cá nhân</span>
      </Link>
    </nav>
  );
}
