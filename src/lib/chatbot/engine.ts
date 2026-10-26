import { Product, ProductCategory } from '@/types';
import { PRODUCTS } from '@/data/products';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  products?: Product[];
  suggestedFollowUps?: string[];
  timestamp: number;
}

export interface ChatBotResponse {
  reply: string;
  products: Product[];
  suggestedFollowUps: string[];
}

/**
 * Normalizes Vietnamese string for robust accent-insensitive and lowercase matching
 */
function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim();
}

/**
 * Extracts target budget from text (e.g. "dưới 20 triệu", "15-20tr", "< 10tr")
 */
function parseBudget(text: string): { min?: number; max?: number } {
  const norm = normalizeText(text);

  // "< 15tr", "duoi 15 trieu", "tam 15tr"
  const underMatch = norm.match(/(?:duoi|nho hon|<|toi da|khoang|tam|duoi muc)\s*(\d+(?:[.,]\d+)?)\s*(?:tr|trieu|m)?/);
  if (underMatch) {
    const val = parseFloat(underMatch[1].replace(',', '.'));
    if (val < 100) {
      return { max: val * 1_000_000 };
    }
    return { max: val };
  }

  // "15 - 20 trieu", "15 den 20tr"
  const rangeMatch = norm.match(/(\d+(?:[.,]\d+)?)\s*(?:-|den|toi)\s*(\d+(?:[.,]\d+)?)\s*(?:tr|trieu|m)?/);
  if (rangeMatch) {
    const minVal = parseFloat(rangeMatch[1].replace(',', '.'));
    const maxVal = parseFloat(rangeMatch[2].replace(',', '.'));
    return {
      min: minVal < 100 ? minVal * 1_000_000 : minVal,
      max: maxVal < 100 ? maxVal * 1_000_000 : maxVal,
    };
  }

  // "tren 20 trieu", "> 20tr"
  const aboveMatch = norm.match(/(?:tren|lon hon|>|tu)\s*(\d+(?:[.,]\d+)?)\s*(?:tr|trieu|m)?/);
  if (aboveMatch) {
    const val = parseFloat(aboveMatch[1].replace(',', '.'));
    return { min: val < 100 ? val * 1_000_000 : val };
  }

  return {};
}

/**
 * Intelligent UniBot Query Processor
 */
export function processChatQuery(userQuery: string, catalog: Product[] = PRODUCTS): ChatBotResponse {
  const norm = normalizeText(userQuery);
  const budget = parseBudget(userQuery);

  const hasProductIntent =
    norm.includes('tim') ||
    norm.includes('mua') ||
    norm.includes('can mua') ||
    norm.includes('tu van') ||
    norm.includes('laptop') ||
    norm.includes('tablet') ||
    norm.includes('tai nghe') ||
    norm.includes('loa') ||
    norm.includes('sac') ||
    norm.includes('ban phim') ||
    norm.includes('chuot') ||
    norm.includes('ipad') ||
    norm.includes('macbook') ||
    Boolean(budget.max || budget.min);

  // 1. FAQ & Policy inquiries (only when not searching for specific products)
  if (!hasProductIntent) {
    if (
      norm.includes('the sinh vien') ||
      norm.includes('giam 5%') ||
      norm.includes('uu dai sv') ||
      norm.includes('xac thuc the') ||
      norm.includes('duyet the')
    ) {
      return {
        reply: `🎓 **Chính sách Đặc Quyền Thẻ Sinh Viên tại UniGear:**\n\n• **Giảm thêm trực tiếp 5%** trên toàn bộ hóa đơn cho mọi thiết bị (áp dụng đồng thời cùng khuyến mãi hãng).\n• **Cách xác thực cực nhanh:**\n  1. Đăng nhập qua **Google SSO** bằng email sinh viên (\`@edu.vn\`) để tự động duyệt ngay lập tức!\n  2. Hoặc tải lên ảnh chụp Thẻ Sinh Viên mặt trước, hệ thống AI OCR sẽ duyệt tự động trong 60 giây.\n• Bạn có thể vào mục **"Xác thực"** trên thanh menu để kích hoạt ngay nhé!`,
        products: catalog.slice(0, 2),
        suggestedFollowUps: [
          'Đăng nhập Google SSO thế nào?',
          'Có được trả góp 0% không?',
          'Tìm laptop đồ án IT giảm 5%',
        ],
      };
    }

    if (norm.includes('tra gop') || norm.includes('lai suat') || norm.includes('tra gop 0%') || norm.includes('thu tuc tra gop')) {
      return {
        reply: `💳 **Chính sách Trả Góp 0% Sinh Viên tại UniGear:**\n\n• **Lãi suất:** 0% lãi suất với kỳ hạn linh hoạt 6 - 12 tháng.\n• **Đối tượng:** Sinh viên đang theo học tại các trường ĐH/CĐ trên toàn quốc.\n• **Thủ tục đơn giản:** Chỉ cần CCCD gắn chip + Thẻ Sinh Viên (hoặc ứng dụng VNeID).\n• **Không cần chứng minh thu nhập:** Duyệt hồ sơ online trong 15 phút, nhận máy ngay tại Hub trường hoặc KTX!`,
        products: catalog.filter((p) => p.monthlyInstallment && p.monthlyInstallment > 0).slice(0, 3),
        suggestedFollowUps: [
          'Mẫu nào trả góp dưới 1 triệu/tháng?',
          'Thu cũ đổi mới trợ giá 500k',
          'Giao máy tận KTX mất bao lâu?',
        ],
      };
    }

    if (norm.includes('thu cu') || norm.includes('doi moi') || norm.includes('trade in') || norm.includes('len doi')) {
      return {
        reply: `🔄 **Chương trình Thu Cũ Đổi Mới (Trade-in) UniGear:**\n\n• **Trợ giá độc quyền:** Tặng thêm **500.000đ** vào giá trị thu đổi dành riêng cho sinh viên.\n• **Thu mua mọi tình trạng:** Máy cũ, trầy xước, chai pin hoặc hỏng nhẹ đều được định giá minh bạch qua AI.\n• **Quy trình:** Mang máy đến Campus Hub UniGear hoặc nhân viên đến tận KTX thẩm định và trừ trực tiếp vào đơn mua máy mới!`,
        products: catalog.filter((p) => p.category === 'laptop').slice(0, 3),
        suggestedFollowUps: [
          'Cần laptop lập trình dưới 20 triệu',
          'Có ship máy về KTX không?',
          'Chính sách bảo hành 1 đổi 1',
        ],
      };
    }

    if (norm.includes('bao hanh') || norm.includes('doi tra') || norm.includes('loi 1 doi 1')) {
      return {
        reply: `🛡️ **Chính sách Bảo Hành & Đổi Trả UniGear:**\n\n• **1 đổi 1 trong 30 ngày:** Nếu máy phát sinh lỗi phần cứng từ nhà sản xuất, đổi ngay máy mới nguyên seal.\n• **Bảo hành chính hãng 12 - 24 tháng:** Tại tất cả trung tâm bảo hành ủy quyền toàn quốc.\n• **Hỗ trợ máy mượn đồ án:** UniGear cho mượn máy tương đương dùng tạm trong thời gian máy đi bảo hành để không gián đoạn việc học thi!`,
        products: [],
        suggestedFollowUps: [
          'Xem laptop bảo hành 2 năm',
          'Ưu đãi thẻ sinh viên',
          'Tìm laptop pin trâu mỏng nhẹ',
        ],
      };
    }

    if (norm.includes('giao hang') || norm.includes('ship') || norm.includes('giao den ktx') || norm.includes('dia chi hub')) {
      return {
        reply: `🚚 **Chính sách Giao Nhận Siêu Tốc UniGear:**\n\n• **Giao tận phòng KTX:** Miễn phí vận chuyển đến tất cả ký túc xá (ĐHQG TP.HCM, Bách Khoa, NEU, FPT, Sư phạm...).\n• **Giao nhanh 2H:** Nhận tại Campus Hub đặt ngay trong khuôn viên trường đại học.\n• **Đồng kiểm khi nhận:** Bạn được mở hộp, kiểm tra máy và test trước khi thanh toán!`,
        products: [],
        suggestedFollowUps: [
          'Phương thức thanh toán thế nào?',
          'Tư vấn laptop dưới 15 triệu',
          'Tìm tai nghe chống ồn học KTX',
        ],
      };
    }
  }

  // 2. Specialty & Major matching
  let matchedCategory: ProductCategory | 'all' = 'all';
  let matchedMajor = '';
  let candidatePool = [...catalog];

  const isIT = norm.includes('it') || norm.includes('cntt') || norm.includes('code') || norm.includes('lap trinh') || norm.includes('docker') || norm.includes('khoa hoc may tinh');
  const isDesign = norm.includes('do hoa') || norm.includes('thiet ke') || norm.includes('kien truc') || norm.includes('render') || norm.includes('3d') || norm.includes('photoshop') || norm.includes('figma');
  const isBusiness = norm.includes('kinh te') || norm.includes('marketing') || norm.includes('ngoai thuong') || norm.includes('van phong') || norm.includes('mong nhe') || norm.includes('pin trau');
  const isMed = norm.includes('y duoc') || norm.includes('y khoa') || norm.includes('ghi chep') || norm.includes('viet but') || norm.includes('slide') || norm.includes('ve');
  const isAudio = norm.includes('tai nghe') || norm.includes('am thanh') || norm.includes('chong on') || norm.includes('loa') || norm.includes('anc') || norm.includes('headphone');
  const isAccessory = norm.includes('sac') || norm.includes('phu kien') || norm.includes('ban phim') || norm.includes('chuot') || norm.includes('hub') || norm.includes('cap') || norm.includes('gan');

  if (isAudio) {
    matchedCategory = 'audio';
    candidatePool = candidatePool.filter((p) => p.category === 'audio');
  } else if (isAccessory) {
    matchedCategory = 'accessory';
    candidatePool = candidatePool.filter((p) => p.category === 'accessory');
  } else if (isMed && !norm.includes('laptop')) {
    matchedCategory = 'tablet';
    candidatePool = candidatePool.filter((p) => p.category === 'tablet');
  } else if (isIT || isDesign || isBusiness || norm.includes('laptop') || norm.includes('may tinh')) {
    matchedCategory = 'laptop';
    candidatePool = candidatePool.filter((p) => p.category === 'laptop');
  }

  // Brand filtering
  const brands = ['Apple', 'Dell', 'Asus', 'Lenovo', 'Acer', 'HP', 'Sony', 'JBL', 'Marshall', 'Keychron', 'Logitech', 'Ugreen', 'Anker', 'Baseus'];
  const mentionedBrand = brands.find((b) => norm.includes(normalizeText(b)));
  if (mentionedBrand) {
    const brandFiltered = candidatePool.filter((p) => p.brand?.toLowerCase() === mentionedBrand.toLowerCase());
    if (brandFiltered.length > 0) {
      candidatePool = brandFiltered;
    }
  }

  // Budget filtering
  if (budget.max) {
    const budgetFiltered = candidatePool.filter((p) => p.studentPrice <= budget.max! * 1.05);
    if (budgetFiltered.length > 0) {
      candidatePool = budgetFiltered;
    }
  }
  if (budget.min) {
    const budgetFiltered = candidatePool.filter((p) => p.studentPrice >= budget.min! * 0.9);
    if (budgetFiltered.length > 0) {
      candidatePool = budgetFiltered;
    }
  }

  // Major specific ranking
  if (isIT) {
    matchedMajor = 'Công nghệ Thông tin / Lập trình';
    candidatePool.sort((a, b) => {
      const aScore = (a.desc + a.name + (a.specs?.map((s) => s.value).join(' ') || '')).toLowerCase().includes('16gb') || a.brand === 'Apple' ? 2 : 1;
      const bScore = (b.desc + b.name + (b.specs?.map((s) => s.value).join(' ') || '')).toLowerCase().includes('16gb') || b.brand === 'Apple' ? 2 : 1;
      return bScore - aScore;
    });
  } else if (isDesign) {
    matchedMajor = 'Thiết kế Đồ họa / Kiến trúc';
    candidatePool.sort((a, b) => {
      const aGpu = (a.desc + (a.specs?.map((s) => s.value).join(' ') || '')).toLowerCase().includes('rtx') ? 3 : 1;
      const bGpu = (b.desc + (b.specs?.map((s) => s.value).join(' ') || '')).toLowerCase().includes('rtx') ? 3 : 1;
      return bGpu - aGpu;
    });
  } else if (isBusiness) {
    matchedMajor = 'Kinh tế / Quản trị & Di chuyển nhiều';
    candidatePool.sort((a, b) => {
      const aWeight = a.name.includes('Air') || a.name.includes('Gram') || a.name.includes('Slim') ? 3 : 1;
      const bWeight = b.name.includes('Air') || b.name.includes('Gram') || b.name.includes('Slim') ? 3 : 1;
      return bWeight - aWeight;
    });
  } else if (isMed) {
    matchedMajor = 'Y Dược & Ghi chép bài giảng';
  }

  // Pick top 3-4 recommendations
  const topProducts = candidatePool.slice(0, 3);

  // Generate advisory response text
  let reply = '';
  if (topProducts.length > 0) {
    if (matchedMajor) {
      reply += `🎯 **Gợi ý thiết bị tối ưu cho ngành ${matchedMajor}:**\n\n`;
    } else if (mentionedBrand) {
      reply += `✨ **Các thiết bị chính hãng ${mentionedBrand} nổi bật dành cho sinh viên:**\n\n`;
    } else if (budget.max) {
      reply += `💰 **Các lựa chọn hàng đầu trong ngân sách dưới ${(budget.max / 1_000_000).toFixed(0)} triệu đồng:**\n\n`;
    } else {
      reply += `💡 **UniBot gợi ý cho bạn các thiết bị phù hợp nhất:**\n\n`;
    }

    topProducts.forEach((p, idx) => {
      const studentPriceStr = p.studentPrice.toLocaleString('vi-VN') + 'đ';
      const monthlyStr = p.monthlyInstallment ? ` (hoặc trả góp chỉ từ ${p.monthlyInstallment.toLocaleString('vi-VN')}đ/tháng)` : '';
      reply += `**${idx + 1}. ${p.name}**\n`;
      reply += `• Giá ưu đãi sinh viên: **${studentPriceStr}**${p.discountBadge ? ` (${p.discountBadge})` : ''}${monthlyStr}\n`;
      reply += `• Điểm mạnh: ${p.subTitle || p.desc.slice(0, 90) + '...'}\n\n`;
    });

    reply += `🎁 *Đừng quên: Khi xác thực thẻ sinh viên hoặc đăng nhập bằng email trường (@edu.vn), bạn được giảm trực tiếp thêm 5% trên mỗi sản phẩm và hỗ trợ trả góp 0%!*`;
  } else {
    reply = `Xin chào bạn! Mình là UniBot. Mình chưa tìm thấy sản phẩm chính xác khớp với tiêu chí "${userQuery}". Bạn có thể thử tìm theo các gợi ý bên dưới hoặc nói rõ hơn về ngành học và ngân sách của bạn nhé!`;
  }

  // Follow-up prompt pills
  const followUps: string[] = [];
  if (matchedCategory === 'laptop') {
    followUps.push('Xem phụ kiện sạc nhanh & hub');
    followUps.push('Thủ tục trả góp 0% cho sinh viên');
    followUps.push('So sánh chi tiết cấu hình');
  } else if (matchedCategory === 'tablet') {
    followUps.push('Bút cảm ứng nào tương thích?');
    followUps.push('Xem thêm tai nghe chống ồn');
    followUps.push('Cách nhận ưu đãi sinh viên -5%');
  } else if (matchedCategory === 'audio') {
    followUps.push('Mẫu nào chống ồn học KTX tốt nhất?');
    followUps.push('Chính sách 1 đổi 1 30 ngày');
  } else {
    followUps.push('Laptop IT dưới 20 triệu');
    followUps.push('Tablet vẽ & ghi chép Y Dược');
    followUps.push('Hướng dẫn giảm 5% thẻ sinh viên');
  }

  return {
    reply,
    products: topProducts,
    suggestedFollowUps: followUps,
  };
}
