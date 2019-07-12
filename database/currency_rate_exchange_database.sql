-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: currency_rate_exchange
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exchange_list`
--

DROP TABLE IF EXISTS `exchange_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `exchange_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from` varchar(45) DEFAULT NULL,
  `to` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchange_list`
--

LOCK TABLES `exchange_list` WRITE;
/*!40000 ALTER TABLE `exchange_list` DISABLE KEYS */;
INSERT INTO `exchange_list` VALUES (4,'USD','GBP'),(5,'USD','SGD'),(6,'USD','IDR'),(7,'SGD','JPN');
/*!40000 ALTER TABLE `exchange_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate_list`
--

DROP TABLE IF EXISTS `rate_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rate_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exchange_list_id` int(11) DEFAULT NULL,
  `rate` float DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate_list`
--

LOCK TABLES `rate_list` WRITE;
/*!40000 ALTER TABLE `rate_list` DISABLE KEYS */;
INSERT INTO `rate_list` VALUES (1,4,0.75709,'2018-07-01'),(2,4,0.7,'2018-07-02'),(3,4,0.1635,'2018-07-03'),(4,4,0.334,'2018-07-04'),(5,4,0.81,'2018-07-05'),(6,4,0.163,'2018-07-06'),(7,4,0.163,'2018-07-07'),(8,5,0.163,'2018-07-01'),(9,5,0.163,'2018-07-02'),(10,5,0.163,'2018-07-03'),(11,5,0.163,'2018-07-04'),(12,5,0.163,'2018-07-05'),(13,5,0.163,'2018-07-06'),(14,5,0.172,'2018-07-07'),(15,6,0.23,'2018-07-07'),(16,6,0.1576,'2018-07-04'),(17,6,0.1576,'2018-07-01'),(18,6,0.1576,'2018-07-02');
/*!40000 ALTER TABLE `rate_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-12 19:04:06
