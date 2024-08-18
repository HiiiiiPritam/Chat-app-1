import jwt from "jsonwebtoken";

export const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign(
    { userId: userId },
    process.env.JWT_SECRET,
    { expiresIn: '10d' } // Token expires in 10 days
  );

  res.cookie("jwtChatApp", token, {
    httpOnly: true,
    secure: true, // Use secure cookies in production (requires HTTPS)
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 10, // Cookie expires in 10 days
  });
};
