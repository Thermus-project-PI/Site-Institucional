CREATE DATABASE  IF NOT EXISTS `thermus` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `thermus`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: thermus
-- ------------------------------------------------------
-- Server version	8.0.44

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

--
-- Table structure for table `alerta`
--

DROP TABLE IF EXISTS `alerta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alerta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `leituraId` int DEFAULT NULL,
  `resolvido` tinyint DEFAULT NULL,
  `criadoEm` datetime DEFAULT CURRENT_TIMESTAMP,
  `tipoAlerta` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `leituraId` (`leituraId`),
  CONSTRAINT `alerta_leitura_fk` FOREIGN KEY (`leituraId`) REFERENCES `leitura` (`id`),
  CONSTRAINT `tipoAlerta` CHECK (((`tipoAlerta` = _utf8mb4'OK') or (`tipoAlerta` = _utf8mb4'ATENÇÃO') or (`tipoAlerta` = _utf8mb4'CRÍTICO')))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alerta`
--

LOCK TABLES `alerta` WRITE;
/*!40000 ALTER TABLE `alerta` DISABLE KEYS */;
/*!40000 ALTER TABLE `alerta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `alertas_dashboard_vw`
--

DROP TABLE IF EXISTS `alertas_dashboard_vw`;
/*!50001 DROP VIEW IF EXISTS `alertas_dashboard_vw`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `alertas_dashboard_vw` AS SELECT 
 1 AS `total_alertas`,
 1 AS `pendentes`,
 1 AS `id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `calculo_ponto_orvalho_vw`
--

DROP TABLE IF EXISTS `calculo_ponto_orvalho_vw`;
/*!50001 DROP VIEW IF EXISTS `calculo_ponto_orvalho_vw`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `calculo_ponto_orvalho_vw` AS SELECT 
 1 AS `ponto_orvalho`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `funcionario`
--

DROP TABLE IF EXISTS `funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `museuId` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `criadoEm` datetime DEFAULT CURRENT_TIMESTAMP,
  `chefeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `func_museu_fk` (`museuId`),
  KEY `func_chefe_fk` (`chefeId`),
  CONSTRAINT `func_chefe_fk` FOREIGN KEY (`chefeId`) REFERENCES `funcionario` (`id`),
  CONSTRAINT `func_museu_fk` FOREIGN KEY (`museuId`) REFERENCES `museu` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionario`
--

LOCK TABLES `funcionario` WRITE;
/*!40000 ALTER TABLE `funcionario` DISABLE KEYS */;
/*!40000 ALTER TABLE `funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `grafico_temperatura_vw`
--

DROP TABLE IF EXISTS `grafico_temperatura_vw`;
/*!50001 DROP VIEW IF EXISTS `grafico_temperatura_vw`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `grafico_temperatura_vw` AS SELECT 
 1 AS `hora`,
 1 AS `temperatura_media`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `grafico_umidade_vw`
--

DROP TABLE IF EXISTS `grafico_umidade_vw`;
/*!50001 DROP VIEW IF EXISTS `grafico_umidade_vw`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `grafico_umidade_vw` AS SELECT 
 1 AS `hora`,
 1 AS `umidade_media`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `leitura`
--

DROP TABLE IF EXISTS `leitura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leitura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sensorId` int NOT NULL,
  `temperatura` decimal(5,2) DEFAULT NULL,
  `umidade` decimal(5,2) DEFAULT NULL,
  `pontoOrvalho` decimal(5,2) DEFAULT NULL,
  `dataHora` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `leitura_sensor_fk` (`sensorId`),
  CONSTRAINT `leitura_sensor_fk` FOREIGN KEY (`sensorId`) REFERENCES `sensor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leitura`
--

LOCK TABLES `leitura` WRITE;
/*!40000 ALTER TABLE `leitura` DISABLE KEYS */;
INSERT INTO `leitura` VALUES (1,1,21.50,45.20,11.20,'2026-06-04 19:48:29'),(2,1,22.10,46.00,11.50,'2026-06-04 20:48:29'),(3,1,22.80,44.80,11.30,'2026-06-04 21:48:29'),(4,1,18.50,98.00,18.50,'2026-06-04 19:48:29'),(5,2,20.20,50.10,12.00,'2026-06-04 19:48:29'),(6,2,20.80,49.50,11.80,'2026-06-04 20:48:29'),(7,2,21.00,48.90,11.70,'2026-06-04 21:48:29'),(8,3,23.50,42.00,10.50,'2026-06-04 20:48:29'),(9,3,24.10,41.50,10.80,'2026-06-04 21:48:29'),(10,3,28.00,90.00,18.50,'2026-06-04 20:48:29'),(11,3,27.90,98.50,18.80,'2026-06-04 21:48:29'),(12,3,28.00,90.00,22.00,'2026-06-04 20:48:29'),(13,3,27.90,98.50,24.90,'2026-06-04 21:48:29'),(14,1,25.00,95.00,22.00,'2026-06-04 22:48:29'),(15,2,24.00,96.00,22.00,'2026-06-04 22:48:29'),(16,3,28.00,90.00,22.00,'2026-06-04 22:48:29'),(17,1,27.00,88.00,22.00,'2026-06-04 22:48:29');
/*!40000 ALTER TABLE `leitura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `museu`
--

DROP TABLE IF EXISTS `museu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `museu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `museuNome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `cnpj` char(14) NOT NULL,
  `criadoEm` datetime DEFAULT CURRENT_TIMESTAMP,
  `ativo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `museu`
--

LOCK TABLES `museu` WRITE;
/*!40000 ALTER TABLE `museu` DISABLE KEYS */;
INSERT INTO `museu` VALUES (1,'Museu Thermus','contato@thermus.com','Samuel123@','12345678000101','2026-06-04 22:48:29',1);
/*!40000 ALTER TABLE `museu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor`
--

DROP TABLE IF EXISTS `sensor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quadroNome` varchar(100) DEFAULT NULL,
  `localizacao` varchar(100) DEFAULT NULL,
  `instaladoEm` datetime DEFAULT CURRENT_TIMESTAMP,
  `statusSensor` tinyint DEFAULT NULL,
  `museuId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sensor_museu_fk` (`museuId`),
  CONSTRAINT `sensor_museu_fk` FOREIGN KEY (`museuId`) REFERENCES `museu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor`
--

LOCK TABLES `sensor` WRITE;
/*!40000 ALTER TABLE `sensor` DISABLE KEYS */;
INSERT INTO `sensor` VALUES (1,'Mona Lisa','Sala Principal - Parede A','2026-06-04 22:48:29',1,1),(2,'Noite Estrelada','Ala Leste - Parede B','2026-06-04 22:48:29',1,1),(3,'O Grito','Galeria Moderna - Centro','2026-06-04 22:48:29',1,1);
/*!40000 ALTER TABLE `sensor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `status_sensores_vw`
--

DROP TABLE IF EXISTS `status_sensores_vw`;
/*!50001 DROP VIEW IF EXISTS `status_sensores_vw`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `status_sensores_vw` AS SELECT 
 1 AS `quadroNome`,
 1 AS `temperatura`,
 1 AS `pontoOrvalho`,
 1 AS `diferenca`,
 1 AS `criadoem`,
 1 AS `id`,
 1 AS `status_atual`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `temperatura_media_vw`
--

DROP TABLE IF EXISTS `temperatura_media_vw`;
/*!50001 DROP VIEW IF EXISTS `temperatura_media_vw`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `temperatura_media_vw` AS SELECT 
 1 AS `temperatura_media`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `ultimos_alertas_dia_vw`
--

DROP TABLE IF EXISTS `ultimos_alertas_dia_vw`;
/*!50001 DROP VIEW IF EXISTS `ultimos_alertas_dia_vw`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ultimos_alertas_dia_vw` AS SELECT 
 1 AS `id`,
 1 AS `quadroNome`,
 1 AS `criadoEM`,
 1 AS `status_alerta`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `umidade_media_vw`
--

DROP TABLE IF EXISTS `umidade_media_vw`;
/*!50001 DROP VIEW IF EXISTS `umidade_media_vw`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `umidade_media_vw` AS SELECT 
 1 AS `umidade_media`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'thermus'
--

--
-- Dumping routines for database 'thermus'
--

--
-- Final view structure for view `alertas_dashboard_vw`
--

/*!50001 DROP VIEW IF EXISTS `alertas_dashboard_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`aluno`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `alertas_dashboard_vw` AS select ifnull(count(`a`.`id`),0) AS `total_alertas`,ifnull(sum((case when (`a`.`resolvido` = 0) then 1 else 0 end)),0) AS `pendentes`,`m`.`id` AS `id` from (((`museu` `m` left join `sensor` `s` on((`s`.`museuId` = `m`.`id`))) left join `leitura` `l` on((`l`.`sensorId` = `s`.`id`))) left join `alerta` `a` on(((`a`.`leituraId` = `l`.`id`) and (cast(`a`.`criadoEm` as date) = curdate())))) group by `m`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `calculo_ponto_orvalho_vw`
--

/*!50001 DROP VIEW IF EXISTS `calculo_ponto_orvalho_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`aluno`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `calculo_ponto_orvalho_vw` AS select round((avg(`leitura`.`temperatura`) - ((100 - avg(`leitura`.`umidade`)) / 5)),1) AS `ponto_orvalho` from `leitura` where (cast(`leitura`.`dataHora` as date) = curdate()) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `grafico_temperatura_vw`
--

/*!50001 DROP VIEW IF EXISTS `grafico_temperatura_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`aluno`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `grafico_temperatura_vw` AS select hour(`leitura`.`dataHora`) AS `hora`,round(avg(`leitura`.`temperatura`),1) AS `temperatura_media` from `leitura` where (cast(`leitura`.`dataHora` as date) = curdate()) group by hour(`leitura`.`dataHora`) order by `hora` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `grafico_umidade_vw`
--

/*!50001 DROP VIEW IF EXISTS `grafico_umidade_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`aluno`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `grafico_umidade_vw` AS select hour(`leitura`.`dataHora`) AS `hora`,round(avg(`leitura`.`umidade`),1) AS `umidade_media` from `leitura` where (cast(`leitura`.`dataHora` as date) = curdate()) group by hour(`leitura`.`dataHora`) order by `hora` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `status_sensores_vw`
--

/*!50001 DROP VIEW IF EXISTS `status_sensores_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`aluno`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `status_sensores_vw` AS select `s`.`quadroNome` AS `quadroNome`,`l`.`temperatura` AS `temperatura`,`l`.`pontoOrvalho` AS `pontoOrvalho`,(`l`.`temperatura` - `l`.`pontoOrvalho`) AS `diferenca`,`a`.`criadoEm` AS `criadoem`,`m`.`id` AS `id`,(case when ((`l`.`temperatura` - `l`.`pontoOrvalho`) <= 4) then 'critico' when ((`l`.`temperatura` - `l`.`pontoOrvalho`) <= 7) then 'atencao' else 'ok' end) AS `status_atual` from (((`sensor` `s` join `leitura` `l` on((`l`.`sensorId` = `s`.`id`))) join `alerta` `a` on((`a`.`leituraId` = `l`.`id`))) join `museu` `m` on((`s`.`museuId` = `m`.`id`))) where (`l`.`id` = (select max(`leitura`.`id`) from `leitura` where (`leitura`.`sensorId` = `s`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `temperatura_media_vw`
--

/*!50001 DROP VIEW IF EXISTS `temperatura_media_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`aluno`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `temperatura_media_vw` AS select round(avg(`leitura`.`temperatura`),0) AS `temperatura_media` from `leitura` where (cast(`leitura`.`dataHora` as date) = curdate()) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ultimos_alertas_dia_vw`
--

/*!50001 DROP VIEW IF EXISTS `ultimos_alertas_dia_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`aluno`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `ultimos_alertas_dia_vw` AS select `a`.`id` AS `id`,`s`.`quadroNome` AS `quadroNome`,`a`.`criadoEm` AS `criadoEM`,`a`.`tipoAlerta` AS `status_alerta` from ((`alerta` `a` join `leitura` `l` on((`l`.`id` = `a`.`leituraId`))) join `sensor` `s` on((`s`.`id` = `l`.`sensorId`))) order by `a`.`criadoEm` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `umidade_media_vw`
--

/*!50001 DROP VIEW IF EXISTS `umidade_media_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`aluno`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `umidade_media_vw` AS select round(avg(`leitura`.`umidade`),0) AS `umidade_media` from `leitura` where (cast(`leitura`.`dataHora` as date) = curdate()) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-04 23:02:19
