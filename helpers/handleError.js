module.exports = function handleError(res, error) {
  console.log(error);
  return res.status(500).send({ error });
}