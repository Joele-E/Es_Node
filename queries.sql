CREATE TABLE Books (
	book_id INTEGER PRIMARY KEY,
  	title TEXT NOT NULL,
  	author TEXT NOT NULL,
    genre TEXT NOT NULL,
    published_year YEAR NOT NULL,
    isbn TEXT NOT NULL,
    price MONEY NOT NULL
    rating DECIMAL(4,2),
    stock_count INTEGER NOT NULL
  
)