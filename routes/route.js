const express = require("express");
const {
  handleCreateBook,
  handleReadBooks,
  handleUpdateBook,
  handleDeleteBook,
  handleShowBook,
  handleExternalBooks
} = require("../controllers/apiCrtl");
const router = express.Router();

// GET
router.get("/v1/books", handleReadBooks);

//POST
router.post("/v1/books", handleCreateBook);

//PATCH
router.patch("/v1/books/:id", handleUpdateBook);

//DELETE
router.delete("/v1/books/:id", handleDeleteBook);

// GET request for specific book

router.get("/v1/books/:id", handleShowBook);

// For Fetching external books From ICE and FIRE API
router.get("/external-books",handleExternalBooks,()=>{
  console.log("hello")
})

module.exports = router;
