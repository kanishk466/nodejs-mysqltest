Step 1: Set up the project and install dependencies
 mkdir nodejs-test
cd nodejs-test
npm init -y
npm install express mysql2


Step 2: Create the database schema and sample data
Step 3:  Create the Express.js application and define the endpoint
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

Step 4:  Postman Screenshot:
    ![image](https://github.com/kanishk466/nodejs-mysqltest/assets/95866249/43ed0994-3bd0-48ba-b814-d377bc4f360a)



