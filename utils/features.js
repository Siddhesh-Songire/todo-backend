import jwt from "jsonwebtoken";

export const sendCookie = (user, res) => {
  const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message: "Registerd Successfully",
    });
};
