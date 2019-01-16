const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', (req, res) => {              
  Book.find( {} , (err, bookData) => {
    if(err){
      return next(err)
    }else{
      return res.status(200).json(bookData)
    }
  })
})

router.get('/:id', (req, res, next) => {
  const bookId = req.params.id
                                 
  Book.findById(bookId , (err, bookData) => {
    if(err){
      return next(err)
    }else{
      return res.status(200).json(bookData)
    }
  })
})

router.post('/', (req, res, next) => {
  const newBook = new Book({
    title: req.body.bookTitle,
    author: req.body.bookAuthor,
    description: req.body.bookDescription,
    price: parseFloat(req.body.bookPrice)
  })
  newBook.save((err, newBook) => {
    if(err){
    return next(err)
    }else{
      return res.status(200).json(newBook)
    }
  })
})

router.put('/:id', (req, res, next) => {
  const bookId = req.params.id

  const bookData = {
    title: req.body.bookTitle,
    author: req.body.bookAuthor,
    description: req.body.bookDescription,
    price: parseFloat(req.body.bookPrice)
  }
                                    
  Book.findByIdAndUpdate(bookId , bookData , { new: true }, (err, updatedBook) => {
    if(err){
      return next(err)
    }else{
      return res.status(200).json( updatedBook )
    }
  })
})

router.delete('/:id', (req, res, next) => {
  const bookId = req.params.id                   
  Book.findByIdAndRemove(bookId , (err, bookData) => {
    if(err){
      return next(err)
    }else{
      return res.status(200).json(bookData)
    }
  })
})

module.exports = router
