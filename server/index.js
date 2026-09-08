//test comment
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json())
const db = new sqlite3.Database('../expenses.db');

app.get('/', (req, res) => {
    db.all('SELECT * FROM expenses', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    })
});

app.post('/expenses', (req, res) => {
    const { description, amount, category_id, date } = req.body;

    db.run(
        'INSERT INTO expenses (description,amount,category_id,date) VALUES (?,?,?,?)', [description, amount, category_id, date],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ id: this.lastID, description, amount, category_id, date });
        }
    )
});

app.put('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { description, amount, category_id, date } = req.body;

    db.run(
        `UPDATE expenses SET description = ?, amount = ?, category_id = ?, date = ? WHERE id = ?`,
        [description, amount, category_id, date, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (this.changes === 0) {
                res.status(404).json({ error: 'Expense not found' });
                return;
            }
            res.json({ id, description, amount, category_id, date });
        }
    );
});

app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM expenses WHERE id = ?`, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }
        res.json({ message: `Expense ${id} deleted` });
    });
});

app.get("/expenses/summary", (req, res) => {
    db.all(
        `SELECT categories.name, SUM(expenses.amount) AS total_spent
        FROM expenses
        JOIN categories ON expenses.category_id = categories.id
        GROUP BY categories.name`,
        [],
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        }
    )
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})