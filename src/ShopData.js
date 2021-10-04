const groupData = [
  { code: "mc", name: "Martingale Collars" },
  { code: "cc", name: "Clip Collars" },
  { code: "cl", name: "Collar & Lead" },
  { code: "cb", name: "Collar & Bows" },
  { code: "ha", name: "Harness" },
  { code: "bd", name: "Beds" },
  { code: "tr", name: "Treats" }
];

const productData = [
  {
    group: "mc",
    code: "mc34",
    name: "3/4 inch",
    desc: "Made strong and durable",
    prices: [{ s: 10 }, { m: 20 }, { l: 30 }, { xl: 40 }]
  },
  {
    group: "mc",
    code: "mc10",
    name: "1 inch",
    desc: "Made strong and durable",
    prices: [{ s: 10 }, { m: 20 }, { l: 30 }, { xl: 40 }]
  },
  {
    group: "mc",
    code: "mc15",
    name: "1.5 inch",
    desc: "Made strong and durable",
    prices: [{ s: 10 }, { m: 20 }, { l: 30 }, { xl: 40 }]
  },
  {
    group: "mc",
    code: "mc20",
    name: "2 inch",
    desc: "Made strong and durable",
    prices: [{ s: 10 }, { m: 20 }, { l: 30 }, { xl: 40 }]
  },
  {
    group: "cc",
    code: "cc34",
    name: "3/4 inch",
    desc: "Made strong and durable",
    prices: [{ s: 10 }, { m: 20 }, { l: 30 }, { xl: 40 }]
  },
  {
    group: "cc",
    code: "cc10",
    name: "1 inch",
    desc: "Made strong and durable",
    prices: [{ s: 10 }, { m: 20 }, { l: 30 }, { xl: 40 }]
  },
  {
    group: "cc",
    code: "cc15",
    name: "1.5 inch",
    desc: "Made strong and durable",
    prices: [{ s: 10 }, { m: 20 }, { l: 30 }, { xl: 40 }]
  },
  {
    group: "cc",
    code: "cc20",
    name: "2 inch",
    desc: "Made strong and durable",
    prices: [{ s: 10 }, { m: 20 }, { l: 30 }, { xl: 40 }]
  },
  {
    group: "cl",
    code: "cl10",
    name: "1 inch Clip",
    desc: "Made strong and durable",
    prices: [{ s: 10 }, { m: 20 }, { l: 30 }, { xl: 40 }]
  },
  {
    group: "cl",
    code: "cl15",
    name: "1 1/2 inch Clip",
    desc: "Made strong and durable",
    prices: [{ s: 10 }, { m: 20 }, { l: 30 }, { xl: 40 }]
  },
  {
    group: "cb",
    code: "cb10",
    name: "1 inch Clip",
    desc: "Made strong and durable",
    prices: [{ s: 10 }, { m: 20 }, { l: 30 }, { xl: 40 }]
  },
  {
    group: "cb",
    code: "cb15",
    name: "1 1/2 inch Clip",
    desc: "Made strong and durable",
    prices: [{ s: 10 }, { m: 20 }, { l: 30 }, { xl: 40 }]
  },
  {
    group: "ha",
    code: "harness",
    name: "3 clip harness",
    desc: "Made strong and durable",
    prices: [{ s: 110 }, { m: 120 }, { l: 130 }, { xl: 140 }]
  },
  {
    group: "bd",
    code: "bed",
    name: "Quilted dog bed",
    desc: "Made strong and durable",
    prices: [{ s: 210 }, { m: 220 }, { l: 230 }, { xl: 240 }]
  }
];

const itemData = [
  {
    id: "0",
    group: "mc",
    product: "mc34",
    name: "Black Skulls on white",
    desc: "Our most popular design",
    urls: [
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      "url2", "url3"],
    stock: [{ s: 1 }, { m: 2 }, { l: 0 }, { xl: 0 }]
  },
  {
    id: "1",
    group: "mc",
    product: "mc34",
    name: "Red Skulls on black",
    desc: "Perfect for rebal dogs",
    urls: [
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
      "url2", "url3"],
    stock: [{ s: 0 }, { m: 2 }, { l: 1 }, { xl: 0 }]
  },
  {
    id: "2",
    group: "mc",
    product: "mc10",
    name: "Red Flowers on pink",
    desc: "Perfect for flowery dogs",
    urls: [
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      "url2", "url3"],
    stock: [{ s: 0 }, { m: 0 }, { l: 1 }, { xl: 0 }]
  },
];


export { productGroups, productData, itemData };