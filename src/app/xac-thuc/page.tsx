import { Metadata } from 'next';
import { StudentAuth } from '@/views/StudentAuth';

export const metadata: Metadata = {
  title: 'Xác thực Thẻ Sinh Viên (-5% toàn sàn) | UniGear',
  description: 'Đăng nhập tài khoản sinh viên và xác thực thẻ để kích hoạt ưu đãi trợ giá 5% cho toàn bộ sản phẩm.',
};

export default function StudentAuthPage() {
  return <StudentAuth />;
}
