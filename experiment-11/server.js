const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory cards collection
let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
  { id: 2, suit: "Spades", value: "King" },
  { id: 3, suit: "Diamonds", value: "Queen" }
];

// Home route
app.get('/', (req, res) => {
  res.send("🎴 Welcome to the Playing Cards API! Use /cards to view the collection.");
});

// GET all cards
app.get('/cards', (req, res) => {
  res.json(cards);
});

// GET a card by ID
app.get('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }
  res.json(card);
});

// POST (add new card)
app.post('/cards', (req, res) => {
  const newCard = {
    id: cards.length + 1,
    suit: req.body.suit,
    value: req.body.value
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// DELETE a card by ID
app.delete('/cards/:id', (req, res) => {
  const cardIndex = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (cardIndex === -1) {
    return res.status(404).json({ message: "Card not found" });
  }
  const deletedCard = cards.splice(cardIndex, 1);
  res.json(deletedCard);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
