const EmergencyContact = require("../models/emergenyContact.model");

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

    const messages = contacts.map((contact) => {
      return {
        name: contact.name,
        phone: contact.phone,
        message: `🚨 Emergency Alert!
User needs help.
Location: ${latitude || "N/A"}, ${longitude || "N/A"}
Time: ${time}`,
      };
    });

    messages.forEach((msg) => {
      console.log("Sending to:", msg.phone);
      console.log(msg.message);
    });

    return res.status(200).json({
      success: true,
      message: "Emergency messages triggered successfully",
      data: messages,
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
}
