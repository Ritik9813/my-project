import React, { useState } from "react";

export default function App() {
 
  const [items, setItems] = useState([
    { id: 1, place: "Delhi", country: "India", description: "Capital city" },
    { id: 2, place: "Paris", country: "France", description: "Eiffel Tower" },
    { id: 3, place: "Tokyo", country: "Japan", description: "Cherry Blossoms" },
  ]);

  function handleDelete(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="app-root">
      <h1>Places List</h1>
      {items.length === 0 ? (
        <p>No items left</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Place</th>
              <th>Country</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.place}</td>
                <td>{it.country}</td>
                <td>{it.description}</td>
                <td>
                  <button onClick={() => handleDelete(it.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
