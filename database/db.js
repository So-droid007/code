const mongoose = require('mongoose');

const connectionURI = 'mongodb://127.0.0.1:27017/practice';
const connectToMongo = ()=>{
    mongoose.connect(connectionURI).then(()=>{ 
        console.log("Connected to MongoDb");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectToMongo;
