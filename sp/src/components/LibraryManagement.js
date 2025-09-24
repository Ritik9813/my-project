import React, { useState } from "react";
import "./LibraryManagement.css";   // make sure this path matches

export default function LibraryManagement() {
  const [books, setBooks] = useState([
    { id: "b1", title: "1984", author: "George Orwell" },
    { id: "b2", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: "b3", title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;
    const id = Date.now().toString();
    setBooks([...books, { id, title: newTitle, author: newAuthor }]);
    setNewTitle("");
    setNewAuthor("");
  };

  const handleRemove = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="library-container">
      <h2>Library Management</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search"
      />

      {/* Add new book */}
      <form onSubmit={handleAddBook} className="add-form">
        <input
          type="text"
          placeholder="New book title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="New book author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>

      {/* Book list */}
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="book-item" key={book.id}>
              <span>
                <strong>{book.title}</strong> by {book.author}
              </span>
              <button onClick={() => handleRemove(book.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p className="no-results">No books found.</p>
        )}
      </div>
    </div>
  );
}
