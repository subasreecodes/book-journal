const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON bodies

// 🔹 Create a new book
app.post('/books', async (req, res) => {
  try {
    const book = await prisma.book.create({
      data: req.body,
    });
    res.json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// 🔹 Get all books
app.get('/books', async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// 🔹 Update a book (you can add support later)
app.put('/books/:id', async (req, res) => {
  try {
    const { myReview, myRating } = req.body;
    const updatedBook = await prisma.book.update({
      where: { id: Number(req.params.id) },
      data: { myReview, myRating },
    });
    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// 🔹 Delete a book
app.delete('/books/:id', async (req, res) => {
  try {
    await prisma.book.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// 🔹 Root route
app.get('/', (req, res) => {
  res.send('📚 Book Journal API is running!');
});

// 🔹 Start server
app.listen(4000, () => {
  console.log('📚 Book Journal backend running on http://localhost:4000');
});
