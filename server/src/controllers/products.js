const db = require("../db");

exports.getAllProducts = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM upload_items");

    // Check if any product has a null 'name' and log it
    const invalidRows = rows.filter((row) => !row.name);
    if (invalidRows.length > 0) {
      console.error("Found products with missing names:", invalidRows);
    }

    console.log("working!");
    console.log(rows);

    return res.status(200).json({ success: true, products: rows });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
};

exports.createProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    contact,
    category,
    condition,
    pickupDetails,
    dateAdded,
    images,
  } = req.body;

  console.log("Request body:", req.body); // Form fields
  console.log("Request files:", req.files); // Uploaded files

  try {
    const query = `
            INSERT INTO upload_items (
                name, price, description, contact, category,
                condition, pickup_details, date_added, images
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;
    const values = [
      name,
      price,
      description,
      contact,
      category,
      condition,
      pickupDetails,
      dateAdded || new Date(),
      images,
    ];
    await db.query(query, values);

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the product" });
  }
};
