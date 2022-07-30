DROP DATABASE IF EXISTS Userdata_db;
CREATE DATABASE Userdata_db;
USE Userdata_db;

CREATE TABLE MovieInfo (

    id INT NOT NULL, 
    titles VARCHAR(255) NOT NULL,
    ratings VARCHAR(10) NOT NULL,
    stars INT NOT NULL
);

CREATE TABLE UserLogin (
  
  id INT NOT NULL,
  password VARCHAR(255) NOT NULL,
  
  user_name VARCHAR(30) NOT NULL
);

    