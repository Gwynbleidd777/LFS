// middleware/upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2; // Make sure to require Cloudinary and configure it

// Configure Cloudinary (you may need to set your cloudinary config options)
cloudinary.config({
  cloud_name: 'mohit777',
  api_key: '295458925112764',
  api_secret: 'MgqaN5tTpLsLijHkPk9ocH7yzb0',
});

// Multer storage configuration with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
//   params: {
//     folder: 'LFS Items',
//   },
});

const upload = multer({ storage: storage });

module.exports = upload;
