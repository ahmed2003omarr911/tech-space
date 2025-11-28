import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "MSI Laptop",
        image:
          "https://storage-asset.msi.com/global/picture/image/feature/nb/GT/GT77-13V/images/kv-laptop.png",
        price: 1200,
        stock: 23,
      },
      {
        title: "ASUS Laptop",
        image:
          "https://www.asus.com/media/Odin/Websites/global/ProductLine/20200824120814.jpg",
        price: 3500,
        stock: 8,
      },
      {
        title: "Huawei Laptop",
        image:
          "https://atlas-content-cdn.pixelsquid.com/assets_v2/241/2416218096655143941/jpeg-600/G03.jpg?modifiedAt=1",
        price: 900,
        stock: 14,
      },
      {
        title: "Lenovo ThinkPad",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Lenovo_ThinkPad_X1_Ultrabook_%28Nov_16%2C_2012%29.png/749px-Lenovo_ThinkPad_X1_Ultrabook_%28Nov_16%2C_2012%29.png?20210724193757",
        price: 1500,
        stock: 12,
      },
      {
        title: "HP Spectre x360",
        image:
          "https://dps.co.ke/wp-content/uploads/2025/01/hp-spectre-x360-12th-gen.png",
        price: 1700,
        stock: 10,
      },
      {
        title: "Acer Predator Helios",
        image:
          "https://cdn.uc.assets.prezly.com/0b67f184-f11f-4b5d-a698-893ebdec18c0/Neo18-02.png",
        price: 2000,
        stock: 5,
      },
      {
        title: "Apple MacBook Air",
        image:
          "https://atlas-content-cdn.pixelsquid.com/stock-images/apple-macbook-air-13-inch-2018-Od94vLF-600.jpg",
        price: 1600,
        stock: 20,
      },
      {
        title: "Samsung Galaxy Book",
        image:
          "https://atlas-content-cdn.pixelsquid.com/assets_v2/241/2419128768141465260/jpeg-600/G03.jpg?modifiedAt=1",
        price: 1300,
        stock: 18,
      },
      {
        title: "Razer Blade 15",
        image: "https://press.razer.com/wp-content/uploads/2018/10/00.png",
        price: 2200,
        stock: 7,
      },
    ];

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("Cannot see database!", err);
  }
};
