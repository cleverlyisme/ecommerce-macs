import api from "./api";

export const getStatistic = ({ from, to, page, limit }) =>
  api.get("/statistic", {
    params: { from, to, page, limit },
  });
