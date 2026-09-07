const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const { parse } = require('csv-parse');

const db = new sqlite3.Database('../expenses.db');

const csvContent = fs.readFileSync('expenses.csv');

parse(csvContent, {
  columns: true,  // treats the first row as headers
  skip_empty_lines: true
}, (err, rows) => {
  if (err) {
    console.error('Error parsing CSV:', err);
    return;
  }

  rows.forEach((row) => {
    db.run(
        'insert into expenses (description,amount,category_id, date) values(?,?,?,?)',
        [row.description,row.amount,row.category_id,row.date],
        (err) => {
            if(err){
                console.error('Error inserting row: ',err);
            }else {
                console.log('Inserted: ',row.description);
            }
        }
    )
  })
  db.close();
});