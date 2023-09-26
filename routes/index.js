var express = require('express');
var router = express.Router();
const fs = require('fs');
const countrylist = require('../public/javascripts/country.js');
const languageslist = require('../public/javascripts/language.js');

//utility function read and write
function Books() {
  return JSON.parse(fs.readFileSync("public/books.json", "utf-8"));
}

function WriteBooks(book) {
  fs.writeFileSync("public/books.json", JSON.stringify(book));
}

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

//register route
router.get('/register', (req, res) => {
  res.render('register.ejs', {
    countrylist: countrylist,
    languageslist: languageslist,
  });
})

//data save route
router.post('/save', (req, res) => {
  const bookList = Books();
  bookList.push(req.body);
  WriteBooks(bookList);
  res.redirect('/show');
})

//books data show route
router.get('/show', (req, res) => {
  const bookList = Books();
  res.render('show.ejs', {
    bookList: bookList,
  });
})

//book data delete route
router.get('/delete/:index', (req, res) => {
  const bookList = Books();
  bookList.splice(req.params.index, 1);
  WriteBooks(bookList);
  res.redirect('/show');
})

//book data show update.ejs route
router.get('/update/:index', (req, res) => {
  const bookList = Books();
  res.render('update.ejs', {
    index: req.params.index,
    bookList: bookList[req.params.index],
    countrylist: countrylist,
    languageslist: languageslist,
  })
})

//book data update feature
router.post('/edit/:index', (req, res) => {
  const bookList = Books();
  bookList[req.params.index] = req.body;
  WriteBooks(bookList);
  res.redirect('/show');
})
module.exports = router;
