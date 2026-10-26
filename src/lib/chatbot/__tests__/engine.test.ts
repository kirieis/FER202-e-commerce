import { describe, it, expect } from 'vitest';
import { processChatQuery } from '../engine';
import { PRODUCTS } from '@/data/products';

describe('UniBot Engine Tests', () => {
  it('handles major-specific IT / coding query and recommends laptops', () => {
    const res = processChatQuery('mình học CNTT cần tìm laptop dưới 25 triệu', PRODUCTS);
    expect(res.products.length).toBeGreaterThan(0);
    expect(res.products.every((p) => p.category === 'laptop')).toBe(true);
    expect(res.reply).toContain('Công nghệ Thông tin');
  });

  it('handles design / graphics laptop query', () => {
    const res = processChatQuery('tìm máy làm đồ họa 3D render kiến trúc', PRODUCTS);
    expect(res.products.length).toBeGreaterThan(0);
    expect(res.reply).toContain('Đồ họa');
  });

  it('handles tablet query for medical and drawing', () => {
    const res = processChatQuery('có tablet nào ghi chép học Y Dược không shop', PRODUCTS);
    expect(res.products.length).toBeGreaterThan(0);
    expect(res.products.every((p) => p.category === 'tablet')).toBe(true);
  });

  it('handles noise cancelling headphones for KTX study under 3 million', () => {
    const res = processChatQuery('tìm tai nghe chống ồn học KTX dưới 3 triệu', PRODUCTS);
    expect(res.products.length).toBeGreaterThan(0);
    expect(res.products.every((p) => p.category === 'audio')).toBe(true);
  });

  it('handles brand specific query for Apple', () => {
    const res = processChatQuery('tư vấn mua macbook cho sinh viên', PRODUCTS);
    expect(res.products.length).toBeGreaterThan(0);
    expect(res.products.some((p) => p.brand === 'Apple')).toBe(true);
  });

  it('handles accessories like chargers and mechanical keyboards', () => {
    const res = processChatQuery('tìm sạc nhanh GaN hoặc bàn phím cơ', PRODUCTS);
    expect(res.products.length).toBeGreaterThan(0);
    expect(res.products.every((p) => p.category === 'accessory')).toBe(true);
  });

  it('answers student verification policy query with -5% discount guide', () => {
    const res = processChatQuery('ưu đãi thẻ sinh viên giảm 5% là sao', PRODUCTS);
    expect(res.reply).toContain('Giảm thêm trực tiếp 5%');
    expect(res.reply).toContain('Google SSO');
  });

  it('answers 0% installment policy query', () => {
    const res = processChatQuery('thủ tục trả góp 0% cho sinh viên thế nào', PRODUCTS);
    expect(res.reply).toContain('0% lãi suất');
    expect(res.reply).toContain('CCCD');
  });

  it('answers trade-in 500k query', () => {
    const res = processChatQuery('chương trình thu cũ đổi mới như thế nào', PRODUCTS);
    expect(res.reply).toContain('500.000đ');
  });
});
