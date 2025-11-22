-- =======================================================
-- CẤU TRÚC CƠ BẢN
-- =======================================================
-- DROP DATABASE IF EXISTS software_engineering;
-- CREATE DATABASE software_engineering;
-- USE software_engineering;

-- =======================================================
-- AUTH CORE
-- =======================================================
CREATE TABLE `User` (
  `id` VARCHAR(191) NOT NULL,
  `username` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `passwordHash` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`),
  UNIQUE KEY `User_email_key` (`email`)
);

CREATE TABLE `Roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Roles_name_key` (`name`)
);

CREATE TABLE `Permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Permission_name_key` (`name`)
);

CREATE TABLE `UserRoles` (
  `userId` VARCHAR(191) NOT NULL,
  `roleId` INT NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  CONSTRAINT `UserRoles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserRoles_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `RolePermissions` (
  `roleId` INT NOT NULL,
  `permissionId` INT NOT NULL,
  PRIMARY KEY (`roleId`,`permissionId`),
  CONSTRAINT `RolePermissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `RolePermissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- =======================================================
-- DOMAIN TABLES
-- =======================================================

-- 🧒 STUDENT
CREATE TABLE `Student` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `meta` JSON DEFAULT NULL,
  `userId` VARCHAR(191) UNIQUE NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 🚌 BUS
CREATE TABLE `Bus` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `licensePlate` VARCHAR(191) NOT NULL UNIQUE,
  `capacity` INT NOT NULL,
  `status` ENUM('ACTIVE', 'MAINTENANCE') DEFAULT 'ACTIVE',
  `meta` JSON DEFAULT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);

-- 🚦 ROUTE
CREATE TABLE `Route` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `estimatedDuration` INT DEFAULT 0,
  `startLocation` JSON NOT NULL,
  `endLocation` JSON NOT NULL,
  `isActive` BOOLEAN DEFAULT TRUE,
  `meta` JSON DEFAULT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);

-- 🚏 STOP POINT
CREATE TABLE `StopPoint` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `location` JSON NOT NULL,
  `meta` JSON DEFAULT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);


-- 🚍 ROUTE - STOP POINT (Mapping many-to-many with order)
CREATE TABLE `RouteStopPoint` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `routeId` VARCHAR(191) NOT NULL,
  `stopPointId` VARCHAR(191) NOT NULL,
  `sequence` INT NOT NULL, -- Thứ tự điểm dừng trong tuyến
  PRIMARY KEY (`id`),
  CONSTRAINT `RouteStopPoint_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `RouteStopPoint_stopPointId_fkey` FOREIGN KEY (`stopPointId`) REFERENCES `StopPoint` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 📅 SCHEDULE (template for repeated trips)
CREATE TABLE `Schedule` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `routeId` VARCHAR(191) NOT NULL,
  `busId` VARCHAR(191) NOT NULL,
  `driverId` VARCHAR(191) NOT NULL,
  `type` ENUM('MORNING', 'AFTERNOON') NOT NULL,
  `daysOfWeek` JSON NOT NULL, -- e.g. [1,2,3,4,5]
  `startTime` TIME NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `status` ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
  `meta` JSON DEFAULT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT `Schedule_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Schedule_busId_fkey` FOREIGN KEY (`busId`) REFERENCES `Bus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Schedule_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 🚍 TRIP (actual daily instance)
CREATE TABLE `Trip` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `type` ENUM("DISPATCH", "RETURN") NOT NULL,
  `scheduleId` VARCHAR(191) NOT NULL,
  `date` DATE NOT NULL,
  `actualStartTime` DATETIME(3) DEFAULT NULL,
  `actualEndTime` DATETIME(3) DEFAULT NULL,
  `status` ENUM('PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED') DEFAULT 'PLANNED',
  `currentStopId` VARCHAR(191) DEFAULT NULL,
  `location` JSON DEFAULT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT `Trip_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `Schedule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 🚏 TRIP STOP (actual stop progress)
CREATE TABLE `TripStop` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `tripId` VARCHAR(191) NOT NULL,
  `stopId` VARCHAR(191) NOT NULL,
  `actualArrival` DATETIME(3) DEFAULT NULL,
  `actualDeparture` DATETIME(3) DEFAULT NULL,
  `status` ENUM('PENDING', 'ARRIVED', 'DONE', 'SKIPPED') DEFAULT 'PENDING',
  CONSTRAINT `TripStop_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `Trip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `TripStop_stopId_fkey` FOREIGN KEY (`stopId`) REFERENCES `StopPoint` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 🎒 STUDENT ASSIGNMENT
CREATE TABLE `StudentAssignment` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `studentId` VARCHAR(191) NOT NULL,
  `routeId` VARCHAR(191) NOT NULL,
  `stopId` VARCHAR(191) NOT NULL,
  `direction` ENUM('PICKUP', 'DROPOFF') NOT NULL,
  `effectiveFrom` DATE NOT NULL,
  `effectiveTo` DATE DEFAULT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT `StudentAssignment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `StudentAssignment_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `StudentAssignment_stopId_fkey` FOREIGN KEY (`stopId`) REFERENCES `StopPoint` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 🧾 ATTENDANCE
CREATE TABLE `StudentAttendance` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `tripId` VARCHAR(191) NOT NULL,
  `studentId` VARCHAR(191) NOT NULL,
  `pickupTime` DATETIME(3) DEFAULT NULL,
  `dropoffTime` DATETIME(3) DEFAULT NULL,
  `status` ENUM('PENDING', 'PICKED_UP', 'DROPPED_OFF', 'MISSED') DEFAULT 'PENDING',
  CONSTRAINT `StudentAttendance_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `Trip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `StudentAttendance_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 📍 TRACKING HISTORY
CREATE TABLE `TrackingBusHistory` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `tripId` VARCHAR(191) NOT NULL,
  `timestamp` DATETIME(3) NOT NULL,
  `location` JSON NOT NULL,
  CONSTRAINT `TrackingBusHistory_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `Trip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 🚨 REPORTS
CREATE TABLE `Report` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `reportType` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `timestamp` DATETIME(3) NOT NULL,
  `reporterId` VARCHAR(191) NOT NULL,
  `tripId` VARCHAR(191) DEFAULT NULL,
  `meta` JSON DEFAULT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT `Report_reporterId_fkey` FOREIGN KEY (`reporterId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Report_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `Trip` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

