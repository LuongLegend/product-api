const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req,res) => {
    console.log('hihi');
    return res.json({msg: 'hello world'}); 
})

app.listen(PORT, () => console.log(`app is listening port: ${PORT}`));