"use strict";
const prompt = require('prompt-sync')();
// db
const mysql = require('mysql2/promise');

const connexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Overmysql1122',
  database: 'juegocartas',
});

//mongo
const {MongoClient} = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;

async function connectToMongo() {
    try {
      await client.connect();
      db = client.db("juegoCartasMongoDB");
      console.log("Conexion establecida");
    } catch (err) {
      console.error("Error al conectar a MongoDB:", err);
      process.exit(1);
    }
    prompt('Pulse ENTER para continuar');
}

async function getDB() {
  if(!db) {
    await connectToMongo();
  }
  return db;
}

module.exports = {connexion, getDB};