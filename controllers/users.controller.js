// controllers/users.controller.js
export const getUserProfile = (req, res) => {
  // req.user a été rempli par le middleware protect
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
};