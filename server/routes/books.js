/*  
  File: books.js
  Name: Chihiro Hasegawa
  Student ID: 301229147
  Date: 2022 / 10 / 09
*/

// create a router object and a mongoose object
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to bookModel
let Book = require('../models/books');
// get router for the book list page - READ OPERATION
router.get('/', (req, res, next) => {
    Book.find((err, bookList) => {
        if (err) {
            return console.error(err);
        } else {
            // console.log(bookList);
            res.render('book/list', { title: 'bookList', bookList: bookList })
        }
    });
});

/******************** added 20221005 ************************/
// GET route for displaying the Add page - CREATE operation
router.get('/add', (req, res, next) => {
    res.render('book/add', { title: 'Add a book' })
});

// POST route for processing the Add page - CREATE operation
router.post('/add', (req, res, next) => {
    let newBook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.create(newBook, (err, Book) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/bookList');
        }
    })
})

// GET route for displaying the Edit page - UPDATE operation
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    Book.findById(id, (err, bookToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('book/edit', { title: 'Edit Book', book: bookToEdit });
        }
    })
})

// POST route for processing the Edit page - UPDATE operation
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    let updatedBook = Book({
        "_id": id,
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    })
    Book.updateOne({ _id: id }, updatedBook, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/bookList');
        }
    })
})

// GET to perform Deletion - DELETE operation
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    Book.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/bookList');
        }
    })
})
/*********************************************************/

module.exports = router;