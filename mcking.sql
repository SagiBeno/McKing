-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Nov 02. 12:15
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `mcking`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `etelek`
--

CREATE TABLE `etelek` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `tipus` varchar(255) NOT NULL,
  `ar` int(11) NOT NULL,
  `kep` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `etelek`
--

INSERT INTO `etelek` (`id`, `nev`, `tipus`, `ar`, `kep`) VALUES
(1, 'Hamburger', 'Szendvicsek', 690, 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800'),
(2, 'Coca Cola', 'Italok', 750, 'https://images.unsplash.com/photo-1667204651371-5d4a65b8b5a9?w=800'),
(3, 'Sajtburger', 'Szendvicsek', 790, 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800'),
(4, 'Dupla Sajtburger', 'Szendvicsek', 1490, 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800'),
(5, 'Hasábburgonya', 'Köretek', 800, 'https://images.unsplash.com/photo-1647705196427-7e598e04add2?w=800'),
(6, 'Csirkefalatok', 'Harapnivalók', 990, 'https://images.unsplash.com/photo-1619881590738-a111d176d906?w=800'),
(7, 'Jégkrém', 'Desszertek', 1240, 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800'),
(8, 'Kávé', 'Italok', 590, 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800'),
(9, 'Limonádé', 'Italok', 490, 'https://images.unsplash.com/photo-1623084921164-4a8c5c37a912?w=800'),
(10, 'Extra burger', 'Szendvicsek', 2390, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `tipus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `username`, `email`, `jelszo`, `tipus`) VALUES
(1, 'JohnDoe', 'JohnDoe@example.com', '$2a$12$vAG14u7jlSgpTDhgpd4lyeH514Qdg/bcu23WLlRJm4hnPXZtvyA9e', 'admin'),
(2, 'JaneDoe', 'JaneDoe@example.com', '$2a$12$uV.s.Lqev7nPBLn.u9dMA.87uCM7Snw6K46VjQ/JVR9q0ULt7Jrpy', 'user'),
(13, 'Vendég', '', '', 'user');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendelesek`
--

CREATE TABLE `rendelesek` (
  `id` int(11) NOT NULL,
  `rendelo_id` int(255) DEFAULT NULL,
  `aktiv` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendelt_elemek`
--

CREATE TABLE `rendelt_elemek` (
  `id` int(11) NOT NULL,
  `rendeles_id` int(11) NOT NULL,
  `elem_id` int(11) NOT NULL,
  `darab` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `etelek`
--
ALTER TABLE `etelek`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_nev` (`nev`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_username` (`username`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- A tábla indexei `rendelesek`
--
ALTER TABLE `rendelesek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_rendelo` (`rendelo_id`);

--
-- A tábla indexei `rendelt_elemek`
--
ALTER TABLE `rendelt_elemek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_rendeles_id` (`rendeles_id`),
  ADD KEY `elem_id_idx` (`elem_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `etelek`
--
ALTER TABLE `etelek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `rendelesek`
--
ALTER TABLE `rendelesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT a táblához `rendelt_elemek`
--
ALTER TABLE `rendelt_elemek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `rendelesek`
--
ALTER TABLE `rendelesek`
  ADD CONSTRAINT `rendelesek_ibfk_1` FOREIGN KEY (`rendelo_id`) REFERENCES `felhasznalok` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `rendelt_elemek`
--
ALTER TABLE `rendelt_elemek`
  ADD CONSTRAINT `rendelt_elemek_ibfk_1` FOREIGN KEY (`elem_id`) REFERENCES `etelek` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rendelt_elemek_ibfk_2` FOREIGN KEY (`rendeles_id`) REFERENCES `rendelesek` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
