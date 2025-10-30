-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: vibbe
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'a9c5179e-b032-11f0-9057-9010577d98a7:1-41';

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `puntos_totales` int DEFAULT '0',
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Laura Gómez','laura@vibbe.com','1234',250),(2,'Carlos Díaz','carlos@vibbe.com','abcd',120),(3,'María López','maria@vibbe.com','pass',300),(4,'Ana Ruiz','ana@vibbe.com','vibbe2025',180),(5,'Pablo Fernández','pablo@vibbe.com','1111',95),(6,'Lucía Martín','lucia@vibbe.com','hola',420),(7,'Miguel Torres','miguel@vibbe.com','clave',380),(8,'Sandra Ortega','sandra@vibbe.com','vibbe',250),(9,'David Romero','david@vibbe.com','root',160),(10,'Beatriz Navarro','bea@vibbe.com','qwerty',310),(11,'Sergio Gil','sergio@vibbe.com','2025',270),(12,'Marta Castro','marta@vibbe.com','abcd',130),(13,'Alberto Vega','alberto@vibbe.com','xyz',75),(14,'Cristina León','cristina@vibbe.com','clave',190),(15,'Javier Pérez','javier@vibbe.com','vibbe',500),(16,'Irene López','irene@vibbe.com','test',340),(17,'Raúl García','raul@vibbe.com','pass',410),(18,'Patricia Ramos','patricia@vibbe.com','1234',240),(19,'Héctor Medina','hector@vibbe.com','pass',285),(20,'Sofía Blanco','sofia@vibbe.com','vibbe',350);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `id_compra` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_local` int NOT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `importe` decimal(10,2) DEFAULT NULL,
  `puntos_ganados` int DEFAULT NULL,
  PRIMARY KEY (`id_compra`),
  KEY `fk_compra_cliente` (`id_cliente`),
  KEY `fk_compra_local` (`id_local`),
  CONSTRAINT `fk_compra_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `fk_compra_local` FOREIGN KEY (`id_local`) REFERENCES `locales` (`id_local`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (1,1,1,'2025-10-23 19:45:30',23.50,23),(2,2,2,'2025-10-23 19:45:30',45.80,46),(3,3,3,'2025-10-23 19:45:30',15.00,15),(4,4,4,'2025-10-23 19:45:30',32.90,33),(5,5,5,'2025-10-23 19:45:30',55.40,55),(6,6,6,'2025-10-23 19:45:30',28.70,29),(7,7,7,'2025-10-23 19:45:30',42.10,42),(8,8,8,'2025-10-23 19:45:30',38.20,38),(9,9,1,'2025-10-23 19:45:30',17.50,18),(10,10,2,'2025-10-23 19:45:30',22.40,22),(11,11,3,'2025-10-23 19:45:30',34.80,35),(12,12,4,'2025-10-23 19:45:30',48.90,49),(13,13,5,'2025-10-23 19:45:30',26.30,26),(14,14,6,'2025-10-23 19:45:30',19.80,20),(15,15,7,'2025-10-23 19:45:30',37.60,38),(16,16,8,'2025-10-23 19:45:30',29.70,30),(17,17,1,'2025-10-23 19:45:30',52.40,52),(18,18,2,'2025-10-23 19:45:30',24.90,25),(19,19,3,'2025-10-23 19:45:30',31.50,31),(20,20,4,'2025-10-23 19:45:30',18.20,18),(21,1,5,'2025-10-23 19:45:30',20.10,20),(22,2,6,'2025-10-23 19:45:30',33.80,34),(23,3,7,'2025-10-23 19:45:30',27.40,27),(24,4,8,'2025-10-23 19:45:30',19.60,20),(25,5,1,'2025-10-23 19:45:30',35.90,36),(26,6,2,'2025-10-23 19:45:30',50.20,50),(27,7,3,'2025-10-23 19:45:30',28.40,28),(28,8,4,'2025-10-23 19:45:30',44.70,45),(29,9,5,'2025-10-23 19:45:30',40.90,41),(30,10,6,'2025-10-23 19:45:30',21.30,21),(31,11,7,'2025-10-23 19:45:30',15.80,16),(32,12,8,'2025-10-23 19:45:30',46.50,47),(33,13,1,'2025-10-23 19:45:30',38.70,39),(34,14,2,'2025-10-23 19:45:30',25.40,25),(35,15,3,'2025-10-23 19:45:30',49.60,50),(36,16,4,'2025-10-23 19:45:30',33.70,34),(37,17,5,'2025-10-23 19:45:30',27.30,27),(38,18,6,'2025-10-23 19:45:30',31.90,32),(39,19,7,'2025-10-23 19:45:30',45.10,45),(40,20,8,'2025-10-23 19:45:30',41.80,42);
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_sumar_puntos` AFTER INSERT ON `compra` FOR EACH ROW BEGIN
    UPDATE clientes
    SET puntos_totales = puntos_totales + NEW.puntos_ganados
    WHERE id_cliente = NEW.id_cliente;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_log_compra` AFTER INSERT ON `compra` FOR EACH ROW BEGIN
    INSERT INTO log_acciones (tabla_afectada, accion)
    VALUES ('compra', 'INSERT');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `locales`
--

DROP TABLE IF EXISTS `locales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locales` (
  `id_local` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ciudad` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_local`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locales`
--

LOCK TABLES `locales` WRITE;
/*!40000 ALTER TABLE `locales` DISABLE KEYS */;
INSERT INTO `locales` VALUES (1,'Vibbe Centro','Calle Mayor 5','Madrid','910000001'),(2,'Vibbe Norte','Avda. Independencia 10','Zaragoza','976000002'),(3,'Vibbe Sur','Calle Real 22','Sevilla','955000003'),(4,'Vibbe Playa','Paseo Marítimo 7','Valencia','961000004'),(5,'Vibbe Rambla','Rambla Catalunya 12','Barcelona','934000005'),(6,'Vibbe Parque','Avda. del Parque 14','Málaga','952000006'),(7,'Vibbe Galicia','Rua Nova 20','A Coruña','981000007'),(8,'Vibbe Isla','Calle Larga 9','Tenerife','922000008');
/*!40000 ALTER TABLE `locales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_acciones`
--

DROP TABLE IF EXISTS `log_acciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_acciones` (
  `id_log` int NOT NULL AUTO_INCREMENT,
  `tabla_afectada` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accion` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_log`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_acciones`
--

LOCK TABLES `log_acciones` WRITE;
/*!40000 ALTER TABLE `log_acciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_acciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participacion`
--

DROP TABLE IF EXISTS `participacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participacion` (
  `id_participacion` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_premio` int NOT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_participacion`),
  KEY `fk_part_cliente` (`id_cliente`),
  KEY `fk_part_premio` (`id_premio`),
  CONSTRAINT `fk_part_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `fk_part_premio` FOREIGN KEY (`id_premio`) REFERENCES `premios` (`id_premio`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participacion`
--

LOCK TABLES `participacion` WRITE;
/*!40000 ALTER TABLE `participacion` DISABLE KEYS */;
INSERT INTO `participacion` VALUES (1,1,2,'2025-10-23 19:45:30'),(2,2,3,'2025-10-23 19:45:30'),(3,3,1,'2025-10-23 19:45:30'),(4,4,4,'2025-10-23 19:45:30'),(5,5,2,'2025-10-23 19:45:30'),(6,6,5,'2025-10-23 19:45:30'),(7,7,7,'2025-10-23 19:45:30'),(8,8,3,'2025-10-23 19:45:30'),(9,9,6,'2025-10-23 19:45:30'),(10,10,8,'2025-10-23 19:45:30'),(11,11,9,'2025-10-23 19:45:30'),(12,12,2,'2025-10-23 19:45:30'),(13,13,10,'2025-10-23 19:45:30'),(14,14,1,'2025-10-23 19:45:30'),(15,15,4,'2025-10-23 19:45:30'),(16,16,3,'2025-10-23 19:45:30'),(17,17,6,'2025-10-23 19:45:30'),(18,18,7,'2025-10-23 19:45:30'),(19,19,5,'2025-10-23 19:45:30'),(20,20,9,'2025-10-23 19:45:30'),(21,1,1,'2025-10-23 19:45:30'),(22,2,4,'2025-10-23 19:45:30'),(23,3,5,'2025-10-23 19:45:30'),(24,4,6,'2025-10-23 19:45:30'),(25,5,7,'2025-10-23 19:45:30'),(26,6,8,'2025-10-23 19:45:30'),(27,7,9,'2025-10-23 19:45:30'),(28,8,10,'2025-10-23 19:45:30'),(29,9,2,'2025-10-23 19:45:30'),(30,10,3,'2025-10-23 19:45:30'),(31,11,4,'2025-10-23 19:45:30'),(32,12,5,'2025-10-23 19:45:30'),(33,13,6,'2025-10-23 19:45:30'),(34,14,7,'2025-10-23 19:45:30'),(35,15,8,'2025-10-23 19:45:30'),(36,16,9,'2025-10-23 19:45:30'),(37,17,10,'2025-10-23 19:45:30'),(38,18,1,'2025-10-23 19:45:30'),(39,19,2,'2025-10-23 19:45:30'),(40,20,3,'2025-10-23 19:45:30');
/*!40000 ALTER TABLE `participacion` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_evitar_participacion` BEFORE INSERT ON `participacion` FOR EACH ROW BEGIN
    DECLARE puntos_cliente INT;
    DECLARE coste INT;

    SELECT puntos_totales INTO puntos_cliente FROM clientes WHERE id_cliente = NEW.id_cliente;
    SELECT coste_puntos INTO coste FROM premios WHERE id_premio = NEW.id_premio;

    IF puntos_cliente < coste THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '❌ No tienes suficientes puntos para participar.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_restar_puntos` AFTER INSERT ON `participacion` FOR EACH ROW BEGIN
    DECLARE coste INT;
    SELECT coste_puntos INTO coste FROM premios WHERE id_premio = NEW.id_premio;

    UPDATE clientes
    SET puntos_totales = puntos_totales - coste
    WHERE id_cliente = NEW.id_cliente;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `premios`
--

DROP TABLE IF EXISTS `premios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `premios` (
  `id_premio` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coste_puntos` int NOT NULL,
  `tipo` enum('descuento','sorteo','directo') COLLATE utf8mb4_unicode_ci DEFAULT 'directo',
  PRIMARY KEY (`id_premio`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `premios`
--

LOCK TABLES `premios` WRITE;
/*!40000 ALTER TABLE `premios` DISABLE KEYS */;
INSERT INTO `premios` VALUES (1,'Descuento del 10% en próxima compra',100,'descuento'),(2,'Entrada al sorteo de un smartwatch',200,'sorteo'),(3,'Café gratis en tu próxima visita',50,'directo'),(4,'Descuento del 25% en productos seleccionados',250,'descuento'),(5,'Vale regalo de 10€',300,'directo'),(6,'Entrada al sorteo de una cena doble',150,'sorteo'),(7,'Descuento del 15% en toda la tienda',180,'descuento'),(8,'Producto exclusivo gratis',400,'directo'),(9,'Participación en sorteo de viaje',500,'sorteo'),(10,'Descuento del 5% acumulable',80,'descuento');
/*!40000 ALTER TABLE `premios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vista_detalle_compras`
--

DROP TABLE IF EXISTS `vista_detalle_compras`;
/*!50001 DROP VIEW IF EXISTS `vista_detalle_compras`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_detalle_compras` AS SELECT 
 1 AS `id_compra`,
 1 AS `cliente`,
 1 AS `local`,
 1 AS `fecha`,
 1 AS `importe`,
 1 AS `puntos_ganados`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_locales_actividad`
--

DROP TABLE IF EXISTS `vista_locales_actividad`;
/*!50001 DROP VIEW IF EXISTS `vista_locales_actividad`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_locales_actividad` AS SELECT 
 1 AS `id_local`,
 1 AS `local`,
 1 AS `num_compras`,
 1 AS `total_vendido`,
 1 AS `puntos_entregados`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_participaciones`
--

DROP TABLE IF EXISTS `vista_participaciones`;
/*!50001 DROP VIEW IF EXISTS `vista_participaciones`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_participaciones` AS SELECT 
 1 AS `id_participacion`,
 1 AS `cliente`,
 1 AS `premio`,
 1 AS `tipo_premio`,
 1 AS `fecha_participacion`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_resumen_clientes`
--

DROP TABLE IF EXISTS `vista_resumen_clientes`;
/*!50001 DROP VIEW IF EXISTS `vista_resumen_clientes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_resumen_clientes` AS SELECT 
 1 AS `id_cliente`,
 1 AS `cliente`,
 1 AS `num_compras`,
 1 AS `gasto_total`,
 1 AS `puntos_obtenidos`,
 1 AS `puntos_totales`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_top_clientes`
--

DROP TABLE IF EXISTS `vista_top_clientes`;
/*!50001 DROP VIEW IF EXISTS `vista_top_clientes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_top_clientes` AS SELECT 
 1 AS `id_cliente`,
 1 AS `cliente`,
 1 AS `puntos_totales`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'vibbe'
--

--
-- Dumping routines for database 'vibbe'
--

--
-- Final view structure for view `vista_detalle_compras`
--

/*!50001 DROP VIEW IF EXISTS `vista_detalle_compras`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_detalle_compras` AS select `co`.`id_compra` AS `id_compra`,`c`.`nombre` AS `cliente`,`l`.`nombre` AS `local`,`co`.`fecha` AS `fecha`,`co`.`importe` AS `importe`,`co`.`puntos_ganados` AS `puntos_ganados` from ((`compra` `co` join `clientes` `c` on((`co`.`id_cliente` = `c`.`id_cliente`))) join `locales` `l` on((`co`.`id_local` = `l`.`id_local`))) order by `co`.`fecha` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_locales_actividad`
--

/*!50001 DROP VIEW IF EXISTS `vista_locales_actividad`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_locales_actividad` AS select `l`.`id_local` AS `id_local`,`l`.`nombre` AS `local`,count(`co`.`id_compra`) AS `num_compras`,sum(`co`.`importe`) AS `total_vendido`,sum(`co`.`puntos_ganados`) AS `puntos_entregados` from (`locales` `l` left join `compra` `co` on((`l`.`id_local` = `co`.`id_local`))) group by `l`.`id_local`,`l`.`nombre` order by `total_vendido` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_participaciones`
--

/*!50001 DROP VIEW IF EXISTS `vista_participaciones`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_participaciones` AS select `p`.`id_participacion` AS `id_participacion`,`c`.`nombre` AS `cliente`,`pr`.`descripcion` AS `premio`,`pr`.`tipo` AS `tipo_premio`,`p`.`fecha` AS `fecha_participacion` from ((`participacion` `p` join `clientes` `c` on((`p`.`id_cliente` = `c`.`id_cliente`))) join `premios` `pr` on((`p`.`id_premio` = `pr`.`id_premio`))) order by `p`.`fecha` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_resumen_clientes`
--

/*!50001 DROP VIEW IF EXISTS `vista_resumen_clientes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_resumen_clientes` AS select `c`.`id_cliente` AS `id_cliente`,`c`.`nombre` AS `cliente`,count(`co`.`id_compra`) AS `num_compras`,sum(`co`.`importe`) AS `gasto_total`,sum(`co`.`puntos_ganados`) AS `puntos_obtenidos`,`c`.`puntos_totales` AS `puntos_totales` from (`clientes` `c` left join `compra` `co` on((`c`.`id_cliente` = `co`.`id_cliente`))) group by `c`.`id_cliente`,`c`.`nombre`,`c`.`puntos_totales` order by `puntos_obtenidos` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_top_clientes`
--

/*!50001 DROP VIEW IF EXISTS `vista_top_clientes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_top_clientes` AS select `clientes`.`id_cliente` AS `id_cliente`,`clientes`.`nombre` AS `cliente`,`clientes`.`puntos_totales` AS `puntos_totales` from `clientes` order by `clientes`.`puntos_totales` desc limit 10 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-30 18:54:29
