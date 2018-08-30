const express = require('express');
const app = express(); //generates a new app

app.get('/', (req, res) => {
    res.send({hello: 'there'});
});

//app.get creates a new route handler. waiting for an http request with a specific handler
// '/'  it watches for requests that are accesing a particular route


const PORT = process.env.PORT || 5000;
app.listen(PORT);