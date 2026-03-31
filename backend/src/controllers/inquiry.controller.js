"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInquiries = exports.createInquiry = void 0;
const inquiry_model_1 = __importDefault(require("../models/inquiry.model"));
// @desc    Submit a new inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
        }
        const inquiry = await inquiry_model_1.default.create({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.createInquiry = createInquiry;
// @desc    Get all inquiries (For admin dashboard context)
// @route   GET /api/inquiries
// @access  Private/Admin
const getInquiries = async (req, res) => {
    try {
        const inquiries = await inquiry_model_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: inquiries.length,
            data: inquiries
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
exports.getInquiries = getInquiries;
//# sourceMappingURL=inquiry.controller.js.map