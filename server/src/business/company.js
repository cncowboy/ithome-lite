const getActiveCompany = (req, res) => {
  if (req.user) {
    const user = req.user;

    res.json(req.user);

  } else {
    res.end(config.messages.getUserDataTestError);
  }
};
