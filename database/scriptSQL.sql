use db_controle_jogos_bb;
DROP TABLE nome_da_tabela;





create table tbl_jogo(
	id int not null primary key auto_increment,
  nome varchar(80) not null UNIQUE,
  data_lancamento date not null,
  versao varchar(10) not null,
  tamanho varchar(10),
  descricao text,
  foto_capa varchar(200),
  link varchar(200)
);

-- Tabela de Gêneros
CREATE TABLE tbl_genero (
  id INT NOT NULL PRIMARY KEY  AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL UNIQUE
);

-- Tabela de Países
CREATE TABLE tbl_paises (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL UNIQUE,
  sigla VARCHAR(4) NOT NULL UNIQUE,
  moeda VARCHAR(30) NOT NULL,
  simbolo_de_moeda VARCHAR(4) NOT NULL,
  bandeira VARCHAR(200)
);

CREATE TABLE tbl_plataforma (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL UNIQUE,
  taxa DECIMAL(4,2) NOT NULL,
  logo VARCHAR(200) NOT NULL
);


-- Tabela de Sexo
CREATE TABLE tbl_sexo (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(40) NOT NULL UNIQUE,
  sigla VARCHAR(3) NOT NULL UNIQUE
);

-- Tabela de Tipos de Pagamento
CREATE TABLE tbl_tipo_pagamento (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50) NOT NULL UNIQUE,
  logo VARCHAR(200)
);



-- Tabela de DLCs
CREATE TABLE tbl_dlc (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_jogo_principal INT NOT NULL,
  id_jogo_dlc INT NOT NULL,
  FOREIGN KEY (id_jogo_principal) REFERENCES tbl_jogo (id),
  FOREIGN KEY (id_jogo_dlc) REFERENCES tbl_jogo (id)
);

-- Relacionamento entre Jogos e Gêneros
CREATE TABLE tbl_jogo_genero (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_jogo INT NOT NULL,
  id_genero INT NOT NULL,
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id),
  FOREIGN KEY (id_genero) REFERENCES tbl_genero (id)
);

CREATE TABLE tbl_jogo_plataforma (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_plataforma INT NOT NULL,
  id_jogo INT NOT NULL,
  FOREIGN KEY (id_plataforma) REFERENCES tbl_plataforma (id),
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id)
);



use db_controle_jogos_bb;

show tables;
SELECT * FROM tbl_jogo WHERE id = 1;

select * from tbl_jogo;
