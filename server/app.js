if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const router = require('./routers');
const app = express();
const Port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', router);

app.listen(Port, ()=>{
  console.log(`http:localhost : ${Port}`);
});



module.exports = app