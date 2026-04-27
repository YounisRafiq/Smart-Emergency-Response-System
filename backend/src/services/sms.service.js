const axios = require("axios");

const sendSMS = async (phone, message) => {
  try {
    const response = await axios.post("https://textbelt.com/text", {
      phone: phone,
      message: message,
      key: process.env.TEXTBELT_API_KEY,
    });

    return response.data;

  } catch (error) {
    console.log("SMS Error:", error.message);
    return null;
  }
};

module.exports = sendSMS;