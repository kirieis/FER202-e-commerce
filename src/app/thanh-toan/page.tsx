import { Metadata } from 'next';
import { Checkout } from '@/views/Checkout';

export const metadata: Metadata = {
  title: 'Thanh toán & Giao hàng KTX | UniGear',
  description: 'Xác nhận đơn hàng và chọn phương thức giao tận KTX hoặc nhận tại Hub trường.',
};

export default function CheckoutPage() {
  return <Checkout />;
}
