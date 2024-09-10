//raeding file data
const fs  = require("fs");
fs.readFile("./user.json",(err, data)=>{
    if(err){
        console.log(err);
    }
    console.log(data);
    const updata = JSON.parse(data);
    console.log(updata);
})


//synchronus method
// const { readFileSync } = require('fs');

// const data = readFileSync('./user.json');
// console.log(JSON.parse(data));