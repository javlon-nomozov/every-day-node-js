const express = require("express");
const favicon = require('serve-favicon')
const app = express();

// app.use(express.urlencoded({extended:false}))
app.use(express.json())
// app.use(favicon('https://static.vecteezy.com/system/resources/thumbnails/003/171/355/small/objective-lens-icon-with-six-rainbow-colors-vector.jpg'))

app.use(require('./modules'))

app.use((req,res)=>{
    res.status(404).send(['404 Not Found error'])
})

module.exports = app