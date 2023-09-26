const express = require('express');

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 5000;

const { Pool } = require('pg');
const pool = new Pool({
  user: 'digitaldomi_user',
  host: 'localhost',
  database: 'digitaldomi_db',
  password: 'rI7hJ4sF1zC4jA1oN0eT8wT1q',
  port: 5432,
});

app.post('/api/address', (req, res) => {
  const { getPaid, name, earn, phone } = req.body;
  const tableName = 'accounts'
  const query = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    user_id serial PRIMARY KEY NOT NULL,
    usr_name VARCHAR(255) NOT NULL,
    usr_region VARCHAR(255) NOT NULL,
    usr_earn VARCHAR(255) NOT NULL,
    phone_num VARCHAR(255) NOT NULL
  );
  
  INSERT INTO ${tableName} (usr_name, usr_region, usr_earn, phone_num) VALUES ('${getPaid}', '${name}', '${earn}', '${phone}')`;

  pool.connect();

  pool.query(query, (err, result) => {
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
