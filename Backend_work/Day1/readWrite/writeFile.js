const {writeFile} = require('fs');

const path="./user.json";

const config = {
    age: 21,
    address: "bijnor"
}
writeFile(path,JSON.stringify(config),(err)=>{
    if(err){
        console.log("error occured", err);
        return;
    }
    console.log("Data written successfully");
})