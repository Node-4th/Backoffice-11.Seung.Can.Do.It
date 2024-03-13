export default (err, req, res, next) => {
  console.error(err);

  return res.status(500).json({ message: `${err}` });
};
