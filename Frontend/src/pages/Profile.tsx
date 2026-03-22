import { motion } from "framer-motion";
import { Moon, Sun, Bell, User, GraduationCap, LogOut } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const exams = ["JEE Main", "JEE Advanced", "NEET", "UPSC", "GATE"];

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const [selectedExam, setSelectedExam] = useState("JEE Main");
  const [notifications, setNotifications] = useState(true);

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-2xl mx-auto">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Profile & Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account and preferences</p>
      </motion.div>

      {/* Profile card */}
      <motion.div variants={fadeUp} className="glass-card p-6 flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center">
          <User className="h-7 w-7 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Learner</h3>
          <p className="text-sm text-muted-foreground">learner@rankyodha.ai</p>
          <p className="text-xs text-primary mt-1">Level 7 · 2,450 XP</p>
        </div>
      </motion.div>

      {/* Theme toggle */}
      <motion.div variants={fadeUp} className="glass-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === "dark" ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-warning" />}
            <div>
              <p className="font-medium text-sm">Theme</p>
              <p className="text-xs text-muted-foreground">{theme === "dark" ? "Dark" : "Light"} mode</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"}
          </Button>
        </div>
      </motion.div>

      {/* Exam Selection */}
      <motion.div variants={fadeUp} className="glass-card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <h3 className="font-medium text-sm">Target Exam</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {exams.map((exam) => (
            <button
              key={exam}
              onClick={() => setSelectedExam(exam)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedExam === exam ? "gradient-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
            >
              {exam}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={fadeUp} className="glass-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-accent" />
            <div>
              <p className="font-medium text-sm">Notifications</p>
              <p className="text-xs text-muted-foreground">Revision reminders & streak alerts</p>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? "gradient-primary" : "bg-muted"}`}
          >
            <motion.div
              className="absolute top-0.5 h-5 w-5 rounded-full bg-card shadow"
              animate={{ left: notifications ? "calc(100% - 1.375rem)" : "0.125rem" }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.div>

      {/* Sign out */}
      <motion.div variants={fadeUp}>
        <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </motion.div>
    </motion.div>
  );
}
