import { motion } from "framer-motion";
import { BarChart3, Clock, Target, TrendingUp } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const overviewStats = [
  { label: "Overall Accuracy", value: "78%", icon: Target, change: "+5%" },
  { label: "Time Spent", value: "24.5h", icon: Clock, change: "+3.2h" },
  { label: "Questions Solved", value: "342", icon: BarChart3, change: "+48" },
  { label: "Improvement", value: "+12%", icon: TrendingUp, change: "This week" },
];

const topics = [
  { name: "Mechanics", accuracy: 92, status: "strong" },
  { name: "Thermodynamics", accuracy: 78, status: "strong" },
  { name: "Organic Chemistry", accuracy: 55, status: "average" },
  { name: "Calculus", accuracy: 88, status: "strong" },
  { name: "Optics", accuracy: 42, status: "weak" },
  { name: "Inorganic Chemistry", accuracy: 65, status: "average" },
  { name: "Algebra", accuracy: 95, status: "strong" },
  { name: "Genetics", accuracy: 35, status: "weak" },
];

const statusColor = {
  strong: "bg-success",
  average: "bg-warning",
  weak: "bg-destructive",
};

const statusBadge = {
  strong: "text-success bg-success/10",
  average: "text-warning bg-warning/10",
  weak: "text-destructive bg-destructive/10",
};

export default function Analytics() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-5xl mx-auto">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Performance Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your progress and identify weak areas</p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <div key={stat.label} className="glass-card-hover p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-success mt-1">{stat.change}</p>
          </div>
        ))}
      </motion.div>

      {/* Accuracy over time chart mock */}
      <motion.div variants={fadeUp} className="glass-card p-5">
        <h3 className="font-semibold mb-4">Accuracy Trend</h3>
        <div className="h-48 flex items-end gap-1">
          {[60, 55, 62, 58, 65, 70, 68, 72, 75, 73, 78, 80, 82, 78].map((v, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t gradient-primary"
              initial={{ height: 0 }}
              animate={{ height: `${v}%` }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
          <span>2 weeks ago</span>
          <span>Today</span>
        </div>
      </motion.div>

      {/* Topic breakdown */}
      <motion.div variants={fadeUp} className="glass-card p-5">
        <h3 className="font-semibold mb-4">Topic Breakdown</h3>
        <div className="space-y-3">
          {topics.map((t) => (
            <div key={t.name} className="flex items-center gap-4">
              <span className="text-sm w-40 truncate">{t.name}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${statusColor[t.status as keyof typeof statusColor]}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${t.accuracy}%` }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              </div>
              <span className="text-sm font-medium w-10 text-right">{t.accuracy}%</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusBadge[t.status as keyof typeof statusBadge]}`}>
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
