const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_PUBLIC_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{ 
        folder: "class/thumbnails"
    },
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{
        width: 500,
        height: 500,
        crop: "limit"
    }],
});

const upload = multer({ storage: storage });

module.exports = upload;