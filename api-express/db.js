const {Client} = require('pg');
const express=require('express');

const con = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'dazztyn123',
  database: "dazztynDB"
});

con.connect().then(() => console.log('Connected to database'))