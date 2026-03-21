import { motion, type Variants, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  Clock,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Brain,
  Atom,
  Stethoscope,
  Landmark,
  CheckCircle2,
  ArrowRight,
  Shield,
  Star,
  Target,
  TrendingUp,
  Zap,
  Trophy,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fadeUp: Variants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

/* Dummy generated plan */
const generatedPlan = [
  {
    week: "Week 1 — Foundation Building",
    days: [
      { id: "w1-1", day: "Day 1", topic: "Newton's Laws & Kinematics", subject: "Physics", hours: 3, priority: "high" as const, xp: 150 },
      { id: "w1-2", day: "Day 2", topic: "Organic Chemistry - Basics", subject: "Chemistry", hours: 2.5, priority: "high" as const, xp: 120 },
      { id: "w1-3", day: "Day 3", topic: "Calculus - Integration", subject: "Mathematics", hours: 3, priority: "medium" as const, xp: 100 },
      { id: "w1-4", day: "Day 4", topic: "Cell Biology & Genetics", subject: "Biology", hours: 2, priority: "medium" as const, xp: 80 },
      { id: "w1-5", day: "Day 5", topic: "Thermodynamics", subject: "Physics", hours: 3, priority: "high" as const, xp: 150 },
      { id: "w1-6", day: "Day 6", topic: "Practice MCQs + Revision", subject: "Mixed", hours: 4, priority: "medium" as const, xp: 200 },
    ],
  },
  {
    week: "Week 2 — Deep Dive",
    days: [
      { id: "w2-1", day: "Day 7", topic: "Electromagnetic Induction", subject: "Physics", hours: 3, priority: "high" as const, xp: 150 },
      { id: "w2-2", day: "Day 8", topic: "Coordination Compounds", subject: "Chemistry", hours: 2.5, priority: "medium" as const, xp: 120 },
      { id: "w2-3", day: "Day 9", topic: "Differential Equations", subject: "Mathematics", hours: 3, priority: "high" as const, xp: 150 },
      { id: "w2-4", day: "Day 10", topic: "Human Physiology", subject: "Biology", hours: 2, priority: "low" as const, xp: 80 },
      { id: "w2-5", day: "Day 11", topic: "Waves & Optics", subject: "Physics", hours: 3, priority: "medium" as const, xp: 100 },
      { id: "w2-6", day: "Day 12", topic: "Full Mock Test + Analysis", subject: "All", hours: 5, priority: "high" as const, xp: 300 },
    ],
  },
];

const priorityConfig = {
  high: { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", glow: "shadow-red-500/20" },
  medium: { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", glow: "shadow-amber-500/20" },
  low: { color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "shadow-emerald-500/20" },
};

const subjectIcons: Record<string, typeof BookOpen> = {
  Physics: Atom,
  Chemistry: Brain,
  Mathematics: BookOpen,
  Biology: Stethoscope,
  Mixed: Shield,
  All: Star,
};

const examOptions = [
  { value: "jee", label: "JEE Main / Advanced", icon: Atom },
  { value: "neet", label: "NEET UG", icon: Stethoscope },
  { value: "upsc", label: "UPSC CSE", icon: Landmark },
];

export default function StudyPlanner() {
  const [examType, setExamType] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");
  const [weakSubjects, setWeakSubjects] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [completedQuests, setCompletedQuests] = useState<Record<string, boolean>>({});

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPlan(true);
  };

  const toggleQuest = (id: string) => {
    setCompletedQuests(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const questCompletedCount = Object.values(completedQuests).filter(Boolean).length;
  const totalQuests = generatedPlan.reduce((acc, w) => acc + w.days.length, 0);

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-7xl space-y-6">
      {/* Hero Command Center Section */}
      <motion.section variants={fadeUp} className="relative overflow-hidden rounded-3xl border border-lime-500/20 bg-gradient-to-br from-lime-950/20 via-background to-cyan-950/20 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-lime-500/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-3 py-1 text-xs font-semibold text-lime-300">
              <Calendar className="h-3.5 w-3.5" /> Adaptive Study Planning
            </p>
            <h1 className="text-3xl font-black md:text-5xl leading-[1.08]">
              Your Personal <span className="bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">Study Roadmap</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              Answer a few questions and let our AI build a day-by-day study plan tailored to your exam, timeline, and weak areas.
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-background/60 p-5 backdrop-blur">
            <div className="mb-4 text-sm font-semibold">Plan Coverage</div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Topics Covered</span>
                  <span className="text-cyan-300">28 topics</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-cyan-500 to-lime-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Estimated Time</span>
                  <span className="text-lime-300">120+ hours</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1, delay: 0.1 }} className="h-full bg-gradient-to-r from-lime-500 to-cyan-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Input Form Card */}
      <motion.div variants={fadeUp} className="glass-card relative overflow-hidden rounded-3xl border border-border/50 p-6 md:p-8">
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl opacity-40" />
        
        <div className="relative z-10 flex items-center gap-3 mb-6">
          <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-lime-500 p-2.5 shadow-lg shadow-cyan-500/30">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Generate Your Plan</h2>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5 max-w-2xl">
          {/* Exam Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold">Which exam are you targeting?</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {examOptions.map((opt) => (
                <motion.button
                  key={opt.value}
                  type="button"
                  onClick={() => setExamType(opt.value)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 p-4 rounded-2xl border transition-all font-semibold text-sm ${
                    examType === opt.value
                      ? "border-lime-500/50 bg-lime-500/10 text-lime-300 shadow-lg shadow-lime-500/20"
                      : "border-border/60 hover:border-cyan-500/40 hover:bg-cyan-500/5 text-muted-foreground"
                  }`}
                >
                  <opt.icon className="h-5 w-5" />
                  <span>{opt.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Time & Weak Subjects */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold" htmlFor="time-remaining">Time Until Exam</label>
              <div className="relative group">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-cyan-400 transition-colors" />
                <Input
                  id="time-remaining"
                  placeholder="e.g. 3 months"
                  value={timeRemaining}
                  onChange={(e) => setTimeRemaining(e.target.value)}
                  className="pl-10 h-11 border-border/70 bg-background/50 rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold" htmlFor="weak-subjects">Weak Subjects</label>
              <div className="relative group">
                <AlertTriangle className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-cyan-400 transition-colors" />
                <Input
                  id="weak-subjects"
                  placeholder="e.g. Organic Chemistry"
                  value={weakSubjects}
                  onChange={(e) => setWeakSubjects(e.target.value)}
                  className="pl-10 h-11 border-border/70 bg-background/50 rounded-xl"
                />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-lime-500 px-8 py-3 font-bold text-black shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all mt-2"
          >
            <Sparkles className="h-4 w-4" />
            Generate Your Roadmap
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </form>
      </motion.div>

      {/* Generated Plan Section */}
      <AnimatePresence>
        {showPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 mt-8"
          >
            {/* Plan Header Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Target, label: "Exam Type", value: examType === "jee" ? "JEE" : examType === "neet" ? "NEET" : "UPSC", color: "from-cyan-500 to-blue-500" },
                { icon: Calendar, label: "Timeline", value: timeRemaining || "3 months", color: "from-lime-500 to-green-500" },
                { icon: BookOpen, label: "Total Missions", value: `${totalQuests} topics`, color: "from-emerald-500 to-teal-500" },
                { icon: Zap, label: "Total XP", value: `${generatedPlan.reduce((acc, w) => acc + w.days.reduce((a, d) => a + d.xp, 0), 0)} XP`, color: "from-cyan-500 to-lime-500" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="glass-card rounded-2xl border border-border/50 p-4 relative overflow-hidden"
                >
                  <div className={`absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${stat.color} opacity-20 blur-2xl`} />
                  <div className="relative z-10 flex items-start gap-3">
                    <div className={`rounded-xl bg-gradient-to-br ${stat.color} p-2.5`}>
                      <stat.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase">{stat.label}</p>
                      <p className="text-lg font-black mt-0.5">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl border border-border/50 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-cyan-400" /> Your Progress
                </h3>
                <span className="text-xs text-muted-foreground">{questCompletedCount} of {totalQuests} completed</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${questCompletedCount > 0 ? (questCompletedCount / totalQuests) * 100 : 0}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-cyan-500 via-lime-500 to-green-500"
                />
              </div>
            </motion.div>

            {/* Mission Timeline */}
            <div className="space-y-6">
              {generatedPlan.map((week, wi) => (
                <motion.div
                  key={week.week}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + wi * 0.15 }}
                >
                  {/* Week Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      className="h-12 w-12 rounded-2xl bg-gradient-to-br from-lime-500 to-cyan-500 flex items-center justify-center text-lg font-black text-black shadow-lg shadow-lime-500/25"
                    >
                      {wi + 1}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{week.week}</h3>
                      <p className="text-xs text-muted-foreground">{week.days.length} daily missions</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-semibold text-lime-400">{week.days.reduce((a, d) => a + d.hours, 0)}h</p>
                      <p className="text-xs text-muted-foreground">total time</p>
                    </div>
                  </div>

                  {/* Daily Mission Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {week.days.map((day, di) => {
                      const Icon = subjectIcons[day.subject] || BookOpen;
                      const conf = priorityConfig[day.priority];
                      const isCompleted = completedQuests[day.id];

                      return (
                        <motion.button
                          key={day.id}
                          onClick={() => toggleQuest(day.id)}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + di * 0.05 }}
                          whileHover={!isCompleted ? { y: -3, boxShadow: "0 12px 24px rgba(0,0,0,0.2)" } : {}}
                          whileTap={{ scale: 0.97 }}
                          className={`relative text-left rounded-2xl p-4 transition-all border ${
                            isCompleted
                              ? "bg-lime-500/10 border-lime-500/40 shadow-lg shadow-lime-500/20"
                              : "glass-card border-border/60 hover:border-cyan-500/40"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <motion.div
                                animate={isCompleted ? { scale: [1, 1.3, 1] } : {}}
                                className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  isCompleted
                                    ? "bg-gradient-to-br from-lime-400 to-green-600 text-white shadow-lg shadow-lime-500/30"
                                    : `${conf.bg} ${conf.color}`
                                }`}
                              >
                                {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                              </motion.div>
                              <div className="text-left">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{day.day}</p>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border inline-block mt-0.5 ${
                                    isCompleted ? "bg-lime-500/20 text-lime-300 border-lime-500/30" : `${conf.bg} ${conf.color} ${conf.border}`
                                  }`}
                                >
                                  {day.subject}
                                </span>
                              </div>
                            </div>
                            <span className={`text-xs font-bold flex items-center gap-1 ${isCompleted ? "text-lime-300" : "text-amber-400"}`}>
                              +{day.xp} <Zap className="h-3 w-3" />
                            </span>
                          </div>

                          <h4 className={`text-sm font-bold line-clamp-2 mb-2 ${isCompleted ? "text-lime-300" : "text-foreground"}`}>
                            {day.topic}
                          </h4>

                          <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                            <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                              <Clock className="h-3 w-3" /> {day.hours}h
                            </span>
                            <div className={`h-2 w-2 rounded-full ${isCompleted ? "bg-lime-400 shadow-[0_0_6px_rgba(132,204,22,0.5)]" : conf.color} bg-current`} />
                            <span className="text-xs text-muted-foreground font-medium capitalize">{day.priority}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Completion Motivator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-lime-500/10 p-6 text-center relative overflow-hidden"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
              <div className="relative z-10 space-y-3">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }} className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-lime-500 text-black shadow-lg shadow-cyan-500/25">
                  <Trophy className="h-6 w-6" />
                </motion.div>
                <h3 className="font-bold text-lg">Stick to the plan, crush your goals!</h3>
                <p className="text-sm text-muted-foreground">Complete daily missions to earn XP, level up, and unlock achievements. Consistency is your superpower.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
