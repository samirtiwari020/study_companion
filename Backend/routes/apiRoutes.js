import express from 'express';
import multer from 'multer';
import { generateOnePager } from '../controllers/aiController.js';
import { generatePracticeQuestion } from '../controllers/practiceController.js';
import { generateInterviewQuestions, evaluateInterview } from '../controllers/interviewController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Route for One-Pager generation
router.post('/generate-one-pager', upload.single('document'), generateOnePager);

// Route for Practice Mode Question Generation
router.post('/generate-practice', generatePracticeQuestion);

// Routes for AI Interviewer
router.post('/interview/generate', generateInterviewQuestions);
router.post('/interview/evaluate', evaluateInterview);

export default router;
