const router = require("express").Router;
const pool = require("../db.js")
router.post("/", async(req, res)=>
{
    try{
        const {first_name, email, password} = req.body;
        const use = await pool.query("SELECT FROM *USER WHERE email = $1", [email]);
        res.json(user.row);
    }
    catch{
        console.error(err.message);
        res.status(500).send("server error");
    }
});




module.exports = router;