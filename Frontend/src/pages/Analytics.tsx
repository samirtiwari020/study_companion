import { motion, type Variants } from "framer-motion";
import { BarChart3, Clock, Target, TrendingUp, AlertTriangle, BookOpen } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const overviewStats = [
  { label: "Overall Accuracy", value: "78%", icon: Target, change: "+5% this week", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  { label: "Time Spent", value: "24.5h", icon: Clock, change: "+3.2h this week", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { label: "Questions Solved", value: "342", icon: BarChart3, change: "+48 this week", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { label: "Improvement", value: "+12%", icon: TrendingUp, change: "vs last month", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
];

/* Accuracy trend data */
const accuracyData = [
  { day: "Mar 6", accuracy: 60 },
  { day: "Mar 7", accuracy: 55 },
  { day: "Mar 8", accuracy: 62 },
  { day: "Mar 9", accuracy: 58 },
  { day: "Mar 10", accuracy: 65 },
  { day: "Mar 11", accuracy: 70 },
  { day: "Mar 12", accuracy: 68 },
  { day: "Mar 13", accuracy: 72 },
  { day: "Mar 14", accuracy: 75 },
  { day: "Mar 15", accuracy: 73 },
  { day: "Mar 16", accuracy: 78 },
  { day: "Mar 17", accuracy: 80 },
  { day: "Mar 18", accuracy: 82 },
  { day: "Mar 19", accuracy: 78 },
];

/* Subject-wise bar data */
const subjectData = [
  { subject: "Physics", score: 82, questions: 95 },
  { subject: "Chemistry", score: 65, questions: 78 },
  { subject: "Maths", score: 88, questions: 110 },
  { subject: "Biology", score: 52, questions: 59 },
];

/* Radar data */
const radarData = [
  { skill: "Mechanics", value: 92 },
  { skill: "Thermo", value: 78 },
  { skill: "Organic", value: 55 },
  { skill: "Calculus", value: 88 },
  { skill: "Optics", value: 42 },
  { skill: "Algebra", value: 95 },
];

/* Topics breakdown */
const topics = [
  { name: "Mechanics", accuracy: 92, status: "strong" as const, questions: 45 },
  { name: "Algebra", accuracy: 95, status: "strong" as const, questions: 38 },
  { name: "Calculus", accuracy: 88, status: "strong" as const, questions: 32 },
  { name: "Thermodynamics", accuracy: 78, status: "strong" as const, questions: 28 },
  { name: "Inorganic Chemistry", accuracy: 65, status: "average" as const, questions: 22 },
  { name: "Organic Chemistry", accuracy: 55, status: "average" as const, questions: 25 },
  { name: "Optics", accuracy: 42, status: "weak" as const, questions: 18 },
  { name: "Genetics", accuracy: 35, status: "weak" as const, questions: 15 },
];

const statusColor = { strong: "bg-emerald-500", average: "bg-amber-500", weak: "bg-red-500" };
const statusBadge = {
  strong: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  average: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  weak: "text-red-500 bg-red-500/10 border-red-500/20",
};

const weakAreas = topics.filter((t) => t.status === "weak" || t.status === "average");

export default function Analytics() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8 max-w-5xl mx-auto">
      {/* Header with Level Progress */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/30 glow-primary z-10 relative">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            {/* Decorative ring */}
            <div className="absolute inset-[-4px] rounded-2xl border-2 border-primary/30 rotate-12" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              Performance Stats <Target className="h-5 w-5 text-amber-500" />
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1 text-primary">Track your skills and level up!</p>
          </div>
        </div>

        {/* Level Banner */}
        <div className="bg-background/50 border border-primary/20 backdrop-blur-md rounded-2xl p-4 flex items-center gap-5 shadow-sm inset-shadow-sm min-w-[280px]">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-bold">Level 5</span>
              <span className="text-xs font-bold text-amber-500">2400 / 3000 XP</span>
            </div>
            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ duration: 1.5, delay: 0.2, type: "spring" }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground font-medium mt-1.5">+600 XP to Level 6</p>
          </div>
          <div className="h-10 w-10 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <span className="text-amber-500 font-black text-lg">5</span>
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <div key={stat.label} className={`glass-card rounded-2xl p-5 border-2 ${stat.border} hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group`}>
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div className={`${stat.bg} p-2.5 rounded-xl shadow-inner`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">{stat.label}</span>
            </div>
            <p className="text-3xl font-black relative z-10">{stat.value}</p>
            <div className="flex items-center gap-1 mt-2 relative z-10">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <p className="text-xs text-emerald-500 font-bold">{stat.change}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Accuracy trend — 2 cols */}
        <motion.div variants={fadeUp} className="glass-card rounded-2xl p-5 lg:col-span-2">
          <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Accuracy Trend
          </h3>
          <p className="text-[10px] text-muted-foreground mb-4">Last 14 days</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accuracyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" domain={[40, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Accuracy"]}
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#accuracyGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Radar chart */}
        <motion.div variants={fadeUp} className="glass-card rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" /> Skill Radar
          </h3>
          <p className="text-[10px] text-muted-foreground mb-2">Topic strengths</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Subject performance bar chart + Weak areas */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Subject bar chart */}
        <motion.div variants={fadeUp} className="glass-card rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" /> Subject Performance
          </h3>
          <p className="text-[10px] text-muted-foreground mb-4">Average accuracy by subject</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="subject" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number, name: string) => [
                    name === "score" ? `${value}%` : value,
                    name === "score" ? "Accuracy" : "Questions"
                  ]}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]} fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Weak areas */}
        <motion.div variants={fadeUp} className="glass-card rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" /> Weak Areas
          </h3>
          <p className="text-[10px] text-muted-foreground mb-4">Topics that need more attention</p>
          <div className="space-y-3">
            {weakAreas.map((t) => (
              <div key={t.name} className={`p-3.5 rounded-xl border ${statusBadge[t.status].split(" ").slice(1).join(" ")}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">{t.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{t.questions} Qs</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${statusBadge[t.status]}`}>
                      {t.status}
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${statusColor[t.status]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${t.accuracy}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-muted-foreground">Accuracy</span>
                  <span className={`text-xs font-bold ${t.status === "weak" ? "text-red-500" : "text-amber-500"}`}>{t.accuracy}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Topic breakdown table */}
      <motion.div variants={fadeUp} className="glass-card rounded-2xl p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" /> All Topics Breakdown
        </h3>
        <div className="space-y-3">
          {topics.map((t) => (
            <div key={t.name} className="space-y-1.5 p-3 rounded-xl bg-muted/20 md:p-0 md:bg-transparent md:rounded-none md:space-y-0 md:flex md:items-center md:gap-4">
              <div className="flex items-center justify-between md:w-44 md:block">
                <span className="text-sm font-medium truncate">{t.name}</span>
                <div className="flex items-center gap-2 md:hidden">
                  <span className="text-xs text-muted-foreground">{t.questions} Qs</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${statusBadge[t.status]}`}>
                    {t.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 md:flex-1 md:gap-4">
                <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${statusColor[t.status]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${t.accuracy}%` }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </div>
                <span className="text-sm font-bold w-10 text-right">{t.accuracy}%</span>
              </div>
              <span className="hidden md:inline-block text-xs text-muted-foreground w-12 text-right">{t.questions} Qs</span>
              <span className={`hidden md:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize w-16 text-center ${statusBadge[t.status]}`}>
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
