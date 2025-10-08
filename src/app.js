const express = require('express');
const mongoos = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = config.port;
const ConnectionString = config.ConnectionString;
const Contact = require('./router/router');
app.use('/api', Contact)
const connectToDB = async() =>{
    try{
        await mongoos.connect(ConnectionString,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to mongoDB")
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }

}
connectToDB();
app.listen(PORT,()=>{
 console.log(`Example app listening on port ${PORT}`);
});
