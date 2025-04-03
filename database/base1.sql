-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`tbl_jogo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_jogo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NOT NULL,
  `data_lancamento` DATE NOT NULL,
  `versao` VARCHAR(10) NOT NULL,
  `tamanho` VARCHAR(10) NULL,
  `descricao` TEXT NULL,
  `foto_capa` VARCHAR(200) NULL,
  `link` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_paises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_paises` (
  `id` INT NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `moeda` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_sexo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_sexo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `salt` VARCHAR(32) NOT NULL,
  `hash` VARCHAR(128) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `biografia` TEXT NULL,
  `data_de_nacimento` DATE NOT NULL,
  `nome` VARCHAR(80) NOT NULL,
  `foto_perfil` VARCHAR(250) NOT NULL,
  `id_paises` INT NOT NULL,
  `id_sexo` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_usuario_Paises1_idx` (`id_paises` ASC) VISIBLE,
  INDEX `fk_tbl_usuario_tbl_sexo1_idx` (`id_sexo` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_usuario_Paises1`
    FOREIGN KEY (`id_paises`)
    REFERENCES `mydb`.`tbl_paises` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_usuario_tbl_sexo1`
    FOREIGN KEY (`id_sexo`)
    REFERENCES `mydb`.`tbl_sexo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_avalicao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_avalicao` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comentario` TEXT NOT NULL,
  `pontuacao` INT NOT NULL,
  `tbl_jogo_id` INT NOT NULL,
  `tbl_usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_avalicao_tbl_jogo1_idx` (`tbl_jogo_id` ASC) VISIBLE,
  INDEX `fk_tbl_avalicao_tbl_usuario1_idx` (`tbl_usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_avalicao_tbl_jogo1`
    FOREIGN KEY (`tbl_jogo_id`)
    REFERENCES `mydb`.`tbl_jogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_avalicao_tbl_usuario1`
    FOREIGN KEY (`tbl_usuario_id`)
    REFERENCES `mydb`.`tbl_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_genero` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_jogo_genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_jogo_genero` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_jogo` INT NOT NULL,
  `id_genero` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_jogo_genero_tbl_jogo1_idx` (`id_jogo` ASC) VISIBLE,
  INDEX `fk_tbl_jogo_genero_tbl_genero1_idx` (`id_genero` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_jogo_genero_tbl_jogo1`
    FOREIGN KEY (`id_jogo`)
    REFERENCES `mydb`.`tbl_jogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_jogo_genero_tbl_genero1`
    FOREIGN KEY (`id_genero`)
    REFERENCES `mydb`.`tbl_genero` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_dlc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_dlc` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_jogo_principal` INT NOT NULL,
  `id_jogo_dlc` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_dlc_tbl_jogo1_idx` (`id_jogo_principal` ASC) VISIBLE,
  INDEX `fk_tbl_dlc_tbl_jogo2_idx` (`id_jogo_dlc` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_dlc_tbl_jogo1`
    FOREIGN KEY (`id_jogo_principal`)
    REFERENCES `mydb`.`tbl_jogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_dlc_tbl_jogo2`
    FOREIGN KEY (`id_jogo_dlc`)
    REFERENCES `mydb`.`tbl_jogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_tipo_pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_tipo_pagamento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_compra_jogo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_compra_jogo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_compra` DATE NOT NULL,
  `comprovante` VARCHAR(200) NOT NULL,
  `id_usuario` INT NOT NULL,
  `id_jogo` INT NOT NULL,
  `id_tipo_pagamento` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_compra_jogo_tbl_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_tbl_compra_jogo_tbl_jogo1_idx` (`id_jogo` ASC) VISIBLE,
  INDEX `fk_tbl_compra_jogo_tipo_pagamento1_idx` (`id_tipo_pagamento` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_compra_jogo_tbl_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `mydb`.`tbl_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_compra_jogo_tbl_jogo1`
    FOREIGN KEY (`id_jogo`)
    REFERENCES `mydb`.`tbl_jogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_compra_jogo_tipo_pagamento1`
    FOREIGN KEY (`id_tipo_pagamento`)
    REFERENCES `mydb`.`tbl_tipo_pagamento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_preco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_preco` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `valor` DECIMAL(6,2) NOT NULL,
  `id_jogo` INT NOT NULL,
  `id_paises` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_preco_tbl_jogo1_idx` (`id_jogo` ASC) VISIBLE,
  INDEX `fk_tbl_preco_Paises1_idx` (`id_paises` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_preco_tbl_jogo1`
    FOREIGN KEY (`id_jogo`)
    REFERENCES `mydb`.`tbl_jogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_preco_Paises1`
    FOREIGN KEY (`id_paises`)
    REFERENCES `mydb`.`tbl_paises` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_conquistas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_conquistas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` TEXT NOT NULL,
  `tbl_jogo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_conquistas_tbl_jogo1_idx` (`tbl_jogo_id` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_conquistas_tbl_jogo1`
    FOREIGN KEY (`tbl_jogo_id`)
    REFERENCES `mydb`.`tbl_jogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_usuario_conquistas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_usuario_conquistas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `realizada` TINYINT NOT NULL,
  `id_usuario` INT NOT NULL,
  `id_conquistas` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_usuario_conquistas_tbl_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_tbl_usuario_conquistas_tbl_conquistas1_idx` (`id_conquistas` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_usuario_conquistas_tbl_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `mydb`.`tbl_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_usuario_conquistas_tbl_conquistas1`
    FOREIGN KEY (`id_conquistas`)
    REFERENCES `mydb`.`tbl_conquistas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_empresa` (
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
  INDEX `fk_tbl_empresa_Paises1_idx` (`id_paises` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_empresa_Paises1`
    FOREIGN KEY (`id_paises`)
    REFERENCES `mydb`.`tbl_paises` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_empresa_jogo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_empresa_jogo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_de_publicacao` DATE NOT NULL,
  `id_empresa` INT NOT NULL,
  `tbl_jogo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_empresa_publicar_tbl_empresa1_idx` (`id_empresa` ASC) VISIBLE,
  INDEX `fk_tbl_empresa_publicar_tbl_jogo1_idx` (`tbl_jogo_id` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_empresa_publicar_tbl_empresa1`
    FOREIGN KEY (`id_empresa`)
    REFERENCES `mydb`.`tbl_empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_empresa_publicar_tbl_jogo1`
    FOREIGN KEY (`tbl_jogo_id`)
    REFERENCES `mydb`.`tbl_jogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_usuario_jogo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_usuario_jogo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_de_publicacao` DATE NOT NULL,
  `tbl_usuario_id` INT NOT NULL,
  `tbl_jogo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_usuario_jogo_tbl_usuario1_idx` (`tbl_usuario_id` ASC) VISIBLE,
  INDEX `fk_tbl_usuario_jogo_tbl_jogo1_idx` (`tbl_jogo_id` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_usuario_jogo_tbl_usuario1`
    FOREIGN KEY (`tbl_usuario_id`)
    REFERENCES `mydb`.`tbl_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_usuario_jogo_tbl_jogo1`
    FOREIGN KEY (`tbl_jogo_id`)
    REFERENCES `mydb`.`tbl_jogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_plataforma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_plataforma` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tbl_plataforma_jogo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tbl_plataforma_jogo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tbl_plataforma_id` INT NOT NULL,
  `tbl_jogo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_plataforma_jogo_tbl_plataforma1_idx` (`tbl_plataforma_id` ASC) VISIBLE,
  INDEX `fk_tbl_plataforma_jogo_tbl_jogo1_idx` (`tbl_jogo_id` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_plataforma_jogo_tbl_plataforma1`
    FOREIGN KEY (`tbl_plataforma_id`)
    REFERENCES `mydb`.`tbl_plataforma` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_plataforma_jogo_tbl_jogo1`
    FOREIGN KEY (`tbl_jogo_id`)
    REFERENCES `mydb`.`tbl_jogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
