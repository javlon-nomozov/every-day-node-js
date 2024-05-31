const express = require("express");

const app = express();

// app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use((req,res)=>{
    res.send(['Ok'])
})

module.exports = app