CREATE DATABASE if not exists juegocartas;
USE juegocartas;
CREATE TABLE if not exists cartas (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    vida INT,
    fuerza INT
    );
    SELECT*FROM cartas;