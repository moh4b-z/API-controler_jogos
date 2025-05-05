

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



-- Relacionamento entre Usuários e Conquistas
CREATE TABLE tbl_usuario_conquistas (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  realizada TINYINT NOT NULL,
  id_usuario INT NOT NULL,
  id_conquistas INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id),
  FOREIGN KEY (id_conquistas) REFERENCES tbl_conquistas (id)
);



-- Relacionamento entre Empresas e Jogos
CREATE TABLE tbl_publicacao_jogo_da_empresa (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  data_de_publicacao DATE NOT NULL,
  id_empresa INT NOT NULL,
  id_jogo INT NOT NULL,
  FOREIGN KEY (id_empresa) REFERENCES tbl_empresa (id),
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id)
);

-- Relacionamento entre Usuários e Jogos
CREATE TABLE tbl_publicacao_jogo_do_usuario (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  data_de_publicacao DATE NOT NULL,
  id_usuario INT NOT NULL,
  id_jogo INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id),
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id)
);

