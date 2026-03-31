import { Router } from 'express';
import { createInquiry, getInquiries } from '../controllers/inquiry.controller';

const router = Router();

router.route('/')
  .post(createInquiry)
  .get(getInquiries); // In production, add auth middleware here

export default router;