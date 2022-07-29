DROP DATABASE IF EXISTS Userdata_db;
CREATE DATABASE Userdata_db;

CREATE TABLE UserLogin (
  
  id INT NOT NULL,
  password VARCHAR(255) NOT NULL,
  
  user_name VARCHAR(30) NOT NULL
);

USE Userdata_db;
