
-- Tabela de Jogos
CREATE TABLE `tbl_jogo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NOT NULL,
  `data_lancamento` DATE NOT NULL,
  `versao` VARCHAR(10) NOT NULL,
  `tamanho` VARCHAR(10) NULL,
  `descricao` TEXT NULL,
  `foto_capa` VARCHAR(200) NULL,
  `link` VARCHAR(200) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Tabela de Países
CREATE TABLE `tbl_paises` (
  `id` INT NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `moeda` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Tabela de Sexo
CREATE TABLE `tbl_sexo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Tabela de Usuários
CREATE TABLE `tbl_usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `salt` VARCHAR(32) NOT NULL,
  `hash` VARCHAR(128) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `biografia` TEXT NULL,
  `data_de_nascimento` DATE NOT NULL,
  `nome` VARCHAR(80) NOT NULL,
  `foto_perfil` VARCHAR(250) NOT NULL,
  `id_paises` INT NOT NULL,
  `id_sexo` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_paises`) REFERENCES `tbl_paises` (`id`),
  FOREIGN KEY (`id_sexo`) REFERENCES `tbl_sexo` (`id`)
) ENGINE=InnoDB;

-- Tabela de Avaliações
CREATE TABLE `tbl_avaliacao` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comentario` TEXT NOT NULL,
  `pontuacao` INT NOT NULL,
  `id_jogo` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_jogo`) REFERENCES `tbl_jogo` (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario` (`id`)
) ENGINE=InnoDB;

-- Tabela de Gêneros
CREATE TABLE `tbl_genero` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Relacionamento entre Jogos e Gêneros
CREATE TABLE `tbl_jogo_genero` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_jogo` INT NOT NULL,
  `id_genero` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_jogo`) REFERENCES `tbl_jogo` (`id`),
  FOREIGN KEY (`id_genero`) REFERENCES `tbl_genero` (`id`)
) ENGINE=InnoDB;

-- Tabela de DLCs
CREATE TABLE `tbl_dlc` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_jogo_principal` INT NOT NULL,
  `id_jogo_dlc` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_jogo_principal`) REFERENCES `tbl_jogo` (`id`),
  FOREIGN KEY (`id_jogo_dlc`) REFERENCES `tbl_jogo` (`id`)
) ENGINE=InnoDB;

-- Tabela de Tipos de Pagamento
CREATE TABLE `tbl_tipo_pagamento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Tabela de Compras de Jogos
CREATE TABLE `tbl_compra_jogo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_compra` DATE NOT NULL,
  `comprovante` VARCHAR(200) NOT NULL,
  `id_usuario` INT NOT NULL,
  `id_jogo` INT NOT NULL,
  `id_tipo_pagamento` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario` (`id`),
  FOREIGN KEY (`id_jogo`) REFERENCES `tbl_jogo` (`id`),
  FOREIGN KEY (`id_tipo_pagamento`) REFERENCES `tbl_tipo_pagamento` (`id`)
) ENGINE=InnoDB;

-- Tabela de Preços
CREATE TABLE `tbl_preco` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `valor` DECIMAL(6,2) NOT NULL,
  `id_jogo` INT NOT NULL,
  `id_paises` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_jogo`) REFERENCES `tbl_jogo` (`id`),
  FOREIGN KEY (`id_paises`) REFERENCES `tbl_paises` (`id`)
) ENGINE=InnoDB;

-- Tabela de Conquistas
CREATE TABLE `tbl_conquistas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` TEXT NOT NULL,
  `id_jogo` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_jogo`) REFERENCES `tbl_jogo` (`id`)
) ENGINE=InnoDB;

-- Relacionamento entre Usuários e Conquistas
CREATE TABLE `tbl_usuario_conquistas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `realizada` TINYINT NOT NULL,
  `id_usuario` INT NOT NULL,
  `id_conquistas` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario` (`id`),
  FOREIGN KEY (`id_conquistas`) REFERENCES `tbl_conquistas` (`id`)
) ENGINE=InnoDB;

-- Tabela de Empresas
CREATE TABLE `tbl_empresa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `salt` VARCHAR(32) NOT NULL,
  `hash` VARCHAR(128) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `data_de_fundacao` DATE NOT NULL,
  `biografia` TEXT NULL,
  `foto` VARCHAR(250) NULL,
  `id_paises` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_paises`) REFERENCES `tbl_paises` (`id`)
) ENGINE=InnoDB;

-- Relacionamento entre Empresas e Jogos
CREATE TABLE `tbl_empresa_jogo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_de_publicacao` DATE NOT NULL,
  `id_empresa` INT NOT NULL,
  `id_jogo` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_empresa`) REFERENCES `tbl_empresa` (`id`),
  FOREIGN KEY (`id_jogo`) REFERENCES `tbl_jogo` (`id`)
) ENGINE=InnoDB;

CREATE TABLE tbl_usuario_jogo (
  id INT NOT NULL AUTO_INCREMENT,
  data_de_publicacao DATE NOT NULL,
  id_usuario INT NOT NULL,
  id_jogo INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id),
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id)
);


CREATE TABLE tbl_plataforma_jogo (
  id INT NOT NULL AUTO_INCREMENT,
  id_plataforma INT NOT NULL,
  id_jogo INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_plataforma) REFERENCES tbl_plataforma (id),
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id)
);

CREATE TABLE tbl_plataforma (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL
);
