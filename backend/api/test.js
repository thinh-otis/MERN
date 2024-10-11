// api/test.js
import connectDB from '../config/db'; // Điều chỉnh đường dẫn theo cấu trúc của bạn
import cloudinary from '../config/cloudinaryConfig';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await connectDB(); // Kiểm tra MongoDB
            await cloudinary.api.ping(); // Kiểm tra Cloudinary
            res.json({ message: "API is working!", status: 'Both MongoDB and Cloudinary are working!' });
        } catch (error) {
            console.error('Test failed:', error);
            res.status(500).json({ error: 'Test failed' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
