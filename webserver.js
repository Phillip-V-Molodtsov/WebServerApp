const express = require('express');
const fs = require('fs');

const hbs = require('hbs');

const port = process.env.PORT || 3000;
let app = express(); 

app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials');
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getFullYear',()=>{ //checks firstly on the helpers, then on the app.get
    return new Date().getFullYear();
})
hbs.registerHelper('uppercaseText',(text)=>{
    return text.toUpperCase();
})
app.use((req,res,next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('entries.log',log+'\n',(e)=>{
        if(e){
            console.log(e);
        }
    })
    next();
})
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         h1Title:'Maintenance break',
//     });
// })
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        h1Title:'Home uu page',
        welcomeMessage:'Hi there!'
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        h1Title:'About',
    });
});

app.get('/portfolio',(req,res)=>{
    res.render('portfolio.hbs',{
        h1Title:'Portfolio',
    });
})

app.listen(port);