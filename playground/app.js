const fs = require('fs');

const JSONdata = fs.readFileSync("1-json.json");
const data = JSON.parse(JSONdata.toString());
let myName = "Nikola";
let myAge = 22;
data.name = myName;
data.age = myAge;

let newDataJSON = JSON.stringify(data);
fs.writeFileSync("1-json.json",newDataJSON);