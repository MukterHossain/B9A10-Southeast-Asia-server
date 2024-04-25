const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) =>{
    res.send('Discovery beautiful country soon')
})


app.listen(port, (req, res) =>{
    console.log(`This is a beautiful country, see ${port}`)
})
