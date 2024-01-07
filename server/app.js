const express = require('express');
const bodyParser = require('body-parser');
const { fetchData } = require('../User/user_info.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    //res.send('<html><div class="login-box"><h2>Login</h2><form method="post" action="/process"><div class="user-box"><input type="text" name="user_id" required> <label>UserID</label></div> <div class="user-box"><input type="password" name="password" required>< label > Password</label ></div ><button type="submit">Submit </button></form ></div >>');
    res.send('<!DOCTYPE html><html><head><title>Login</title><style>.login-box{width:300px;margin:auto;margin-top:100px;border:1px solid #ccc;padding:20px;border-radius:5px;}.user-box{margin-bottom:20px;}</style></head><body><div class="login-box"><h2>Login</h2><form method="post" action="/process"><div class="user-box"><input type="text" name="user_id" required><label>UserID</label></div><div class="user-box"><input type="password" name="password" required><label>Password</label></div><button type="submit">Submit</button></form></div></body></html>');
});

app.post('/process', (req, res) => {
    const { user_id } = req.body; 
    const {password} = req.body;
    fetchData(user_id, password)
        .then(userInfo => {
            // console.log("id: "+user_id + ", " + "name : " + name);

            if (userInfo !== null) {
                // const user = userInfo[0];
                res.send(`<pre>${JSON.stringify(userInfo, null, 2)}</pre>`);
            }
            //res.send("Welcome " + );
            else res.send("No user found");
        })
        .catch(error => {
            console.error("err : " + error);
        })
});

app.listen(5501, () => {
    console.log("Server running...");
});
