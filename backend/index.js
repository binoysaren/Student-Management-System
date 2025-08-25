const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

//====================== Routes =========================
const Routes = require("./routes/route.js");
const assignmentRoutes = require("./routes/assignmentRoutes.js");
const submissionRoutes = require("./routes/submissionRoutes.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//=============== Middleware ============
app.use(express.json({ limit: '10mb' }));

//================= CORS Configuration ===============
const allowedOrigins = [
  "http://localhost:3000", // local frontend
  "https://edumatrixf.onrender.com" // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

//=================== MongoDB Connection ==================
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection failed:", err.message));

//============== Serve uploaded PDF/DOC files correctly =============
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//================= Mount Routes ======================
app.use('/', Routes); // Main routes
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);

//================ Final fallback ==================
app.get('/', (req, res) => {
  res.send(" School Management Backend Running");
});

//==================== Start Server =======================
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Use a different port or stop other process.`);
  } else {
    console.error(err);
  }
});
