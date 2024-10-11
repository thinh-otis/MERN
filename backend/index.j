require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cloudinary = require('./config/cloudinaryConfig');
const router = require('./routes/index');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const Traffic = require('./models/Traffic');

const app = express();

app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Routes
app.use("/api", router);

app.get('/api/test', (req, res) => {
    res.json({ message: "API is working!" });
});

// Kiểm tra kết nối MongoDB và Cloudinary
app.get('/api/test', async (req, res) => {
    try {
        await connectDB(); // Kiểm tra MongoDB
        await cloudinary.api.ping(); // Kiểm tra Cloudinary
        res.send('Both MongoDB and Cloudinary are working!');
    } catch (error) {
        console.error('Test failed:', error);
        res.status(500).send('Test failed');
    }
});

// Middleware 
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Kiểm tra biến môi trường FRONTEND_URL
if (!process.env.FRONTEND_URL) {
    console.error('FRONTEND_URL is not defined in .env');
    process.exit(1);
}

// Thiết lập Content Security Policy
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "https://res.cloudinary.com", "data"],
         scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://vercel.live"],
    },
}));

// Endpoint để lấy dữ liệu lượng truy cập
app.get('/api/traffic-data', async (req, res) => {
    const data = await Traffic.find({});
    res.json(data);
});

// Kết nối với MongoDB
const startServer = async () => {
    try {
        await connectDB();
        console.log("MongoDB connected successfully");

        // Thêm dữ liệu mẫu nếu chưa có dữ liệu
        const count = await Traffic.countDocuments();
        if (count === 0) {
            await Traffic.insertMany([
                { date: new Date('2024-10-01'), visits: 100 },
                { date: new Date('2024-10-02'), visits: 150 },
                { date: new Date('2024-10-03'), visits: 200 }
            ]);
            console.log("Sample traffic data added.");
        }

        // Route để ghi nhận traffic
        app.post('/api/track-traffic', async (req, res) => {
            try {
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth();
                const currentYear = currentDate.getFullYear();

                const trafficData = await Traffic.find();
                const monthlyData = trafficData.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
                });

                if (monthlyData.length === 0) {
                    await Traffic.deleteMany({});
                }

                const newTraffic = new Traffic({
                    date: currentDate,
                    visits: 1,
                });

                await newTraffic.save();
                res.status(201).send('Traffic recorded successfully');
            } catch (error) {
                console.error('Error tracking traffic', error);
                res.status(500).send('Error tracking traffic');
            }
        });

        // Route để phục vụ index.html cho tất cả các yêu cầu không phải API
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
        });

    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
};

// Bắt đầu server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Khởi động server
startServer();
