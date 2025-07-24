const TipRequest = require('../models/TipRequest');

const requestTips = async (req, res) => {
  try {
    const { name, email, whatsapp, consent } = req.body;

    // Validate input
    if (!name || !email || !whatsapp || consent !== true) {
      return res.status(400).json({ message: "All fields are required and consent must be given." });
    }

    const userId = req.user?.id;
    const userEmail = req.user?.email;

    const timeLimit = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

    // 1. Check by userId if logged in
    if (userId) {
      const existingUserRequest = await TipRequest.findOne({
        userId,
        createdAt: { $gte: timeLimit }
      });

      if (existingUserRequest) {
        return res.status(409).json({ message: "⚠️ You can only submit one request every 24 hours." });
      }
    }

    // 2. Also check by email/whatsapp to prevent abuse by guest users
    const existingGuestRequest = await TipRequest.findOne({
      email,
      whatsapp,
      createdAt: { $gte: timeLimit }
    });

    if (existingGuestRequest) {
      return res.status(409).json({ message: "⚠️ Only one request per email/WhatsApp allowed every 24 hours." });
    }

    const newRequest = new TipRequest({
      name,
      email,
      whatsapp,
      consent,
      userId,
      userEmail
    });

    await newRequest.save();

    return res.status(200).json({ message: "✅ Your request has been received." });
  } catch (error) {
    console.error("Error saving tip request:", error);
    return res.status(500).json({ message: "❌ Failed to process your request." });
  }
};

module.exports = { requestTips };
