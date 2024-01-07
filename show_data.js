const express = require('express');
const bodyParser = require('body-parser');
const { fetchData } = require('./user_info.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<html><head><title>Form</title></head><body><form method="post" action="/process"><input name="user_id"/><button type="submit">Submit</button></form></body>');
});

app.post('/process', (req, res) => {
    const { user_id } = req.body; // Access the user_id from form data
    fetchData(user_id)
    .then(userInfo =>{
        // console.log("id: "+user_id + ", " + "name : " + name);
    
    if (userInfo !== null) 
    {
        // const user = userInfo[0];
        res.send(`<pre>${JSON.stringify(userInfo, null, 2)}</pre>`);
    }
    //res.send("Welcome " + );
    else res.send("No user found");
    })
    .catch(error=>
        {
            console.error("err : " + error);
        })
});

app.listen(5501, () => {
    console.log("Server running...");
});
