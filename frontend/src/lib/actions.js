"use server";

import { db } from "@/lib/db";

export async function getUsers(page = 1, perPage = 100, searchTerm = "") {
  const offset = (page - 1) * perPage;

  let queryText = `
    SELECT id, first_name, second_name, email
    FROM users
    WHERE 1=1
  `;
  const queryParams = [];

  if (searchTerm) {
    queryText += `
      AND (first_name ILIKE $1 OR second_name ILIKE $1 OR email ILIKE $1)
    `;
    queryParams.push(`%${searchTerm}%`);
  }

  queryText += `
    LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
  `;
  queryParams.push(perPage, offset);

  const { rows: results } = await db.query(queryText, queryParams);

  let countQueryText = `
    SELECT COUNT(*) as count
    FROM users
    WHERE 1=1
  `;
  const countQueryParams = [];

  if (searchTerm) {
    countQueryText += `
      AND (first_name ILIKE $1 OR second_name ILIKE $1 OR email ILIKE $1)
    `;
    countQueryParams.push(`%${searchTerm}%`);
  }

  const { rows: [{ count }] } = await db.query(countQueryText, countQueryParams);

  console.log("called getUsers");

  return {
    users: results,
    totalCount: Number(count),
  };
}
