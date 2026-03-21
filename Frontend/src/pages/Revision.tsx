import { motion, type Variants } from "framer-motion";
import {
  CalendarClock,
  CheckCircle2,
  Circle,
  RotateCcw,
  Brain,
  Zap,
  Target,
  TrendingUp,
  Clock3,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0 } },
};

type RevisionItem = { id: number; topic: string; subject: string; due: string; completed: boolean };

const initialRevisions: RevisionItem[] = [
  { id: 1, topic: "Thermodynamics - 2nd Law", subject: "Physics", due: "Today", completed: false },
  { id: 2, topic: "P-block Elements", subject: "Chemistry", due: "Today", completed: false },
  { id: 3, topic: "Differential Equations", subject: "Mathematics", due: "Today", completed: true },
  { id: 4, topic: "Human Physiology", subject: "Biology", due: "Tomorrow", completed: false },
  { id: 5, topic: "Wave Optics", subject: "Physics", due: "Tomorrow", completed: false },
  { id: 6, topic: "Coordination Compounds", subject: "Chemistry", due: "Upcoming", completed: false },
  { id: 7, topic: "Probability", subject: "Mathematics", due: "Upcoming", completed: false },
];

const sections = ["Today", "Tomorrow", "Upcoming"];

export default function Revision() {
  const [revisions, setRevisions] = useState(initialRevisions);

  const toggle = (id: number) =>
    setRevisions((prev) => prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)));

  const totalTasks = revisions.length;
  const completedTasks = revisions.filter((r) => r.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const pendingTasks = totalTasks - completedTasks;

  const subjectCount = revisions.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.subject] = (acc[curr.subject] || 0) + 1;
    return acc;
  }, {});
  const activeSubjects = Object.keys(subjectCount).length;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8 pb-10">
      <motion.div
        variants={fadeUp}
        className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 via-lime-500/5 to-transparent p-8 md:p-10"
      >
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-500 to-lime-500 opacity-10 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-cyan-500 opacity-5 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/15 px-3 py-1">
              <Brain className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">Revision Command Center</span>
            </div>
            <h1 className="mt-3 bg-gradient-to-r from-cyan-300 via-lime-300 to-emerald-300 bg-clip-text pb-1 text-4xl font-black text-transparent md:text-5xl">
              Retain More, Stress Less
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-foreground/75 md:text-base">
              Attack your spaced-revision stack with high focus sessions. Complete today&apos;s mission cards, maintain consistency,
              and keep your long-term memory in peak condition.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card flex w-full max-w-[220px] items-center justify-center rounded-3xl border border-cyan-500/35 p-5"
          >
            <div className="relative flex h-32 w-32 items-center justify-center">
              <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="10" className="text-muted/40" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#revisionProgressGradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={314}
                  initial={{ strokeDashoffset: 314 }}
                  animate={{ strokeDashoffset: 314 - (completionRate / 100) * 314 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                <defs>
                  <linearGradient id="revisionProgressGradient" x1="0" y1="0" x2="120" y2="120">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#a3e635" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute text-center">
                <p className="text-3xl font-black">{completionRate}%</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Completed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: Target, label: "Total Missions", value: totalTasks, color: "from-cyan-500 to-blue-500" },
          { icon: CheckCircle2, label: "Completed", value: completedTasks, color: "from-lime-500 to-emerald-500" },
          { icon: Clock3, label: "Pending", value: pendingTasks, color: "from-amber-500 to-orange-500" },
          { icon: TrendingUp, label: "Subjects", value: activeSubjects, color: "from-fuchsia-500 to-cyan-500" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.06 }}
            whileHover={{ y: -4 }}
            className="glass-card relative overflow-hidden rounded-2xl border border-border/50 p-4"
          >
            <div className={`absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${stat.color} opacity-20 blur-2xl`} />
            <div className="relative z-10 space-y-1">
              <div className={`inline-flex rounded-lg bg-gradient-to-br p-2 ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {sections.map((section) => {
        const items = revisions.filter((r) => r.due === section);
        if (!items.length) return null;
        const done = items.filter((i) => i.completed).length;

        const sectionTone = {
          Today: {
            dot: "bg-cyan-400",
            text: "text-cyan-300",
            badge: "bg-cyan-500/15 border-cyan-500/30",
          },
          Tomorrow: {
            dot: "bg-lime-400",
            text: "text-lime-300",
            badge: "bg-lime-500/15 border-lime-500/30",
          },
          Upcoming: {
            dot: "bg-amber-400",
            text: "text-amber-300",
            badge: "bg-amber-500/15 border-amber-500/30",
          },
        } as const;

        const tone = sectionTone[section as keyof typeof sectionTone];

        return (
          <motion.div key={section} variants={fadeUp} className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${tone.dot} shadow-[0_0_12px_currentColor]`} />
                <CalendarClock className={`h-4 w-4 ${tone.text}`} />
                <h2 className="text-lg font-bold">{section}</h2>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${tone.badge} ${tone.text}`}>
                {done}/{items.length} done
              </span>
            </div>

            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-all ${
                  item.completed
                    ? "border-lime-500/35 bg-lime-500/10 shadow-lg shadow-lime-500/10"
                    : "glass-card border-border/50 hover:border-cyan-500/35"
                }`}
                onClick={() => toggle(item.id)}
              >
                {!item.completed && (
                  <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-cyan-500/10 blur-2xl" />
                )}
                {item.completed ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10">
                    <CheckCircle2 className="h-5 w-5 text-lime-300" />
                  </motion.div>
                ) : (
                  <Circle className="relative z-10 h-5 w-5 text-muted-foreground" />
                )}
                <div className="relative z-10 flex-1">
                  <p className={`text-sm font-semibold ${item.completed ? "line-through text-lime-200/80" : ""}`}>{item.topic}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.subject}</p>
                </div>
                {!item.completed && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative z-10 gap-1 border-cyan-500/30 bg-cyan-500/10 text-xs text-cyan-200 hover:bg-cyan-500/20"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <RotateCcw className="h-3 w-3" /> Revise
                  </Button>
                )}

                {item.completed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl border border-lime-500/35"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        );
      })}

      <motion.div
        variants={fadeUp}
        className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/10 to-lime-500/10 p-6 text-center"
      >
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="relative z-10 space-y-2">
          <motion.div
            className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-lime-500 text-black"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2.8 }}
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>
          <p className="text-lg font-bold">Keep the revision chain alive</p>
          <p className="text-sm text-muted-foreground">
            Finish today&apos;s cards to strengthen recall and build long-term exam memory.
          </p>
          <div className="inline-flex items-center gap-1 rounded-full border border-lime-500/30 bg-lime-500/15 px-3 py-1 text-xs font-bold text-lime-300">
            <Zap className="h-3 w-3" /> Momentum Boost Active
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
