const getCurrentAdminController = async (req, res) => {
  return res.json({
    user: {
      uid: req.user.uid,
      email: req.user.email ?? null,
      name: req.user.name ?? null,
      picture: req.user.picture ?? null,
    },
  });
};

export {
  getCurrentAdminController,
};