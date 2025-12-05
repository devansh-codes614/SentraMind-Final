const mongoose = require("mongoose");
const initData = require("./data.js");
const data = require("../models/data.js");
require('dotenv').config({ path: '../.env' });


//connectDB
const Mongo_URL = (process.env.MONGODB_URI);
async function main(){
    await mongoose.connect(process.env.MONGODB_URI);
}
main().then(()=>{
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
});

async function main(){
    await mongoose.connect(process.env.MONGODB_URI);
}

const initDB = async ()=>{
    await data.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: '68df60cc0c4042f9de7a2ad0'}));
    await data.insertMany(initData.data);
    console.log("data was initialized!");
}

initDB();