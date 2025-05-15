CREATE DATABASE db_controle_jogos_bb;

use db_controle_jogos_bb;


CREATE TABLE IF NOT EXISTS tbl_jogo(
	id int not null primary key auto_increment,
  nome varchar(80) not null UNIQUE,
  data_lancamento date not null,
  versao varchar(10) not null,
  tamanho varchar(10),
  descricao text,
  foto_capa varchar(250),
  link varchar(250)
);

-- Tabela de Gêneros
CREATE TABLE IF NOT EXISTS tbl_genero (
  id INT NOT NULL PRIMARY KEY  AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL UNIQUE
);

-- Tabela de Países
CREATE TABLE IF NOT EXISTS tbl_paises (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL UNIQUE,
  sigla VARCHAR(4) NOT NULL UNIQUE,
  moeda VARCHAR(30) NOT NULL,
  simbolo_de_moeda VARCHAR(4) NOT NULL,
  bandeira VARCHAR(250),
  emoji VARCHAR(8)
);

CREATE TABLE IF NOT EXISTS tbl_plataforma (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL UNIQUE,
  taxa DECIMAL(4,2) NOT NULL,
  logo VARCHAR(250) NOT NULL
);


-- Tabela de Sexo
CREATE TABLE IF NOT EXISTS tbl_sexo (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(40) NOT NULL UNIQUE,
  sigla VARCHAR(3) NOT NULL UNIQUE
);

-- Tabela de Tipos de Pagamento
CREATE TABLE IF NOT EXISTS tbl_tipo_pagamento (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50) NOT NULL UNIQUE,
  logo VARCHAR(250)
);



-- Tabela de DLCs
CREATE TABLE IF NOT EXISTS tbl_dlc (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_jogo_principal INT NOT NULL,
  id_jogo_dlc INT NOT NULL,
  FOREIGN KEY (id_jogo_principal) REFERENCES tbl_jogo (id),
  FOREIGN KEY (id_jogo_dlc) REFERENCES tbl_jogo (id) ON DELETE CASCADE
);


-- Tabela de Conquistas
CREATE TABLE IF NOT EXISTS tbl_conquistas (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  descricao TEXT NOT NULL,
  id_jogo INT NOT NULL,
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id) ON DELETE CASCADE
);

-- Relacionamento entre Jogos e Gêneros
CREATE TABLE IF NOT EXISTS tbl_jogo_genero (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_jogo INT NOT NULL,
  id_genero INT NOT NULL,
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id) ON DELETE CASCADE,
  FOREIGN KEY (id_genero) REFERENCES tbl_genero (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tbl_jogo_plataforma (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_plataforma INT NOT NULL,
  id_jogo INT NOT NULL,
  FOREIGN KEY (id_plataforma) REFERENCES tbl_plataforma (id) ON DELETE CASCADE,
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id) ON DELETE CASCADE
);


-- Tabela de Preços
CREATE TABLE IF NOT EXISTS tbl_preco (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  valor DECIMAL(7,2) NOT NULL,
  id_jogo INT NOT NULL,
  id_paises INT NOT NULL,
  id_plataforma INT NOT NULL,
  id_tipo_pagamento INT NOT NULL,
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id) ON DELETE CASCADE,
  FOREIGN KEY (id_paises) REFERENCES tbl_paises (id) ON DELETE CASCADE,
  FOREIGN KEY (id_plataforma) REFERENCES tbl_plataforma (id) ON DELETE CASCADE,
  FOREIGN KEY (id_tipo_pagamento) REFERENCES tbl_tipo_pagamento (id) ON DELETE CASCADE
);


-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS tbl_usuario (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  senha_salt VARCHAR(32) NOT NULL,
  senha_hash VARCHAR(128) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  biografia TEXT,
  data_de_nascimento DATE NOT NULL,
  nome VARCHAR(50) NOT NULL UNIQUE,
  foto_perfil VARCHAR(250) NOT NULL,
  id_paises INT,
  id_sexo INT,
  FOREIGN KEY (id_paises) REFERENCES tbl_paises (id),
  FOREIGN KEY (id_sexo) REFERENCES tbl_sexo (id)
);


-- Tabela de Empresas
CREATE TABLE IF NOT EXISTS tbl_empresa (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL UNIQUE,
  senha_salt VARCHAR(32) NOT NULL,
  senha_hash VARCHAR(128) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  data_de_fundacao DATE NOT NULL,
  biografia TEXT NULL,
  foto VARCHAR(250) NULL,
  id_paises INT NOT NULL,
  FOREIGN KEY (id_paises) REFERENCES tbl_paises (id)
);


-- Relacionamento entre Empresas e Jogos
CREATE TABLE IF NOT EXISTS tbl_publicacao_jogo_da_empresa (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  data_de_publicacao DATE NOT NULL,
  id_empresa INT NOT NULL,
  id_jogo INT NOT NULL,
  FOREIGN KEY (id_empresa) REFERENCES tbl_empresa (id) ON DELETE CASCADE,
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id) ON DELETE CASCADE
);

-- Relacionamento entre Usuários e Jogos
CREATE TABLE IF NOT EXISTS tbl_publicacao_jogo_do_usuario (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  data_de_publicacao DATE NOT NULL,
  id_usuario INT NOT NULL,
  id_jogo INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id) ON DELETE CASCADE,
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id) ON DELETE CASCADE
);


-- Tabela de Avaliações
CREATE TABLE IF NOT EXISTS tbl_avaliacao (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  comentario TEXT,
  pontuacao INT NOT NULL,
  id_jogo INT NOT NULL,
  id_usuario INT NOT NULL,
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id),
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id) ON DELETE CASCADE
);


-- Relacionamento entre Usuários e Conquistas
CREATE TABLE IF NOT EXISTS tbl_usuario_conquistas (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  realizada TINYINT NOT NULL,
  id_usuario INT NOT NULL,
  id_conquistas INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id) ON DELETE CASCADE,
  FOREIGN KEY (id_conquistas) REFERENCES tbl_conquistas (id) ON DELETE CASCADE
);


-- Tabela de Compras de Jogos
CREATE TABLE IF NOT EXISTS tbl_compra_jogo (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  data_compra DATE NOT NULL,
  comprovante VARCHAR(250) NOT NULL,
  id_usuario INT NOT NULL,
  id_preco INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id),
  FOREIGN KEY (id_preco) REFERENCES tbl_preco (id)
);


use db_controle_jogos_bb;

show tables;
SELECT * FROM tbl_jogo WHERE id = 1;

select * from tbl_jogo;
