const service = require("../services/statistic.service");

const getStatistic = async (req, res) => {
  try {
    const { from, to, limit, page } = req.query;

    const data = await service.getStatistic({ from, to, limit, page });

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { getStatistic };
