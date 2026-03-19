import { motion, type Variants } from "framer-motion";
import { CalendarClock, CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

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

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-3xl mx-auto">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Spaced Revision</h1>
        <p className="text-muted-foreground text-sm mt-1">Stay on top of your revision schedule</p>
      </motion.div>

      {sections.map((section) => {
        const items = revisions.filter((r) => r.due === section);
        if (!items.length) return null;
        return (
          <motion.div key={section} variants={fadeUp} className="space-y-3">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">{section}</h2>
              <span className="text-xs text-muted-foreground">{items.filter((i) => i.completed).length}/{items.length}</span>
            </div>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                whileTap={{ scale: 0.98 }}
                className={`glass-card p-4 flex items-center gap-4 cursor-pointer ${item.completed ? "opacity-60" : ""}`}
                onClick={() => toggle(item.id)}
              >
                {item.completed ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </motion.div>
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <div className="flex-1">
                  <p className={`font-medium text-sm ${item.completed ? "line-through" : ""}`}>{item.topic}</p>
                  <p className="text-xs text-muted-foreground">{item.subject}</p>
                </div>
                {!item.completed && (
                  <Button variant="outline" size="sm" className="gap-1 text-xs" onClick={(e) => { e.stopPropagation(); }}>
                    <RotateCcw className="h-3 w-3" /> Revise
                  </Button>
                )}
              </motion.div>
            ))}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
