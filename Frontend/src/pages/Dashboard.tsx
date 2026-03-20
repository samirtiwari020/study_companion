import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Flame,
  BarChart3,
  CalendarCheck,
  Play,
  BookOpen,
  MessageCircleQuestion,
  TrendingUp,
  Brain,
  Zap,
  Clock,
  Target,
  CheckCircle2,
  ArrowUpRight,
  Trophy,
  Gift,
  Star,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
};

const stats = [
  { label: "Study Streak", value: "12 days", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", glow: "shadow-orange-500/10" },
  { label: "XP Earned", value: "2,450", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", glow: "shadow-amber-500/10" },
  { label: "Hours This Week", value: "18.5h", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", glow: "shadow-blue-500/10" },
  { label: "Accuracy Rate", value: "87%", icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "shadow-emerald-500/10" },
];

const weeklyData = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 80 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 85 },
  { day: "Sun", value: 60 },
];

const topicPerformance = [
  { topic: "Physics", score: 82, color: "from-emerald-500 to-green-400", badge: "💪" },
  { topic: "Chemistry", score: 65, color: "from-amber-500 to-yellow-400", badge: "📈" },
  { topic: "Mathematics", score: 91, color: "from-blue-500 to-cyan-400", badge: "🌟" },
  { topic: "Biology", score: 48, color: "from-red-500 to-orange-400", badge: "🔥" },
];

const todayTasks = [
  { text: "Complete Thermodynamics chapter", done: true, xp: 50 },
  { text: "Practice 20 Organic Chemistry MCQs", done: true, xp: 40 },
  { text: "Revision: Electromagnetic Induction", done: false, xp: 30 },
  { text: "Solve 10 Calculus problems", done: false, xp: 35 },
];

const dailyChallenges = [
  { title: "Speed Solver", desc: "Answer 10 questions in under 5 min", reward: "50 XP", icon: Zap, progress: 7, total: 10, color: "from-purple-500 to-indigo-500" },
  { title: "Subject Explorer", desc: "Study 3 different subjects today", reward: "30 XP", icon: BookOpen, progress: 2, total: 3, color: "from-cyan-500 to-blue-500" },
  { title: "Doubt Buster", desc: "Ask 2 doubts to AI tutor", reward: "25 XP", icon: MessageCircleQuestion, progress: 1, total: 2, color: "from-pink-500 to-rose-500" },
];

const achievements = [
  { emoji: "🚀", label: "First Solve", unlocked: true },
  { emoji: "🔥", label: "7-Day Streak", unlocked: true },
  { emoji: "🧠", label: "100 Qs", unlocked: true },
  { emoji: "⭐", label: "Top 10", unlocked: true },
  { emoji: "💎", label: "Diamond", unlocked: true },
  { emoji: "🏆", label: "Champion", unlocked: false },
  { emoji: "👑", label: "Legend", unlocked: false },
  { emoji: "🎯", label: "Perfect", unlocked: false },
];

const quickActions = [
  { label: "Start Studying", icon: Play, to: "/practice", variant: "gradient" as const },
  { label: "Practice Now", icon: BookOpen, to: "/practice", variant: "secondary" as const },
  { label: "Ask a Doubt", icon: MessageCircleQuestion, to: "/ai-solver", variant: "outline" as const },
];

/* XP Toast Component */
function XPToast({ amount, onDone }: { amount: number; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.6 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-2xl shadow-amber-500/30"
    >
      <Sparkles className="h-5 w-5 animate-spin-slow" />
      <span>+{amount} XP earned!</span>
      <PartyPopper className="h-5 w-5" />
    </motion.div>
  );
}

/* Circular progress ring */
function ProgressRing({ radius, stroke, progress, color }: { radius: number; stroke: number; progress: number; color: string }) {
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
      <circle
        stroke="hsl(var(--muted))"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <motion.circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        style={{ strokeDasharray: circumference }}
      />
    </svg>
  );
}

export default function Dashboard() {
  const [xpToast, setXpToast] = useState<number | null>(null);
  const [taskStates, setTaskStates] = useState(todayTasks.map((t) => t.done));
  const completedCount = taskStates.filter(Boolean).length;
  const taskProgress = Math.round((completedCount / todayTasks.length) * 100);

  const toggleTask = (idx: number) => {
    if (taskStates[idx]) return; // Don't un-complete
    setTaskStates((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
    setXpToast(todayTasks[idx].xp);
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-6xl mx-auto">
      {/* XP Toast */}
      <AnimatePresence>{xpToast && <XPToast amount={xpToast} onDone={() => setXpToast(null)} />}</AnimatePresence>

      {/* Greeting */}
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl md:text-3xl font-bold">
          Good evening, Samir 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's your study overview for today. Keep up the momentum!
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={popIn}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={`glass-card-hover p-4 md:p-5 border ${stat.border} hover:shadow-lg hover:${stat.glow} cursor-default`}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className={`${stat.bg} ${stat.color} p-2.5 rounded-xl`}
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
              >
                <stat.icon className="h-5 w-5" />
              </motion.div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Gamification row */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* XP & Level */}
        <div className="glass-card p-5 border border-amber-500/20 relative overflow-hidden group">
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 transition-all duration-500" />
          <div className="absolute top-2 right-2 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <Star className="w-full h-full text-amber-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <motion.div
                  className="h-9 w-9 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/25"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Zap className="h-4.5 w-4.5 text-white" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold">Level 12</p>
                  <p className="text-[10px] text-muted-foreground">Intermediate Scholar</p>
                </div>
              </div>
              <motion.span
                className="text-xs font-semibold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                2,450 XP
              </motion.span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
                <span>Progress to Level 13</span>
                <span>2,450 / 3,000</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 relative"
                  initial={{ width: "0%" }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-shimmer" />
                </motion.div>
              </div>
              <p className="text-[10px] text-muted-foreground">550 XP to next level ✨</p>
            </div>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="glass-card p-5 border border-orange-500/20 relative overflow-hidden group">
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-orange-500/10 blur-2xl group-hover:bg-orange-500/20 transition-all duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md shadow-orange-500/25"
                whileHover={{ rotate: -15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Flame className="h-4.5 w-4.5 text-white" />
              </motion.div>
              <div>
                <p className="text-sm font-bold">12 Day Streak 🔥</p>
                <p className="text-[10px] text-muted-foreground">Personal best: 28 days</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <motion.div
                  key={d + i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 400 }}
                  whileHover={i <= 4 ? { scale: 1.15, rotate: 5 } : {}}
                  className={`flex-1 h-9 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold transition-all cursor-default ${
                    i <= 4
                      ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-sm shadow-orange-500/25"
                      : i === 5
                      ? "border-2 border-dashed border-orange-500/40 text-orange-500 animate-pulse-soft"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i <= 4 ? <Flame className="h-3 w-3" /> : d}
                </motion.div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Keep going! 🎯 Next milestone: <strong className="text-orange-500">14 days</strong></p>
          </div>
        </div>

        {/* Achievements */}
        <div className="glass-card p-5 border border-emerald-500/20 relative overflow-hidden group">
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <motion.div
                  className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md shadow-emerald-500/25"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Trophy className="h-4.5 w-4.5 text-white" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold">Achievements</p>
                  <p className="text-[10px] text-muted-foreground">5 of 12 unlocked</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {achievements.map((b, i) => (
                <motion.div
                  key={b.label}
                  title={b.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05, type: "spring" }}
                  whileHover={b.unlocked ? { scale: 1.2, rotate: 8 } : {}}
                  className={`h-9 rounded-lg flex items-center justify-center text-sm transition-all cursor-default ${
                    b.unlocked
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : "bg-muted/50 opacity-35 grayscale"
                  }`}
                >
                  {b.emoji}
                </motion.div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Latest: <strong className="text-emerald-500">💎 Diamond Scholar</strong></p>
          </div>
        </div>
      </motion.div>

      {/* Daily Challenges */}
      <motion.div variants={fadeUp} className="glass-card p-5 border border-purple-500/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-sm">
              <Gift className="h-3.5 w-3.5 text-white" />
            </div>
            Daily Challenges
          </h3>
          <span className="text-[10px] text-muted-foreground font-medium px-2 py-0.5 rounded-md bg-muted">Resets in 5h 22m</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dailyChallenges.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="p-4 rounded-xl border border-border/50 bg-muted/10 hover:bg-muted/20 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center shadow-sm text-white group-hover:scale-110 transition-transform`}>
                  <c.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{c.title}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{c.desc}</p>
                </div>
                <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 whitespace-nowrap">
                  {c.reward}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                  <span>{c.progress}/{c.total} completed</span>
                  <span>{Math.round((c.progress / c.total) * 100)}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(c.progress / c.total) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick actions */}
      <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
        {quickActions.map((a) => (
          <Link key={a.label} to={a.to}>
            <Button variant={a.variant} className="gap-2 btn-lift">
              <a.icon className="h-4 w-4" /> {a.label}
            </Button>
          </Link>
        ))}
      </motion.div>

      {/* Main grid: charts + tasks */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly progress — spans 2 cols */}
        <motion.div variants={fadeUp} className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Weekly Progress
            </h3>
            <span className="text-xs text-muted-foreground">This week</span>
          </div>
          <div className="flex items-end gap-2 h-44">
            {weeklyData.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 group">
                <motion.span
                  className="text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                >
                  {d.value}%
                </motion.span>
                <motion.div
                  className="w-full rounded-lg gradient-primary group-hover:shadow-md group-hover:shadow-primary/20 transition-shadow relative overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: `${d.value}%` }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                  whileHover={{ scaleX: 1.1 }}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                </motion.div>
                <span className="text-[10px] text-muted-foreground font-medium">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Today's Tasks with progress ring */}
        <motion.div variants={fadeUp} className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-primary" /> Today's Tasks
            </h3>
            <div className="relative h-10 w-10">
              <ProgressRing radius={20} stroke={3} progress={taskProgress} color="hsl(var(--primary))" />
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-primary">
                {taskProgress}%
              </span>
            </div>
          </div>
          <div className="space-y-2.5">
            {todayTasks.map((task, idx) => (
              <motion.div
                key={task.text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.08 }}
                onClick={() => toggleTask(idx)}
                className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                  taskStates[idx]
                    ? "bg-emerald-500/5 border border-emerald-500/10"
                    : "bg-muted/20 border border-border/50 hover:border-primary/20 hover:bg-primary/5"
                }`}
              >
                <motion.div
                  animate={taskStates[idx] ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle2
                    className={`h-4 w-4 mt-0.5 shrink-0 transition-colors ${
                      taskStates[idx] ? "text-emerald-500" : "text-muted-foreground/40"
                    }`}
                  />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-sm leading-snug block ${
                      taskStates[idx] ? "line-through text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {task.text}
                  </span>
                  <span className="text-[10px] text-amber-500 font-medium">+{task.xp} XP</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Topic Performance */}
        <motion.div variants={fadeUp} className="glass-card p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" /> Topic Performance
            </h3>
            <Link to="/analytics" className="text-xs text-primary flex items-center gap-0.5 hover:underline">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {topicPerformance.map((t, i) => (
              <div key={t.topic} className="group">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium flex items-center gap-1.5">
                    {t.topic}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">{t.badge}</span>
                  </span>
                  <span className="text-muted-foreground font-medium">{t.score}%</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${t.color} relative overflow-hidden`}
                    initial={{ width: 0 }}
                    animate={{ width: `${t.score}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-shimmer" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={fadeUp} className="glass-card p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" /> Recent Activity
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { action: "Completed Thermodynamics quiz", time: "2 hours ago", score: "85%", color: "text-emerald-500", xp: "+25 XP", icon: "✓" },
              { action: "Solved 15 Practice MCQs", time: "4 hours ago", score: "73%", color: "text-amber-500", xp: "+40 XP", icon: "📝" },
              { action: "Studied Organic Chemistry", time: "Yesterday", score: "—", color: "text-muted-foreground", xp: "+15 XP", icon: "📖" },
              { action: "Doubt resolved: Calculus limits", time: "Yesterday", score: "✓", color: "text-blue-500", xp: "+10 XP", icon: "💡" },
            ].map((a, i) => (
              <motion.div
                key={a.action}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/20 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-base">{a.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{a.action}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] text-amber-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">{a.xp}</span>
                  <span className={`text-sm font-bold ${a.color}`}>{a.score}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
