const mac16inchDesNew = [
  "Apple M1 MAX 10-Core CPU 32-Core GPU 32GB RAM 8TB SSD – NEW",
  "Apple M1 MAX 10-Core CPU 32-Core GPU 64GB RAM 8TB SSD – NEW",
  "Apple M1 MAX 10-Core CPU 24-Core GPU 32GB RAM 8TB SSD – NEW",
  "Apple M1 MAX 10-Core CPU 32-Core GPU 64GB RAM 4TB SSD – NEW",
  "Apple M1 PRO 10-Core CPU 16-core GPU 16GB RAM 8TB SSD – NEW",
  "Apple M1 MAX 10-Core CPU 32-Core GPU 64GB RAM 2TB SSD – NEW",
  "Apple M1 MAX 10-Core CPU 32-Core GPU 32GB RAM 4TB SSD – NEW",
  "Apple M1 MAX 10-Core CPU 24-Core GPU 32GB RAM 4TB SSD – NEW",
  "Apple M1 MAX 10-Core CPU 32-Core GPU 32GB RAM 2TB SSD – NEW",
  "Apple M1 PRO 10-Core CPU 16-core GPU 32GB RAM 4TB SSD – NEW",
];

const mac16inchPriceNew = [
  145990000, 156990000, 135990000, 120000000, 119990000, 110000000, 108990000,
  105990000, 101490000, 100990000,
];

const mac16inchDesOld = [
  "Apple M1 PRO 10-Core CPU 16-core GPU 32GB RAM 4TB SSD – OLD",
  "Apple M1 MAX 10-Core CPU 24-Core GPU 32GB RAM 2TB SSD – OLD",
  "Apple M1 PRO 10-Core CPU 16-core GPU 16GB RAM 4TB SSD – OLD",
  "Apple M1 MAX 10-Core CPU 32-Core GPU 64GB RAM 1TB SSD – OLD",
  "Apple M1 PRO 10-Core CPU 16-core GPU 32GB RAM 2TB SSD – OLD",
  "Apple M1 MAX 10-Core CPU 32-Core GPU 32GB RAM 1TB SSD – OLD",
  "Apple M1 MAX 10-Core CPU 24-Core GPU 32GB RAM 1TB SSD – OLD",
  "Apple M1 PRO 10-Core CPU 16-core GPU 32GB RAM 1TB SSD – OLD",
  "Apple M1 PRO 10-Core CPU 16-core GPU  16GB RAM 2TB SSD – OLD",
];

const mac16inchPriceOld = [
  75990000, 60890000, 60890000, 59990000, 54990000, 50990000, 47990000,
  44990000, 44990000,
];

const mac14inchDesNew = [
  "Apple M1 MAX 10-Core CPU 32-Core GPU 32GB RAM 8TB SSD – NEW",
  "Apple M1 MAX 10-Core CPU 24-Core GPU 32GB RAM 8TB SSD – NEW",
  "Apple M1 PRO 10-Core CPU 16-Core GPU 32GB RAM 8TB SSD – NEW",
  "Apple M1 PRO 10-Core CPU 14-Core GPU 32GB RAM 8TB SSD – NEW",
  "Apple M1 PRO 8-Core CPU 14-Core GPU 32GB RAM 8TB SSD – NEW",
  "Apple M1 PRO 10-Core CPU 16-Core GPU 16GB RAM 8TB SSD – NEW",
  "Apple M1 PRO 10-Core CPU 14-Core GPU 16GB RAM 8TB SSD – NEW",
  "Apple M1 PRO 8-Core CPU 14-Core GPU 16GB RAM 8TB SSD – NEW",
  "Apple M1 MAX 10-Core CPU 32-Core GPU 32GB RAM 4TB SSD – NEW",
  "Apple M1 MAX 10-Core CPU 24-Core GPU 32GB RAM 4TB SSD – NEW",
];

const mac14inchPriceNew = [
  135990000, 129990000, 124990000, 122490000, 117990000, 114990000, 112990000,
  108490000, 105990000, 100990000,
];

const mac14inchDesOld = [
  "Apple M1 MAX 10-Core CPU 24-Core GPU 32GB RAM 4TB SSD – OLD",
  "Apple M1 PRO 10-Core CPU 16-Core GPU 32GB RAM 4TB SSD – OLD",
  "Apple M1 PRO 10-Core CPU 14-Core GPU 32GB RAM 4TB SSD – OLD",
  "Apple M1 PRO 8-Core CPU 14-Core GPU 32GB RAM 4TB SSD – OLD",
  "Apple M1 MAX 10-Core CPU 24-Core GPU 32GB RAM 2TB SSD – OLD",
  "Apple M1 PRO 10-Core CPU 16-Core GPU 16GB RAM 4TB SSD – OLD",
  "Apple M1 MAX 10-Core CPU 32-Core GPU 32GB RAM 2TB SSD – OLD",
  "Apple M1 PRO 10-Core CPU 14-Core GPU 16GB RAM 4TB SSD – OLD",
  "Apple M1 PRO 10-Core CPU 16-Core GPU 32GB RAM 2TB SSD – OLD",
  "Apple M1 PRO 8-Core CPU 14-Core GPU 16GB RAM 4TB SSD – OLD",
];

const mac14inchPriceOld = [
  70990000, 65990000, 63990000, 58990000, 56990000, 56990000, 55990000,
  53990000, 51990000, 49990000,
];

const macs16inchNew = mac16inchDesNew.map((item, index) => {
  return {
    name: "MacBook Pro 2021 16 inch",
    description: item,
    price: mac16inchPriceNew[index],
    status: "Mới",
    categoryName: "MacBook Pro",
    cpuName: "Intel",
  };
});

const macs16inchOld = mac16inchDesOld.map((item, index) => {
  return {
    name: "MacBook Air 2021 16 inch",
    description: item,
    price: mac16inchPriceOld[index],
    status: "Cũ",
    categoryName: "MacBook Air",
    cpuName: "M1",
  };
});

const macs14inchNew = mac14inchDesNew.map((item, index) => {
  return {
    name: "MacBook Pro 2021 14 inch",
    description: item,
    price: mac14inchPriceNew[index],
    status: "Mới",
    categoryName: "MacBook Pro",
    cpuName: "M1",
  };
});

const macs14inchOld = mac16inchDesOld.map((item, index) => {
  return {
    name: "MacBook Air 2021 14 inch",
    description: item,
    price: mac14inchPriceOld[index],
    status: "Cũ",
    categoryName: "MacBook Air",
    cpuName: "Intel",
  };
});

const sampleProducts = [
  ...macs16inchNew,
  ...macs16inchOld,
  ...macs14inchNew,
  ...macs14inchOld,
];

const sampleUsers = [
  {
    email: "admin@gmail.com",
    phone: "0123456789",
    password: "admin",
    role: "Admin",
  },
];

const sampleCategories = [
  { name: "MacBook Pro", cpu: [{ text: "Intel" }, { text: "M1" }] },
  { name: "MacBook Air", cpu: [{ text: "Intel" }, { text: "M1" }] },
];

module.exports = { sampleUsers, sampleProducts, sampleCategories };
