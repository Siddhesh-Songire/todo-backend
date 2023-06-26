import jwt from "jsonwebtoken";

export const sendCookie = (user, res, status_code = 201, message) => {
  const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

  res
    .status(status_code)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message: message,
    });
};
