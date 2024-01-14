# Firstly Run these command to get start with


## Install

    npm install

## Run the app

    npm start

## Run the tests

    ./run-tests.sh

# REST API

The REST APIs are described below.

## Create an entry in the database with provided payload.

### Request

`POST http://localhost:8080/api/v1/books`

payload :

{
      "name":"First Book",
      "isbn":"123456789",
      "authors":["Shivam Gupta"],
      "country":"India",
      "number_of_pages":100,
      "publisher":"Guptaverse",
      "release_date":"2024-01-01"
}

### Response

{
  "status_code": 201,
  "status": "success",
  "data": [
    {
      "book": {
        "name": "First Book",
        "isbn": "123456789",
        "authors": [
          "Shivam Gupta"
        ],
        "country": "India",
        "number_of_pages": 100,
        "publisher": "Guptaverse",
        "release_date": "2024-01-01",
        "_id": "65a40a622a4c28c90b9b17d2",
        "__v": 0
      }
    }
  ]
}

## Read all the entries in database.

### Request

`GET http://localhost:8080/api/v1/books`


### Response

   {
  "status_code": 200,
  "status": "success",
  "data": [
    {
      "_id": "65a40a622a4c28c90b9b17d2",
      "name": "First Book",
      "isbn": "123456789",
      "authors": [
        "Shivam Gupta"
      ],
      "country": "India",
      "number_of_pages": 100,
      "publisher": "Guptaverse",
      "release_date": "2024-01-01",
      "__v": 0
    }
  ]
} 

## Get a specific document using id

### Request

`GET http://localhost:8080/api/v1/books/id`


### Response

{
  "status_code": 200,
  "status": "success",
  "data": {
    "_id": "65a410bdbee74a6492fb1a79",
    "name": "Second Book",
    "isbn": "123456789",
    "authors": [
      "Shivam Gupta"
    ],
    "country": "India",
    "number_of_pages": 100,
    "publisher": "Guptaverse",
    "release_date": "2024-01-01",
    "__v": 0
  }
}

## Get a non-existent document

### Request

`GET http://localhost:8080/api/v1/books/id`


### Response

{
  "status_code": 404,
  "status": "error",
  "message": "Book with ID 65a40a622a4c28c90b9b17d2 not found"
}


## Update a document with specific id

### Request

`PATCH http://localhost:8080/api/v1/books/id`

updating name "First Book" to "First Book changed!!"

### Response

{
  "status_code": 200,
  "status": "success",
  "message": "The book First Book changed!! was updated successfully",
  "data": {
    "_id": "65a40a622a4c28c90b9b17d2",
    "name": "First Book changed!!",
    "isbn": "123456789",
    "authors": [
      "Shivam Gupta"
    ],
    "country": "India",
    "number_of_pages": 100,
    "publisher": "Guptaverse",
    "release_date": "2024-01-01",
    "__v": 0
  }
}


## Delete a entry with specific id

### Request

`DELETE http://localhost:8080/api/v1/books/id`


### Response

{
  "status_code": 200,
  "status": "success",
  "message": "The book First Book changed!! was deleted successfully",
  "data": {
    "_id": "65a40a622a4c28c90b9b17d2",
    "name": "First Book changed!!",
    "isbn": "123456789",
    "authors": [
      "Shivam Gupta"
    ],
    "country": "India",
    "number_of_pages": 100,
    "publisher": "Guptaverse",
    "release_date": "2024-01-01",
    "__v": 0
  }
}

## Try to delete same Thing again

### Response
```json

{
  "status_code": 404,
  "status": "error",
  "message": "Book with ID 65a40a622a4c28c90b9b17d2 not found"
}
```

