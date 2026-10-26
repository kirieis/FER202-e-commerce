import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/supabase/products';
import { processChatQuery } from '@/lib/chatbot/engine';
import { PRODUCTS } from '@/data/products';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Thiếu nội dung câu hỏi (messages array required)' },
        { status: 400 }
      );
    }

    const latestMessage = messages[messages.length - 1]?.content || '';

    // Fetch latest catalog from Supabase if connected, otherwise fallback
    let catalog = PRODUCTS;
    try {
      catalog = await getProducts();
    } catch {
      // fallback
    }

    // 1. Check if GEMINI_API_KEY is configured for generative LLM intelligence
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      try {
        const topCatalogSummary = catalog.slice(0, 40).map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          price: p.studentPrice,
          desc: p.subTitle || p.desc,
        }));

        const systemPrompt = `Bạn là UniBot, trợ lý AI tư vấn thiết bị công nghệ chính thức của UniGear - nền tảng công nghệ dành cho sinh viên Việt Nam.
Thông tin cửa hàng UniGear:
- Giảm thêm trực tiếp 5% cho sinh viên (khi đăng nhập Google SSO @edu.vn hoặc tải thẻ sinh viên).
- Trả góp 0% lãi suất duyệt online 15 phút, kỳ hạn 6-12 tháng, không cần chứng minh thu nhập.
- Thu cũ đổi mới (Trade-in) trợ giá thêm 500.000đ cho sinh viên.
- Giao hàng miễn phí tận phòng KTX và Campus Hub trường đại học trong 2 giờ.
- Bảo hành chính hãng 1 đổi 1 trong 30 ngày.

Kho sản phẩm hiện tại:
${JSON.stringify(topCatalogSummary)}

Nhiệm vụ của bạn:
1. Trả lời thân thiện, hữu ích, xưng "UniBot" và gọi "bạn" hoặc "bạn sinh viên".
2. Nếu người dùng hỏi tìm mua laptop, tablet, tai nghe, phụ kiện, hãy tư vấn 2-3 sản phẩm phù hợp nhất với ngành học và túi tiền của họ.
3. Khi đề xuất sản phẩm nào từ danh mục trên, hãy nêu rõ tên máy và ghi kèm mã định danh theo cú pháp: [PRODUCT:id_san_pham].
Ví dụ: "Bạn nên tham khảo mẫu Apple MacBook Air M2 [PRODUCT:apple-macbook-air-m2-13-6]...".`;

        const modelName = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemPrompt}\n\nNgười dùng hỏi: ${latestMessage}` }],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawReply =
            geminiData?.candidates?.[0]?.content?.parts
              ?.map((p: any) => p.text || '')
              .join('')
              .trim() || '';

          if (rawReply) {
            // Extract [PRODUCT:id] tags
            const productIds: string[] = [];
            const regex = /\[PRODUCT:([a-zA-Z0-9_-]+)\]/g;
            let match;
            while ((match = regex.exec(rawReply)) !== null) {
              productIds.push(match[1]);
            }

            const cleanReply = rawReply.replace(/\[PRODUCT:[a-zA-Z0-9_-]+\]/g, '').trim();
            const matchedProducts = catalog.filter((p) => productIds.includes(p.id));

            return NextResponse.json({
              reply: cleanReply,
              products: matchedProducts.length > 0 ? matchedProducts : catalog.slice(0, 2),
              suggestedFollowUps: [
                'Xem thêm sản phẩm cùng tầm giá',
                'Thủ tục trả góp 0% sinh viên',
                'Cách nhận ưu đãi -5% thẻ SV',
              ],
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to local engine:', geminiErr);
      }
    }

    // 2. Built-in Smart Advisory Engine (No external API key needed, zero latency)
    const result = processChatQuery(latestMessage, catalog);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Lỗi xử lý câu hỏi' },
      { status: 500 }
    );
  }
}
