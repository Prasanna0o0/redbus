const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Configuration
const dbConfig = {
    user: 'sa',
    password: 'admin@123',
    server: 'localhost', // Replace with your SQL Server hostname or IP address
    database: 'busred',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

// Connect to Database
sql.connect(dbConfig).then(pool => {
  if (pool.connecting) {
    console.log('Connecting to the database...');
  } else {
    console.log('Connected to the database!');
  }
}).catch(err => {
  console.error('Database connection failed:', err);
});

// Routes
app.get('/api/trips', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Trips`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/bookings', async (req, res) => {
  const { City, BusTime, TripID, SeatNo, UserID } = req.body;
  try {
    await sql.query`
      INSERT INTO Bookings (City, BusTime, TripID, SeatNo, Booked, UserID)
      VALUES (${City}, ${BusTime}, ${TripID}, ${SeatNo}, 1, ${UserID})
    `;
    res.status(201).send('Booking successful');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { Username, Email } = req.body;
  try {
    const result = await sql.query`
      INSERT INTO Users (Username, Email)
      VALUES (${Username}, ${Email})
    `;
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { Username } = req.body;
  try {
    const result = await sql.query`
      SELECT * FROM Users WHERE Username = ${Username}
    `;
    if (result.recordset.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
