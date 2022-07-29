DROP DATABASE IF EXISTS mData_db;
CREATE DATABASE mData_db;

CREATE TABLE MovieInfo (

    id INT NOT NULL 
    titles VARCHAR(255) NOT NULL,

    ratings VARCHAR(10) NOT NULL,

    stars INT NOT NULL
);

USE mData_db;
    