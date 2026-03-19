import { motion, type Variants } from "framer-motion";
import { CalendarDays, CheckCircle2, Circle, Clock } from "lucide-react";
import { useState } from "react";

const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

const tasks = [
  { id: 1, topic: "Newton's Laws of Motion", subject: "Physics", priority: "high" as const, completed: false, time: "9:00 AM" },
  { id: 2, topic: "Organic Chemistry - Alkanes", subject: "Chemistry", priority: "high" as const, completed: false, time: "10:30 AM" },
  { id: 3, topic: "Integration by Parts", subject: "Mathematics", priority: "medium" as const, completed: true, time: "12:00 PM" },
  { id: 4, topic: "Cell Division - Mitosis", subject: "Biology", priority: "low" as const, completed: false, time: "2:00 PM" },
  { id: 5, topic: "Electromagnetic Induction", subject: "Physics", priority: "medium" as const, completed: true, time: "4:00 PM" },
];

const priorityStyles = {
  high: "text-destructive bg-destructive/10",
  medium: "text-warning bg-warning/10",
  low: "text-success bg-success/10",
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function StudyPlanner() {
  const [taskList, setTaskList] = useState(tasks);
  const completedCount = taskList.filter((t) => t.completed).length;
  const progress = (completedCount / taskList.length) * 100;

  const toggleTask = (id: number) => {
    setTaskList((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Study Planner</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-generated study schedule for today</p>
      </motion.div>

      <motion.div variants={fadeUp} className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">March 2026</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {days.map((d, i) => (
            <button
              key={d}
              className={`flex flex-col items-center px-3 py-2 rounded-lg text-sm transition-colors min-w-[48px] ${
                i === 2 ? "gradient-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <span className="text-[10px] opacity-70">{d}</span>
              <span className="font-semibold">{17 + i}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="glass-card p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Today's Progress</span>
          <span className="text-muted-foreground">{completedCount}/{taskList.length} tasks</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-3">
        {taskList.map((task) => (
          <motion.div
            key={task.id}
            layout
            className={`glass-card p-4 flex items-center gap-4 cursor-pointer transition-opacity ${
              task.completed ? "opacity-60" : ""
            }`}
            onClick={() => toggleTask(task.id)}
            whileTap={{ scale: 0.98 }}
          >
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`font-medium text-sm ${task.completed ? "line-through" : ""}`}>{task.topic}</p>
              <p className="text-xs text-muted-foreground">{task.subject}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${priorityStyles[task.priority]}`}>
                {task.priority}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {task.time}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
