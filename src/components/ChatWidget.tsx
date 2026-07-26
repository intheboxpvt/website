import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import { matchIntent, isGreeting, GREETING_RESPONSE, getWhatsAppUrl } from "@/lib/chatKnowledge";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  isWhatsAppCta?: boolean;
  waKey?: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "bot",
  text: "Welcome to InTheBox.\n\nAsk me anything about our packaging, pricing, sustainability, or process. I am here to help!",
  timestamp: new Date(),
};

function formatText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    const rendered = parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part));
    return (
      <span key={i}>
        {rendered}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

const FALLBACK_RESPONSE =
  "I am not sure about that specific detail, but our packaging specialists can assist you.\n\nClick below to connect directly with us on WhatsApp.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, open]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  function addMessage(msg: Omit<Message, "id" | "timestamp">) {
    setMessages((prev) => [
      ...prev,
      { ...msg, id: Math.random().toString(36).slice(2), timestamp: new Date() },
    ]);
  }

  async function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput("");

    addMessage({ role: "user", text });
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 600 + Math.random() * 500));
    setIsTyping(false);

    if (isGreeting(text)) {
      addMessage({ role: "bot", text: GREETING_RESPONSE });
      return;
    }

    const match = matchIntent(text);

    if (!match) {
      addMessage({ role: "bot", text: FALLBACK_RESPONSE, isWhatsAppCta: true, waKey: "general" });
      return;
    }

    addMessage({ role: "bot", text: match.answer });

    if (match.followUp) {
      await new Promise((r) => setTimeout(r, 350));
      if (match.followUp.startsWith("whatsapp_cta:")) {
        const waKey = match.followUp.replace("whatsapp_cta:", "");
        addMessage({
          role: "bot",
          text: "Click below to chat with our team directly:",
          isWhatsAppCta: true,
          waKey,
        });
      } else {
        addMessage({ role: "bot", text: match.followUp });
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const suggestedQuestions = [
    "What products do you make?",
    "What is your MOQ?",
    "Tell me about sustainability",
    "How does the process work?",
  ];

  return (
    <>
      {/* Floating Trigger Button — Replaces itself when open */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 bg-[#1d0a27] border ${
          open ? "border-accent text-accent shadow-accent/20" : "border-white/15 text-white hover:border-accent/40"
        } px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 group`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <div className="relative flex items-center justify-center">
          {!open && (
            <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20"></div>
          )}
          <div className="relative flex items-center justify-center w-5 h-5">
            {open ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4 text-accent" />}
          </div>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider font-medium">
          {open ? "Close" : "Chat"}
        </span>
      </button>

      {/* Chat Drawer Window */}
      <div
        className={`fixed z-40 transition-all duration-300 ease-out
          bottom-[64px] right-3
          sm:bottom-[80px] sm:right-6
          w-[calc(100vw-24px)] max-w-[340px] sm:w-[340px]
          h-[440px] sm:h-[460px] max-h-[75vh]
          ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"}`}
      >
        <div className="bg-[#1d0a27] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-white/10 bg-[#15071d] flex-shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src="/assets/assistant-logo.png" alt="Assistant" className="w-5 h-5 object-contain" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">Assistant</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-white/50 text-[10px] font-mono">Online</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Button in Header */}
            <a
              href={getWhatsAppUrl("general")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 px-2.5 py-1.5 rounded-full transition-colors flex-shrink-0"
              title="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="font-mono text-[10px] font-medium hidden sm:inline">WhatsApp</span>
            </a>
          </div>

          {/* Messages Area with Scroll Isolation & Hidden Scrollbar */}
          <div
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex-1 overflow-y-auto overscroll-contain px-3.5 py-3 space-y-2.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-[#1d0a27] font-medium rounded-br-xs"
                      : "bg-white/5 border border-white/10 text-white/90 rounded-bl-xs"
                  }`}
                >
                  <p className="whitespace-pre-line">{formatText(msg.text)}</p>

                  {/* WhatsApp CTA */}
                  {msg.isWhatsAppCta && (
                    <a
                      href={getWhatsAppUrl(msg.waKey)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-200 w-full justify-center"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Message us on WhatsApp
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-xs px-3.5 py-2.5">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-3.5 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    const userMsg = q;
                    setMessages((prev) => [
                      ...prev,
                      { id: Math.random().toString(36).slice(2), role: "user", text: userMsg, timestamp: new Date() },
                    ]);
                    setIsTyping(true);
                    setTimeout(() => {
                      setIsTyping(false);
                      const match = matchIntent(userMsg);
                      if (!match) {
                        setMessages((prev) => [
                          ...prev,
                          { id: Math.random().toString(36).slice(2), role: "bot", text: FALLBACK_RESPONSE, isWhatsAppCta: true, waKey: "general", timestamp: new Date() },
                        ]);
                      } else {
                        setMessages((prev) => [
                          ...prev,
                          { id: Math.random().toString(36).slice(2), role: "bot", text: match.answer, timestamp: new Date() },
                        ]);
                        if (match.followUp && match.followUp.startsWith("whatsapp_cta:")) {
                          const waKey = match.followUp.replace("whatsapp_cta:", "");
                          setTimeout(() => {
                            setMessages((prev) => [
                              ...prev,
                              { id: Math.random().toString(36).slice(2), role: "bot", text: "Click below to chat with our team directly:", isWhatsAppCta: true, waKey, timestamp: new Date() },
                            ]);
                          }, 400);
                        }
                      }
                    }, 800 + Math.random() * 400);
                  }}
                  className="text-[10px] font-mono text-white/70 hover:text-accent border border-white/10 hover:border-accent/40 px-2.5 py-1 rounded-full transition-all duration-200 whitespace-nowrap bg-white/5"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div className="px-3.5 py-3 border-t border-white/10 flex items-center gap-2 flex-shrink-0 bg-[#15071d]">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about InTheBox..."
              className="flex-1 bg-white/5 border border-white/10 focus:border-accent/50 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 outline-none transition-colors duration-200 min-w-0"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-accent hover:bg-accent/80 disabled:opacity-30 disabled:cursor-not-allowed text-[#1d0a27] rounded-xl transition-all duration-200"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

