const {writeFileSync} = require("fs");

const config = "My name is Nitin Gahlaut"
try{
    writeFileSync("./name.txt",config);
    console.log("data added successfully");
}catch(err){
    console.log(err)
}
