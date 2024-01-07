const express = require("express");
const app = express();
const cors = require("cors");
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));


app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));
const db = require("./db");


app.get("/user", async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM "user"');
        
        console.log(results + "end");
        //console.log(JSON.stringify(results.rows) + "end");

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            // data: {
            //     users: results.rows,
            // },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error" });
    }
});

app.get("/user/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const results = await db.query('SELECT * FROM "user" WHERE user_id = $1', [req.params.id]);
        //console.log(results + "end");
        console.log(JSON.stringify(results.rows) + "end");

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                users: results.rows,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error" });
    }
});

app.get("/user/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const results = await db.query('SELECT * FROM "user" WHERE user_id = $1', [req.params.id]);
        //console.log(results + "end");
        console.log(JSON.stringify(results.rows) + "end");

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                users: results.rows,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error" });
    }
});

// app.post("/user", async(req, res) => {
//     try {
//         console.log(req.body);
//         const { first_name, last_name, email, gender, phone_number, nid_number, date_of_birth, address, birth_registration_number, post_code, password } = req.body;

//         const results = await db.query('INSERT INTO public.user (first_name, last_name, email, gender, phone_number, nid_number, date_of_birth, address, birth_registration_number, post_code, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *', [first_name, last_name, email, gender, phone_number, nid_number, date_of_birth, address, birth_registration_number, post_code, password]);

//         res.status(200).json({
//             status: "success",
//             message: "Data inserted successfully",
//             data: results.rows,
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ status: "error" });
//     }
// });


app.post("/user", async(req, res) => {
    console.log(req.body);
    try{
        // INSERT INTO "user" (first_name, last_name, email, gender, phone_number, nid_number, date_of_birth,
        // address, birth_registration_number, post_code,
        // password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *', 
        //[first_name, last_name, email, gender, phone_number, nid_number, date_of_birth,
        // address, birth_registration_number, post_code, password]);
        console.log(req.body);
        //const { first_name, last_name, email, gender, phone_number, nid_number, date_of_birth, address, birth_registration_number, post_code, password } = req.body;
        const results= await db.query('INSERT INTO  (name, color, size) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *"', [req.body.first_name], [req.params.last_name], [req.params.email], [req.params.gender], [req.params.phone_number], [req.params.nid_number], [req.params.date_of_birth], [req.params.address], [req.params.birth_registration_number], [req.params.post_code], [req.params.password]);
        res.status(201).json({
            status: "success",
            data: {
                user: results.rows[0]
            }
        });
    }catch(err){
        console.error(err);
    }
    
});


app.put("/user/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    try{
        const results= await db.query('UPDATE "user" SET address = $1, where user_id= $2 RETURNING *', [req.body.address, req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                user: results.rows[0]
            }
        });
    }catch(err){
        console.error(err);
    }

});



app.listen(5501, () => {
    console.log("running...")
})


