-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
-- Table `radnja`.`invoice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`invoice` ;

CREATE TABLE IF NOT EXISTS `radnja`.`invoice` (
  `invoice_id` INT NOT NULL AUTO_INCREMENT,
  `createDate` DATETIME NULL,
  `amount` DECIMAL(20,3) NULL,
  `advancePayment` DECIMAL(20,3) NULL,
  `buyerName` VARCHAR(345) NULL,
  PRIMARY KEY (`invoice_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1000000;


-- -----------------------------------------------------
-- Table `radnja`.`invoiceItem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`invoiceItem` ;

CREATE TABLE IF NOT EXISTS `radnja`.`invoiceItem` (
  `invoiceItem_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(145) NULL,
  `amount` DECIMAL(20,3) NULL,
  `dimensionsWidth` DECIMAL(20,3) NULL,
  `dimensionsHeight` DECIMAL(20,3) NULL,
  `dimensionsUom` VARCHAR(45) NULL,
  `outterWidth` DECIMAL(20,3) NULL,
  `outterHeight` DECIMAL(20,3) NULL,
  PRIMARY KEY (`invoiceItem_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`invoice_has_invoiceItem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`invoice_has_invoiceItem` ;

CREATE TABLE IF NOT EXISTS `radnja`.`invoice_has_invoiceItem` (
  `invoice_invoice_id` INT NOT NULL,
  `invoiceItem_invoiceItem_id` INT NOT NULL,
  PRIMARY KEY (`invoice_invoice_id`, `invoiceItem_invoiceItem_id`),
  INDEX `fk_invoice_has_invoiceItem_invoiceItem1_idx` (`invoiceItem_invoiceItem_id` ASC) VISIBLE,
  INDEX `fk_invoice_has_invoiceItem_invoice_idx` (`invoice_invoice_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_has_invoiceItem_invoice`
    FOREIGN KEY (`invoice_invoice_id`)
    REFERENCES `radnja`.`invoice` (`invoice_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoice_has_invoiceItem_invoiceItem1`
    FOREIGN KEY (`invoiceItem_invoiceItem_id`)
    REFERENCES `radnja`.`invoiceItem` (`invoiceItem_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`glass`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`glass` ;

CREATE TABLE IF NOT EXISTS `radnja`.`glass` (
  `glass_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(345) NULL,
  `uom` VARCHAR(45) NULL,
  `pricePerUom` DECIMAL(20,3) NULL,
  `cashRegisterNumber` INT NULL,
  PRIMARY KEY (`glass_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`passpartu`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`passpartu` ;

CREATE TABLE IF NOT EXISTS `radnja`.`passpartu` (
  `passpartu_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(345) NULL,
  `uom` VARCHAR(45) NULL,
  `pricePerUom` DECIMAL(20,3) NULL,
  `cashRegisterNumber` INT NULL,
  PRIMARY KEY (`passpartu_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`passpartuColor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`passpartuColor` ;

CREATE TABLE IF NOT EXISTS `radnja`.`passpartuColor` (
  `passpartuColor_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(245) NULL,
  `passpartu_passpartu_id` INT NOT NULL,
  PRIMARY KEY (`passpartuColor_id`),
  INDEX `fk_passpartuColor_passpartu1_idx` (`passpartu_passpartu_id` ASC) VISIBLE,
  CONSTRAINT `fk_passpartuColor_passpartu1`
    FOREIGN KEY (`passpartu_passpartu_id`)
    REFERENCES `radnja`.`passpartu` (`passpartu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`mirror`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`mirror` ;

CREATE TABLE IF NOT EXISTS `radnja`.`mirror` (
  `mirror_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(345) NULL,
  `uom` VARCHAR(45) NULL,
  `pricePerUom` DECIMAL(20,3) NULL,
  `cashRegisterNumber` INT NULL,
  PRIMARY KEY (`mirror_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`faceting`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`faceting` ;

CREATE TABLE IF NOT EXISTS `radnja`.`faceting` (
  `faceting_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(345) NULL,
  `uom` VARCHAR(45) NULL,
  `pricePerUom` DECIMAL(20,3) NULL,
  `cashRegisterNumber` INT NULL,
  PRIMARY KEY (`faceting_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`sanding`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`sanding` ;

CREATE TABLE IF NOT EXISTS `radnja`.`sanding` (
  `sanding_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(345) NULL,
  `uom` VARCHAR(45) NULL,
  `pricePerUom` DECIMAL(20,3) NULL,
  `cashRegisterNumber` INT NULL,
  PRIMARY KEY (`sanding_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`frame`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`frame` ;

CREATE TABLE IF NOT EXISTS `radnja`.`frame` (
  `frame_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(345) NULL,
  `uom` VARCHAR(45) NULL,
  `pricePerUom` DECIMAL(20,3) NULL,
  `cashRegisterNumber` INT NULL,
  `code` VARCHAR(45) NULL,
  `widthMM` INT NULL,
  PRIMARY KEY (`frame_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`invoiceItem_has_frame`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`invoiceItem_has_frame` ;

CREATE TABLE IF NOT EXISTS `radnja`.`invoiceItem_has_frame` (
  `invoiceItem_invoiceItem_id` INT NOT NULL,
  `frame_frame_id` INT NOT NULL,
  `colorCode` VARCHAR(45) NULL,
  PRIMARY KEY (`invoiceItem_invoiceItem_id`, `frame_frame_id`),
  INDEX `fk_invoiceItem_has_frame_frame1_idx` (`frame_frame_id` ASC) VISIBLE,
  INDEX `fk_invoiceItem_has_frame_invoiceItem1_idx` (`invoiceItem_invoiceItem_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoiceItem_has_frame_invoiceItem1`
    FOREIGN KEY (`invoiceItem_invoiceItem_id`)
    REFERENCES `radnja`.`invoiceItem` (`invoiceItem_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoiceItem_has_frame_frame1`
    FOREIGN KEY (`frame_frame_id`)
    REFERENCES `radnja`.`frame` (`frame_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`invoiceItem_has_passpartuColor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`invoiceItem_has_passpartuColor` ;

CREATE TABLE IF NOT EXISTS `radnja`.`invoiceItem_has_passpartuColor` (
  `invoiceItem_invoiceItem_id` INT NOT NULL,
  `passpartuColor_passpartuColor_id` INT NOT NULL,
  `width` DECIMAL(20,3) NULL,
  `widthUom` VARCHAR(45) NULL,
  PRIMARY KEY (`invoiceItem_invoiceItem_id`, `passpartuColor_passpartuColor_id`),
  INDEX `fk_invoiceItem_has_passpartuColor_passpartuColor1_idx` (`passpartuColor_passpartuColor_id` ASC) VISIBLE,
  INDEX `fk_invoiceItem_has_passpartuColor_invoiceItem1_idx` (`invoiceItem_invoiceItem_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoiceItem_has_passpartuColor_invoiceItem1`
    FOREIGN KEY (`invoiceItem_invoiceItem_id`)
    REFERENCES `radnja`.`invoiceItem` (`invoiceItem_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoiceItem_has_passpartuColor_passpartuColor1`
    FOREIGN KEY (`passpartuColor_passpartuColor_id`)
    REFERENCES `radnja`.`passpartuColor` (`passpartuColor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`invoiceItem_has_glass`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`invoiceItem_has_glass` ;

CREATE TABLE IF NOT EXISTS `radnja`.`invoiceItem_has_glass` (
  `invoiceItem_invoiceItem_id` INT NOT NULL,
  `glass_glass_id` INT NOT NULL,
  PRIMARY KEY (`invoiceItem_invoiceItem_id`, `glass_glass_id`),
  INDEX `fk_invoiceItem_has_glass_glass1_idx` (`glass_glass_id` ASC) VISIBLE,
  INDEX `fk_invoiceItem_has_glass_invoiceItem1_idx` (`invoiceItem_invoiceItem_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoiceItem_has_glass_invoiceItem1`
    FOREIGN KEY (`invoiceItem_invoiceItem_id`)
    REFERENCES `radnja`.`invoiceItem` (`invoiceItem_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoiceItem_has_glass_glass1`
    FOREIGN KEY (`glass_glass_id`)
    REFERENCES `radnja`.`glass` (`glass_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`invoiceItem_has_sanding`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`invoiceItem_has_sanding` ;

CREATE TABLE IF NOT EXISTS `radnja`.`invoiceItem_has_sanding` (
  `invoiceItem_invoiceItem_id` INT NOT NULL,
  `sanding_sanding_id` INT NOT NULL,
  PRIMARY KEY (`invoiceItem_invoiceItem_id`, `sanding_sanding_id`),
  INDEX `fk_invoiceItem_has_sanding_sanding1_idx` (`sanding_sanding_id` ASC) VISIBLE,
  INDEX `fk_invoiceItem_has_sanding_invoiceItem1_idx` (`invoiceItem_invoiceItem_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoiceItem_has_sanding_invoiceItem1`
    FOREIGN KEY (`invoiceItem_invoiceItem_id`)
    REFERENCES `radnja`.`invoiceItem` (`invoiceItem_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoiceItem_has_sanding_sanding1`
    FOREIGN KEY (`sanding_sanding_id`)
    REFERENCES `radnja`.`sanding` (`sanding_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`invoiceItem_has_faceting`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`invoiceItem_has_faceting` ;

CREATE TABLE IF NOT EXISTS `radnja`.`invoiceItem_has_faceting` (
  `invoiceItem_invoiceItem_id` INT NOT NULL,
  `faceting_faceting_id` INT NOT NULL,
  PRIMARY KEY (`invoiceItem_invoiceItem_id`, `faceting_faceting_id`),
  INDEX `fk_invoiceItem_has_faceting_faceting1_idx` (`faceting_faceting_id` ASC) VISIBLE,
  INDEX `fk_invoiceItem_has_faceting_invoiceItem1_idx` (`invoiceItem_invoiceItem_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoiceItem_has_faceting_invoiceItem1`
    FOREIGN KEY (`invoiceItem_invoiceItem_id`)
    REFERENCES `radnja`.`invoiceItem` (`invoiceItem_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoiceItem_has_faceting_faceting1`
    FOREIGN KEY (`faceting_faceting_id`)
    REFERENCES `radnja`.`faceting` (`faceting_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radnja`.`invoiceItem_has_mirror`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radnja`.`invoiceItem_has_mirror` ;

CREATE TABLE IF NOT EXISTS `radnja`.`invoiceItem_has_mirror` (
  `invoiceItem_invoiceItem_id` INT NOT NULL,
  `mirror_mirror_id` INT NOT NULL,
  PRIMARY KEY (`invoiceItem_invoiceItem_id`, `mirror_mirror_id`),
  INDEX `fk_invoiceItem_has_mirror_mirror1_idx` (`mirror_mirror_id` ASC) VISIBLE,
  INDEX `fk_invoiceItem_has_mirror_invoiceItem1_idx` (`invoiceItem_invoiceItem_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoiceItem_has_mirror_invoiceItem1`
    FOREIGN KEY (`invoiceItem_invoiceItem_id`)
    REFERENCES `radnja`.`invoiceItem` (`invoiceItem_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoiceItem_has_mirror_mirror1`
    FOREIGN KEY (`mirror_mirror_id`)
    REFERENCES `radnja`.`mirror` (`mirror_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
