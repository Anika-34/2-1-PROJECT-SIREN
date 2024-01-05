const express = require('express')
const app = express();
// var http = require('http')
const {fetchData} = require('./user_info.js')

app.get('/alien/:id',async function(req, res)
{
    console.log("mmhm")
    const id = req.params.id
    const name = await fetchData(id)
    console.log(name.length)
    if(name.length>0) res.send("welcome " + name)
    else res.send("no user found")
})



app.listen(5501, function(req, res)
{
    console.log("running")
    //res.end("hello there")
});

