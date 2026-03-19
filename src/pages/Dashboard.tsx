import { motion, type Variants } from "framer-motion";
import { Flame, BarChart3, CalendarClock, Play, BookOpen, RotateCcw, TrendingUp, Brain, Zap } from "lucide-react";
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

const stats = [
  { label: "Study Streak", value: "12 days", icon: Flame, color: "text-warning" },
  { label: "Retention Score", value: "87%", icon: BarChart3, color: "text-success" },
  { label: "Upcoming Revisions", value: "5 topics", icon: CalendarClock, color: "text-accent" },
  { label: "XP Earned", value: "2,450", icon: Zap, color: "text-primary" },
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
  { topic: "Physics", score: 82, color: "bg-success" },
  { topic: "Chemistry", score: 65, color: "bg-warning" },
  { topic: "Mathematics", score: 91, color: "bg-success" },
  { topic: "Biology", score: 48, color: "bg-destructive" },
];

export default function Dashboard() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-6xl mx-auto">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Learner 👋</h1>
        <p className="text-muted-foreground mt-1">Here's your study overview for today.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card-hover p-4 md:p-5">
            <div className="flex items-center gap-3">
              <div className={`${stat.color} p-2 rounded-lg bg-muted`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
        <Link to="/practice">
          <Button variant="gradient" className="gap-2">
            <Play className="h-4 w-4" /> Start Studying
          </Button>
        </Link>
        <Link to="/practice">
          <Button variant="secondary" className="gap-2">
            <BookOpen className="h-4 w-4" /> Practice Now
          </Button>
        </Link>
        <Link to="/revision">
          <Button variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" /> Revise
          </Button>
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} className="glass-card p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Weekly Progress
          </h3>
          <div className="flex items-end gap-2 h-40">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  className="w-full rounded-t-md gradient-primary"
                  initial={{ height: 0 }}
                  animate={{ height: `${d.value}%` }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
                <span className="text-[10px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-card p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" /> Topic Performance
          </h3>
          <div className="space-y-4">
            {topicPerformance.map((t) => (
              <div key={t.topic}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t.topic}</span>
                  <span className="font-medium">{t.score}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${t.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${t.score}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
