const EmergencyContact = require("../models/emergenyContact.model");
const userModel = require("../models/user.model");

const addEmergencyContact = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("User", userId);

    const { name, phone, relation } = req.body;

    console.log(name, phone, relation);

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

const getEmergencyContact = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Request",
      });
    }

    const contacts = await EmergencyContact.findById(userId);

    if (!contacts) {
      return res.status(404).json({
        success: false,
        message: "No Emergency Contact Found" || [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Emergency Contact fetched SuccessFully",
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateEmergencyContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const userId = req.user.id;
    const { name, phone, relation } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Request",
      });
    }

    if (!contactId) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }

    const contact = await EmergencyContact.findOne({
      _id: contactId,
      user: userId,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact NOT Found",
      });
    }

    if (name) contact.name = name;
    if (phone) contact.phone = phone;
    if (relation) contact.relation = relation;

    await contact.save();

    res.status(201).json({
      success: true,
      message: "Contact Updated SuccessFully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteEmergencyContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const userId = req.user.id;

    if (!contactId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Contact ID",
      });
    }

    const deletedContact = await EmergencyContact.findOneAndDelete({
      _id: contactId,
      userId: userId,
    });

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      data: deletedContact,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
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
  getEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
  getProfile,
};
