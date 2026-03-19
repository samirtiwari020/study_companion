import { motion, type Variants } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

type Message = { id: number; role: "user" | "ai"; content: string };

const initialMessages: Message[] = [
  { id: 1, role: "ai", content: "Hi! I'm your AI study assistant. Ask me any doubt — I'll break it down step by step. 🧠" },
];

export default function AISolver() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        content: `Great question! Let me break this down:\n\n**Step 1:** First, let's identify the key concepts involved.\n\n**Step 2:** We can apply the relevant formula or principle.\n\n**Step 3:** Substituting the values, we get our answer.\n\nWould you like me to explain this in a simpler way? 💡`,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } } as Variants} className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
      <motion.div variants={fadeUp} className="mb-4">
        <h1 className="text-2xl font-bold">AI Doubt Solver</h1>
        <p className="text-muted-foreground text-sm mt-1">Get step-by-step explanations for any topic</p>
      </motion.div>

      <motion.div variants={fadeUp} className="glass-card flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                msg.role === "ai" ? "gradient-primary" : "bg-muted"
              }`}>
                {msg.role === "ai" ? <Bot className="h-4 w-4 text-primary-foreground" /> : <User className="h-4 w-4" />}
              </div>
              <div className={`max-w-[80%] rounded-xl p-3 text-sm leading-relaxed ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                {msg.content.split("\n").map((line, i) => (
                  <p key={i} className={i > 0 ? "mt-1" : ""}>
                    {line.split("**").map((part, j) =>
                      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                    )}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-xl p-3 flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-soft" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-soft [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-soft [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
          <div ref={endRef} />
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1 text-xs shrink-0">
              <Sparkles className="h-3 w-3" /> Explain simpler
            </Button>
            <div className="flex-1 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask your doubt..."
                className="flex-1 bg-muted rounded-lg px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button variant="gradient" size="icon" onClick={sendMessage} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
