const { jwtVerify } = require("jose");

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function verifySession(token) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

const authenticateSession = async (req, res, next) => {
  const sessionCookie = req.cookies?.session;
  
  if (!sessionCookie) {
    return res.status(401).json({ error: "Unauthorized - No session found" });
  }

  const payload = await verifySession(sessionCookie);
  if (!payload) {
    return res.status(401).json({ error: "Unauthorized - Invalid session" });
  }

  if (!payload.email) {
    return res.status(401).json({ error: "Unauthorized - No email found in session" });
  }

  req.user = payload;
  next();
};

module.exports = { authenticateSession };
