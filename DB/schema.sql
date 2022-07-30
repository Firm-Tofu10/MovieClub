DROP DATABASE IF EXISTS Userdata_db;
CREATE DATABASE Userdata_db;
USE Userdata_db;

CREATE TABLE MovieInfo (

    id INT(11) NOT NULL AUTO_INCREMENT, 
    titles VARCHAR(255) NOT NULL,
    ratings VARCHAR(10) NOT NULL,
    stars INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE UserLogin (
  
  id INT(11) NOT NULL AUTO_INCREMENT,
  password VARCHAR(255) NOT NULL,
  
  user_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

    