const form = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
const API_URL = 'http://localhost:4000/books';

form.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.releaseYear = parseInt(data.releaseYear);
  data.myRating = parseInt(data.myRating);

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  form.reset();
  loadBooks();
});

async function loadBooks() {
  const res = await fetch(API_URL);
  const books = await res.json();

  bookList.innerHTML = '';
  books.forEach(book => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${book.title} by ${book.author} (${book.releaseYear})</h3>
      <p><strong>My Review:</strong> ${book.myReview}</p>
      <p><strong>My Rating:</strong> ${book.myRating}/10</p>
      <button onclick="deleteBook(${book.id})">Delete</button>
    `;
    bookList.appendChild(div);
  });
}

async function deleteBook(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadBooks();
}

// Load books on page load
loadBooks();
