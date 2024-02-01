import request from 'supertest';
import express from 'express';
import {db, initializedDb} from "../../configs/db";
import Book from "../../models/Book";
import router from "../../routes/bookRoutes";

const app = express();
app.use(express.json());
app.use('/', router);

// Before running tests, initialize the database
beforeAll(async () => {
    await initializedDb();
});

describe('BookController', () => {
    beforeEach(() => {
        // Reset the database before each test
        db.data.items = [];
    });

    test('should create a new book', async () => {
        const response = await request(app)
            .post('/')
            .send({ title: 'Sample Book', author: 'John Doe', publicationYear: 2022 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Book added successfully');
        expect(response.body.book).toBe('Sample Book');
    });

    test('should get a list of books', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Books');
        expect(response.body.items).toHaveLength(0); // Assuming the database is empty initially
    });

    test('should update an existing book', async () => {
        // Assuming you have an existing book in the database
        db.data.items.push(new Book(1, 'Existing Book', 'Jane Doe', 2020));

        const response = await request(app)
            .put('/1')
            .send({ title: 'Updated Book', author: 'John Doe', publicationYear: 2021 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Book updated successfully');
    });

    test('should delete an existing book', async () => {
        // Assuming you have an existing book in the database
        db.data.items.push(new Book(1, 'Existing Book', 'Jane Doe', 2020));

        const response = await request(app).delete('/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Book deleted successfully');
    });
});
