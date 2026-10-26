export type ProductCategory = 'all' | 'laptop' | 'tablet' | 'audio' | 'accessory';

export interface ProductConfig {
  id: string;
  label: string;
  note: string;
  price: number;
  studentPrice: number;
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand?: string;
  subTitle: string;
  desc: string;
  price: number;
  oldPrice: number;
  studentPrice: number;
  category: ProductCategory;
  discountBadge: string;
  imageUrl?: string;
  galleryUrls?: string[];
  imageType?: 'nova14' | 'nova15' | 'note11' | 'pulse' | 'keyd' | 'cube' | 'dot' | 'charger';
  rating?: number;
  reviewsCount?: number;
  specs: ProductSpec[];
  configurations: ProductConfig[];
  colors: ProductColor[];
  stockLocation: string;
  monthlyInstallment: number;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedConfigId: string;
  selectedColorId: string;
  quantity: number;
}

export interface StudentProfile {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  studentId: string;
  isVerified: boolean;
  idCardImage?: string;
  avatarUrl?: string;
}

export interface Order {
  id: string;
  student: StudentProfile;
  items: CartItem[];
  deliveryMethod: 'ktx' | 'campus_hub';
  deliveryAddress: string;
  deliveryNote: string;
  paymentMethod: 'installment' | 'vietqr' | 'cod';
  subtotal: number;
  discountCampaign: number;
  studentDiscount: number;
  shippingFee: number;
  finalTotal: number;
  createdAt: string;
}
