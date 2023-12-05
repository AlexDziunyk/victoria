CREATE DATABASE IF NOT EXISTS ucode_web;
CREATE USER IF NOT EXISTS 'alexdz' IDENTIFIED BY 'securepass';
GRANT ALL ON ucode_web.* TO 'alexdz';

USE ucode_web;


CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    login VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullName VARCHAR(255),
    email VARCHAR(50) UNIQUE NOT NULL,
    role ENUM('user', 'admin') NOT NULL,
    avatar VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS post (
    id INT NOT NULL AUTO_INCREMENT,
    author VARCHAR(30) NOT NULL,
    title VARCHAR(256) NOT NULL,
    status ENUM('active', 'inactive') NOT NULL,
    content TEXT(256) NOT NULL,
    categories VARCHAR(50) NOT NULL,
    date VARCHAR(256) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS category (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(256) NOT NULL,
    author VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE IF NOT EXISTS comment (
    id INT NOT NULL AUTO_INCREMENT,
    author VARCHAR(50) NOT NULL,
    date VARCHAR(256) NOT NULL,
    content VARCHAR(500) NOT NULL,
    post_id INT,
    reply_id INT,
    FOREIGN KEY(post_id) REFERENCES post(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
);


CREATE TABLE IF NOT EXISTS likes (
    id INT NOT NULL AUTO_INCREMENT,
    author VARCHAR(50) NOT NULL,
    date VARCHAR(256) NOT NULL,
    post_id INT,
    comment_id INT,
    type ENUM('like', 'dislike') NOT NULL,
    FOREIGN KEY(post_id) REFERENCES post(id) ON DELETE CASCADE,
    FOREIGN KEY(comment_id) REFERENCES comment(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
);



INSERT INTO admins (login, email, password, role)
VALUE ('admin', 'alexadmin1@gmail.com', 'admin', 'admin');


