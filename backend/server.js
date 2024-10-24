import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./lib/db.js";
import { buildUserQuery, buildUserCountQuery } from "./lib/util.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Allow CORS from all origins
app.use(express.json());

app.get("/api/users", async (req, res) => {
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
