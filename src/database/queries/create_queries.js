const dbName = process.env.DB_NAME

const createDB = `CREATE DATABASE ${dbName}`

const dropDB = `DROP DATABASE ${dbName}`

const createSchema = `CREATE SCHEMA userschema`

const createTable = `CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT now(),
    verified BOOLEAN DEFAULT FALSE
)`

const usersHistory = `CREATE TABLE usershistory(
    id SERIAL PRIMARY KEY,
    productimage VARCHAR(100) NOT NULL,
    productname VARCHAR(100) NOT NULL,
    productprice FLOAT NOT NULL,
    location VARCHAR(255)NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
)`

const usersDetails = `CREATE TABLE usersdetails(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(25) UNIQUE NOT NULL,
    image VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
)`

/*const products = `CREATE TABLE products(
    id SERIAL PRIMARY KEY NOT NULL,
    imageurl TEXT,
    category VARCHAR(50),
    price VARCHAR,
    productname VARCHAR(100),
    packsize VARCHAR(50),
    dosageform VARCHAR(50),
    companyname VARCHAR(100),
    productcode VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT now()
)`;*/

const products = `CREATE TABLE products(
    id SERIAL PRIMARY KEY NOT NULL,
    imageurl TEXT NOT NULL DEFAULT '',
    category VARCHAR(50) NOT NULL DEFAULT '',
    price VARCHAR NOT NULL DEFAULT '',
    productname VARCHAR(100) NOT NULL DEFAULT '',
    packsize VARCHAR(50) NOT NULL DEFAULT '',
    dosageform VARCHAR(50) NOT NULL DEFAULT '',
    companyname VARCHAR(100) NOT NULL DEFAULT '',
    productcode VARCHAR(50) NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT now()
)`

const pharmacies = `CREATE TABLE pharmacies(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    address VARCHAR(255),
    longitude NUMERIC(5, 2),
    latitude NUMERIC(5, 2),
    created_at TIMESTAMP NOT NULL DEFAULT now()
)`






