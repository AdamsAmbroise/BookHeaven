import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
    id: number;
    title: string;
    description: string;
}

const Books = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [newBook, setNewBook] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const addBook = async () => {
        try {
            await axios.post('http://localhost:3000/books', newBook);
            fetchBooks();
            setNewBook({ title: '', description: '' });
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const deleteBook = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/books/${id}`);
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div>
            <h1>Book Library</h1>
            <input
                placeholder="Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            <textarea
                placeholder="Description"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
            />
            <button onClick={addBook}>Save</button>
            <div>
                {books.map((book) => (
                    <div key={book.id}>
                        <h3>{book.title}</h3>
                        <p>{book.description}</p>
                        <button onClick={() => deleteBook(book.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Books;