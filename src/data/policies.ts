export interface PolicyContent {
  slug: string;
  title: string;
  badge: string;
  lastUpdated: string;
  summary: string;
  sections: {
    heading: string;
    content: string[];
  }[];
}

export const POLICIES: Record<string, PolicyContent> = {
  'bao-hanh-doi-tra': {
    slug: 'bao-hanh-doi-tra',
    title: 'Chính Sách Bảo Hành & Đổi Trả',
    badge: 'Cam Kết Vàng UniGear',
    lastUpdated: '15/10/2026',
    summary:
      'UniGear cam kết quyền lợi tối đa cho sinh viên: Đổi mới 1 đổi 1 trong 30 ngày đầu tiên nếu máy phát sinh lỗi phần cứng từ nhà sản xuất, bảo hành chính hãng toàn diện 12 tháng tại các Hub Campus và trung tâm ủy quyền.',
    sections: [
      {
        heading: '1. Quy định 1 đổi 1 trong 30 ngày',
        content: [
          'Trong vòng 30 ngày kể từ ngày nhận thiết bị, nếu máy gặp lỗi phần cứng do nhà sản xuất (màn hình điểm chết từ 3 điểm trở lên, lỗi bàn phím, loa rè, lỗi bo mạch chủ, sạc không vào pin), UniGear cam kết đổi ngay máy mới tương đương nguyên seal hoặc hoàn tiền 100%.',
          'Thiết bị đổi trả cần giữ nguyên tem bảo hành UniGear, không cấn móp, biến dạng, vào nước hoặc có can thiệp sửa chữa từ bên thứ ba.',
        ],
      },
      {
        heading: '2. Bảo hành chính hãng 12 tháng',
        content: [
          'Tất cả sản phẩm Laptop, Tablet, Tai nghe và Phụ kiện phân phối tại UniGear đều là hàng chính hãng 100%, bảo hành 12 tháng theo đúng tiêu chuẩn nhà sản xuất (Apple, Dell, Lenovo, ASUS, HP, Sony, Logitech,...).',
          'Sinh viên có thể mang máy đến trực tiếp Trung tâm Bảo hành của Hãng hoặc mang đến UniGear Hub tại KTX ĐHQG và KTX Bách Khoa để kỹ thuật viên hỗ trợ gửi hãng miễn phí.',
        ],
      },
      {
        heading: '3. Hỗ trợ máy dùng tạm trong thời gian bảo hành',
        content: [
          'Hiểu rằng sinh viên cần máy để nộp đồ án và bài tập lớn, UniGear cung cấp dịch vụ cho mượn laptop dùng tạm hoàn toàn miễn phí trong suốt thời gian thiết bị của bạn được gửi hãng bảo hành.',
        ],
      },
    ],
  },

  'tra-gop': {
    slug: 'tra-gop',
    title: 'Quy Định & Điều Kiện Trả Góp Sinh Viên 0%',
    badge: 'Hỗ Trợ Tài Chính Học Tập',
    lastUpdated: '15/10/2026',
    summary:
      'Chương trình hỗ trợ sinh viên sở hữu máy xịn phục vụ học tập và đồ án với lãi suất 0%, không cần chứng minh thu nhập hay thẻ tín dụng ngân hàng.',
    sections: [
      {
        heading: '1. Điều kiện tham gia',
        content: [
          'Là sinh viên đang theo học tại các trường Đại học, Cao đẳng, Học viện tại Việt Nam.',
          'Có Căn cước công dân (CCCD) gắn chip còn hiệu lực và Thẻ sinh viên (thẻ nhựa hoặc ứng dụng VNeID / app sinh viên điện tử của trường).',
          'Độ tuổi từ 18 tuổi trở lên tại thời điểm đăng ký.',
        ],
      },
      {
        heading: '2. Kỳ hạn & Lãi suất',
        content: [
          'Kỳ hạn linh hoạt: 3 tháng, 6 tháng hoặc 12 tháng.',
          'Lãi suất: 0% trong suốt kỳ hạn trả góp. Phí dịch vụ hồ sơ sinh viên minh bạch, không phí ẩn.',
          'Số tiền trả trước: Chỉ từ 10% đến 30% giá trị máy, phần còn lại được chia đều cho từng tháng.',
        ],
      },
      {
        heading: '3. Quy trình xét duyệt trực tuyến',
        content: [
          'Bước 1: Chọn thiết bị trên UniGear và chọn hình thức "Trả góp 0%".',
          'Bước 2: Tải ảnh chụp 2 mặt CCCD và Thẻ sinh viên lên cổng thẩm định đối tác liên kết (Home Credit / Kredivo / Muadee).',
          'Bước 3: Nhận kết quả phê duyệt tự động trong khoảng 5 - 15 phút và ký hợp đồng điện tử qua OTP.',
        ],
      },
    ],
  },

  'giao-nhan': {
    slug: 'giao-nhan',
    title: 'Chính Sách Vận Chuyển & Giao Nhận KTX',
    badge: 'Giao Tận Cửa Phòng KTX',
    lastUpdated: '15/10/2026',
    summary:
      'UniGear cung cấp dịch vụ giao hàng chuyên biệt cho sinh viên: Giao tận phòng trọ, KTX, hỗ trợ đồng kiểm mở hộp test máy trực tiếp trước khi thanh toán.',
    sections: [
      {
        heading: '1. Phạm vi & Thời gian giao hàng',
        content: [
          'Giao siêu tốc 2 giờ: Áp dụng tại khu vực KTX Đại học Quốc gia TP.HCM, KTX Bách Khoa, KTX ĐH Sư Phạm Kỹ Thuật, KTX Mễ Trì, KTX Pháp Vân.',
          'Giao tiêu chuẩn 24 - 48 giờ: Áp dụng tại tất cả các quận huyện nội ngoại thành TP.HCM và Hà Nội.',
          'Giao toàn quốc: 2 - 4 ngày làm việc qua đối tác vận chuyển chuyên dụng có bảo hiểm 100% giá trị hàng hóa.',
        ],
      },
      {
        heading: '2. Đồng kiểm & Test máy tại chỗ',
        content: [
          'Khi nhận hàng, khách hàng có quyền mở kiện hàng kiểm tra ngoại quan máy, bật nguồn test màn hình, bàn phím và phụ kiện đi kèm.',
          'Kỹ thuật viên giao hàng UniGear hỗ trợ cài đặt Windows bản quyền, bộ Office sinh viên và phần mềm cơ bản hoàn toàn miễn phí ngay tại chỗ.',
        ],
      },
      {
        heading: '3. Phí vận chuyển',
        content: [
          'Miễn phí 100% phí giao hàng cho tất cả đơn hàng Laptop và Tablet.',
          'Đơn hàng phụ kiện từ 300.000đ được miễn phí vận chuyển. Đơn dưới 300.000đ áp dụng đồng giá ship 20.000đ toàn quốc.',
        ],
      },
    ],
  },

  'bao-mat': {
    slug: 'bao-mat',
    title: 'Chính Sách Bảo Mật & Bảo Vệ Dữ Liệu',
    badge: 'Bảo Vệ Thông Tin Sinh Viên',
    lastUpdated: '15/10/2026',
    summary:
      'UniGear cam kết bảo mật tuyệt đối thông tin sinh viên, ảnh thẻ sinh viên và lịch sử giao dịch theo Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân.',
    sections: [
      {
        heading: '1. Mục đích thu thập dữ liệu',
        content: [
          'UniGear chỉ thu thập thông tin cần thiết phục vụ việc mua hàng, gồm: Họ tên, Số điện thoại, Email sinh viên (.edu.vn), Địa chỉ nhận hàng (phòng KTX/trọ), và Ảnh thẻ sinh viên để áp dụng mã giảm giá 5%.',
          'Ảnh thẻ sinh viên sau khi đối chiếu xác thực sẽ được mã hóa và lưu trữ an toàn, chỉ phục vụ duy nhất mục đích xác nhận ưu đãi sinh viên.',
        ],
      },
      {
        heading: '2. Cam kết không chia sẻ cho bên thứ ba',
        content: [
          'UniGear cam kết không bán, không cho thuê, không chia sẻ thông tin cá nhân của bạn cho bất kỳ tổ chức quảng cáo hoặc telesale nào bên ngoài.',
          'Dữ liệu chỉ được cung cấp cho cơ quan chức năng có thẩm quyền khi có yêu cầu bằng văn bản theo đúng quy định pháp luật Việt Nam.',
        ],
      },
      {
        heading: '3. Quyền của chủ thể dữ liệu',
        content: [
          'Sinh viên có quyền yêu cầu tra cứu, chỉnh sửa hoặc xóa hoàn toàn thông tin tài khoản và ảnh thẻ sinh viên khỏi hệ thống UniGear bất kỳ lúc nào bằng cách gửi email tới hotro@unigear.vn hoặc liên hệ hotline 1800 6868.',
        ],
      },
    ],
  },

  'dieu-khoan': {
    slug: 'dieu-khoan',
    title: 'Điều Khoản Sử Dụng Dịch Vụ UniGear',
    badge: 'Quy Ước Pháp Lý Minh Bạch',
    lastUpdated: '15/10/2026',
    summary:
      'Các điều khoản quy định quyền lợi, nghĩa vụ của khách hàng và UniGear khi thực hiện giao dịch mua bán, trả góp và thu cũ đổi mới thiết bị công nghệ.',
    sections: [
      {
        heading: '1. Tài khoản & Xác thực thẻ sinh viên',
        content: [
          'Mỗi sinh viên được cấp 01 tài khoản xác thực tương ứng với 01 mã số sinh viên (MSSV) hợp lệ.',
          'Mức giảm giá độc quyền 5% Thẻ sinh viên áp dụng tối đa cho 02 thiết bị chính (Laptop/Tablet) trong 01 năm học để tránh hành vi trục lợi thương mại.',
        ],
      },
      {
        heading: '2. Giá cả & Hóa đơn VAT',
        content: [
          'Tất cả giá niêm yết trên website UniGear.vn đã bao gồm thuế Giá trị gia tăng (VAT 10% hoặc 8% theo quy định hiện hành).',
          'UniGear xuất hóa đơn điện tử hợp lệ gửi về email của khách hàng ngay sau khi đơn hàng được giao thành công.',
        ],
      },
      {
        heading: '3. Giới hạn trách nhiệm',
        content: [
          'UniGear chịu trách nhiệm bảo hành chất lượng sản phẩm chính hãng. UniGear không chịu trách nhiệm đối với dữ liệu cá nhân lưu trên máy của khách hàng khi gửi bảo hành; khuyến nghị quý khách sao lưu dữ liệu trước khi bàn giao máy.',
        ],
      },
    ],
  },

  'quy-che': {
    slug: 'quy-che',
    title: 'Quy Chế Hoạt Động Sàn Giao Dịch TMĐT UniGear',
    badge: 'Đã Thông Báo Bộ Công Thương',
    lastUpdated: '15/10/2026',
    summary:
      'Quy chế hoạt động chính thức của Sàn thương mại điện tử UniGear.vn theo quy định của Nghị định 52/2013/NĐ-CP và Nghị định 85/2021/NĐ-CP của Chính phủ về Thương mại điện tử.',
    sections: [
      {
        heading: '1. Nguyên tắc hoạt động',
        content: [
          'Website thương mại điện tử UniGear.vn do CÔNG TY CỔ PHẦN CÔNG NGHỆ SINH VIÊN UNIGEAR sở hữu và vận hành.',
          'Hoạt động mua bán trên website được thực hiện công khai, minh bạch, đảm bảo quyền lợi người tiêu dùng theo quy định của pháp luật Việt Nam.',
        ],
      },
      {
        heading: '2. Thông tin pháp lý doanh nghiệp',
        content: [
          'Tên công ty: CÔNG TY CỔ PHẦN CÔNG NGHỆ SINH VIÊN UNIGEAR',
          'Mã số doanh nghiệp / MST: 0110293847 do Sở Kế hoạch và Đầu tư cấp.',
          'Trụ sở Hub 1: Đường Tạ Quang Bửu, Phường Đông Hòa, TP. Dĩ An, Bình Dương (KTX Khu B ĐHQG-HCM).',
          'Trụ sở Hub 2: Số 1 Đại Cồ Việt, Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội (Campus ĐH Bách Khoa).',
          'Đại diện pháp luật: Nguyễn Nam Phong - Giám đốc Điều hành.',
          'Hotline hỗ trợ sinh viên: 1800 6868 · Email: hotro@unigear.vn',
        ],
      },
      {
        heading: '3. Quy trình giải quyết khiếu nại',
        content: [
          'Bước 1: Khách hàng phản ánh qua hotline 1800 6868 hoặc gửi email khiếu nại về hotro@unigear.vn.',
          'Bước 2: Bộ phận Chăm sóc Khách hàng UniGear tiếp nhận và phản hồi phương án xử lý trong vòng tối đa 24 giờ làm việc.',
          'Bước 3: Thực hiện đổi trả, hoàn tiền hoặc cử kỹ thuật viên xử lý tận phòng KTX cho khách hàng.',
        ],
      },
    ],
  },
};
