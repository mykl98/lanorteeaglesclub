-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 23, 2022 at 01:29 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `survey`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `idx` int(11) NOT NULL,
  `image` longtext NOT NULL,
  `name` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `access` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`idx`, `image`, `name`, `username`, `password`, `access`, `status`) VALUES
(0, '', 'Michael Martin G. Abellana', 'superman', 'Skooltech_113012', 'admin', 'active'),
(4, '', 'Admin One', 'adminone', '123456', 'admin', 'active'),
(5, '', 'Staff One', 'staffone', '123456', 'staff', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `barangay`
--

CREATE TABLE `barangay` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `barangay`
--

INSERT INTO `barangay` (`idx`, `name`, `status`) VALUES
(3, 'Barangay One', 'active'),
(4, 'Barangay Two', 'active'),
(5, 'Barangay Three', 'active'),
(6, 'Barangay Four', 'active'),
(7, 'Barangay Five', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `bayan`
--

CREATE TABLE `bayan` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bayan`
--

INSERT INTO `bayan` (`idx`, `name`, `status`) VALUES
(2, 'SB Member One', 'active'),
(3, 'SB Member Two', 'active'),
(4, 'SB Member Three', 'active'),
(5, 'SB Member Four', 'active'),
(6, 'SB Member Five', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `gov`
--

CREATE TABLE `gov` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gov`
--

INSERT INTO `gov` (`idx`, `name`, `status`) VALUES
(3, 'Governor One', 'active'),
(4, 'Governor Two', 'active'),
(5, 'Governor Three', 'active'),
(6, 'Governor Four', 'active'),
(7, 'Governor Five', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `mayor`
--

CREATE TABLE `mayor` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mayor`
--

INSERT INTO `mayor` (`idx`, `name`, `status`) VALUES
(2, 'Mayor One', 'active'),
(3, 'Mayor Two', 'active'),
(4, 'Mayor Three', 'active'),
(5, 'Mayor Four', 'active'),
(6, 'Mayor Five', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `party`
--

CREATE TABLE `party` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `party`
--

INSERT INTO `party` (`idx`, `name`, `status`) VALUES
(2, 'Partylist One', 'active'),
(3, 'Partylist Two', 'active'),
(4, 'Partylist Three', 'active'),
(5, 'Partylist Four', 'active'),
(6, 'Partylist Five', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `press`
--

CREATE TABLE `press` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `press`
--

INSERT INTO `press` (`idx`, `name`, `status`) VALUES
(3, 'President One', 'active'),
(4, 'President Two', 'active'),
(5, 'President Three', 'active'),
(6, 'President Four', 'active'),
(7, 'President Five', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `purok`
--

CREATE TABLE `purok` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `barangay` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purok`
--

INSERT INTO `purok` (`idx`, `name`, `barangay`, `status`) VALUES
(1, 'Purok One', '3', 'active'),
(2, 'Purok Two', '4', 'active'),
(3, 'Purok Three', '5', 'active'),
(4, 'Purok Four', '6', 'active'),
(6, 'Purok Five', '7', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `rep`
--

CREATE TABLE `rep` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rep`
--

INSERT INTO `rep` (`idx`, `name`, `status`) VALUES
(2, 'Representative One', 'active'),
(3, 'Representative Two', 'active'),
(4, 'Representative Three', 'active'),
(5, 'Representative Four', 'active'),
(6, 'Representative Five', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `respondent`
--

CREATE TABLE `respondent` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `barangay` text NOT NULL,
  `purok` text NOT NULL,
  `press` text NOT NULL,
  `vpress` text NOT NULL,
  `sen1` text NOT NULL,
  `sen2` text NOT NULL,
  `sen3` text NOT NULL,
  `sen4` text NOT NULL,
  `sen5` text NOT NULL,
  `sen6` text NOT NULL,
  `sen7` text NOT NULL,
  `sen8` text NOT NULL,
  `sen9` text NOT NULL,
  `sen10` text NOT NULL,
  `sen11` text NOT NULL,
  `sen12` text NOT NULL,
  `rep` text NOT NULL,
  `gov` text NOT NULL,
  `vgov` text NOT NULL,
  `sang1` text NOT NULL,
  `sang2` text NOT NULL,
  `sang3` text NOT NULL,
  `sang4` text NOT NULL,
  `sang5` text NOT NULL,
  `mayor` text NOT NULL,
  `vmayor` text NOT NULL,
  `bayan1` text NOT NULL,
  `bayan2` text NOT NULL,
  `bayan3` text NOT NULL,
  `bayan4` text NOT NULL,
  `bayan5` text NOT NULL,
  `bayan6` text NOT NULL,
  `bayan7` text NOT NULL,
  `bayan8` text NOT NULL,
  `party` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `respondent`
--

INSERT INTO `respondent` (`idx`, `name`, `barangay`, `purok`, `press`, `vpress`, `sen1`, `sen2`, `sen3`, `sen4`, `sen5`, `sen6`, `sen7`, `sen8`, `sen9`, `sen10`, `sen11`, `sen12`, `rep`, `gov`, `vgov`, `sang1`, `sang2`, `sang3`, `sang4`, `sang5`, `mayor`, `vmayor`, `bayan1`, `bayan2`, `bayan3`, `bayan4`, `bayan5`, `bayan6`, `bayan7`, `bayan8`, `party`, `status`) VALUES
(2, 'Respondent One', '3', '1', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'processing'),
(3, 'Respondent Two', '4', '2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'processing'),
(4, 'Respondent Three', '5', '3', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'processing'),
(5, 'Respondent Four', '6', '4', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'processing'),
(6, 'Respondent Five', '7', '6', '6', '6', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '5', '6', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', 'complete');

-- --------------------------------------------------------

--
-- Table structure for table `sang`
--

CREATE TABLE `sang` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sang`
--

INSERT INTO `sang` (`idx`, `name`, `status`) VALUES
(2, 'SP Member One', 'active'),
(3, 'SP Member Two', 'active'),
(4, 'SP Member Three', 'active'),
(5, 'SP Member Four', 'active'),
(6, 'SP Member Five', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `sen`
--

CREATE TABLE `sen` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sen`
--

INSERT INTO `sen` (`idx`, `name`, `status`) VALUES
(2, 'Senator One', 'active'),
(3, 'Senator Two', 'active'),
(4, 'Senator Three', 'active'),
(5, 'Senator Four', 'active'),
(6, 'Senator Five', 'active'),
(7, 'Senator Six', 'active'),
(8, 'Senator Seven', 'active'),
(9, 'Senator Eight', 'active'),
(10, 'Senator Nine', 'active'),
(11, 'Senator Ten', 'active'),
(12, 'Senator Eleven', 'active'),
(13, 'Senator Twelve', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `vgov`
--

CREATE TABLE `vgov` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vgov`
--

INSERT INTO `vgov` (`idx`, `name`, `status`) VALUES
(2, 'Vice Governor One', 'active'),
(3, 'Vice Governor Two', 'active'),
(4, 'Vice Governor Three', 'active'),
(5, 'Vice Governor Four', 'active'),
(6, 'Vice Governor Five', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `vmayor`
--

CREATE TABLE `vmayor` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vmayor`
--

INSERT INTO `vmayor` (`idx`, `name`, `status`) VALUES
(2, 'Vice Mayor One', 'active'),
(3, 'Vice Mayor Two', 'active'),
(4, 'Vice Mayor Three', 'active'),
(5, 'Vice Mayor Four', 'active'),
(6, 'Vice Mayor Five', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `vpress`
--

CREATE TABLE `vpress` (
  `idx` int(11) NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vpress`
--

INSERT INTO `vpress` (`idx`, `name`, `status`) VALUES
(3, 'Vice President One', 'active'),
(4, 'Vice President Two', 'active'),
(5, 'Vice President Three', 'active'),
(6, 'Vice President Four', 'active'),
(7, 'Vice President Five', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `barangay`
--
ALTER TABLE `barangay`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `bayan`
--
ALTER TABLE `bayan`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `gov`
--
ALTER TABLE `gov`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `mayor`
--
ALTER TABLE `mayor`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `party`
--
ALTER TABLE `party`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `press`
--
ALTER TABLE `press`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `purok`
--
ALTER TABLE `purok`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `rep`
--
ALTER TABLE `rep`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `respondent`
--
ALTER TABLE `respondent`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `sang`
--
ALTER TABLE `sang`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `sen`
--
ALTER TABLE `sen`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `vgov`
--
ALTER TABLE `vgov`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `vmayor`
--
ALTER TABLE `vmayor`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `vpress`
--
ALTER TABLE `vpress`
  ADD PRIMARY KEY (`idx`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `barangay`
--
ALTER TABLE `barangay`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `bayan`
--
ALTER TABLE `bayan`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gov`
--
ALTER TABLE `gov`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `mayor`
--
ALTER TABLE `mayor`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `party`
--
ALTER TABLE `party`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `press`
--
ALTER TABLE `press`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `purok`
--
ALTER TABLE `purok`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `rep`
--
ALTER TABLE `rep`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `respondent`
--
ALTER TABLE `respondent`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sang`
--
ALTER TABLE `sang`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sen`
--
ALTER TABLE `sen`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `vgov`
--
ALTER TABLE `vgov`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vmayor`
--
ALTER TABLE `vmayor`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vpress`
--
ALTER TABLE `vpress`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
