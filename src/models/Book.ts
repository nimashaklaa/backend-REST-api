class Book {
    id: number;
    title: string;
    author: string;
    publicationYear: number;

    constructor(id: number, title: string, author: string, publicationYear: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
    }
}

export default Book;
