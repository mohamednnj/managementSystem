const express = require('express');
const {Client} = require('pg');

const con = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'learn',
    password: '010993060MoEl.',
    port: 5432,
})

con.connect().then(() => {
    console.log('Connected to the database');
})

const app = new express();
app.use(express.json())

app.get('/', (req, res) => {
    con.query('SELECT first_name FROM actor', (err, result) => {
        if (err) throw err;
        res.json(result.rows);
    })
})
app.listen(3000, (() => {
    console.log('Server is running on http://localhost:3000 ');
}))