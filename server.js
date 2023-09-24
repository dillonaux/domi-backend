const express = require('express');

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 5000;

const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'domi',
  password: 'postgres',
  port: 5432,
});

app.post('/address', (req, res) => {
  const { getPaid, name, earn, phone } = req.body;

  pool.connect();

  pool.query('INSERT INTO accounts (usr_name, usr_region, usr_earn, phone_num) VALUES ($1, $2, $3, $4)', [getPaid, name, earn, phone], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting data');
    } else {
      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    }

  });
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));