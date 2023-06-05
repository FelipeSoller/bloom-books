import axios from 'axios';

const apiKey = process.env.NYT_API_KEY;

export async function fetchGenreLists() {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${apiKey}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching genre lists:', error);
    return [];
  }
}

export async function fetchBooksByGenre(genre) {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/current/${genre}.json?api-key=${apiKey}`
    );

    const { results } = response.data;

    const books = results.books.map((book) => {
      const {
        rank,
        publisher,
        description,
        price,
        title,
        author,
        amazon_product_url,
        book_image
      } = book;

      return {
        rank,
        publisher,
        description,
        price,
        title,
        author,
        amazonProductUrl: amazon_product_url,
        image: book_image
      };
    });

    return books;
  } catch (error) {
    console.error('Error fetching books by genre:', error);
    return [];
  }
}
