import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, MessageCircleQuestion, BookOpen, Atom, Calculator, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

type Message = { id: number; role: "user" | "ai"; content: string; time: string; xpAwarded?: boolean };

const getTime = () =>
  new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

const dummyResponses = [
  `Great question! Let me break this down step by step:\n\n**Step 1: Identify the concept**\nThis relates to a fundamental principle. Let's start by understanding the core idea.\n\n**Step 2: Apply the formula**\nUsing the relevant equation, we substitute the given values.\n\n**Step 3: Calculate**\nAfter simplification, we arrive at the answer.\n\n💡 **Key takeaway:** Always identify what's given, what's asked, and which formula connects them.\n\nWould you like me to solve a similar problem for practice?`,

  `Absolutely! Here's a clear explanation:\n\n**The Core Idea:**\nThink of it like this — the concept works because of the underlying principle of conservation.\n\n**Why it matters:**\n• It appears frequently in competitive exams\n• Understanding this unlocks related topics\n• It connects to real-world applications\n\n**Common Mistakes to Avoid:**\n1. Don't confuse the direction of the force\n2. Always check the units\n3. Draw a free body diagram first\n\nShall I quiz you on this topic? 🎯`,

  `Let me explain this with an analogy:\n\n**Imagine you're on a bus 🚌**\nWhen the bus accelerates, you feel pushed backward. That's inertia!\n\n**The Math Behind It:**\n\`F = ma\`\n\nWhere:\n• F = Net force (in Newtons)\n• m = Mass (in kg)\n• a = Acceleration (in m/s²)\n\n**Example Problem:**\nA 5kg block accelerates at 2 m/s².\nF = 5 × 2 = **10 N**\n\nWant me to explain the next concept in this chapter? 📖`,
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "ai",
    content: "Hi! I'm your AI study assistant 🧠\n\nAsk me any doubt — whether it's Physics, Chemistry, Math, or Biology. I'll break it down step by step with clear explanations.\n\nWhat would you like to learn today?",
    time: getTime(),
  },
];

const suggestions = [
  { text: "Explain Newton's 3rd Law", icon: Atom },
  { text: "Solve: ∫ x² dx", icon: Calculator },
  { text: "What is mitosis?", icon: BookOpen },
  { text: "Tips for JEE preparation", icon: Lightbulb },
];

export default function AISolver() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: msg, time: getTime(), xpAwarded: true };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        content: dummyResponses[responseIndex % dummyResponses.length],
        time: getTime(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setResponseIndex((i) => i + 1);
      setIsTyping(false);
    }, 1800);
  };

  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      // Handle inline code
      const parts = line.split(/(`[^`]+`)/).map((part, j) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={j} className="px-1.5 py-0.5 rounded bg-primary/20 text-primary text-xs font-mono font-bold">
              {part.slice(1, -1)}
            </code>
          );
        }
        // Handle bold
        return part.split("**").map((seg, k) =>
          k % 2 === 1 ? <strong key={`${j}-${k}`} className="text-foreground">{seg}</strong> : seg
        );
      });
      return (
        <p key={i} className={i > 0 ? "mt-1.5" : ""}>
          {parts}
        </p>
      );
    });
  };

  const showSuggestions = messages.length <= 1 && !isTyping;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } } as Variants}
      className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/30 glow-primary">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              Doubt Solver <Sparkles className="h-4 w-4 text-amber-500" />
            </h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium mt-0.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              AI Tutor Online
            </p>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-primary">+15 XP per doubt</span>
        </div>
      </motion.div>

      {/* Chat area */}
      <motion.div variants={fadeUp} className="glass-card flex-1 flex flex-col overflow-hidden rounded-3xl border border-primary/10 shadow-xl shadow-black/5">
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                className={`flex gap-3 relative ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Floating XP Animation for User */}
                {msg.xpAwarded && (
                  <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 1, 0], y: -40, scale: [0.5, 1.2, 1, 0.8] }}
                    transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
                    className="absolute -top-6 right-12 z-10 font-bold text-amber-500 text-sm flex items-center gap-1 drop-shadow-md"
                  >
                    +15 XP <Sparkles className="h-3 w-3" />
                  </motion.div>
                )}

                {/* Avatar */}
                <div
                  className={`h-9 w-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-md ${
                    msg.role === "ai"
                      ? "gradient-primary shadow-primary/30 glow-primary"
                      : "bg-gradient-to-br from-slate-600 to-slate-800"
                  }`}
                >
                  {msg.role === "ai" ? (
                    <Bot className="h-5 w-5 text-white" />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>

                {/* Bubble */}
                <div className={`max-w-[85%] sm:max-w-[75%] space-y-1 ${msg.role === "user" ? "items-end" : ""}`}>
                  <div
                    className={`px-5 py-3.5 text-[15px] leading-relaxed relative ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm shadow-md shadow-primary/20"
                        : "bg-muted/60 border border-border/50 text-muted-foreground rounded-2xl rounded-tl-sm backdrop-blur-sm shadow-sm"
                    }`}
                  >
                    {renderContent(msg.content)}
                  </div>
                  <p
                    className={`text-[10px] text-muted-foreground/60 px-1 font-medium ${
                      msg.role === "user" ? "text-right" : ""
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="flex gap-3"
              >
                <div className="h-9 w-9 rounded-2xl gradient-primary flex items-center justify-center shadow-md shadow-primary/30 glow-primary">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-muted/60 border border-border/50 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5 backdrop-blur-sm h-[42px]">
                  <motion.span 
                    animate={{ y: [0, -5, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0 }}
                    className="w-2.5 h-2.5 rounded-full bg-primary/60" 
                  />
                  <motion.span 
                    animate={{ y: [0, -5, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                    className="w-2.5 h-2.5 rounded-full bg-primary/60" 
                  />
                  <motion.span 
                    animate={{ y: [0, -5, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
                    className="w-2.5 h-2.5 rounded-full bg-primary/60" 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suggestion chips — show only initially */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="pt-4"
              >
                <p className="text-xs text-muted-foreground mb-3 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="h-3 w-3 text-primary" /> Start a Challenge
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {suggestions.map((s) => (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={s.text}
                      onClick={() => sendMessage(s.text)}
                      className="flex items-center gap-3 p-4 rounded-2xl border-2 border-border/60 text-sm text-left hover:border-primary/50 hover:bg-primary/5 transition-all group bg-background/50"
                    >
                      <div className="h-8 w-8 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors shrink-0">
                        <s.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-muted-foreground font-semibold group-hover:text-foreground transition-colors">
                        {s.text}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={endRef} />
        </div>

        {/* Input area */}
        <div className="p-4 sm:p-5 border-t border-border/50 bg-muted/20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-background border-2 border-border/60 rounded-2xl px-4 py-2 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-sm inset-shadow-sm">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Ask your doubt to earn XP..."
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground/60 font-medium"
                disabled={isTyping}
              />
            </div>
            <Button
              size="icon"
              className={`h-14 w-14 rounded-2xl shrink-0 transition-all duration-300 btn-lift flex flex-col items-center justify-center gap-0.5 ${
                input.trim()
                  ? "gradient-primary text-white shadow-lg shadow-primary/30"
                  : "bg-muted text-muted-foreground border-2 border-border/50"
              }`}
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground/60 text-center mt-3 font-medium">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
