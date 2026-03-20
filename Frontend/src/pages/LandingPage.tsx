import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  Target,
  BarChart3,
  ArrowRight,
  BookOpen,
  Atom,
  Stethoscope,
  Landmark,
  GraduationCap,
  Menu,
  X,
  CalendarCheck,
  MessageCircleQuestion,
  Flame,
  Trophy,
  Crown,
  Medal,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import type { Easing } from "framer-motion";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as Easing },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ─── Data ─── */
const features = [
  {
    icon: CalendarCheck,
    title: "AI Study Planner",
    desc: "Get a fully personalized study schedule powered by AI that adapts to your pace, goals, and available time.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: MessageCircleQuestion,
    title: "Smart Doubt Solver",
    desc: "Instant AI-powered doubt resolution with step-by-step explanations for any concept or problem.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Target,
    title: "Adaptive Practice",
    desc: "Practice questions that dynamically adjust difficulty based on your performance to maximize learning.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    desc: "Deep insights into your progress with predicted scores, weak-area analysis, and improvement trends.",
    gradient: "from-emerald-500 to-teal-600",
  },
];

const exams = [
  {
    icon: Atom,
    name: "JEE",
    full: "Joint Entrance Examination",
    desc: "Physics, Chemistry & Mathematics preparation with AI-solved problems.",
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    icon: Stethoscope,
    name: "NEET",
    full: "National Eligibility cum Entrance Test",
    desc: "Biology, Physics & Chemistry with visual aids and mnemonics.",
    color: "from-emerald-500 to-green-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Landmark,
    name: "UPSC",
    full: "Union Public Service Commission",
    desc: "GS, CSAT & Optional subjects with current affairs integration.",
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
];

/* ═══════════════════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:inline">
              NeuroPrep AI
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#exams" className="hover:text-foreground transition-colors">
              Exams
            </a>
            <a href="#about" className="hover:text-foreground transition-colors">
              About
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/auth")}
              className="text-sm"
            >
              Login
            </Button>
            <Button
              size="sm"
              className="gradient-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow text-sm"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 pb-4 pt-2 space-y-2"
          >
            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#exams"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Exams
            </a>
            <a
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </a>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => navigate("/auth")}
              >
                Login
              </Button>
              <Button
                size="sm"
                className="flex-1 gradient-primary text-white"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-4 sm:px-6 lg:px-8">
        {/* Decorative blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-float" />
          <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/5 blur-[140px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} className="flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered Exam Preparation
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
            >
              Your Personal{" "}
              <span className="gradient-text">AI Study</span>
              <br />
              <span className="gradient-text">Companion</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              Experience the future of learning — our AI adapts to your unique
              pace, identifies knowledge gaps, and crafts a personalized roadmap
              to ace <strong className="text-foreground">JEE</strong>,{" "}
              <strong className="text-foreground">NEET</strong>, and{" "}
              <strong className="text-foreground">UPSC</strong>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button
                size="lg"
                className="gradient-primary text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all text-base px-8 gap-2 group"
                onClick={() => navigate("/signup")}
              >
                Get Started
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all"
                onClick={() => navigate("/auth")}
              >
                Login
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-background gradient-primary flex items-center justify-center"
                    >
                      <GraduationCap className="h-3.5 w-3.5 text-white" />
                    </div>
                  ))}
                </div>
                <span>
                  <strong className="text-foreground">10,000+</strong> students
                </span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-border" />
              <span>
                Trusted by toppers across India
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3"
            >
              Why NeuroPrep?
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl font-bold"
            >
              Everything you need to{" "}
              <span className="gradient-text">ace your exams</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                className="glass-card-hover p-8 rounded-2xl group cursor-default"
              >
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Exams Section ── */}
      <section
        id="exams"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-muted/30"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3"
            >
              Supported Exams
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl font-bold"
            >
              Prepare for India's{" "}
              <span className="gradient-text">top exams</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {exams.map((e, i) => (
              <motion.div
                key={e.name}
                variants={fadeUp}
                custom={i}
                className={`glass-card-hover p-8 rounded-2xl border ${e.border}`}
              >
                <div
                  className={`h-14 w-14 rounded-2xl ${e.bg} flex items-center justify-center mb-5`}
                >
                  <e.icon
                    className={`h-7 w-7 bg-gradient-to-br ${e.color} bg-clip-text`}
                    style={{
                      color: "transparent",
                      backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                    }}
                  />
                </div>
                {/* fallback: just use a colored icon */}
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-xl font-bold">{e.name}</h3>
                  <span className="text-xs text-muted-foreground">{e.full}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {e.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Gamification Section ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3"
            >
              Stay Motivated
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl font-bold"
            >
              Learning feels like a{" "}
              <span className="gradient-text">game</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-2xl mx-auto text-muted-foreground mt-4 text-base sm:text-lg"
            >
              Earn rewards, climb leaderboards, and unlock achievements as you
              study — because consistency deserves celebration.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Daily Streaks */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="glass-card-hover rounded-2xl p-6 group cursor-default relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-orange-500/10 blur-2xl group-hover:bg-orange-500/20 transition-colors" />
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Flame className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Daily Streaks</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Build consistency with daily study streaks and never break the chain.
                </p>
                {/* Mock streak counter */}
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div
                      key={day}
                      className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                        day <= 5
                          ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/25"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {day <= 5 ? <Flame className="h-3.5 w-3.5" /> : day}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <strong className="text-orange-500">5 day</strong> streak 🔥
                </p>
              </div>
            </motion.div>

            {/* XP Points */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="glass-card-hover rounded-2xl p-6 group cursor-default relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-yellow-500/10 blur-2xl group-hover:bg-yellow-500/20 transition-colors" />
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1">XP Points</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Earn XP for every question solved, chapter completed, and milestone hit.
                </p>
                {/* Mock XP bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-amber-500">Level 12</span>
                    <span className="text-muted-foreground">2,450 / 3,000 XP</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "82%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-amber-500">550 XP</strong> to next level ⚡
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="glass-card-hover rounded-2xl p-6 group cursor-default relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-colors" />
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Leaderboard</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Compete with peers and climb the ranks on weekly leaderboards.
                </p>
                {/* Mini leaderboard */}
                <div className="space-y-1.5">
                  {[
                    { rank: 1, name: "Arjun S.", xp: "4,820", icon: Crown, color: "text-yellow-500" },
                    { rank: 2, name: "Priya M.", xp: "4,510", icon: Medal, color: "text-slate-400" },
                    { rank: 3, name: "Rahul K.", xp: "4,290", icon: Medal, color: "text-amber-700" },
                  ].map((r) => (
                    <div
                      key={r.rank}
                      className={`flex items-center gap-2 text-xs py-1.5 px-2.5 rounded-lg ${
                        r.rank === 1 ? "bg-yellow-500/10 border border-yellow-500/20" : "bg-muted/50"
                      }`}
                    >
                      <r.icon className={`h-3.5 w-3.5 ${r.color}`} />
                      <span className="font-semibold flex-1">{r.name}</span>
                      <span className="text-muted-foreground">{r.xp} XP</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="glass-card-hover rounded-2xl p-6 group cursor-default relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-colors" />
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Achievements</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Unlock badges for milestones — from first solve to 100-day streaks.
                </p>
                {/* Badge grid */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { emoji: "🚀", label: "First Solve", unlocked: true },
                    { emoji: "🔥", label: "7-Day Streak", unlocked: true },
                    { emoji: "🧠", label: "100 Questions", unlocked: true },
                    { emoji: "⭐", label: "Top 10", unlocked: true },
                    { emoji: "💎", label: "Diamond", unlocked: false },
                    { emoji: "🏆", label: "Champion", unlocked: false },
                    { emoji: "👑", label: "Legend", unlocked: false },
                    { emoji: "🎯", label: "Perfect", unlocked: false },
                  ].map((b) => (
                    <div
                      key={b.label}
                      title={b.label}
                      className={`h-10 w-full rounded-lg flex items-center justify-center text-base transition-all ${
                        b.unlocked
                          ? "bg-emerald-500/10 border border-emerald-500/20 shadow-sm hover:scale-110"
                          : "bg-muted/50 opacity-40 grayscale"
                      }`}
                    >
                      {b.emoji}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto gradient-primary rounded-3xl p-10 md:p-20 text-center text-white relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.08),transparent_50%)]" />

          {/* Floating sparkle dots */}
          <div className="absolute top-8 left-12 w-2 h-2 rounded-full bg-white/30 animate-pulse-soft" />
          <div className="absolute top-20 right-16 w-1.5 h-1.5 rounded-full bg-white/20 animate-float" />
          <div className="absolute bottom-12 left-1/4 w-1 h-1 rounded-full bg-white/25 animate-float-delayed" />
          <div className="absolute bottom-20 right-1/3 w-2.5 h-2.5 rounded-full bg-white/15 animate-pulse-soft" />
          <div className="absolute top-1/3 left-8 w-1.5 h-1.5 rounded-full bg-white/20 animate-float-delayed" />

          {/* Pulsing ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-white/10 animate-pulse-soft" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full border border-white/5 animate-pulse-soft" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/15 border border-white/20 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Free to Get Started
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Start Your Smart Learning
              <br />
              Journey Today
            </h2>

            <p className="max-w-xl mx-auto text-white/75 text-base sm:text-lg leading-relaxed">
              Join 10,000+ students who are already using AI to study smarter,
              score higher, and achieve their dream results.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-2xl shadow-black/15 text-base px-10 py-6 gap-2 group font-bold"
                onClick={() => navigate("/signup")}
              >
                Sign Up Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <span className="text-white/50 text-sm">No credit card required</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md gradient-primary flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-foreground">NeuroPrep AI</span>
          </div>
          <p>&copy; {new Date().getFullYear()} NeuroPrep AI. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
