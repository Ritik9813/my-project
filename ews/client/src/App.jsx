import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [backendData, setBackendData] = useState('');

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.text())
      .then((data) => setBackendData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>🌍 AWS Full Stack App (Vite + Node.js)</h1>
      <p>{backendData || "Connecting to backend..."}</p>
    </div>
  );
}

export default App;
