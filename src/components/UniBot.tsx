'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  ShoppingBag,
  ExternalLink,
  Loader2,
  ChevronDown,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  products?: Product[];
  suggestedFollowUps?: string[];
  timestamp: number;
}

const INITIAL_SUGGESTIONS = [
  '💻 Laptop IT đồ án < 20 triệu',
  '🎨 Tablet ghi chép & vẽ mỹ thuật',
  '🎧 Tai nghe chống ồn học KTX < 2tr',
  '⚡ Macbook mỏng nhẹ pin trâu 18h',
  '🎓 Hướng dẫn giảm 5% thẻ sinh viên',
  '🔄 Thu cũ đổi mới trợ giá 500k',
];

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `Chào bạn! Mình là **UniBot** – Trợ lý AI Sinh Viên của UniGear 🎓.

Mình có thể hỗ trợ bạn:
• Tìm thiết bị đúng ngành học (IT, Đồ họa, Kinh tế, Y Dược...)
• Lọc theo ngân sách & so sánh giá ưu đãi sinh viên (-5%)
• Tư vấn trả góp 0% duyệt online và thu cũ đổi mới trợ giá 500k

Bạn đang cần tìm thiết bị gì hôm nay?`,
  suggestedFollowUps: INITIAL_SUGGESTIONS,
  timestamp: Date.now(),
};

export const UniBot: React.FC = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadPrompt, setHasUnreadPrompt] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnreadPrompt(false);
      // Auto focus input when opened
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Handle send message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Lỗi kết nối máy chủ');
      }

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Xin lỗi bạn, mình chưa rõ ý của bạn. Bạn hãy thử đặt lại câu hỏi nhé!',
        products: data.products || [],
        suggestedFollowUps: data.suggestedFollowUps || [],
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          '⚠️ Kết nối tạm thời gián đoạn. Bạn vui lòng kiểm tra lại mạng hoặc thử lại sau giây lát nhé!',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([WELCOME_MESSAGE]);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleViewDetail = (productId: string) => {
    setIsOpen(false);
    router.push(`/san-pham/${productId}`);
  };

  // Helper to render markdown-like formatting (bold & bullet points)
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold parsing **bold**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="text-[var(--tx)] font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <div key={idx} className="flex items-start gap-1.5 ml-2 my-0.5">
            <span className="text-[var(--pri)]">•</span>
            <span>{renderedLine}</span>
          </div>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-0.5">
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* 1. Floating Launcher Button & Tooltip Badge */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
        {/* Unread Prompt Bubble */}
        {!isOpen && hasUnreadPrompt && (
          <div className="mb-2 mr-1 animate-bounce">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[var(--card)] border border-[var(--pri)]/40 text-[var(--tx)] text-xs font-semibold px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-1.5 cursor-pointer hover:border-[var(--pri)] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--warm)]" />
              <span>Hỏi UniBot tìm máy ngay!</span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setHasUnreadPrompt(false);
                }}
                className="text-[var(--mu)] hover:text-[var(--tx)] ml-1 p-0.5 rounded-full"
                title="Đóng thông báo"
              >
                ×
              </span>
            </button>
          </div>
        )}

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Đóng cửa sổ UniBot' : 'Mở trợ lý AI UniBot'}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer relative group ${
            isOpen
              ? 'bg-[var(--surface)] text-[var(--tx)] border border-[var(--ln)] hover:rotate-90'
              : 'bg-[var(--pri)] text-white hover:scale-105 hover:bg-[var(--pri-h)] ring-4 ring-[var(--pri)]/25'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Bot className="w-6 h-6" />
              {/* Online Pulse Dot */}
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[var(--ok)] border-2 border-[var(--bg)]" />
            </>
          )}
        </button>
      </div>

      {/* 2. Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[580px] max-h-[calc(100vh-120px)] bg-[var(--card)] border border-[var(--ln)] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-[var(--ln)] bg-[var(--surface)]/90 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[var(--pri)]/20 text-[var(--pri)] flex items-center justify-center font-bold relative">
                <Bot className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--ok)] ring-2 ring-[var(--card)]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-extrabold text-[var(--tx)] leading-tight">
                    UniBot · Trợ Lý AI Sinh Viên
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--ok)]/15 text-[var(--ok)] font-semibold font-mono-code">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-[var(--mu)] leading-tight mt-0.5">
                  Tư vấn cấu hình đồ án &amp; giá -5% thẻ SV
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearHistory}
                aria-label="Xóa lịch sử chat"
                title="Làm mới đoạn chat"
                className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--mu)] hover:text-[var(--tx)] hover:bg-[var(--card)] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Thu nhỏ"
                title="Thu nhỏ"
                className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--mu)] hover:text-[var(--tx)] hover:bg-[var(--card)] transition-colors cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* Bubble */}
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-[var(--pri)] text-white rounded-br-xs font-medium'
                      : 'bg-[var(--surface)] text-[var(--tx)] border border-[var(--ln)] rounded-bl-xs'
                  }`}
                >
                  {renderFormattedText(msg.content)}
                </div>

                {/* Recommended Product Cards List */}
                {msg.products && msg.products.length > 0 && (
                  <div className="w-full mt-2.5 space-y-2">
                    {msg.products.map((p) => (
                      <div
                        key={p.id}
                        className="p-2.5 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] hover:border-[var(--pri)]/60 transition-all flex items-center gap-3 shadow-xs"
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-14 rounded-xl bg-[var(--card)] p-1 flex-shrink-0 flex items-center justify-center border border-[var(--ln)]">
                          <img
                            src={p.imageUrl || '/logo.svg'}
                            alt={p.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[var(--tx)] text-xs truncate">
                            {p.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-mono-code font-bold text-[var(--warm)] text-xs">
                              {p.studentPrice.toLocaleString('vi-VN')}đ
                            </span>
                            {p.discountBadge && (
                              <span className="text-[10px] bg-[var(--warm)]/15 text-[var(--warm)] px-1 py-0.2 rounded font-bold">
                                {p.discountBadge}
                              </span>
                            )}
                          </div>
                          {p.monthlyInstallment > 0 && (
                            <div className="text-[10px] text-[var(--mu)] truncate">
                              Trả góp từ {p.monthlyInstallment.toLocaleString('vi-VN')}đ/th
                            </div>
                          )}
                        </div>

                        {/* Card Action Buttons */}
                        <div className="flex flex-col gap-1 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => handleViewDetail(p.id)}
                            className="px-2.5 py-1 rounded-lg bg-[var(--card)] border border-[var(--ln)] hover:border-[var(--pri)] text-[var(--tx)] font-semibold text-[10px] flex items-center gap-1 cursor-pointer transition-all"
                            title="Xem chi tiết máy"
                          >
                            <span>Xem</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddToCart(p)}
                            className="px-2.5 py-1 rounded-lg bg-[var(--pri)] text-white hover:bg-[var(--pri-h)] font-semibold text-[10px] flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                            title="Thêm nhanh vào giỏ hàng"
                          >
                            <ShoppingBag className="w-2.5 h-2.5" />
                            <span>Giỏ</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested Follow-up Chips under assistant message */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                    {msg.suggestedFollowUps.map((chip, cIdx) => (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() => handleSendMessage(chip)}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--card)] border border-[var(--ln)] text-[var(--mu)] hover:text-[var(--tx)] hover:border-[var(--pri)] transition-all cursor-pointer shadow-xs text-left"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Thinking / Loading indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[var(--mu)] py-1">
                <div className="w-6 h-6 rounded-full bg-[var(--surface)] border border-[var(--ln)] flex items-center justify-center text-[var(--pri)]">
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pri)] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pri)] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pri)] animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px]">UniBot đang tìm kiếm...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 border-t border-[var(--ln)] bg-[var(--surface)]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Hỏi UniBot: ngành học, ngân sách, hãng..."
                aria-label="Nhập câu hỏi cho UniBot"
                disabled={isLoading}
                className="flex-1 px-3.5 py-2 rounded-full text-xs bg-[var(--card)] border border-[var(--ln)] text-[var(--tx)] placeholder:text-[var(--mu)] focus:outline-none focus:border-[var(--pri)] transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Gửi tin nhắn"
                className="w-8 h-8 rounded-full bg-[var(--pri)] text-white hover:bg-[var(--pri-h)] disabled:opacity-40 disabled:hover:bg-[var(--pri)] flex items-center justify-center transition-all cursor-pointer flex-shrink-0 shadow-md"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </form>
            <div className="text-[10px] text-center text-[var(--mu)] mt-1.5">
              Trợ lý công nghệ sinh viên · Giảm 5% mọi đơn hàng
            </div>
          </div>
        </div>
      )}
    </>
  );
};
