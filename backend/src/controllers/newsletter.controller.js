"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeNewsletter = void 0;
const subscriber_model_1 = __importDefault(require("../models/subscriber.model"));
// @desc    Subscribe to newsletter
// @route   POST /api/subscribers
// @access  Public
const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        const existingSubscriber = await subscriber_model_1.default.findOne({ email });
        if (existingSubscriber) {
            if (!existingSubscriber.isActive) {
                existingSubscriber.isActive = true;
                await existingSubscriber.save();
                return res.status(200).json({ success: true, message: 'Subscription reactivated' });
            }
            return res.status(400).json({ success: false, message: 'Already subscribed' });
        }
        const subscriber = await subscriber_model_1.default.create({ email });
        res.status(201).json({
            success: true,
            data: subscriber,
            message: 'Successfully subscribed to the newsletter'
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
exports.subscribeNewsletter = subscribeNewsletter;
//# sourceMappingURL=newsletter.controller.js.map