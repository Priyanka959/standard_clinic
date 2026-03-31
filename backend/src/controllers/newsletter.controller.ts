import { Request, Response } from 'express';
import Subscriber from '../models/subscriber.model';

// @desc    Subscribe to newsletter
// @route   POST /api/subscribers
// @access  Public
export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      if (!existingSubscriber.isActive) {
        existingSubscriber.isActive = true;
        await existingSubscriber.save();
        return res.status(200).json({ success: true, message: 'Subscription reactivated' });
      }
      return res.status(400).json({ success: false, message: 'Already subscribed' });
    }

    const subscriber = await Subscriber.create({ email });

    res.status(201).json({
      success: true,
      data: subscriber,
      message: 'Successfully subscribed to the newsletter'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};