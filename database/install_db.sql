# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 0.0.0.0 (MySQL 5.5.62)
# Database: battleship
# Generation Time: 2020-01-02 04:50:49 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table board_states
# ------------------------------------------------------------

CREATE TABLE `board_states` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `state` varchar(11) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `board_states` WRITE;
/*!40000 ALTER TABLE `board_states` DISABLE KEYS */;

INSERT INTO `board_states` (`id`, `state`, `value`)
VALUES
	(1,'empty',0),
	(2,'patrol-boat',1),
	(3,'submarine',2),
	(4,'destroyer',3),
	(5,'battleship',4),
	(6,'carrier',5),
	(7,'hidden',6),
	(8,'p1_ship_hit',7),
	(9,'p1_fog',8),
	(10,'p2_ship_hit',9),
	(11,'p2_fog',10);

/*!40000 ALTER TABLE `board_states` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table p1_board
# ------------------------------------------------------------

CREATE TABLE `p1_board` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `A` int(11) DEFAULT '0',
  `B` int(11) DEFAULT '0',
  `C` int(11) DEFAULT '0',
  `D` int(11) DEFAULT '0',
  `E` int(11) DEFAULT '0',
  `F` int(11) DEFAULT '0',
  `G` int(11) DEFAULT '0',
  `H` int(11) DEFAULT '0',
  `I` int(11) DEFAULT '0',
  `J` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `p1_board` WRITE;
/*!40000 ALTER TABLE `p1_board` DISABLE KEYS */;

INSERT INTO `p1_board` (`id`, `A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`)
VALUES
	(1,0,0,0,0,0,0,0,0,0,0),
	(2,0,0,0,0,0,0,0,0,0,0),
	(3,0,0,0,0,0,0,0,0,0,0),
	(4,0,0,0,0,0,0,0,0,0,0),
	(5,0,0,0,0,0,0,0,0,0,0),
	(6,0,0,0,0,0,0,0,0,0,0),
	(7,0,0,0,0,0,0,0,0,0,0),
	(8,0,0,0,0,0,0,0,0,0,0),
	(9,0,0,0,0,0,0,0,0,0,0),
	(10,0,0,0,0,0,0,0,0,0,0);

/*!40000 ALTER TABLE `p1_board` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table p1_enemy_board
# ------------------------------------------------------------

CREATE TABLE `p1_enemy_board` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `A` int(11) DEFAULT '0',
  `B` int(11) DEFAULT '0',
  `C` int(11) DEFAULT '0',
  `D` int(11) DEFAULT '0',
  `E` int(11) DEFAULT '0',
  `F` int(11) DEFAULT '0',
  `G` int(11) DEFAULT '0',
  `H` int(11) DEFAULT '0',
  `I` int(11) DEFAULT '0',
  `J` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `p1_enemy_board` WRITE;
/*!40000 ALTER TABLE `p1_enemy_board` DISABLE KEYS */;

INSERT INTO `p1_enemy_board` (`id`, `A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`)
VALUES
	(1,0,0,0,0,0,0,0,0,0,0),
	(2,0,0,0,0,0,0,0,0,0,0),
	(3,0,0,0,0,0,0,0,0,0,0),
	(4,0,0,0,0,0,0,0,0,0,0),
	(5,0,0,0,0,0,0,0,0,0,0),
	(6,0,0,0,0,0,0,0,0,0,0),
	(7,0,0,0,0,0,0,0,0,0,0),
	(8,0,0,0,0,0,0,0,0,0,0),
	(9,0,0,0,0,0,0,0,0,0,0),
	(10,0,0,0,0,0,0,0,0,0,0);

/*!40000 ALTER TABLE `p1_enemy_board` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table p2_board
# ------------------------------------------------------------

CREATE TABLE `p2_board` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `A` int(11) DEFAULT '0',
  `B` int(11) DEFAULT '0',
  `C` int(11) DEFAULT '0',
  `D` int(11) DEFAULT '0',
  `E` int(11) DEFAULT '0',
  `F` int(11) DEFAULT '0',
  `G` int(11) DEFAULT '0',
  `H` int(11) DEFAULT '0',
  `I` int(11) DEFAULT '0',
  `J` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `p2_board` WRITE;
/*!40000 ALTER TABLE `p2_board` DISABLE KEYS */;

INSERT INTO `p2_board` (`id`, `A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`)
VALUES
	(1,0,0,0,0,0,0,0,0,0,0),
	(2,0,0,0,0,0,0,0,0,0,0),
	(3,0,0,0,0,0,0,0,0,0,0),
	(4,0,0,0,0,0,0,0,0,0,0),
	(5,0,0,0,0,0,0,0,0,0,0),
	(6,0,0,0,0,0,0,0,0,0,0),
	(7,0,0,0,0,0,0,0,0,0,0),
	(8,0,0,0,0,0,0,0,0,0,0),
	(9,0,0,0,0,0,0,0,0,0,0),
	(10,0,0,0,0,0,0,0,0,0,0);

/*!40000 ALTER TABLE `p2_board` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table p2_enemy_board
# ------------------------------------------------------------

CREATE TABLE `p2_enemy_board` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `A` int(11) DEFAULT '0',
  `B` int(11) DEFAULT '0',
  `C` int(11) DEFAULT '0',
  `D` int(11) DEFAULT '0',
  `E` int(11) DEFAULT '0',
  `F` int(11) DEFAULT '0',
  `G` int(11) DEFAULT '0',
  `H` int(11) DEFAULT '0',
  `I` int(11) DEFAULT '0',
  `J` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `p2_enemy_board` WRITE;
/*!40000 ALTER TABLE `p2_enemy_board` DISABLE KEYS */;

INSERT INTO `p2_enemy_board` (`id`, `A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`)
VALUES
	(1,0,0,0,0,0,0,0,0,0,0),
	(2,0,0,0,0,0,0,0,0,0,0),
	(3,0,0,0,0,0,0,0,0,0,0),
	(4,0,0,0,0,0,0,0,0,0,0),
	(5,0,0,0,0,0,0,0,0,0,0),
	(6,0,0,0,0,0,0,0,0,0,0),
	(7,0,0,0,0,0,0,0,0,0,0),
	(8,0,0,0,0,0,0,0,0,0,0),
	(9,0,0,0,0,0,0,0,0,0,0),
	(10,0,0,0,0,0,0,0,0,0,0);

/*!40000 ALTER TABLE `p2_enemy_board` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table players
# ------------------------------------------------------------

CREATE TABLE `players` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;

INSERT INTO `players` (`id`, `name`)
VALUES
	(1,'Player One'),
	(2,'Player Two');

/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ships
# ------------------------------------------------------------

CREATE TABLE `ships` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(12) DEFAULT NULL,
  `size` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `ships` WRITE;
/*!40000 ALTER TABLE `ships` DISABLE KEYS */;

INSERT INTO `ships` (`id`, `type`, `size`)
VALUES
	(1,'patrol-boat',2),
	(2,'submarine',3),
	(3,'destroyer',3),
	(4,'battleship',4),
	(5,'carrier',5);

/*!40000 ALTER TABLE `ships` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
