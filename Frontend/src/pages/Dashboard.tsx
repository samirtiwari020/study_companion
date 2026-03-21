import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Flame,
  Gift,
  MessageCircleQuestion,
  Play,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const kpis = [
  { label: "Streak", value: "12 days", delta: "+2", icon: Flame, tone: "from-lime-500 to-green-500" },
  { label: "Total XP", value: "2,450", delta: "+180", icon: Zap, tone: "from-cyan-500 to-blue-500" },
  { label: "Weekly Time", value: "18.5h", delta: "+3.4h", icon: Clock3, tone: "from-emerald-500 to-teal-500" },
  { label: "Accuracy", value: "87%", delta: "+5%", icon: Target, tone: "from-green-500 to-lime-500" },
];

const weeklyTrack = [62, 74, 58, 83, 90, 78, 86];

const mastery = [
  { subject: "Physics", score: 82, color: "from-cyan-500 to-blue-500" },
  { subject: "Chemistry", score: 68, color: "from-lime-500 to-green-500" },
  { subject: "Mathematics", score: 91, color: "from-emerald-500 to-teal-500" },
  { subject: "Biology", score: 54, color: "from-cyan-500 to-lime-500" },
];

const dailyChallenges = [
  { title: "Speed Solver", goal: "10 Q in 5 min", progress: 7, total: 10, xp: 50, icon: Zap },
  { title: "Tri-Subject", goal: "Study 3 subjects", progress: 2, total: 3, xp: 30, icon: BookOpen },
  { title: "Doubt Hunter", goal: "Ask 2 AI doubts", progress: 1, total: 2, xp: 25, icon: MessageCircleQuestion },
];

const baseTasks = [
  { text: "Complete Thermodynamics revision", xp: 50, done: true },
  { text: "Practice 20 Organic Chemistry MCQs", xp: 40, done: true },
  { text: "Solve 10 Calculus mixed problems", xp: 35, done: false },
  { text: "Review weak topic error log", xp: 30, done: false },
];

const recentActivity = [
  { text: "Finished Thermodynamics Quiz", when: "2h ago", score: "85%" },
  { text: "Solved 15 Practice MCQs", when: "4h ago", score: "73%" },
  { text: "Revised Organic Chemistry", when: "Yesterday", score: "Done" },
  { text: "AI doubt cleared: Limits", when: "Yesterday", score: "Clear" },
];

function ProgressArc({ progress }: { progress: number }) {
  const radius = 48;
  const stroke = 7;
  const normalized = radius - stroke;
  const circumference = normalized * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={radius * 2} height={radius * 2} className="-rotate-90">
      <circle cx={radius} cy={radius} r={normalized} stroke="hsl(var(--muted))" strokeWidth={stroke} fill="transparent" />
      <motion.circle
        cx={radius}
        cy={radius}
        r={normalized}
        stroke="url(#dashboardArc)"
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="transparent"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="dashboardArc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#84cc16" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Dashboard() {
  const [taskStates, setTaskStates] = useState(baseTasks.map((t) => t.done));
  const [xpToast, setXpToast] = useState<number | null>(null);

  const completedCount = useMemo(() => taskStates.filter(Boolean).length, [taskStates]);
  const taskProgress = Math.round((completedCount / baseTasks.length) * 100);

  const completeTask = (index: number) => {
    if (taskStates[index]) return;
    setTaskStates((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    setXpToast(baseTasks[index].xp);
    window.setTimeout(() => setXpToast(null), 1800);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-7xl space-y-6">
      <AnimatePresence>
        {xpToast && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.85 }}
            className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-lime-500 px-5 py-3 text-sm font-bold text-black shadow-2xl shadow-cyan-500/25"
          >
            <Sparkles className="h-4 w-4" /> +{xpToast} XP unlocked
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section variants={fadeUp} className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 via-background to-lime-950/20 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-lime-500/15 blur-3xl" />

        <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              <Brain className="h-3.5 w-3.5" /> Dashboard Command Center
            </p>
            <h1 className="text-3xl font-black md:text-5xl leading-[1.08]">
              Track. Adapt. <span className="bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">Dominate.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              This redesigned board gives you a live pulse of progress, priorities, and performance so every study hour moves you closer to rank goals.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/practice">
                <Button className="gap-2 bg-gradient-to-r from-cyan-500 to-lime-500 font-semibold text-black hover:opacity-95">
                  <Play className="h-4 w-4" /> Start Focus Session
                </Button>
              </Link>
              <Link to="/ai-solver">
                <Button variant="outline" className="gap-2">
                  <MessageCircleQuestion className="h-4 w-4" /> Ask AI Tutor
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-background/60 p-5 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold">Today Completion</p>
              <span className="rounded-md bg-lime-500/10 px-2 py-1 text-xs font-semibold text-lime-300">{taskProgress}%</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24">
                <ProgressArc progress={taskProgress} />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{taskProgress}%</span>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-muted-foreground">Completed tasks</p>
                <p className="text-2xl font-black">{completedCount}/{baseTasks.length}</p>
                <p className="text-cyan-300">Level 12 - Intermediate</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section variants={fadeUp} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.07 }}
            whileHover={{ y: -4 }}
            className="glass-card relative overflow-hidden rounded-2xl border border-border/50 p-4"
          >
            <div className={`absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${item.tone} opacity-20 blur-2xl`} />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-black">{item.value}</p>
                <p className="text-xs text-lime-400">{item.delta} this week</p>
              </div>
              <div className={`rounded-xl bg-gradient-to-br p-2 ${item.tone}`}>
                <item.icon className="h-4 w-4 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <motion.div variants={fadeUp} className="glass-card rounded-2xl border border-border/50 p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <TrendingUp className="h-4 w-4 text-cyan-400" /> Performance Flightpath
            </h3>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <div className="grid grid-cols-7 items-end gap-3 h-52">
            {weeklyTrack.map((value, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-[10px] text-muted-foreground">{value}%</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  className="w-full rounded-xl bg-gradient-to-t from-cyan-500 via-emerald-500 to-lime-500 shadow-lg shadow-cyan-500/15"
                />
                <span className="text-[10px] font-medium text-muted-foreground">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-card rounded-2xl border border-border/50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Gift className="h-4 w-4 text-lime-400" /> Daily Challenges
            </h3>
            <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">reset 5h</span>
          </div>
          <div className="space-y-3">
            {dailyChallenges.map((challenge, i) => {
              const progress = Math.round((challenge.progress / challenge.total) * 100);
              return (
                <motion.div
                  key={challenge.title}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="rounded-xl border border-border/50 bg-muted/20 p-3"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-md bg-gradient-to-br from-cyan-500 to-lime-500 p-1.5">
                        <challenge.icon className="h-3.5 w-3.5 text-black" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold">{challenge.title}</p>
                        <p className="text-[10px] text-muted-foreground">{challenge.goal}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-lime-400">+{challenge.xp} XP</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ delay: 0.35 + i * 0.1, duration: 0.6 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-lime-500"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <motion.div variants={fadeUp} className="glass-card rounded-2xl border border-border/50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <CalendarCheck className="h-4 w-4 text-cyan-400" /> Tactical Task Board
            </h3>
            <span className="text-xs text-muted-foreground">tap to complete</span>
          </div>
          <div className="space-y-2.5">
            {baseTasks.map((task, idx) => (
              <motion.button
                key={task.text}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.06 }}
                onClick={() => completeTask(idx)}
                className={`w-full rounded-xl border p-3 text-left transition ${
                  taskStates[idx]
                    ? "border-lime-500/30 bg-lime-500/10"
                    : "border-border/60 bg-muted/20 hover:border-cyan-500/40 hover:bg-cyan-500/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={`mt-0.5 h-4 w-4 ${taskStates[idx] ? "text-lime-400" : "text-muted-foreground/50"}`} />
                  <div className="flex-1">
                    <p className={`text-sm ${taskStates[idx] ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.text}</p>
                    <p className="mt-1 text-[10px] font-semibold text-cyan-300">+{task.xp} XP</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-card rounded-2xl border border-border/50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <BarChart3 className="h-4 w-4 text-lime-400" /> Subject Mastery Pulse
            </h3>
            <Link to="/analytics" className="text-xs text-cyan-300 hover:underline inline-flex items-center gap-1">
              full analytics <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {mastery.map((row, i) => (
              <div key={row.subject}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{row.subject}</span>
                  <span className="text-xs text-muted-foreground">{row.score}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${row.score}%` }}
                    transition={{ delay: 0.25 + i * 0.09, duration: 0.65 }}
                    className={`h-full rounded-full bg-gradient-to-r ${row.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-border/50 pt-4">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Trophy className="h-4 w-4 text-lime-400" /> Recent Activity
            </h4>
            <div className="space-y-2">
              {recentActivity.map((item) => (
                <div key={item.text} className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-muted/20">
                  <div>
                    <p className="text-xs font-medium">{item.text}</p>
                    <p className="text-[10px] text-muted-foreground">{item.when}</p>
                  </div>
                  <span className="text-xs font-semibold text-cyan-300">{item.score}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
