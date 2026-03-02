const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
const mongoUrl = "mongodb://127.0.0.1:27017/wanderLust";

Main().then(() => {
    console.log("successfully connected to db");
})
    .catch((err) => {
        console.log(err);
    });

async function Main() {
    await mongoose.connect(mongoUrl);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, owner: "685ab9c05f709f6843ade264"
    }))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}
initDB();
