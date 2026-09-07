const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('../expenses.db');

app.get('/',(req,res) => {
    db.all('SELECT * FROM expenses', [], (err, rows)=>{
        if(err){
            res.status(500).json({error:err.message});
            return;
        }
        res.json(rows);
    })
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})