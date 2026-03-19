import { motion } from "framer-motion";
import { Trophy, Flame, Star, Medal, Zap, Crown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const badges = [
  { name: "First Steps", icon: Star, earned: true, desc: "Complete your first practice" },
  { name: "Streak Master", icon: Flame, earned: true, desc: "7-day study streak" },
  { name: "Quiz Whiz", icon: Zap, earned: true, desc: "Score 90%+ on 5 quizzes" },
  { name: "Topic Conqueror", icon: Crown, earned: false, desc: "Master all subtopics" },
  { name: "Speed Demon", icon: Trophy, earned: false, desc: "Complete 10 quizzes under time" },
  { name: "Perfectionist", icon: Medal, earned: false, desc: "Get 100% on any quiz" },
];

const leaderboard = [
  { rank: 1, name: "Arjun S.", xp: 5200, level: 12 },
  { rank: 2, name: "Priya M.", xp: 4800, level: 11 },
  { rank: 3, name: "Rahul K.", xp: 4500, level: 10 },
  { rank: 4, name: "You", xp: 2450, level: 7, isUser: true },
  { rank: 5, name: "Sneha D.", xp: 2200, level: 6 },
];

export default function Gamification() {
  const xp = 2450;
  const nextLevel = 3000;
  const level = 7;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Gamification</h1>
        <p className="text-muted-foreground text-sm mt-1">Level up through consistent learning</p>
      </motion.div>

      {/* Level + XP */}
      <motion.div variants={fadeUp} className="glass-card p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">{level}</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">Level {level} — Scholar</h3>
            <p className="text-sm text-muted-foreground">{xp} / {nextLevel} XP to next level</p>
          </div>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(xp / nextLevel) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1 text-sm">
            <Flame className="h-4 w-4 text-warning" />
            <span className="font-medium">12 day streak</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Zap className="h-4 w-4 text-primary" />
            <span className="font-medium">{xp} XP total</span>
          </div>
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div variants={fadeUp} className="glass-card p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Medal className="h-4 w-4 text-primary" /> Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {badges.map((b) => (
            <div
              key={b.name}
              className={`p-4 rounded-xl border text-center transition-all ${
                b.earned ? "border-primary/30 bg-primary/5" : "border-border opacity-50"
              }`}
            >
              <b.icon className={`h-6 w-6 mx-auto mb-2 ${b.earned ? "text-primary" : "text-muted-foreground"}`} />
              <p className="text-sm font-medium">{b.name}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{b.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div variants={fadeUp} className="glass-card p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Trophy className="h-4 w-4 text-warning" /> Leaderboard
        </h3>
        <div className="space-y-2">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                (entry as any).isUser ? "gradient-primary text-primary-foreground" : "bg-muted/50"
              }`}
            >
              <span className="font-bold text-lg w-8">{entry.rank}</span>
              <div className="flex-1">
                <p className="font-medium text-sm">{entry.name}</p>
                <p className={`text-xs ${(entry as any).isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>Level {entry.level}</p>
              </div>
              <span className="font-bold text-sm">{entry.xp.toLocaleString()} XP</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
