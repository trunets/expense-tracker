CREATE TABLE categories(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE expenses(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    category_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);