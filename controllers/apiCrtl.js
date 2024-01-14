const axios  = require("axios");
const db = require("../models/books");

async function handleCreateBook(req, res) {
  try {
    const {
      name,
      isbn,
      authors,
      country,
      number_of_pages,
      publisher,
      release_date,
    } = req.body;

    // Creating a new book document
    const newBook = new db({
      name,
      isbn,
      authors,
      country,
      number_of_pages,
      publisher,
      release_date,
    });

    // Save the new book to the MongoDB 
    await newBook.save();

    const response = {
      status_code: 201,
      status: "success",
      data: [
        {
          book: newBook,
        },
      ],
    };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        status_code: 500,
        status: "error",
        message: "Internal Server Error",
      });
  }
}

async function handleReadBooks(req, res) {
    try {
        const { name, country, publisher, release_date } = req.query;
    
        // Building the query object based on the provided search criteria
        const query = {};
        if (name) query.name = new RegExp(name, 'i'); 
        if (country) query.country = country;
        if (publisher) query.publisher = new RegExp(publisher, 'i'); 
        if (release_date) query.release_date = release_date;
    
        const matchedBooks = await db.find(query);
        const response = {
          status_code: 200,
          status: 'success',
          data: matchedBooks,
        };
        res.status(200).json(response);
      } catch (error) {
        console.error(error);
        res.status(500).json({ status_code: 500, status: 'error', message: 'Internal Server Error' });
      }
}

async function handleUpdateBook(req, res){
    try {
        const bookId = req.params.id;
        console.log(bookId)
        const {
          name,
          isbn,
          authors,
          country,
          number_of_pages,
          publisher,
          release_date,
        } = req.body;
    
        // Find the book by ID and update it
        const updatedBook = await db.findOneAndUpdate(
          { _id: bookId },
          {
            name,
            isbn,
            authors,
            country,
            number_of_pages,
            publisher,
            release_date,
          },
          { new: true } 
        );
    
        // If the book not found
        if (!updatedBook) {
          return res.status(404).json({
            status_code: 404,
            status: 'error',
            message: `Book with ID ${bookId} not found`,
          });
        }
    
        const response = {
          status_code: 200,
          status: 'success',
          message: `The book ${updatedBook.name} was updated successfully`,
          data: updatedBook,
        };

        res.status(200).json(response);
    }catch (error) {
        console.error(error);
        res.status(500).json({ status_code: 500, status: 'error', message: 'Internal Server Error' });
    }
}

async function handleDeleteBook(req, res){
    try {
        const bookId = req.params.id;
    
        // Finding the book by ID and delete it
        const deletedBook = await db.findByIdAndDelete(bookId);
    
        // If the book not found
        if (!deletedBook) {
          return res.status(404).json({
            status_code: 404,
            status: 'error',
            message: `Book with ID ${bookId} not found`,
          });
        }
        const response = {
          status_code: 200,
          status: 'success',
          message: `The book ${deletedBook.name} was deleted successfully`,
          data: deletedBook,
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status_code: 500, status: 'error', message: 'Internal Server Error' });
    }

}

async function handleShowBook(req, res){
    try {
        const bookId = req.params.id;
    
        // Finding the book by ID
        const foundBook = await db.findById(bookId);
    
        // If the book not found
        if (!foundBook) {
          return res.status(404).json({
            status_code: 404,
            status: 'error',
            message: `Book with ID ${bookId} not found`,
          });
        }
        const response = {
          status_code: 200,
          status: 'success',
          data: foundBook,
        };
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status_code: 500, status: 'error', message: 'Internal Server Error' });
    }
}

async function handleExternalBooks(req, res){
    try {
        const nameOfABook = req.query.name;
        if (!nameOfABook) {
          return res.status(400).json({
            status_code: 400,
            status: 'error',
            message: 'Query parameter "name" is required',
          });
        }
    
        // Making a request to the Ice and Fire API with name of book
        const response = await axios.get(`https://anapioficeandfire.com/api/books?name=${nameOfABook}`);
    
        const iceAndFireBook = response.data[0]; 
    
        
        const formattedResponse = {
          status_code: 200,
          status: 'success',
          data: {
            name: iceAndFireBook.name,
            isbn: iceAndFireBook.isbn,
            authors: iceAndFireBook.authors,
            number_of_pages: iceAndFireBook.numberOfPages,
            publisher: iceAndFireBook.publisher,
            country: iceAndFireBook.country,
            release_date: iceAndFireBook.released,
          },
        };
    
        
        res.status(200).json(formattedResponse);
      } catch (error) {
        console.error(error);
        res.status(500).json({
          status_code: 500,
          status: 'error',
          message: 'Internal Server Error',
        });
      }
}

module.exports = {
  handleCreateBook,
  handleReadBooks,
  handleUpdateBook,
  handleDeleteBook,
  handleShowBook,
  handleExternalBooks
};
