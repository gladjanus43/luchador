-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Gegenereerd op: 30 mei 2018 om 11:39
-- Serverversie: 10.1.28-MariaDB
-- PHP-versie: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spreekwoorden`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `antwoord`
--

CREATE TABLE `antwoord` (
  `id` int(20) NOT NULL,
  `desc` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `antwoord`
--

INSERT INTO `antwoord` (`id`, `desc`) VALUES
(3, 'volgen er meer'),
(4, 'wie het eerst maalt'),
(5, 'Is het waar'),
(6, 'Iets wat nog niet bekend was, is nu bekend');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `spreekwoord`
--

CREATE TABLE `spreekwoord` (
  `id` int(20) NOT NULL,
  `desc` varchar(500) NOT NULL,
  `ant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `spreekwoord`
--

INSERT INTO `spreekwoord` (`id`, `desc`, `ant_id`) VALUES
(5, 'Als er een schaap over de dam is', 3),
(6, 'Wie het eerst komt', 4),
(7, 'Als Joriam iets zegt', 5),
(8, 'Daar komt de aap uit de mauw', 6);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `antwoord`
--
ALTER TABLE `antwoord`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `spreekwoord`
--
ALTER TABLE `spreekwoord`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ant_id` (`ant_id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `antwoord`
--
ALTER TABLE `antwoord`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT voor een tabel `spreekwoord`
--
ALTER TABLE `spreekwoord`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `spreekwoord`
--
ALTER TABLE `spreekwoord`
  ADD CONSTRAINT `spreekwoord_ibfk_1` FOREIGN KEY (`ant_id`) REFERENCES `antwoord` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
