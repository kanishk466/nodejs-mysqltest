import express from "express";

const app = express();

app.use(express.json());

import mysql from "mysql2";

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Password@123",
  database: "basic_crud",
});

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/api/getVendorUsers", async (req, res) => {
  const { prId, custOrgId } = req.query;

  if (!prId || !custOrgId) {
    return res.status(400).send("Please provide all the required fields");
  }

  try {
    // Construct the SQL query
    const query = `
 SELECT DISTINCT vu.VendorOrganizationId AS supplierId, vu.UserName, vu.Name
 FROM PrLineItems pli
 JOIN VendorUsers vu ON FIND_IN_SET(vu.VendorOrganizationId, pli.suppliers)
 WHERE pli.purchaseRequestId = ?
   AND pli.custOrgId = ?
   AND vu.Role = 'Admin'
`;

    const [results] = await connection.promise().query(query, [prId, custOrgId]);

    const vendoreUsers = results.map((row) => ({
      supplierId: row.supplierId,
      UserName: row.UserName,
      Name: row.Name,
    }));

    res.status(200).json(vendoreUsers);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Server listening in http://localhost:5000");
});
