import dotenv from "dotenv";
import mongoose from "mongoose";
import XLSX from "xlsx";
import Product from "./models/Product.js";

dotenv.config();

const seedProducts = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Kaees",
    });

    console.log("MongoDB connected");
    console.log(`Database: ${mongoose.connection.name}`);

    // Read Excel file
    const workbook = XLSX.readFile("./data/products.xlsx");

    // Get first worksheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert worksheet to JSON
    const excelData = XLSX.utils.sheet_to_json(worksheet);

    console.log(`Found ${excelData.length} rows in Excel`);

    // Convert Excel data to our MongoDB structure
    const products = excelData
      .map((product) => ({
        productName: String(product["Product Name"] || "").trim(),
        modelNumber: String(product["Model Number"] || "").trim(),
        brand: String(product["Brand"] || "").trim(),
        productType: String(product["Product Type"] || "").trim(),
        shortDescription: String(
          product["Short Description"] || ""
        ).trim(),
      }))
      .filter(
        (product) =>
          product.productName &&
          product.modelNumber &&
          product.brand &&
          product.productType &&
          product.shortDescription
      );

    console.log(`Valid products ready for import: ${products.length}`);

    // Check whether collection already has products
    const existingCount = await Product.countDocuments();

    if (existingCount > 0) {
      console.log(
        `Products collection already contains ${existingCount} products.`
      );
      console.log("Import cancelled to prevent duplicate data.");

      await mongoose.connection.close();
      process.exit(0);
    }

    // Insert all products
    const result = await Product.insertMany(products);

    console.log(
      `Successfully imported ${result.length} products into MongoDB!`
    );

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("=================================");
    console.error("PRODUCT IMPORT FAILED");
    console.error("=================================");
    console.error(error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedProducts();