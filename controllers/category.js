exports.create = (req, res) => {
  res.json({
    successMsg: `${req.body.category} added`,
  });
};
