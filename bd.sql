CREATE DATABASE db_estudo;


CREATE TABLE db_estudo.tb_pessoa
(
	codigo INTEGER      AUTO_INCREMENT PRIMARY KEY,
	nome   VARCHAR(100) NOT NULL,
	sexo   CHAR(1)	    NOT NULL   ,
  tipo   CHAR(1)	     

);
