const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (profileImage) => {
  try {
    if (!profileImage) return null;
    const response = await cloudinary.uploader.upload(profileImage, {
      resource_type: "image",
    });

    fs.unlinkSync(profileImage);

    return response;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    fs.unlinkSync(profileImage);
    return null;
  }
};

module.exports = { uploadImageToCloudinary };
