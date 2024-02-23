export default (err, req, res, next) => {
  console.error(err);

  return res
    .status(500)
    .json({ errorMessage: "서버에서 에러가 발생했습니다." });
};
