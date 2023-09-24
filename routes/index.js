var express = require('express');
var router = express.Router();
const fs = require('fs');
const countrylist = require('../public/javascripts/country.js');
const languageslist = require('../public/javascripts/language.js');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

//register route
router.get('/register',(req,res)=>{
  res.render('register.ejs',{
    countrylist:countrylist,
    languageslist:languageslist,
});
})

//data save route
router.post('/save',(req,res)=>{
  const bookList = JSON.parse(fs.readFileSync('public/books.json','utf-8'));
  bookList.push(req.body);
  fs.writeFileSync('public/books.json',JSON.stringify(bookList));
  res.redirect('/show');
})

//books data show route
router.get('/show',(req,res)=>{
  const bookList = JSON.parse(fs.readFileSync('public/books.json','utf-8'));
  // console.log(typeof bookList);
  res.render('show.ejs',{
    bookList:bookList,
  });
})

module.exports = router;
