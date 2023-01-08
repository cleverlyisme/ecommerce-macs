const Currency = (price) => {
  return price.toLocaleString("vi", { style: "currency", currency: "VND" });
};

export default Currency;
