export function buildUserQuery(searchTerm, perPage, offset) {
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

  return { queryText, queryParams };
}

export function buildUserCountQuery(searchTerm) {
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

  return { countQueryText, countQueryParams };
}

