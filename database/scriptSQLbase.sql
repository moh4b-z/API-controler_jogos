
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

