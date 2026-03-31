import { Request, Response } from 'express';
import Inquiry from '../models/inquiry.model';

// @desc    Submit a new inquiry
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      service,
      message
    });

    res.status(201).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

// @desc    Get all inquiries (For admin dashboard context)
// @route   GET /api/inquiries
// @access  Private/Admin
export const getInquiries = async (req: Request, res: Response) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};