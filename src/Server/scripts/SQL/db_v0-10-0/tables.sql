-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema zoko_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema zoko_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `zoko_db` DEFAULT CHARACTER SET utf8 ;
USE `zoko_db` ;

-- -----------------------------------------------------
-- Table `zoko_db`.`file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`file` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ext` VARCHAR(8) NOT NULL,
  `path` TINYTEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `file_id` INT UNSIGNED NULL,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `type` ENUM('ADMIN', 'PROVIDER', 'CUSTOMER', 'EMPLOYEE') NOT NULL,
  `status` ENUM('ACTIVE', 'DISABLED', 'DELATE') NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_user_file1_idx` (`file_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  CONSTRAINT `fk_user_file1`
    FOREIGN KEY (`file_id`)
    REFERENCES `zoko_db`.`file` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`address` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(255) NOT NULL,
  `ext_number` VARCHAR(100) NOT NULL,
  `city` VARCHAR(58) NOT NULL,
  `neighborhood` VARCHAR(58) NOT NULL,
  `state` VARCHAR(58) NOT NULL,
  `zip_code` VARCHAR(10) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `int_number` VARCHAR(100) NULL,
  `telephone` VARCHAR(15) NULL,
  `references` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`provider`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`provider` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `address_id` INT UNSIGNED NOT NULL,
  `legal_name` VARCHAR(60) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `trade_name` VARCHAR(60) NOT NULL,
  `store_email` VARCHAR(75) NOT NULL,
  `rfc` VARCHAR(13) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_provider_user1_idx` (`user_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_provider_address1_idx` (`address_id` ASC),
  CONSTRAINT `fk_provider_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `zoko_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_provider_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `zoko_db`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`customer` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_client_user1_idx` (`user_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_client_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `zoko_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`billing_profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`billing_profiles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT UNSIGNED NOT NULL,
  `address_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(75) NOT NULL,
  `tax_regime` ENUM('PHYSICAL', 'MORAL') NOT NULL,
  `rfc` VARCHAR(13) NOT NULL,
  `email` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_billings_address1_idx` (`address_id` ASC),
  INDEX `fk_billing_profiles_customer1_idx` (`customer_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_billings_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `zoko_db`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_billing_profiles_custumer1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `zoko_db`.`customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`customer_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`customer_address` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `address_id` INT UNSIGNED NOT NULL,
  `customer_id` INT UNSIGNED NOT NULL,
  `label` VARCHAR(25) NULL,
  INDEX `fk_client_has_address_address1_idx` (`address_id` ASC),
  PRIMARY KEY (`id`),
  INDEX `fk_customer_address_customer1_idx` (`customer_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_client_has_address_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `zoko_db`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_address_custumer1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `zoko_db`.`customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`subscription`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`subscription` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `price` DECIMAL(13,2) NOT NULL,
  `quantity_product` INT NOT NULL,
  `quantity_product_status` ENUM('LIMITED', 'UNLIMITED') NULL DEFAULT 'LIMITED',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`payment_method`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`payment_method` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NULL,
  `system` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`payment_credentials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`payment_credentials` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `provider_id` INT UNSIGNED NOT NULL,
  `payment_method_id` INT UNSIGNED NOT NULL,
  `public_key` VARCHAR(200) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_payment_credentials_provider1_idx` (`provider_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_payment_credentials_payment_method1_idx` (`payment_method_id` ASC),
  CONSTRAINT `fk_payment_credentials_provider1`
    FOREIGN KEY (`provider_id`)
    REFERENCES `zoko_db`.`provider` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payment_credentials_payment_method1`
    FOREIGN KEY (`payment_method_id`)
    REFERENCES `zoko_db`.`payment_method` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`category` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `category_id_UNIQUE` (`id` ASC));


-- -----------------------------------------------------
-- Table `zoko_db`.`product_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`product_details` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `description` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_product_details_category1_idx` (`category_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_product_details_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `zoko_db`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`product` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_details_id` INT UNSIGNED NOT NULL,
  `size` ENUM('Chico', 'Mediano', 'Grande') NOT NULL,
  `quality` ENUM('Primera', 'Segunda', 'Económica') NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_product_details1_idx` (`product_details_id` ASC),
  UNIQUE INDEX `fk_product_details_id_size_quality` (`product_details_id` ASC, `size` ASC, `quality` ASC) COMMENT 'this index make a compound key prevent duplitce product',
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_product_product_details1`
    FOREIGN KEY (`product_details_id`)
    REFERENCES `zoko_db`.`product_details` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`history_payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`history_payment` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `provider_id` INT UNSIGNED NOT NULL,
  `subscription_id` INT UNSIGNED NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `price` DECIMAL(15,4) NOT NULL,
  `type` ENUM('PAYPAL', 'CARD') NOT NULL,
  `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_history_payment_provider1_idx` (`provider_id` ASC),
  INDEX `fk_history_payment_subscriptions1_idx` (`subscription_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_history_payment_provider1`
    FOREIGN KEY (`provider_id`)
    REFERENCES `zoko_db`.`provider` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_history_payment_subscriptions1`
    FOREIGN KEY (`subscription_id`)
    REFERENCES `zoko_db`.`subscription` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`state` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(58) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`city`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`city` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `state_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_city_state1_idx` (`state_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_city_state1`
    FOREIGN KEY (`state_id`)
    REFERENCES `zoko_db`.`state` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`region_provider`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`region_provider` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `provider_id` INT UNSIGNED NOT NULL,
  `state_id` INT UNSIGNED NOT NULL,
  `city_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_regions_provider1_idx` (`provider_id` ASC),
  INDEX `fk_regions_state1_idx` (`state_id` ASC),
  INDEX `fk_regions_city1_idx` (`city_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_regions_provider1`
    FOREIGN KEY (`provider_id`)
    REFERENCES `zoko_db`.`provider` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_regions_state1`
    FOREIGN KEY (`state_id`)
    REFERENCES `zoko_db`.`state` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_regions_city1`
    FOREIGN KEY (`city_id`)
    REFERENCES `zoko_db`.`city` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`feature`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`feature` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`product_details_has_feature`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`product_details_has_feature` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `feature_id` INT UNSIGNED NOT NULL,
  `product_details_id` INT UNSIGNED NOT NULL,
  `label` VARCHAR(25) NOT NULL,
  INDEX `fk_feature_has_product_details_product_details1_idx` (`product_details_id` ASC),
  INDEX `fk_feature_has_product_details_feacture1_idx` (`feature_id` ASC),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_feature_has_product_details_feacture1`
    FOREIGN KEY (`feature_id`)
    REFERENCES `zoko_db`.`feature` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_feature_has_product_details_product_details1`
    FOREIGN KEY (`product_details_id`)
    REFERENCES `zoko_db`.`product_details` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`provider_has_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`provider_has_product` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `provider_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `price` DECIMAL(15,4) NOT NULL,
  `status` ENUM('ACTIVE', 'DELETE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `flags` SET('FREZEE') NULL,
  INDEX `fk_product_has_provider_provider1_idx` (`provider_id` ASC),
  INDEX `fk_product_has_provider_product1_idx` (`product_id` ASC),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_product_has_provider_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `zoko_db`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_provider_provider1`
    FOREIGN KEY (`provider_id`)
    REFERENCES `zoko_db`.`provider` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`volume_profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`volume_profiles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_has_provider_id` INT UNSIGNED NOT NULL,
  `disconunt` DECIMAL(15,4) NOT NULL,
  `min_weingth` DECIMAL(13,3) NOT NULL,
  `max_weingth` DECIMAL(13,3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_volume profiles_product_has_provider1_idx` (`product_has_provider_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_volume profiles_product_has_provider1`
    FOREIGN KEY (`product_has_provider_id`)
    REFERENCES `zoko_db`.`provider_has_product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`product_change_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`product_change_history` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `product_details_id` INT UNSIGNED NULL,
  `name` VARCHAR(60) NOT NULL,
  `description` TEXT NOT NULL,
  `type` ENUM('CREATE', 'EDIT') NOT NULL,
  `status` ENUM('REVIEW', 'APPROVED', 'REJECTED') NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_product_change history_product_details1_idx` (`product_details_id` ASC),
  INDEX `fk_product_change history_user1_idx` (`user_id` ASC),
  INDEX `fk_product_change_history_category1_idx` (`category_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_product_change history_product_details1`
    FOREIGN KEY (`product_details_id`)
    REFERENCES `zoko_db`.`product_details` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_change history_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `zoko_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_change_history_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `zoko_db`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`product_change_history_has_feature`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`product_change_history_has_feature` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `feature_id` INT UNSIGNED NOT NULL,
  `product_change_history_id` INT UNSIGNED NOT NULL,
  `label` VARCHAR(25) NOT NULL,
  INDEX `fk_feacture_has_product_details_feacture1_idx` (`feature_id` ASC),
  PRIMARY KEY (`id`),
  INDEX `fk_feacture_product_copy1_product_change history1_idx` (`product_change_history_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_feacture_has_product_details_feacture10`
    FOREIGN KEY (`feature_id`)
    REFERENCES `zoko_db`.`feature` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_feacture_product_copy1_product_change history1`
    FOREIGN KEY (`product_change_history_id`)
    REFERENCES `zoko_db`.`product_change_history` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`rating` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `assessed_user_id` INT UNSIGNED NOT NULL,
  `rating` SMALLINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_rating_user2_idx` (`assessed_user_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_rating_user1_idx` (`user_id` ASC),
  UNIQUE INDEX `fk_user_id_assessed_user_id_idx` (`user_id` ASC, `assessed_user_id` ASC),
  CONSTRAINT `fk_rating_user2`
    FOREIGN KEY (`assessed_user_id`)
    REFERENCES `zoko_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rating_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `zoko_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`buy_order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`buy_order` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(16) NOT NULL,
  `customer_id` INT UNSIGNED NOT NULL,
  `customer_address_id` INT UNSIGNED NOT NULL,
  `order_status` ENUM('ACTIVE', 'CANCELED', 'FINALIZED') NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `note` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_buy_order_customer1_idx` (`customer_id` ASC),
  INDEX `fk_buy_order_customer_address1_idx` (`customer_address_id` ASC),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC),
  CONSTRAINT `fk_buy_order_custumer1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `zoko_db`.`customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_buy_order_customer_address1`
    FOREIGN KEY (`customer_address_id`)
    REFERENCES `zoko_db`.`customer_address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`shipping_profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`shipping_profiles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `provider_id` INT UNSIGNED NOT NULL,
  `region_provider_id` INT UNSIGNED NOT NULL,
  `price` DECIMAL(15,4) NOT NULL,
  `frezee_tax` DECIMAL(15,4) NOT NULL DEFAULT 0,
  `min_weingth` DECIMAL(13,3) NOT NULL,
  `max_weingth` DECIMAL(13,3) NOT NULL,
  `transport` ENUM('HEAVY', 'NORMAL', 'LIGHT') NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_shipping_profiles_region_provider1_idx` (`region_provider_id` ASC),
  INDEX `fk_shipping_profiles_provider1_idx` (`provider_id` ASC),
  UNIQUE INDEX `fk_provider_id_region_provider_id_transport_type_idx` (`provider_id` ASC, `region_provider_id` ASC, `transport` ASC, `frezee_tax` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_shipping_profiles_region_provider1`
    FOREIGN KEY (`region_provider_id`)
    REFERENCES `zoko_db`.`region_provider` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shipping_profiles_provider1`
    FOREIGN KEY (`provider_id`)
    REFERENCES `zoko_db`.`provider` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`employee` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_employ_user1_idx` (`user_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_employ_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `zoko_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`sale_order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`sale_order` (
  `int` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `buy_order_id` INT UNSIGNED NOT NULL,
  `shipping_cost` DECIMAL(15,4) NOT NULL,
  `status` ENUM('REQUESTED', 'RUNNING: ', 'RETUNING:', 'FINISHED') NOT NULL DEFAULT 'REQUESTED',
  `shipping_status` ENUM('NOT_READY', 'READY', 'SENT', 'FINISHED') NOT NULL DEFAULT 'NOT_READY',
  `flags` SET('PENDING', 'APPROVING', 'PAID', 'REFUNDED', 'CANCELED', 'DECLINED', 'INVOICED') NOT NULL DEFAULT 'PENDING',
  `timestamp` TIMESTAMP NULL,
  `amout` DECIMAL(15,4) NULL,
  `discount` DECIMAL(3,3) NULL,
  PRIMARY KEY (`int`),
  UNIQUE INDEX `int_UNIQUE` (`int` ASC),
  INDEX `fk_sale_order_buy_order1_idx` (`buy_order_id` ASC),
  CONSTRAINT `fk_sale_order_buy_order1`
    FOREIGN KEY (`buy_order_id`)
    REFERENCES `zoko_db`.`buy_order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`employee_has_provider`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`employee_has_provider` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `employee_id` INT UNSIGNED NOT NULL,
  `provider_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_employee_has_provider_provider1_idx` (`provider_id` ASC),
  INDEX `fk_employee_has_provider_employee1_idx` (`employee_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `fk_employee_id_provider_id_idx` (`employee_id` ASC, `provider_id` ASC),
  CONSTRAINT `fk_employee_has_provider_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `zoko_db`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_has_provider_provider1`
    FOREIGN KEY (`provider_id`)
    REFERENCES `zoko_db`.`provider` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`sale_order_has_buy_order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`sale_order_has_buy_order` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sale_order_id` INT UNSIGNED NOT NULL,
  `buy_order_id` INT UNSIGNED NOT NULL,
  `note` TEXT NULL,
  INDEX `fk_sale_order_has_buy_order_buy_order1_idx` (`buy_order_id` ASC),
  INDEX `fk_sale_order_has_buy_order_sale_order1_idx` (`sale_order_id` ASC),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_sale_order_has_buy_order_sale_order1`
    FOREIGN KEY (`sale_order_id`)
    REFERENCES `zoko_db`.`sale_order` (`int`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sale_order_has_buy_order_buy_order1`
    FOREIGN KEY (`buy_order_id`)
    REFERENCES `zoko_db`.`buy_order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`subscription_feature`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`subscription_feature` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `subscription_id` INT UNSIGNED NOT NULL,
  `description` TINYTEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_subscriptions_feactures_subscriptions1_idx` (`subscription_id` ASC),
  CONSTRAINT `fk_subscriptions_feactures_subscriptions1`
    FOREIGN KEY (`subscription_id`)
    REFERENCES `zoko_db`.`subscription` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`sale_order_has_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`sale_order_has_product` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sale_order_int` INT UNSIGNED NOT NULL,
  `provider_has_product_id` INT UNSIGNED NOT NULL,
  `cost` DECIMAL(15,4) NOT NULL,
  `price` DECIMAL(15,4) NOT NULL,
  `quantity` DECIMAL(13,3) NOT NULL,
  `p_discount` DECIMAL(15,4) NULL,
  `d_disconut` DECIMAL(15,4) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_sale_order_has_provider_has_product_provider_has_product_idx` (`provider_has_product_id` ASC),
  INDEX `fk_sale_order_has_provider_has_product_sale_order1_idx` (`sale_order_int` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_sale_order_has_provider_has_product_sale_order1`
    FOREIGN KEY (`sale_order_int`)
    REFERENCES `zoko_db`.`sale_order` (`int`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sale_order_has_provider_has_product_provider_has_product1`
    FOREIGN KEY (`provider_has_product_id`)
    REFERENCES `zoko_db`.`provider_has_product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`sale_order_has_file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`sale_order_has_file` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sale_order_int` INT UNSIGNED NOT NULL,
  `file_id` INT UNSIGNED NOT NULL,
  `type` ENUM('BILL', 'VOUCHER', 'PAY_ORDER') NOT NULL,
  INDEX `fk_sale_order_has_file_file1_idx` (`file_id` ASC),
  INDEX `fk_sale_order_has_file_sale_order1_idx` (`sale_order_int` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_sale_order_has_file_sale_order1`
    FOREIGN KEY (`sale_order_int`)
    REFERENCES `zoko_db`.`sale_order` (`int`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sale_order_has_file_file1`
    FOREIGN KEY (`file_id`)
    REFERENCES `zoko_db`.`file` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`product_change_history_has_file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`product_change_history_has_file` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_change_history_id` INT UNSIGNED NOT NULL,
  `file_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_change_history_has_file_file1_idx` (`file_id` ASC),
  INDEX `fk_product_change_history_has_file_product_change_history1_idx` (`product_change_history_id` ASC),
  CONSTRAINT `fk_product_change_history_has_file_product_change_history1`
    FOREIGN KEY (`product_change_history_id`)
    REFERENCES `zoko_db`.`product_change_history` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_change_history_has_file_file1`
    FOREIGN KEY (`file_id`)
    REFERENCES `zoko_db`.`file` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zoko_db`.`product_details_has_file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zoko_db`.`product_details_has_file` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_details_id` INT UNSIGNED NOT NULL,
  `file_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_details_has_file_file1_idx` (`file_id` ASC),
  INDEX `fk_product_details_has_file_product_details1_idx` (`product_details_id` ASC),
  CONSTRAINT `fk_product_details_has_file_product_details1`
    FOREIGN KEY (`product_details_id`)
    REFERENCES `zoko_db`.`product_details` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_details_has_file_file1`
    FOREIGN KEY (`file_id`)
    REFERENCES `zoko_db`.`file` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
