const EmergencyContact = require("../models/emergenyContact.model");
const sendSms = require("../services/sms.service");

const sendEmergencyMessage = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Request",
      });
    }

    const contacts = await EmergencyContact.find({ userId });

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No emergency contacts found",
      });
    }

    const { latitude, longitude } = req.body;
    const time = new Date();

    const messageText = `🚨 Emergency Alert!
User needs help.
Location: ${latitude || "N/A"}, ${longitude || "N/A"}
Time: ${time}`;

    const smsResults = [];

    for (let contact of contacts) {
      console.log("Sending SMS to:", contact.phone);

      const result = await sendSms(contact.phone, messageText);

      smsResults.push({
        name: contact.name,
        phone: contact.phone,
        result,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Emergency SMS sent successfully",
      data: smsResults,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  sendEmergencyMessage
};