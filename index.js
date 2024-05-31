const config = require("./shared/config");
const express = require("express");

const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use((req,res)=>{
    res.send(['Ok'])
})

app.listen(config.port, config.hostname, ()=>console.log('Server is running'))
