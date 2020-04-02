
CREATE TABLE `student` (
  `email` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `teacher` (
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `lesson` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher_email` varchar(255) NOT NULL,
  `student_email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`teacher_email`,`student_email`),
  KEY `student_id` (`student_email`),
  FOREIGN KEY (teacher_email) REFERENCES teacher(email),
  FOREIGN KEY (student_email) REFERENCES student(email)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;