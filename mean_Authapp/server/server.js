const express = require('express');
const bodyparser = require('body-parser');
const api = require('./routes/api');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyparser.json());


app.use('/api',api);

app.listen(PORT, () =>{
    console.log(`Server started at PORT:${PORT}`);
})
