const express = require('express');
const app = express();
const path = require('path');
const qrcode = require('qrcode');


const port = 3000;

app.listen(port, console.log('Listening on port'));
app.set('view engine','ejs');



//middleware
app.use(express.json()); //parses the json
app.use(express.urlencoded({extended:false})); //grabs information from requst body

app.get('/',(req,res) => {
    res.render('index', {title:"QR Code Generator"});
});

app.post('/scan',(req,res) => {
    const inputText = req.body.text; //textarea name is 'text'
    if(inputText!=''){
        qrcode.toDataURL(inputText, (err,src) => {
            res.render('scan', {qr_code: src, title: "QR Code"})
        });
    }else{
        res.render('error');
    }

})
