require('dotenv').config(); // Tải biến môi trường từ .env nếu bạn đang phát triển

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Kiểm tra kết nối Cloudinary
cloudinary.api.ping()
    .then(() => console.log("Cloudinary connected successfully"))
    .catch(err => console.error(`Error connecting to Cloudinary: ${err.message}`));

module.exports = cloudinary; // Xuất để sử dụng ở các tệp khác
