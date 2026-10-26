import { NextResponse } from 'next/server';
import { createClient as createServerClient } from '@/lib/supabase/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      student,
      items,
      deliveryMethod,
      deliveryAddress,
      deliveryNote,
      paymentMethod,
      subtotal,
      discountCampaign,
      studentDiscount,
      shippingFee,
      finalTotal,
      orderCode,
    } = body;

    const supabase = await createServerClient();

    if (!supabase) {
      // If Supabase is not configured, return fallback
      return NextResponse.json({
        success: true,
        orderId: `OFFLINE-${Date.now()}`,
        message: 'Order created in local demo mode (Supabase not configured)',
      });
    }

    // Generate unique order ID in advance so we do NOT rely on .select('id')
    // which triggers PostgreSQL RLS SELECT permission checks on anonymous inserts.
    const orderId = crypto.randomUUID();

    // Try to get authenticated student if logged in
    let studentId: string | null = null;
    try {
      const { data: authData } = await supabase.auth.getUser();
      studentId = authData?.user?.id || null;
    } catch {
      // Unauthenticated guest checkout
    }

    const customerName = student?.fullName?.trim() || 'Khách hàng sinh viên';
    const customerPhone = student?.phone?.trim() || '0399344925';
    const customerEmail = student?.email?.trim() || 'khachhang@unigear.vn';
    const address = deliveryAddress?.trim() || 'KTX Khu B / Nhận tại Campus Hub';
    const totalAmount = Number(finalTotal) || Number(subtotal) || 0;
    const notePrefix = orderCode ? `[Mã đơn: ${orderCode}]` : '';
    const formattedDeliveryNote = [notePrefix, deliveryNote?.trim()].filter(Boolean).join(' - ');

    // Insert order into Supabase
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        student_id: studentId,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        university: student?.university || '',
        student_id_code: student?.studentId || '',
        delivery_method: deliveryMethod || 'ktx',
        delivery_address: address,
        delivery_note: formattedDeliveryNote,
        payment_method: paymentMethod || 'vietqr',
        subtotal: Number(subtotal) || totalAmount,
        discount_campaign: Number(discountCampaign) || 0,
        student_discount: Number(studentDiscount) || 0,
        shipping_fee: Number(shippingFee) || 0,
        final_total: totalAmount,
        status: 'confirmed',
      });

    if (orderError) {
      console.error('Supabase orders insert error:', orderError);
      return NextResponse.json(
        { success: false, error: orderError.message },
        { status: 500 }
      );
    }

    // Insert order items into Supabase
    if (items && Array.isArray(items) && items.length > 0) {
      const orderItems = items.map((item: any) => ({
        order_id: orderId,
        product_id: item.product?.id || item.productId || 'unknown',
        config_id: item.selectedConfigId || null,
        color_id: item.selectedColorId || null,
        quantity: Number(item.quantity) || 1,
        unit_price: Number(item.product?.price) || 0,
        student_price: Number(item.product?.studentPrice || item.product?.price) || 0,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) {
        console.error('Supabase order_items insert error:', itemsError);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: orderId,
      orderCode: orderCode || orderId.slice(0, 8).toUpperCase(),
    });
  } catch (error: any) {
    console.error('Orders route exception:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
