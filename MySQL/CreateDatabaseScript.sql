-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema radnja
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `radnja` ;

-- -----------------------------------------------------
-- Schema radnja
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `radnja` DEFAULT CHARACTER SET utf8 ;
USE `radnja` ;

-- -----------------------------------------------------
-- Table `radnja`.`faceting`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`faceting` ;

CREATE TABLE IF NOT EXISTS `radnja`.`faceting` (
  `faceting_oid` INT NOT NULL AUTO_INCREMENT,
  `faceting_name` VARCHAR(345) NULL DEFAULT NULL,
  `faceting_uom` VARCHAR(45) NULL DEFAULT NULL,
  `faceting_pricePerUom` DECIMAL(20,3) NULL DEFAULT NULL,
  `faceting_cashRegisterNumber` INT NULL DEFAULT NULL,
  `faceting_isActive` TINYINT NULL,
  PRIMARY KEY (`faceting_oid`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `radnja`.`frame`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`frame` ;

CREATE TABLE IF NOT EXISTS `radnja`.`frame` (
  `frame_oid` INT NOT NULL AUTO_INCREMENT,
  `frame_name` VARCHAR(345) NULL DEFAULT NULL,
  `frame_uom` VARCHAR(45) NULL DEFAULT NULL,
  `frame_pricePerUom` DECIMAL(20,3) NULL DEFAULT NULL,
  `frame_cashRegisterNumber` INT NULL DEFAULT NULL,
  `frame_code` VARCHAR(45) NULL DEFAULT NULL,
  `frame_frameWidthMM` INT NULL DEFAULT NULL,
  `frame_isActive` TINYINT NULL,
  PRIMARY KEY (`frame_oid`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `radnja`.`glass`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`glass` ;

CREATE TABLE IF NOT EXISTS `radnja`.`glass` (
  `glass_oid` INT NOT NULL AUTO_INCREMENT,
  `glass_name` VARCHAR(345) NULL DEFAULT NULL,
  `glass_uom` VARCHAR(45) NULL DEFAULT NULL,
  `glass_pricePerUom` DECIMAL(20,3) NULL DEFAULT NULL,
  `glass_cashRegisterNumber` INT NULL DEFAULT NULL,
  `glass_isActive` TINYINT NULL,
  PRIMARY KEY (`glass_oid`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `radnja`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`user` ;

CREATE TABLE IF NOT EXISTS `radnja`.`user` (
  `user_oid` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(145) NULL DEFAULT NULL,
  `user_isActive` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`user_oid`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `radnja`.`invoice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`invoice` ;

CREATE TABLE IF NOT EXISTS `radnja`.`invoice` (
  `invoice_oid` INT NOT NULL AUTO_INCREMENT,
  `invoice_createDate` DATETIME NULL DEFAULT NULL,
  `invoice_amount` DECIMAL(20,3) NULL DEFAULT NULL,
  `invoice_advancePayment` DECIMAL(20,3) NULL DEFAULT NULL,
  `invoice_buyerName` VARCHAR(345) NULL DEFAULT NULL,
  `user_user_oid` INT NOT NULL,
  PRIMARY KEY (`invoice_oid`),
  INDEX `fk_invoice_user1_idx` (`user_user_oid` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_user1`
    FOREIGN KEY (`user_user_oid`)
    REFERENCES `radnja`.`user` (`user_oid`))
ENGINE = InnoDB
AUTO_INCREMENT = 1000000
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `radnja`.`mirror`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`mirror` ;

CREATE TABLE IF NOT EXISTS `radnja`.`mirror` (
  `mirror_oid` INT NOT NULL AUTO_INCREMENT,
  `mirror_name` VARCHAR(345) NULL DEFAULT NULL,
  `mirror_uom` VARCHAR(45) NULL DEFAULT NULL,
  `mirror_pricePerUom` DECIMAL(20,3) NULL DEFAULT NULL,
  `mirror_cashRegisterNumber` INT NULL DEFAULT NULL,
  `mirror_isActive` TINYINT NULL,
  PRIMARY KEY (`mirror_oid`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `radnja`.`passpartu`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`passpartu` ;

CREATE TABLE IF NOT EXISTS `radnja`.`passpartu` (
  `passpartu_oid` INT NOT NULL AUTO_INCREMENT,
  `passpartu_name` VARCHAR(345) NULL DEFAULT NULL,
  `passpartu_uom` VARCHAR(45) NULL DEFAULT NULL,
  `passpartu_pricePerUom` DECIMAL(20,3) NULL DEFAULT NULL,
  `passpartu_cashRegisterNumber` INT NULL DEFAULT NULL,
  `passpartu_isActive` TINYINT NULL,
  PRIMARY KEY (`passpartu_oid`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `radnja`.`passpartucolor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`passpartucolor` ;

CREATE TABLE IF NOT EXISTS `radnja`.`passpartucolor` (
  `passpartuColor_oid` INT NOT NULL AUTO_INCREMENT,
  `passpartuColor_name` VARCHAR(245) NULL DEFAULT NULL,
  `passpartu_passpartu_oid` INT NOT NULL,
  `passpartucolor_isActive` TINYINT NULL,
  PRIMARY KEY (`passpartuColor_oid`),
  INDEX `fk_passpartuColor_passpartu1_idx` (`passpartu_passpartu_oid` ASC) VISIBLE,
  CONSTRAINT `fk_passpartuColor_passpartu1`
    FOREIGN KEY (`passpartu_passpartu_oid`)
    REFERENCES `radnja`.`passpartu` (`passpartu_oid`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `radnja`.`sanding`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`sanding` ;

CREATE TABLE IF NOT EXISTS `radnja`.`sanding` (
  `sanding_oid` INT NOT NULL AUTO_INCREMENT,
  `sanding_name` VARCHAR(345) NULL DEFAULT NULL,
  `sanding_uom` VARCHAR(45) NULL DEFAULT NULL,
  `sanding_pricePerUom` DECIMAL(20,3) NULL DEFAULT NULL,
  `sanding_cashRegisterNumber` INT NULL DEFAULT NULL,
  `sanding_isActive` TINYINT NULL,
  PRIMARY KEY (`sanding_oid`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `radnja`.`invoiceitem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`invoiceitem` ;

CREATE TABLE IF NOT EXISTS `radnja`.`invoiceitem` (
  `invoiceitem_oid` INT NOT NULL AUTO_INCREMENT,
  `invoiceitem_title` VARCHAR(145) NULL DEFAULT NULL,
  `invoiceitem_amount` DECIMAL(20,3) NULL DEFAULT NULL,
  `invoiceitem_dimensionsWidth` DECIMAL(20,3) NULL DEFAULT NULL,
  `invoiceitem_dimensionsHeight` DECIMAL(20,3) NULL DEFAULT NULL,
  `invoiceitem_dimensionsUom` VARCHAR(45) NULL DEFAULT NULL,
  `invoiceitem_outterWidth` DECIMAL(20,3) NULL DEFAULT NULL,
  `invoiceitem_outterHeight` DECIMAL(20,3) NULL DEFAULT NULL,
  `invoice_invoice_oid` INT NOT NULL,
  `glass_glass_oid` INT NULL DEFAULT NULL,
  `mirror_mirror_oid` INT NULL DEFAULT NULL,
  `faceting_faceting_oid` INT NULL DEFAULT NULL,
  `sanding_sanding_oid` INT NULL DEFAULT NULL,
  `invoiceitem_passpartuWidth` DECIMAL(20,3) NULL DEFAULT NULL,
  `invoiceitem_passpartuWidthUom` VARCHAR(45) NULL DEFAULT NULL,
  `passpartucolor_passpartuColor_oid` INT NULL DEFAULT NULL,
  PRIMARY KEY (`invoiceitem_oid`),
  INDEX `fk_invoiceitem_invoice1_idx` (`invoice_invoice_oid` ASC) VISIBLE,
  INDEX `fk_invoiceitem_glass1_idx` (`glass_glass_oid` ASC) VISIBLE,
  INDEX `fk_invoiceitem_mirror1_idx` (`mirror_mirror_oid` ASC) VISIBLE,
  INDEX `fk_invoiceitem_faceting1_idx` (`faceting_faceting_oid` ASC) VISIBLE,
  INDEX `fk_invoiceitem_sanding1_idx` (`sanding_sanding_oid` ASC) VISIBLE,
  INDEX `fk_invoiceitem_passpartucolor1_idx` (`passpartucolor_passpartuColor_oid` ASC) VISIBLE,
  CONSTRAINT `fk_invoiceitem_faceting1`
    FOREIGN KEY (`faceting_faceting_oid`)
    REFERENCES `radnja`.`faceting` (`faceting_oid`),
  CONSTRAINT `fk_invoiceitem_glass1`
    FOREIGN KEY (`glass_glass_oid`)
    REFERENCES `radnja`.`glass` (`glass_oid`),
  CONSTRAINT `fk_invoiceitem_invoice1`
    FOREIGN KEY (`invoice_invoice_oid`)
    REFERENCES `radnja`.`invoice` (`invoice_oid`),
  CONSTRAINT `fk_invoiceitem_mirror1`
    FOREIGN KEY (`mirror_mirror_oid`)
    REFERENCES `radnja`.`mirror` (`mirror_oid`),
  CONSTRAINT `fk_invoiceitem_passpartucolor1`
    FOREIGN KEY (`passpartucolor_passpartuColor_oid`)
    REFERENCES `radnja`.`passpartucolor` (`passpartuColor_oid`),
  CONSTRAINT `fk_invoiceitem_sanding1`
    FOREIGN KEY (`sanding_sanding_oid`)
    REFERENCES `radnja`.`sanding` (`sanding_oid`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `radnja`.`invoiceitem_has_frame`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`invoiceitem_has_frame` ;

CREATE TABLE IF NOT EXISTS `radnja`.`invoiceitem_has_frame` (
  `invoiceItem_invoiceItem_oid` INT NOT NULL,
  `frame_frame_oid` INT NOT NULL,
  `colorCode` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`invoiceItem_invoiceItem_oid`, `frame_frame_oid`),
  INDEX `fk_invoiceItem_has_frame_frame1_idx` (`frame_frame_oid` ASC) VISIBLE,
  INDEX `fk_invoiceItem_has_frame_invoiceItem1_idx` (`invoiceItem_invoiceItem_oid` ASC) VISIBLE,
  CONSTRAINT `fk_invoiceItem_has_frame_frame1`
    FOREIGN KEY (`frame_frame_oid`)
    REFERENCES `radnja`.`frame` (`frame_oid`),
  CONSTRAINT `fk_invoiceItem_has_frame_invoiceItem1`
    FOREIGN KEY (`invoiceItem_invoiceItem_oid`)
    REFERENCES `radnja`.`invoiceitem` (`invoiceitem_oid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
