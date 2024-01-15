# RESTful API Documentation
## Introduction:
Welcome to the documentation for the Simple RESTful API developed for managing a collection of resources (e.g., books, users, products). This API provides CRUD (Create, Read, Update, Delete) operations to interact with the specified resource.

### Base URL:
The base URL for this API is http://localhost:9000/api/v1/books.

### Endpoints:
#### 1. Create (POST):
   - Endpoint: /books
   - Method: POST
   - Description: Add a new item to the resource collection.
   - Request Body Example:
   ```json
{
  "title": "1984",
  "author": "George Orwell",
  "publicationYear": 1949
}
```
  - Response Example:
   ```json
   {
   "message": "Book added successfully",
   "book": "1984"
   }
   ```
 #### 2. Read (GET):
   - Endpoint: /books
   - Method: GET
   - Description: Retrieve a list of items from the book collection.
   - Response Example:
    
   ```json
   {
   "message": "Books",
   "items": [
      {
         "id": 1705307729064,
         "title": "The Great Gatsby",
         "author": "F. Scott Fitzgerald",
         "publicationYear": 1925
      },
      {
         "id": 1705307909778,
         "title": "To Kill a Mockingbird",
         "author": "Harper Lee",
         "publicationYear": 1960
      },
      {
         "id": 1705308340570,
         "title": "1984",
         "author": "George Orwell",
         "publicationYear": 1949
      }
   ]
}
   ```
#### 3. Update (PUT/PATCH):
   - Endpoint: /books/:id
   - Method: PUT 
   - Description: Modify an existing item in the book.
   - Request Body Example:
````json
{
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "publicationYear": 1960
}
````
  - Response Example:
````json
{
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "publicationYear": 1960
}
````
#### 4. Delete (DELETE):
   - Endpoint: /books/:id
   - Method: DELETE
   - Description: Remove an item from the books.
   - Response Example:
````json
{
    "message": "Book deleted successfully"
}
````
   