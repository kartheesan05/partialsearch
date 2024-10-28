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

// Update CORS configuration to allow credentials from any origin
app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

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
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
