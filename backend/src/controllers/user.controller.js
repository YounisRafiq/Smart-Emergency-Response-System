const EmergencyContact = require("../models/emergenyContact.model");
const userModel = require("../models/user.model");

const addEmergencyContact = async (req, res) => {
  try {
    const userId = req.user.id;
  
    console.log("User" , userId)

    const { name, phone, relation } = req.body;

    console.log(name , phone , relation)

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "userId NOT Found",
      });
    }

    if (
      !name ||
      name.trim() === "" ||
      !phone ||
      phone.trim() === "" ||
      !relation ||
      relation.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    const contact = await EmergencyContact.create({
      name,
      relation,
      phone,
      user: userId,
    });

    res.status(200).json({
      success: true,
      contact,
      message: "Emergency Contact Addedd SuccessFully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  addEmergencyContact,
  getProfile,
};
