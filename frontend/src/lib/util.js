import "server-only";

import db from "@/lib/db";

export async function getUser(email) {
  try {
    // const tableExists = await db.query(
    //   "SELECT to_regclass('public.adminusers') IS NOT NULL AS exists"
    // );

    // if (!tableExists.rows[0].exists) {
    //   await db.query(`
    //     CREATE TABLE adminusers (
    //       id SERIAL PRIMARY KEY,
    //       email VARCHAR(255) UNIQUE NOT NULL,
    //       password VARCHAR(255) NOT NULL
    //     )
    //   `);

    //   await db.query(
    //     "INSERT INTO adminusers (email, password) VALUES ($1, $2)",
    //     [
    //       "user@user.com",
    //       "$2a$12$5N5yKaIIW6PQ2JFP.aBSy.dYGTBGq5pC1f9lA/Adkb3HmdafCkeum"
    //     ]
    //   );

    //   console.log("Users table created and default user inserted.");
    // }
    const result = await db.query(
      "SELECT * FROM adminusers WHERE email = $1 LIMIT 1",
      [email]
    );
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
}
