use db_controle_jogos_bb;




-- Tabela de Gêneros
CREATE TABLE tbl_genero (
  id INT NOT NULL PRIMARY KEY  AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL
);

create table tbl_jogo(
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    data_lancamento date not null,
    versao varchar(10) not null,
    tamanho varchar(10),
    descricao text,
    foto_capa varchar(200),
    link varchar(200)
);


-- Tabela de Países
CREATE TABLE tbl_paises (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  sigla VARCHAR(4) NOT NULL,
  moeda VARCHAR(30) NOT NULL
);

CREATE TABLE tbl_plataforma (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL
);


-- Tabela de Sexo
CREATE TABLE tbl_sexo (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(40) NOT NULL,
  sigla VARCHAR(3) NOT NULL
);

-- Tabela de Tipos de Pagamento
CREATE TABLE tbl_tipo_pagamento (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50) NOT NULL
);



use db_controle_jogos_bb;

show tables;
SELECT * FROM tbl_jogo WHERE id = 1;

select * from tbl_jogo;
