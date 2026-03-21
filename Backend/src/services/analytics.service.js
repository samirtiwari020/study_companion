import Practice from "../models/Practice.js";
import Revision from "../models/Revision.js";
import Notes from "../models/Notes.js";

export const buildAnalytics = async (userId) => {
  const [practiceCount, correctCount, upcomingRevisions, notesCount] = await Promise.all([
    Practice.countDocuments({ user: userId }),
    Practice.countDocuments({ user: userId, isCorrect: true }),
    Revision.countDocuments({ user: userId, nextRevisionAt: { $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } }),
    Notes.countDocuments({ user: userId })
  ]);

  const accuracy = practiceCount ? Math.round((correctCount / practiceCount) * 100) : 0;

  return {
    practiceCount,
    correctCount,
    accuracy,
    upcomingRevisions,
    notesCount
  };
};
