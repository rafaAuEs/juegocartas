"use strict";
// db
const mysql = require('mysql2/promise');

const connexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Overmysql1122',
  database: 'juegocartas',
});

module.exports = connexion;