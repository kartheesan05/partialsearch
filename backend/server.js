const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { db } = require("./lib/db.js");
const { buildUserQuery, buildUserCountQuery } = require("./lib/util.js");
const { authenticateSession } = require("./lib/auth.js");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Add these middleware before your routes
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json());

// Update CORS configuration
app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Protect the users endpoint with authentication
app.get("/api/users", authenticateSession, async (req, res) => {
  try {
    const { page = 1, perPage = 100, searchTerm = "" } = req.query;
    const offset = (page - 1) * perPage;

    const { queryText, queryParams } = buildUserQuery(
      searchTerm,
      perPage,
      offset
    );
    const { rows: users } = await db.query(queryText, queryParams);

    const { countQueryText, countQueryParams } =
      buildUserCountQuery(searchTerm);
    const {
      rows: [{ count }],
    } = await db.query(countQueryText, countQueryParams);

    res.json({
      users,
      totalCount: Number(count),
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
