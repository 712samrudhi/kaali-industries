-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2026 at 03:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutrient`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `created_at`) VALUES
(1, 'admin@gmail.com', '123456', '2026-05-30 12:18:33');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(1, 'Samrudhi Sawant', 'samrudhi731@gmail.com', 'inqury ', '2026-06-23 14:37:26');

-- --------------------------------------------------------

--
-- Table structure for table `farmers`
--

CREATE TABLE `farmers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `farmers`
--

INSERT INTO `farmers` (`id`, `name`, `email`, `mobile`, `address`, `username`, `password`, `created_at`) VALUES
(1, 'samrudhi sawant', 'samrudhi731@gmail.com', '9769340212', 'at post gondawale ', 'samrudhi', '073110', '2026-05-30 12:24:07'),
(2, 'Prasad devkar', 'prasadtdevkar31@gmail.com', '8424939339', 'at post banpuri ', 'prasad', 'prasad', '2026-06-05 08:31:19'),
(3, 'prem', 'premjadhav@gmail.com', '9372933515', 'duhgdfgsjrrrrrrrrrrrrrrrrr', 'fury', '@000', '2026-06-10 11:59:30'),
(4, 'sanskruti sandip sawant ', 'sanskruti15@gmail.com', '9270218792', 'At post gondawale kh ', 'san', '00000', '2026-06-23 14:19:50');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `rating` int(11) NOT NULL,
  `feedback` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `name`, `phone`, `rating`, `feedback`, `created_at`) VALUES
(1, 'Samrudhi Sawant', '9769340212', 5, 'good', '2026-06-23 15:09:31');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `farmer_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  `paymentMethod` varchar(50) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `productImage` varchar(255) DEFAULT NULL,
  `variant` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Order Placed',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `shipped_date` timestamp NULL DEFAULT NULL,
  `delivery_date` timestamp NULL DEFAULT NULL,
  `delivered_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `farmer_id`, `name`, `phone`, `address`, `city`, `pincode`, `paymentMethod`, `productName`, `productImage`, `variant`, `price`, `quantity`, `subtotal`, `total`, `status`, `created_at`, `shipped_date`, `delivery_date`, `delivered_date`) VALUES
(9, 1, 'Samrudhi Sawant', '9769340212', 'At post gondawale ', 'Satara', '415540', 'COD', 'we-won', '1782024425256.jpeg', '500ml', 344.50, 1, 344.50, 344.50, 'Shipped', '2026-06-23 16:58:31', '2026-06-23 17:02:27', NULL, NULL),
(10, 1, 'Samrudhi Sawant', '9769340212', 'gondawale kh', 'Dahiwadi', '415540', 'COD', 'Oscar', '1782028880641.jpeg', '1 liter ', 409.50, 1, 409.50, 409.50, 'Shipped', '2026-06-23 17:01:23', '2026-06-23 17:01:56', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `category`, `image`, `created_at`) VALUES
(16, 'we-won', 208.00, 'fertilizer', '1782020529000.jpeg', '2026-06-21 05:42:09'),
(17, 'Oscar', 409.00, 'fertilizer', '1782028793653.jpeg', '2026-06-21 07:59:53'),
(18, 'Adverse', 299.00, 'fertilizer', '1782029317337.jpeg', '2026-06-21 08:08:37'),
(19, 'HERCULES  ', 247.00, 'fertilizer', '1782030183297.jpeg', '2026-06-21 08:23:03');

-- --------------------------------------------------------

--
-- Table structure for table `product_details`
--

CREATE TABLE `product_details` (
  `id` int(11) NOT NULL,
  `productId` varchar(100) NOT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `specification` text DEFAULT NULL,
  `about` text DEFAULT NULL,
  `keyBenefits` text DEFAULT NULL,
  `modeOfAction` text DEFAULT NULL,
  `recommendedApplication` text DEFAULT NULL,
  `suitableCrops` text DEFAULT NULL,
  `features` text DEFAULT NULL,
  `variants` longtext DEFAULT NULL,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL,
  `image4` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_details`
--

INSERT INTO `product_details` (`id`, `productId`, `productName`, `specification`, `about`, `keyBenefits`, `modeOfAction`, `recommendedApplication`, `suitableCrops`, `features`, `variants`, `image1`, `image2`, `image3`, `image4`, `created_at`) VALUES
(3, '16', 'we-won', 'seaweed (Ascopyllum Nodosum) 15%\r\nPotassium Sorbate 0.25\r\nCitric Acid 1.91\r\nSolvent qs', 'WE WON Seaweed Extract 15% is a premium biostimulant derived from the marine brown seaweed Ascophyllum nodosum. It is enriched with natural bioactive compounds, amino acids, vitamins, carbohydrates, and essential nutrients that promote healthy crop growth, improve stress tolerance, and enhance yield potential.\r\n\r\n\r\n\r\n', 'Stimulates strong root and shoot development.\r\nEnhances nutrient uptake and fertilizer efficiency.\r\nPromotes vigorous vegetative growth.\r\nImproves flowering, fruit setting, and pod development.\r\nIncreases tolerance to drought, heat, salinity, and environmental stress.\r\nEnhances chlorophyll production and photosynthetic activity.\r\nImproves crop quality, size, color, and uniformity.\r\nSupports higher yield and better marketable produce.\r\n\r\n', 'The bioactive compounds present in Ascophyllum nodosum stimulate plant metabolic processes, improve nutrient assimilation, and enhance natural plant growth mechanisms, resulting in healthier and more productive crops.\r\n\r\n\r\n\r\n', 'Foliar Spray: 2–3 ml per litre of water\r\nDrip Irrigation: 500 ml – 1 litre per acre\r\nApply during vegetative growth, flowering, and fruit/pod development stages.\r\n\r\n', 'Field Crops, Cereals, Oilseeds, Cotton, Sugarcane, Vegetables, Fruits, Plantation Crops, Ornamentals, and Horticultural Crops.\r\n\r\n\r\n\r\n\r\n', 'Contains 15% Ascophyllum nodosum Seaweed Extract\r\nRich in Natural Growth Promoters\r\nEnhances Crop Vigor and Stress Tolerance\r\nImproves Nutrient Utilization\r\nSuitable for All Major Crops', '[{\"ml\":\"250ml\",\"price\":\"208\"},{\"ml\":\"500ml\",\"price\":\"344.5\"},{\"ml\":\"1000ml\",\"price\":\"624\"}]', '1782024425256.jpeg', '1782024425263.jpeg', NULL, NULL, '2026-06-21 06:47:05'),
(4, '17', 'Oscar', 'Humic acid per cent. by weight, minimum 27.5\r\nFulvic Acid per cent. by weight, minimum 1.5\r\nTotal Organic Carbon per cent by Weight , minimum 18\r\npH ( 1 % aqueous solution ) 2.5 +\r\nSpecific Gravity (At 15 ℃ ) 1.2-1.4\r\nWater per cent by weight Qs\r\n', 'HERCULES Humic & Fulvic 29% is a high-performance organic biostimulant enriched with Humic Acid and Fulvic Acid that improves soil health, enhances nutrient availability, and promotes vigorous plant growth. It helps crops develop stronger root systems, improves nutrient uptake, and supports higher productivity.\r\n\r\n\r\n\r\n\r\n', 'Enhances root growth and development.\r\nImproves nutrient absorption and utilization.\r\nIncreases soil microbial activity and soil fertility.\r\nPromotes healthy vegetative growth and crop vigor.\r\nImproves water retention and drought tolerance.\r\nReduces nutrient losses and increases fertilizer efficiency.\r\nEnhances flowering, fruiting, and overall yield potential.\r\nImproves crop quality, size, and uniformity.', 'Humic Acid improves soil structure, nutrient retention, and root development, while Fulvic Acid acts as a natural chelating agent, helping plants absorb essential nutrients more efficiently. Together, they support balanced growth and better crop performance.\r\n\r\n\r\n\r\n\r\n\r\n', 'Foliar Spray: 2–3 ml per litre of water.\r\nDrip Irrigation: 1–2 litres per acre.\r\nSoil Application: As per crop requirement and agronomic recommendations.', '', 'Improves soil health and nutrient availability.\r\nEnhances fertilizer use efficiency.\r\nSupports sustainable crop production.\r\nSuitable for all stages of crop growth.', '[{\"ml\":\"1 liter \",\"price\":\"409.5\"},{\"ml\":\"2.5 liter \",\"price\":\"752\"}]', '1782028880641.jpeg', '1782028880642.jpeg', NULL, NULL, '2026-06-21 08:01:20'),
(5, '18', 'Adverse', 'Protein hydrilysate ( Source :Animal Source ) per cent by Weight 62.50\r\nTotal Organic Carbon per cent by Weight , minimum 29\r\npH ( 10% aqueous solution ) 5.5 +\r\nSpecific Gravity (At 15 ℃ ) 1.2-1.4\r\nWater per cent by weight Qs', 'ADVERSE Amino Acid 62.5% (Animal Based)\r\nADVERSE Amino Acid 62.5% is a premium animal-based biostimulant formulated with high-quality free amino acids to support vigorous crop growth, improved nutrient utilization, and enhanced stress tolerance. The readily available amino acids help plants maintain optimum metabolic activity, resulting in better growth, flowering, and yield performance. Amino acid-based biostimulants are widely used to improve nutrient efficiency, stress tolerance, and crop productivity.\r\n\r\n\r\n\r\n\r\n', 'Promotes rapid vegetative growth and plant vigor.\r\nEnhances nutrient uptake and fertilizer use efficiency.\r\nSupports healthy root development and crop establishment.\r\nImproves flowering, fruit setting, and pod development.\r\nHelps crops withstand drought, heat, salinity, and transplant stress.\r\nEnhances photosynthetic activity and chlorophyll formation.\r\nImproves crop quality, uniformity, and yield potential.\r\nSupports faster recovery from environmental stress conditions.\r\n', 'Free amino acids are directly absorbed and utilized by plants for protein synthesis, enzyme activity, and various physiological processes. They help optimize plant metabolism, improve nutrient assimilation, and support crop performance under both normal and stress conditions.\r\n\r\n\r\n\r\n\r\n', 'Foliar Spray: 2–3 ml per litre of water\r\nDrip Irrigation: 1–2 litres per acre\r\nSuitable for application during vegetative growth, flowering, and fruit/pod development stages.\r\n', 'Field Crops, Oilseeds, Cereals, Cotton, Sugarcane, Vegetables, Fruits, Plantation Crops, and Horticultural Crops.\r\n\r\n\r\n\r\n', 'High Amino Acid Content (62.5%)\r\nFast Absorption and Quick Plant Response\r\nImproves Nutrient Use Efficiency\r\nCompatible with Most Crop Nutrition Programs\r\nSuitable for All Major Crops', '[{\"ml\":\"250ml\",\"price\":\"299\"},{\"ml\":\"500ml\",\"price\":\"533\"},{\"ml\":\"1000ml\",\"price\":\"1007\"}]', '1782029756710.jpeg', '1782029756714.jpeg', '1782029756723.jpeg', NULL, '2026-06-21 08:15:56'),
(6, '19', 'HERCULES  ', '\"Cytokinin Extract \r\n\"	0.02\r\nPotassium Sorbate	0.001\r\nph	6.5 +\r\nSolvent per	QS', 'HERCULES Cytokinin 0.2% is a premium plant growth regulator (PGR) formulated to stimulate cell division, promote shoot development, and enhance overall crop vigor. Cytokinin plays a vital role in plant growth by encouraging branching, improving flowering, delaying leaf senescence, and supporting efficient nutrient utilization.\r\n\r\n\r\n', 'Promotes rapid cell division and healthy plant growth.\r\nEnhances branching and shoot development.\r\nImproves flowering, fruit set, and pod formation.\r\nDelays leaf aging, keeping crops greener for longer.\r\nSupports better nutrient uptake and utilization.\r\nHelps plants maintain vigor under environmental stress conditions.\r\nImproves crop quality, uniformity, and yield potential.', 'Cytokinin regulates plant growth by stimulating cell division and differentiation, promoting lateral bud growth, and delaying senescence. It helps maintain chlorophyll levels, resulting in healthier foliage and prolonged photosynthetic activity.\r\n\r\n\r\n', 'oliar Spray: 2–3 ml per litre of water.\r\nSuitable for use on field crops, vegetables, fruits, plantation crops, and horticultural crops.\r\nApply during active vegetative growth and pre-flowering stages for optimum results.', '', 'Water-soluble liquid formulation.\r\nCompatible with most fertilizers and crop protection products.\r\nSuitable for integrated crop management programs.\r\nSupports higher productivity and improved crop performance.', '[{\"ml\":\"100ml \",\"price\":\"247\"},{\"ml\":\"200ml\",\"price\":\"494\"},{\"ml\":\"500ml\",\"price\":\"975\"}]', '1782030381363.jpeg', '1782030381367.jpeg', NULL, NULL, '2026-06-21 08:26:21');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `ml` varchar(20) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farmers`
--
ALTER TABLE `farmers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productId` (`productId`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `farmers`
--
ALTER TABLE `farmers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `product_details`
--
ALTER TABLE `product_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
