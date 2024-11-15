import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
    id: number;
    title: string;
    description: string;
}

const App = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            console.log('Fetching books...');
            const response = await axios.get('http://localhost:3000/books');
            console.log('Books fetched:', response.data);
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const addBook = async () => {
        console.log('Adding book:', newBook); // Log the new book data
        try {
            const response = await axios.post('http://localhost:3000/books', newBook);
            console.log('Book added:', response.data); // Log the response data
            fetchBooks(); // Reload books after adding
            closeModal();
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const deleteBook = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/books/${id}`);
            fetchBooks(); // Reload books after deletion
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNewBook({ title: '', description: '' });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>My Library</h1>
            <button onClick={openModal} style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}>
                Add Book
            </button>
            <div>
                {books.map((book) => (
                    <div key={book.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <h3>{book.title}</h3>
                        <p>{book.description}</p>
                        <button onClick={() => deleteBook(book.id)} style={{ color: 'red' }}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: '0', left: '0', right: '0', bottom: '0',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{
                        backgroundColor: 'white', padding: '20px',
                        borderRadius: '8px', width: '300px', textAlign: 'center'
                    }}>
                        <h2>Add New Book</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newBook.title}
                            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        />
                        <textarea
                            placeholder="Description"
                            value={newBook.description}
                            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                            style={{ width: '100%', padding: '8px', marginBottom: '10px', resize: 'none' }}
                        />
                        <div>
                            <button onClick={addBook} style={{ marginRight: '10px', padding: '5px 15px' }}>Save</button>
                            <button onClick={closeModal} style={{ padding: '5px 15px' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;