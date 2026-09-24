import dotenv from "dotenv";
import mongoose from "mongoose";
import XLSX from "xlsx";
import Product from "./models/Product.js";

dotenv.config();

const importProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Read Excel file
    const workbook = XLSX.readFile("./data/products.xlsx");

    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert Excel rows to JSON
    const excelData = XLSX.utils.sheet_to_json(worksheet);

    console.log(`Found ${excelData.length} products in Excel`);

    // Convert Excel fields to MongoDB fields
    const products = excelData.map((product) => ({
      productName: product["Product Name"],
      modelNumber: product["Model Number"],
      brand: product["Brand"],
      productType: product["Product Type"],
      shortDescription: product["Short Description"],
    }));

    // Remove existing products
    await Product.deleteMany({});

    console.log("Existing products removed");

    // Insert products
    await Product.insertMany(products);

    console.log(`${products.length} products imported successfully!`);

    // Close database connection
    await mongoose.connection.close();

    console.log("MongoDB connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Import failed:");
    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

importProducts();