import { motion, type Variants } from "framer-motion";
import { CalendarDays, CheckCircle2, Circle, Clock, Plus, Target, Flag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

type TaskType = "topic" | "mock_test";

interface Task {
  id: number;
  title: string;
  type: TaskType;
  priority: "high" | "medium" | "low";
  completed: boolean;
  targetDate: string;
}

const initialTasks: Task[] = [
  { id: 1, title: "Newton's Laws of Motion", type: "topic", priority: "high", completed: false, targetDate: "2026-03-21" },
  { id: 2, title: "Full Syllabus JEE Mock Test", type: "mock_test", priority: "high", completed: false, targetDate: "2026-03-25" },
  { id: 3, title: "Organic Chemistry - Alkanes", type: "topic", priority: "medium", completed: true, targetDate: "2026-03-20" },
];

const priorityStyles = {
  high: "text-destructive bg-destructive/10 border-destructive/20",
  medium: "text-warning bg-warning/10 border-warning/20",
  low: "text-success bg-success/10 border-success/20",
};

export default function StudyPlanner() {
  const [taskList, setTaskList] = useState<Task[]>(initialTasks);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form State
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newType, setNewType] = useState<TaskType>("topic");
  const [newDate, setNewDate] = useState("");
  
  const completedCount = taskList.filter((t) => t.completed).length;
  const progress = taskList.length > 0 ? (completedCount / taskList.length) * 100 : 0;

  const toggleTask = (id: number) => {
    setTaskList((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const addTask = () => {
    if (!newTaskTitle || !newDate) return;
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      type: newType,
      priority: newType === "mock_test" ? "high" : "medium",
      completed: false,
      targetDate: newDate,
    };
    setTaskList([newTask, ...taskList]);
    setShowAddForm(false);
    setNewTaskTitle("");
    setNewDate("");
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Smart Calendar & Goals</h1>
          <p className="text-muted-foreground text-sm mt-1">Track topic completion deadlines and mock tests.</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} variant="outline" className="gap-2">
          {showAddForm ? "Cancel" : <><Plus className="w-4 h-4"/> Add Goal</>}
        </Button>
      </motion.div>

      {showAddForm && (
        <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: "auto"}} className="glass-card p-5 space-y-4">
           <h3 className="font-semibold text-sm">Create New Target</h3>
           <div className="grid md:grid-cols-3 gap-4">
              <input 
                value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)}
                placeholder="Topic or Test Name..." 
                className="col-span-1 md:col-span-2 bg-background border border-border p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input 
                type="date"
                value={newDate} onChange={e => setNewDate(e.target.value)}
                className="bg-background border border-border p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
           </div>
           <div className="flex gap-4 items-center">
              <label className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                 <input type="radio" checked={newType === "topic"} onChange={() => setNewType("topic")} className="accent-primary"/> 
                 <span>Syllabus Topic</span>
              </label>
              <label className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                 <input type="radio" checked={newType === "mock_test"} onChange={() => setNewType("mock_test")} className="accent-primary"/> 
                 <span>Mock Test</span>
              </label>
           </div>
           <Button onClick={addTask} variant="gradient" disabled={!newTaskTitle || !newDate}>Save Target</Button>
        </motion.div>
      )}

      <motion.div variants={fadeUp} className="glass-card p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Total Progress</span>
          <span className="text-muted-foreground">{completedCount}/{taskList.length} goals met</span>
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
            className={`glass-card p-4 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer transition-all border ${
              task.completed ? "opacity-60 border-transparent" : "border-primary/10 hover:border-primary/30"
            }`}
            onClick={() => toggleTask(task.id)}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4 flex-1">
              {task.completed ? (
                <CheckCircle2 className="h-6 w-6 text-success shrink-0" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-base ${task.completed ? "line-through text-muted-foreground" : ""}`}>{task.title}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                     {task.type === "topic" ? <Target className="w-3 h-3 text-blue-400"/> : <Flag className="w-3 h-3 text-red-400"/>}
                     {task.type === "topic" ? "Syllabus Topic" : "Mock Test"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-end shrink-0 pl-10 md:pl-0">
              <div className="flex flex-col md:items-end w-full md:w-auto mt-2 md:mt-0">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" /> Target Date:
                </span>
                <span className={`font-medium text-sm ${new Date(task.targetDate) < new Date() && !task.completed ? "text-destructive" : ""}`}>
                  {task.targetDate}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
        {taskList.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No active targets. Time to set some goals!
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
