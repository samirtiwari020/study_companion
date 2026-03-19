import { motion, type Variants } from "framer-motion";
import { FileText, Upload, Sparkles, CreditCard, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const sampleSummary = [
  "Newton's First Law states that an object at rest stays at rest unless acted upon by an external force.",
  "The Second Law relates force, mass, and acceleration: F = ma.",
  "The Third Law: For every action, there is an equal and opposite reaction.",
  "Inertia is the property of matter that resists changes in motion.",
  "These laws form the foundation of classical mechanics.",
];

export default function Notes() {
  const [content, setContent] = useState("# Newton's Laws of Motion\n\nNewton's laws of motion are three fundamental laws of classical mechanics...");
  const [showSummary, setShowSummary] = useState(false);

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Notes & AI Summary</h1>
        <p className="text-muted-foreground text-sm mt-1">Write notes and generate AI-powered summaries</p>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" /> Upload Notes
        </Button>
        <Button variant="gradient" className="gap-2" onClick={() => setShowSummary(true)}>
          <Sparkles className="h-4 w-4" /> Generate Summary
        </Button>
        <Button variant="outline" className="gap-2">
          <CreditCard className="h-4 w-4" /> Convert to Flashcards
        </Button>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm">Editor</h3>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 bg-transparent text-sm leading-relaxed outline-none resize-none placeholder:text-muted-foreground"
            placeholder="Start writing your notes..."
          />
        </motion.div>

        {showSummary && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <List className="h-4 w-4 text-accent" />
              <h3 className="font-semibold text-sm">AI Summary</h3>
            </div>
            <ul className="space-y-3">
              {sampleSummary.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-2 text-sm"
                >
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
