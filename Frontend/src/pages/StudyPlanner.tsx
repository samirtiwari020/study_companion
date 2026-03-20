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
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

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

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarCheck className="h-6 w-6 text-primary" />
          Study Planner
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Tell us about your exam and we'll generate your personalized mission list.
        </p>
      </motion.div>

      {/* Input Form */}
      <motion.div variants={fadeUp} className="glass-card p-6 md:p-8 border border-primary/10">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h2 className="font-semibold text-lg">Generate Your Plan</h2>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5">
          {/* Exam Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Exam Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {examOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setExamType(opt.value)}
                  className={`flex items-center gap-2.5 p-3.5 rounded-xl border text-sm font-medium transition-all ${
                    examType === opt.value
                      ? "border-primary bg-primary/5 text-primary shadow-sm shadow-primary/10 scale-[1.02]"
                      : "border-border/60 hover:border-primary/30 hover:bg-muted/30 text-muted-foreground hover:scale-[1.01]"
                  }`}
                >
                  <opt.icon className={`h-4 w-4 shrink-0 transition-colors ${examType === opt.value ? "text-primary" : ""}`} />
                  <span className="truncate">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time + Weak Subjects */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="time-remaining">
                Time Remaining
              </label>
              <div className="relative group">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="time-remaining"
                  placeholder="e.g. 3 months, 45 days"
                  value={timeRemaining}
                  onChange={(e) => setTimeRemaining(e.target.value)}
                  className="pl-10 h-11 border-border/60 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="weak-subjects">
                Weak Subjects
              </label>
              <div className="relative group">
                <AlertTriangle className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="weak-subjects"
                  placeholder="e.g. Organic Chemistry, Calculus"
                  value={weakSubjects}
                  onChange={(e) => setWeakSubjects(e.target.value)}
                  className="pl-10 h-11 border-border/60 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="gradient-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all gap-2 group w-full sm:w-auto rounded-xl btn-lift mt-2"
          >
            <Sparkles className="h-4 w-4" />
            Generate Mission List
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </motion.div>

      {/* Generated Plan */}
      <AnimatePresence>
        {showPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 mt-8"
          >
            {/* Plan header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-primary/10 p-5 rounded-2xl border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative z-10">
                <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-primary">
                  <Shield className="h-5 w-5" />
                  Active Quest Log
                </h2>
                <p className="text-sm text-primary/80 mt-0.5 font-medium">
                  {examType === "jee" ? "JEE" : examType === "neet" ? "NEET" : "UPSC"} Focus • {generatedPlan.reduce((acc, w) => acc + w.days.length, 0)} Total Missions
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-xs bg-background/50 backdrop-blur p-2 rounded-xl border border-primary/10">
                <span className="flex items-center gap-1.5 px-2 font-medium"><div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" /> High</span>
                <span className="flex items-center gap-1.5 px-2 font-medium"><div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" /> Med</span>
                <span className="flex items-center gap-1.5 px-2 font-medium"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Low</span>
              </div>
            </div>

            {/* Timeline weeks (Missions) */}
            <div className="space-y-8">
              {generatedPlan.map((week, wi) => (
                <motion.div
                  key={week.week}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: wi * 0.15 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-primary/20">
                      {wi + 1}
                    </div>
                    <h3 className="font-bold text-lg">{week.week}</h3>
                    <div className="h-px bg-border flex-1 ml-4" />
                  </div>

                  {/* Quest Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {week.days.map((day) => {
                      const Icon = subjectIcons[day.subject] || BookOpen;
                      const conf = priorityConfig[day.priority];
                      const isCompleted = completedQuests[day.id];

                      return (
                        <motion.button
                          key={day.id}
                          onClick={() => toggleQuest(day.id)}
                          whileHover={{ scale: 1.02, translateY: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative text-left w-full rounded-2xl p-4 transition-all duration-300 border ${
                            isCompleted 
                              ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]" 
                              : "glass-card border-border hover:border-primary/30"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <motion.div 
                                animate={isCompleted ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                                className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm ${
                                  isCompleted ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-emerald-500/30" : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                              </motion.div>
                              <div>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">{day.day}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${isCompleted ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 glow-emerald' : `${conf.bg} ${conf.color} ${conf.border}`}`}>
                                  {day.subject}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`text-xs font-black flex items-center gap-1 justify-end ${isCompleted ? 'text-emerald-500' : 'text-amber-500'}`}>
                                +{day.xp} XP <Sparkles className="h-3 w-3" />
                              </span>
                            </div>
                          </div>

                          <h4 className={`text-base font-bold mb-1 line-clamp-2 ${isCompleted ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                            {day.topic}
                          </h4>
                          
                          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
                            <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                              <Clock className="h-3.5 w-3.5" /> {day.hours}h Mission
                            </span>
                            <div className="flex items-center gap-1.5">
                              <div className={`h-2 w-2 rounded-full bg-current ${isCompleted ? 'text-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : conf.color}`} />
                              <span className="text-xs text-muted-foreground font-medium capitalize">{day.priority} impact</span>
                            </div>
                          </div>
                          
                          {/* Success overlay highlight */}
                          {isCompleted && (
                            <motion.div 
                              initial={{ opacity: 0 }} 
                              animate={{ opacity: 1 }} 
                              className="absolute inset-0 rounded-2xl border-2 border-emerald-500/50 pointer-events-none"
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Gamified summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center pt-8 pb-12"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/20 text-primary mb-3 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <Star className="h-6 w-6 animate-pulse-soft" />
                </div>
                <h3 className="font-bold text-lg">Complete daily missions to earn XP</h3>
                <p className="text-sm text-muted-foreground mt-1">Consistency is the key to unlocking new levels.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
