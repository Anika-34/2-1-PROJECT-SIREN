require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(cors());


// Get all users
app.get("/users", async (req, res) => {
  try {
    // console.log("route handler");
    
    const results = await db.query('SELECT * FROM "user"');

    res.status(200).json({
      status: "success",
      result: results.rows.length,
      data: {
        users: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a user
app.get("/users/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query(
      'SELECT * FROM "user" WHERE user_id = $1',
      [req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        result : results.rows[0],
      },
     });
  } catch (err) {
    console.log(err);
  }
});

// Create a user

app.post("/users", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      'INSERT INTO "user" (first_name,last_name,email,gender,phone_number,nid_number,date_of_birth,address,birth_registration_number,post_code,password) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [req.body.first_name, req.body.last_name, req.body.email, req.body.gender, req.body.phone_number, req.body.nid_number, req.body.date_of_birth, req.body.address,req.body.birth_registration_number,req.body.post_code,req.body.password]
    );
   console.log(results);
    res.status(201).json({
      status: "succes",
    });
  } catch (err) {
    console.log(err);
  }
});
// Update user

app.put("/users/:id", async (req, res) => {
  try {
    const results = await db.query(
      'UPDATE "user" SET address = $1, password = $2 WHERE user_id = $3 returning *',
      [req.body.address, req.body.password, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        user: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete user

app.delete("/users/:id", async (req, res) => {
  try {
    console.log("deleting user " + req.params.id);
    const results = db.query('DELETE FROM "user" where user_id = $1', [
      req.params.id,
    ]);
    // console.log(results);
    res.status(204).json({
      status: "sucess",
      
    });
  } catch (err) {
    console.log(err);
  }
});


const port = process.env.PORT || 3001;        //environ variable -> env // port env te pass na korle default value 3001
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
