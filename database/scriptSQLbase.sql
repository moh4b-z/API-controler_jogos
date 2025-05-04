
-- Tabela de Usuários
CREATE TABLE tbl_usuario (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  senha_salt VARCHAR(32) NOT NULL,
  senha_hash VARCHAR(128) NOT NULL,
  email VARCHAR(100) NOT NULL,
  biografia TEXT,
  data_de_nascimento DATE NOT NULL,
  nome VARCHAR(80) NOT NULL,
  foto_perfil VARCHAR(250) NOT NULL,
  id_paises INT NOT NULL,
  id_sexo INT NOT NULL,
  FOREIGN KEY (id_paises) REFERENCES tbl_paises (id),
  FOREIGN KEY (id_sexo) REFERENCES tbl_sexo (id)
);

-- Tabela de Avaliações
CREATE TABLE tbl_avaliacao (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  comentario TEXT NOT NULL,
  pontuacao INT NOT NULL,
  id_jogo INT NOT NULL,
  id_usuario INT NOT NULL,
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id),
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id)
);



-- Tabela de Compras de Jogos
CREATE TABLE tbl_compra_jogo (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  data_compra DATE NOT NULL,
  comprovante VARCHAR(200) NOT NULL,
  id_usuario INT NOT NULL,
  id_preco INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id),
  FOREIGN KEY (id_preco) REFERENCES tbl_preco (id)
);



-- Tabela de Conquistas
CREATE TABLE tbl_conquistas (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  descricao TEXT NOT NULL,
  id_jogo INT NOT NULL,
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id)
);

-- Relacionamento entre Usuários e Conquistas
CREATE TABLE tbl_usuario_conquistas (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  realizada TINYINT NOT NULL,
  id_usuario INT NOT NULL,
  id_conquistas INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id),
  FOREIGN KEY (id_conquistas) REFERENCES tbl_conquistas (id)
);

-- Tabela de Empresas
CREATE TABLE tbl_empresa (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  senha_salt VARCHAR(32) NOT NULL,
  senha_hash VARCHAR(128) NOT NULL,
  email VARCHAR(100) NOT NULL,
  data_de_fundacao DATE NOT NULL,
  biografia TEXT NULL,
  foto VARCHAR(250) NULL,
  id_paises INT NOT NULL,
  FOREIGN KEY (id_paises) REFERENCES tbl_paises (id)
);

-- Relacionamento entre Empresas e Jogos
CREATE TABLE tbl_empresa_jogo (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  data_de_publicacao DATE NOT NULL,
  id_empresa INT NOT NULL,
  id_jogo INT NOT NULL,
  FOREIGN KEY (id_empresa) REFERENCES tbl_empresa (id),
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id)
);

-- Relacionamento entre Usuários e Jogos
CREATE TABLE tbl_usuario_jogo (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  data_de_publicacao DATE NOT NULL,
  id_usuario INT NOT NULL,
  id_jogo INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id),
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id)
);

