const products = [

  { id: 1, category: 'Electronics', type: 'Mobile', brand: 'Apple', model: 'iPhone 14' },
  
  { id: 2, category: 'Electronics', type: 'Mobile', brand: 'Samsung', model: 'Galaxy S23' },
  
  { id: 3, category: 'Electronics', type: 'Laptop', brand: 'Apple', model: 'MacBook Pro' },
  
  { id: 4, category: 'Electronics', type: 'Laptop', brand: 'Dell', model: 'XPS 13' },
  
  { id: 5, category: 'Home Appliances', type: 'Refrigerator', brand: 'LG', model: 'InstaView' },
  
  { id: 6, category: 'Home Appliances', type: 'Washing Machine', brand: 'Samsung', model: 'EcoBubble' },
  
  { id: 7, category: 'Electronics', type: 'Laptop', brand: 'HP', model: 'Spectre x360' },
  
  { id: 8, category: 'Home Appliances', type: 'Microwave', brand: 'Panasonic', model: 'NN-SN936B' },
  
  { id: 9, category: 'Furniture', type: 'Chair', brand: 'Ikea', model: 'Markus' },
  
  { id: 10, category: 'Furniture', type: 'Table', brand: 'Ikea', model: 'Lack' },
  
  { id: 11, category: 'Electronics', type: 'Mobile', brand: 'OnePlus', model: 'OnePlus 11' },
  
  { id: 12, category: 'Electronics', type: 'Tablet', brand: 'Apple', model: 'iPad Pro' },
  
  { id: 13, category: 'Electronics', type: 'Tablet', brand: 'Samsung', model: 'Galaxy Tab S8' },
  
  { id: 14, category: 'Home Appliances', type: 'Vacuum Cleaner', brand: 'Dyson', model: 'V11 Absolute' },
  
  { id: 15, category: 'Home Appliances', type: 'Refrigerator', brand: 'Samsung', model: 'Family Hub' },
  
  { id: 16, category: 'Furniture', type: 'Sofa', brand: 'Ashley', model: 'Darcy' },
  
  { id: 17, category: 'Furniture', type: 'Desk', brand: 'Ikea', model: 'Malm' },
  
  { id: 18, category: 'Home Appliances', type: 'Washing Machine', brand: 'LG', model: 'TwinWash' },
  
  { id: 19, category: 'Electronics', type: 'Mobile', brand: 'Google', model: 'Pixel 7' },
  
  { id: 20, category: 'Furniture', type: 'Chair', brand: 'Herman Miller', model: 'Aeron' },
  
  { id: 21, category: 'Furniture', type: 'Table', brand: 'Ashley', model: 'Baldridge' },
  
  { id: 22, category: 'Home Appliances', type: 'Microwave', brand: 'Samsung', model: 'ME21M706BAS' },
  
  { id: 23, category: 'Electronics', type: 'Laptop', brand: 'Asus', model: 'ZenBook 14' },
  
  { id: 24, category: 'Furniture', type: 'Bed', brand: 'Ikea', model: 'Malm' },
  
  { id: 25, category: 'Furniture', type: 'Wardrobe', brand: 'Ikea', model: 'Pax' },
  
  { id: 26, category: 'Home Appliances', type: 'Dishwasher', brand: 'Bosch', model: '300 Series' },
  
  { id: 27, category: 'Electronics', type: 'Laptop', brand: 'Microsoft', model: 'Surface Laptop 4' },
  
  { id: 28, category: 'Home Appliances', type: 'Refrigerator', brand: 'Whirlpool', model: 'WRX735SDHZ' },
  
  { id: 29, category: 'Electronics', type: 'Mobile', brand: 'Xiaomi', model: 'Mi 11' },
  
  { id: 30, category: 'Electronics', type: 'Tablet', brand: 'Microsoft', model: 'Surface Pro 8' },
  
  { id: 31, category: 'Home Appliances', type: 'Washing Machine', brand: 'Bosch', model: 'WAT28400UC' },
  
  { id: 32, category: 'Furniture', type: 'Chair', brand: 'Wayfair', model: 'Milo' },
  
  { id: 33, category: 'Electronics', type: 'Laptop', brand: 'Lenovo', model: 'ThinkPad X1' },
  
  { id: 34, category: 'Home Appliances', type: 'Microwave', brand: 'LG', model: 'NeoChef' },
  
  { id: 35, category: 'Furniture', type: 'Sofa', brand: 'Wayfair', model: 'Rosalind Wheeler' },
  
  { id: 36, category: 'Electronics', type: 'Tablet', brand: 'Lenovo', model: 'Tab P11 Pro' },
  
  { id: 37, category: 'Furniture', type: 'Table', brand: 'Wayfair', model: 'Sebastian' },
  
  { id: 38, category: 'Home Appliances', type: 'Refrigerator', brand: 'GE', model: 'GNE27JYMFS' },
  
  { id: 39, category: 'Electronics', type: 'Mobile', brand: 'Oppo', model: 'Find X3 Pro' },
  
  { id: 40, category: 'Electronics', type: 'Tablet', brand: 'Huawei', model: 'MatePad Pro' }
  
  ];
  
  // Use .map() to transform each product into a category-type-productName structure.
  const mappedProducts = products.map(product => {
    const { category, type, brand, model } = product;
    return {
      category,
      type,
      productName: `${brand} ${model}`
    };
  });
  
  //  Initialize an empty object to accumulate results.
  const categorizedProducts = {};
  
  // Use .forEach() to populate the nested object.
  mappedProducts.forEach(({ category, type, productName }) => {
    if (!categorizedProducts[category]) {
      categorizedProducts[category] = {};
    }
  
    if (!categorizedProducts[category][type]) {
      categorizedProducts[category][type] = [];
    }
  
    categorizedProducts[category][type].push(productName);
  });
  
  console.log(categorizedProducts);
  